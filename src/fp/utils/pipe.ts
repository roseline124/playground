import go from './go';
import type {AnyFunction} from './types';

const pipe
  = (...fns: AnyFunction[]) =>
  	(initialValue: any) =>
  		go(initialValue, ...fns);

export default pipe;
