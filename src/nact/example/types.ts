export const ContactProtocolTypes = {
  GET_CONTACT_LIST: 'GET_CONTACT_LIST',
  GET_CONTACT: 'GET_CONTACT',
  UPDATE_CONTACT: 'UPDATE_CONTACT',
  REMOVE_CONTACT: 'REMOVE_CONTACT',
  CREATE_CONTACT: 'CREATE_CONTACT',

  // 성공
  SUCCESS: 'SUCCESS',

  // 연락처를 찾지 못했을 때
  NOT_FOUND: 'NOT_FOUND',
} as const;

export interface IContactMessage {
  type: string;
  userId?: string;
  contactId?: string;
  payload?: any;
}
