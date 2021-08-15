import { v4 as uuid } from 'uuid';
import { start, spawn, dispatch } from 'nact';
import { ContactProtocolTypes } from './types';

const system = start();

export const contactService = spawn(
  system,
  (state = { contacts: {} }, msg, ctx) => {
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
  },
  'contacts'
);
