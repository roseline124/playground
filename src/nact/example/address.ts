import { json } from 'body-parser';
import express from 'express';
import { performQuery } from './utils';
import { ContactProtocolTypes } from './types';

const app = express();

app.use(json());

/**
 * actor의 계층 구조
 *
 * 프로그램의 모든 코드를 단 하나의 파일로 구성하는 것이 안티패턴이 듯이
 * 프로그램을 액터 시스템(최상위 액터)의 자녀 액터만 만들어서 사용하는 것은 안티패턴
 *
 * 액터 계층 구조를 이용해 관심사 분리, 캡슐화, 시스템 장애와 액터의 종료 처리하는 목적을 달성한다.
 *
 * 자식 액터를 사용함으로써 부모 액터는 자식 액터에서 무슨 일을 하는지 신경 쓸 필요가 없어진다.
 */

app.get('/api/:user_id/contacts', (req, res) =>
  performQuery(
    { type: ContactProtocolTypes.GET_CONTACT_LIST, userId: req.params.user_id },
    res
  )
);

app.get('/api/:user_id/contacts/:contact_id', (req, res) =>
  performQuery(
    {
      type: ContactProtocolTypes.GET_CONTACT,
      userId: req.params.user_id,
      contactId: req.params.contact_id,
    },
    res
  )
);

app.post('/api/:user_id/contacts', (req, res) =>
  performQuery(
    { type: ContactProtocolTypes.CREATE_CONTACT, payload: req.body },
    res
  )
);

app.patch('/api/:user_id/contacts/:contact_id', (req, res) =>
  performQuery(
    {
      type: ContactProtocolTypes.UPDATE_CONTACT,
      userId: req.params.user_id,
      contactId: req.params.contact_id,
      payload: req.body,
    },
    res
  )
);

app.delete('/api/:user_id/contacts/:contact_id', (req, res) =>
  performQuery(
    {
      type: ContactProtocolTypes.REMOVE_CONTACT,
      userId: req.params.user_id,
      contactId: req.params.contact_id,
    },
    res
  )
);
app.listen(process.env.PORT || 3000, () => {
  console.log(`${process.env.PORT || 3000} 포트 수신중!`);
});
