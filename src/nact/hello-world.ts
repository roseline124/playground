import { start, dispatch, stop, spawnStateless } from 'nact';

const main = () => {
  // actor system 자체. 최상위 액터이다.
  const system = start();

  // stateless actor는 동시에 여러 개의 요청을 처리할 수 있다.
  const greeter = spawnStateless(
    system,
    (msg, ctx) => {
      console.log(`Hello, ${msg.name}`);
    },
    'greeter' // actor 이름은 unique해야한다.
  );

  // send message to actor
  // 통신할 때는 dispatch 사용
  dispatch(greeter, { name: 'Roseline' });
  stop(greeter);
  stop(system);
};

main();
