import { start, spawn, dispatch } from 'nact';

const main = () => {
  const system = start();

  const statefulGreeter = spawn(
    system,
    (state = {}, msg, ctx) => {
      const alreadyGreeted = state[msg.name] !== undefined;
      if (alreadyGreeted) {
        console.log(`Hello again ${msg.name}.`);
        return state;
      }

      console.log(
        `Good to meet you, ${msg.name}.\nI am the ${ctx.name} service!`
      );

      return { ...state, [msg.name]: true };
    },
    'stateful-greeter'
  );

  dispatch(statefulGreeter, { name: 'roseline' });
  dispatch(statefulGreeter, { name: 'roseline' }); // Hello again
  dispatch(statefulGreeter, { name: 'stranger' }); // Good to meet you
};

main();
