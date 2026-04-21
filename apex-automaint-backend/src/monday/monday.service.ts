import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type MondayGraphqlError = { message: string };
type MondayGraphqlResponse<T> = { data?: T; errors?: MondayGraphqlError[] };

type MondayColumnValue = {
  id: string;
  text: string | null;
  type: string | null;
  value: string | null;
};

type MondayItem = {
  id: string;
  name: string;
  group?: { title?: string | null } | null;
  column_values: MondayColumnValue[];
};

type MondayBoardWithItems = {
  id: string;
  name: string;
  items?: MondayItem[];
  items_page?: { items: MondayItem[] };
};

@Injectable()
export class MondayService {
  constructor(private readonly config: ConfigService) {}

  private getToken() {
    const token = this.config.get<string>('MONDAY_API_TOKEN');
    if (!token) {
      throw new BadRequestException('MONDAY_API_TOKEN is not configured');
    }
    return token;
  }

  private async request<T>(query: string, variables?: Record<string, unknown>) {
    const token = this.getToken();
    const res = await fetch('https://api.monday.com/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ query, variables }),
    });

    const json = (await res
      .json()
      .catch(() => null)) as MondayGraphqlResponse<T> | null;
    if (!json) throw new BadRequestException('Invalid monday.com response');
    if (json.errors && json.errors.length > 0) {
      throw new BadRequestException(
        json.errors[0]?.message ?? 'monday.com error',
      );
    }
    if (!json.data) throw new BadRequestException('Missing monday.com data');
    return json.data;
  }

  async listBoards() {
    const data = await this.request<{
      boards: Array<{ id: string; name: string }>;
    }>(
      `
      query {
        boards(limit: 50) {
          id
          name
        }
      }
      `,
    );
    return data.boards;
  }

  async listBoardItems(boardId: string) {
    const statusColumnId =
      this.config.get<string>('MONDAY_LIFTS_STATUS_COLUMN_ID') ?? 'status';
    const workTimeColumnId =
      this.config.get<string>('MONDAY_LIFTS_WORK_TIME_COLUMN_ID') ??
      'text_mm2c3tsm';
    const workTypeColumnId =
      this.config.get<string>('MONDAY_LIFTS_WORK_TYPE_COLUMN_ID') ??
      'dropdown_mm2c428v';
    const carColumnId =
      this.config.get<string>('MONDAY_LIFTS_CAR_COLUMN_ID') ?? 'text_mm2ctfz4';
    const notesColumnId =
      this.config.get<string>('MONDAY_LIFTS_NOTES_COLUMN_ID') ??
      'text_mm2cca0w';
    const mechanicColumnId =
      this.config.get<string>('MONDAY_LIFTS_MECHANIC_COLUMN_ID') ??
      'multiple_person_mm2cqhke';

    const queryItemsPage = `
      query ($boardId: ID!) {
        boards(ids: [$boardId]) {
          id
          name
          items_page(limit: 200) {
            items {
              id
              name
              group {
                title
              }
              column_values {
                id
                text
                type
                value
              }
            }
          }
        }
      }
    `;

    const queryItemsPageNoArgs = `
      query ($boardId: ID!) {
        boards(ids: [$boardId]) {
          id
          name
          items_page {
            items {
              id
              name
              group {
                title
              }
              column_values {
                id
                text
                type
                value
              }
            }
          }
        }
      }
    `;

    const queryItemsPageNoGroup = `
      query ($boardId: ID!) {
        boards(ids: [$boardId]) {
          id
          name
          items_page(limit: 200) {
            items {
              id
              name
              column_values {
                id
                text
                type
                value
              }
            }
          }
        }
      }
    `;

    const queryItemsPageNoArgsNoGroup = `
      query ($boardId: ID!) {
        boards(ids: [$boardId]) {
          id
          name
          items_page {
            items {
              id
              name
              column_values {
                id
                text
                type
                value
              }
            }
          }
        }
      }
    `;

    try {
      const data = await this.request<{ boards: MondayBoardWithItems[] }>(
        queryItemsPage,
        { boardId },
      );
      const board = data.boards?.[0];
      const items = (board?.items_page?.items ?? []).map((item) => {
        const byId = (id: string) =>
          item.column_values.find((c) => c.id === id)?.text ?? null;
        return {
          id: item.id,
          name: item.name,
          group: item.group?.title ?? null,
          status: byId(statusColumnId),
          workTime: byId(workTimeColumnId),
          workType: byId(workTypeColumnId),
          car: byId(carColumnId),
          notes: byId(notesColumnId),
          mechanic: byId(mechanicColumnId),
        };
      });
      return {
        board: board ? { id: board.id, name: board.name } : null,
        statusColumnId,
        columns: {
          status: statusColumnId,
          workTime: workTimeColumnId,
          workType: workTypeColumnId,
          car: carColumnId,
          notes: notesColumnId,
          mechanic: mechanicColumnId,
        },
        items,
      };
    } catch {
      try {
        const data = await this.request<{ boards: MondayBoardWithItems[] }>(
          queryItemsPageNoArgs,
          { boardId },
        );
        const board = data.boards?.[0];
        const items = (board?.items_page?.items ?? []).map((item) => {
          const byId = (id: string) =>
            item.column_values.find((c) => c.id === id)?.text ?? null;
          return {
            id: item.id,
            name: item.name,
            group: item.group?.title ?? null,
            status: byId(statusColumnId),
            workTime: byId(workTimeColumnId),
            workType: byId(workTypeColumnId),
            car: byId(carColumnId),
            notes: byId(notesColumnId),
            mechanic: byId(mechanicColumnId),
          };
        });
        return {
          board: board ? { id: board.id, name: board.name } : null,
          statusColumnId,
          columns: {
            status: statusColumnId,
            workTime: workTimeColumnId,
            workType: workTypeColumnId,
            car: carColumnId,
            notes: notesColumnId,
            mechanic: mechanicColumnId,
          },
          items,
        };
      } catch {
        try {
          const data = await this.request<{ boards: MondayBoardWithItems[] }>(
            queryItemsPageNoGroup,
            { boardId },
          );
          const board = data.boards?.[0];
          const items = (board?.items_page?.items ?? []).map((item) => {
            const byId = (id: string) =>
              item.column_values.find((c) => c.id === id)?.text ?? null;
            return {
              id: item.id,
              name: item.name,
              group: null,
              status: byId(statusColumnId),
              workTime: byId(workTimeColumnId),
              workType: byId(workTypeColumnId),
              car: byId(carColumnId),
              notes: byId(notesColumnId),
              mechanic: byId(mechanicColumnId),
            };
          });
          return {
            board: board ? { id: board.id, name: board.name } : null,
            statusColumnId,
            columns: {
              status: statusColumnId,
              workTime: workTimeColumnId,
              workType: workTypeColumnId,
              car: carColumnId,
              notes: notesColumnId,
              mechanic: mechanicColumnId,
            },
            items,
          };
        } catch {
          const data = await this.request<{ boards: MondayBoardWithItems[] }>(
            queryItemsPageNoArgsNoGroup,
            { boardId },
          );
          const board = data.boards?.[0];
          const items = (board?.items_page?.items ?? []).map((item) => {
            const byId = (id: string) =>
              item.column_values.find((c) => c.id === id)?.text ?? null;
            return {
              id: item.id,
              name: item.name,
              group: null,
              status: byId(statusColumnId),
              workTime: byId(workTimeColumnId),
              workType: byId(workTypeColumnId),
              car: byId(carColumnId),
              notes: byId(notesColumnId),
              mechanic: byId(mechanicColumnId),
            };
          });
          return {
            board: board ? { id: board.id, name: board.name } : null,
            statusColumnId,
            columns: {
              status: statusColumnId,
              workTime: workTimeColumnId,
              workType: workTypeColumnId,
              car: carColumnId,
              notes: notesColumnId,
              mechanic: mechanicColumnId,
            },
            items,
          };
        }
      }
    }
  }

  async setItemStatus(
    boardId: number,
    itemId: string,
    columnId: string,
    status: string,
  ) {
    const data = await this.request<{
      change_simple_column_value: { id: string } | null;
    }>(
      `
      mutation ($boardId: Int!, $itemId: Int!, $columnId: String!, $value: String!) {
        change_simple_column_value(
          board_id: $boardId,
          item_id: $itemId,
          column_id: $columnId,
          value: $value
        ) {
          id
        }
      }
      `,
      { boardId, itemId: Number(itemId), columnId, value: status },
    );
    return {
      ok: true as const,
      id: data.change_simple_column_value?.id ?? itemId,
    };
  }

  async setItemColumnValue(
    boardId: number,
    itemId: string,
    columnId: string,
    value: string,
  ) {
    const data = await this.request<{
      change_simple_column_value: { id: string } | null;
    }>(
      `
      mutation ($boardId: Int!, $itemId: Int!, $columnId: String!, $value: String!) {
        change_simple_column_value(
          board_id: $boardId,
          item_id: $itemId,
          column_id: $columnId,
          value: $value
        ) {
          id
        }
      }
      `,
      { boardId, itemId: Number(itemId), columnId, value },
    );
    return {
      ok: true as const,
      id: data.change_simple_column_value?.id ?? itemId,
    };
  }
}
