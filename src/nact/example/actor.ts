import { v4 as uuid } from 'uuid';
import {
  start,
  spawn,
  dispatch,
  ActorContext,
  ActorSystemRef,
  spawnStateless,
} from 'nact';
import { ContactProtocolTypes } from './types';

const delay = (duration: number) =>
  new Promise((resolve) => setTimeout(() => resolve(void 0), duration));

const resetWithExponentialDelay = (factor: number) => {
  let count = 0;
  return async (msg: any, error: any, ctx: any) => {
    let time = (2 ** count - 1) * factor;
    await delay(time);
    count = count + 1;
    return ctx.reset;
  };
};

const handler = (
  state: any = { contacts: {} },
  msg: any,
  ctx: ActorContext<any, ActorSystemRef>
) => {
  if (msg.type === ContactProtocolTypes.CREATE_CONTACT) {
    const newContact = { id: uuid(), ...msg.payload };
    const nextState = {
      contacts: { ...state.contacts, [newContact.id]: newContact },
    };

    dispatch(msg.sender, {
      type: ContactProtocolTypes.SUCCESS,
      payload: newContact,
    });

    return nextState;
  }

  if (msg.type === ContactProtocolTypes.GET_CONTACT_LIST) {
    // 모든 연락처를 배열로 반환
    dispatch(msg.sender, {
      payload: Object.values(state.contacts),
      type: ContactProtocolTypes.SUCCESS,
      sender: ctx.self,
    });
  } else {
    // 이미 존재하는 연락처가 있는지 확인
    const contact = state.contacts[msg.contactId];

    if (contact) {
      switch (msg.type) {
        case ContactProtocolTypes.GET_CONTACT: {
          dispatch(msg.sender, {
            payload: contact,
            type: ContactProtocolTypes.SUCCESS,
          });
          break;
        }
        case ContactProtocolTypes.REMOVE_CONTACT: {
          // 특정 연락처 항목을 undefined로 변경한 새 상태 반환
          const nextState = { ...state.contacts, [contact.id]: undefined };
          dispatch(msg.sender, {
            payload: contact,
            type: ContactProtocolTypes.SUCCESS,
          });

          return nextState;
        }
        case ContactProtocolTypes.UPDATE_CONTACT: {
          // 특정 연락처 항목을 덮어 쓴 새 상태 반환
          const updatedContact = { ...contact, ...msg.payload };
          const nextState = {
            ...state.contacts,
            [contact.id]: updatedContact,
          };
          dispatch(msg.sender, {
            type: ContactProtocolTypes.SUCCESS,
            payload: updatedContact,
          });

          return nextState;
        }
      }
    } else {
      // 기존 연락처가 존재하지 않으면 NOT_FOUND 메시지를 요청자에게 응답
      dispatch(msg.sender, {
        type: ContactProtocolTypes.NOT_FOUND,
        contactId: msg.contactId,
        sender: ctx.self,
      });
    }
  }

  // 현재 상태에서 변경된 것이 없으면 현재 상태를 그대로 반환
  return state;
};

export const spawnUserContactService = (parent: any, userId: string) =>
  spawn(
    parent,
    handler, // 기존과 같음
    userId
  );

export const spawnContactsService = (parent: string) =>
  spawnStateless(
    parent,
    (msg, ctx) => {
      const userId = msg.userId;
      let childActor;
      if (ctx.children.has(userId)) {
        childActor = ctx.children.get(userId);
      } else {
        childActor = spawnUserContactService(ctx.self, userId);
      }

      if (childActor != null) {
        dispatch(childActor, msg);
      }
    },
    'contacts',
    { onCrash: resetWithExponentialDelay(1000) }
  );
