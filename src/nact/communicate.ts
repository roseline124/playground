import { start, spawn, dispatch, spawnStateless, Ref } from 'nact';

interface Message {
  value: any;
  sender: Ref<any>;
}

/**
 * dispatch에서 3번째 인자는 메시지 송신자를 가리킨다.
 * msg.sender를 통해 송신자 액터를 참조할 수 있다.
 */
const main = () => {
  const delay = (time: number) =>
    new Promise((res: any) => setTimeout(res, time));

  const system = start();
  const ping = spawnStateless(
    system,
    async (msg: Message, ctx) => {
      console.log(msg.value);

      // // ping: 0.5초 간의 딜레이
      await delay(500);
      dispatch(msg.sender, { value: ctx.name, sender: ctx.self });
    },
    'ping'
  );

  const pong = spawnStateless(
    system,
    (msg: Message, ctx) => {
      console.log(msg.value);
      dispatch(msg.sender, { value: ctx.name, sender: ctx.self });
    },
    'pong'
  );

  dispatch(ping, { sender: pong, value: 'begin' });
};
main();
