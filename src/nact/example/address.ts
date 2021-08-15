import { json } from 'body-parser';
import express from 'express';
import { performQuery } from './utils';
import { ContactProtocolTypes } from './types';

const TIMEOUT = 250;

const app = express();

app.use(json());

app.get('/api/contacts', (req, res) =>
  performQuery({ type: ContactProtocolTypes.GET_CONTACT_LIST }, res)
);

app.get('/api/contacts/:contact_id', (req, res) =>
  performQuery(
    {
      type: ContactProtocolTypes.GET_CONTACT,
      contactId: req.params.contact_id,
    },
    res
  )
);

app.post('/api/contacts', (req, res) =>
  performQuery(
    { type: ContactProtocolTypes.CREATE_CONTACT, payload: req.body },
    res
  )
);

app.patch('/api/contacts/:contact_id', (req, res) =>
  performQuery(
    {
      type: ContactProtocolTypes.UPDATE_CONTACT,
      contactId: req.params.contact_id,
      payload: req.body,
    },
    res
  )
);

app.delete('/api/contacts/:contact_id', (req, res) =>
  performQuery(
    {
      type: ContactProtocolTypes.REMOVE_CONTACT,
      contactId: req.params.contact_id,
    },
    res
  )
);

app.listen(process.env.PORT || 3000, () => {
  console.log(`${process.env.PORT || 3000} 포트 수신중!`);
});
