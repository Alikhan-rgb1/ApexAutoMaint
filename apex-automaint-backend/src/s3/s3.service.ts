import { Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  private readonly s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      region: 'your-s3-region',
      credentials: {
        accessKeyId: 'your-s3-access-key-id',
        secretAccessKey: 'your-s3-secret-access-key',
      },
    });
  }

  // Add your S3 methods here, e.g., uploadFile, getFile, etc.
}
