import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import nodemailer from 'nodemailer';
import { LessThanOrEqual, Repository } from 'typeorm';

import { User } from '../users/user.entity';
import { Notification } from './notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepo: Repository<Notification>,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private readonly config: ConfigService,
  ) {}

  async listMy(userId: string) {
    return this.notificationsRepo.find({
      where: { userId },
      order: { scheduledAt: 'ASC' },
    });
  }

  async create(dto: CreateNotificationDto) {
    return this.notificationsRepo.save(
      this.notificationsRepo.create({
        userId: dto.userId,
        vehicleId: dto.vehicleId,
        type: dto.type,
        channel: dto.channel,
        message: dto.message,
        isSent: false,
        scheduledAt: new Date(dto.scheduledAt),
      }),
    );
  }

  @Cron('0 9 * * *')
  async sendScheduled() {
    const host = this.config.get<string>('SMTP_HOST');
    const port = Number(this.config.get<string>('SMTP_PORT') ?? '587');
    const user = this.config.get<string>('SMTP_USER');
    const pass = this.config.get<string>('SMTP_PASS');
    const from = this.config.get<string>('SMTP_FROM') ?? user;

    if (!host || !user || !pass || !from) {
      this.logger.warn('SMTP is not configured; skipping notifications');
      return;
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const due = await this.notificationsRepo.find({
      where: {
        isSent: false,
        channel: 'email',
        scheduledAt: LessThanOrEqual(new Date()),
      },
      order: { scheduledAt: 'ASC' },
    });

    for (const n of due) {
      try {
        const recipient = await this.usersRepo.findOne({
          where: { id: n.userId },
        });
        if (!recipient?.email) continue;

        await transporter.sendMail({
          from,
          to: recipient.email,
          subject: 'ApexAutoMaint Notification',
          text: n.message,
        });

        n.isSent = true;
        await this.notificationsRepo.save(n);
      } catch (e) {
        this.logger.error(
          `Failed to send notification: ${e instanceof Error ? e.message : String(e)}`,
        );
      }
    }
  }
}
