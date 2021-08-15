import express from 'express';
import { json } from 'body-parser';

const ContactProtocolTypes = {
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

const app = express();

app.use(json());

app.get('/api/contacts', (req, res) => {
  /* 모든 연락처 조회 */
});

app.get('/api/contacts/:contact_id', (req, res) => {
  /* 특정 연락처 조회 */
});

app.post('/api/contacts', (req, res) => {
  /* 새 연락처 추가 */
});

app.patch('/api/contacts/:contact_id', (req, res) => {
  /* 연락처 수정 */
});

app.delete('api/contacts/:contact_id', (req, res) => {
  /* 연락처 삭제 */
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`${process.env.PORT || 3000} 포트 수신중!`);
});
