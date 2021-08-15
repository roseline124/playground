import { Response } from 'express';
import { query } from 'nact';
import { contactService } from './actor';
import { ContactProtocolTypes } from './types';

const TIMEOUT = 250;

interface IContactMessage {
  type: string;
  contactId?: string;
  payload?: any;
}

export const performQuery = async (msg: IContactMessage, res: Response) => {
  try {
    const result = await query(
      contactService,
      (sender) => Object.assign(msg, { sender }),
      TIMEOUT
    );

    switch (result.type) {
      case ContactProtocolTypes.SUCCESS:
        res.json(result.payload);
        break;
      case ContactProtocolTypes.NOT_FOUND:
        res.sendStatus(404);
        break;
      default:
        // 여기에 도달하지는 않을 것임. 무언가 크게 잘못된 경우
        console.error(JSON.stringify(result));
        res.sendStatus(500);
        break;
    }
  } catch (e) {
    // 504: 게이트웨이 시간 초과. 타임아웃이 발생할 때만 예외 던짐
    res.sendStatus(504);
  }
};
