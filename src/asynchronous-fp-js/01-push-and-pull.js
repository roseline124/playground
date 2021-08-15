/**
 * two ways to look an evaluation: push, pull
 */

var s = (fn) => (v) => fn(v);
s(console.log)(5);

// value를 먼저 넣고 나중에 action을 추가
// console.log => console.log(5)
s((resolve) => resolve(5))(console.log);

/**
 * Adding a mapping function
 */
var s = (a) => (f) => (b) => a(f(b));
// s(console.log)(x => x + 2)(5)
var c = s(console.log); // (f) => (b) => console.log(f(b))
var b = c((x) => x + 2); // (b) => console.log(b => b +2)
b(5);

s(console.log)(s((x) => x + 2)((x) => x + 2))(5);

/**
 * Pull: s(console.log)(5) => Reader, IO, State functor
 * - 이미 value를 갖고 있고 필요할 때마다 함수를 활용할 수 있다.
 *
 * Push: s(resolve => resolve(5))(console.log) => continuation monad, promises, and the observables.
 * - action이 먼저 오고 callback으로 남겨둔 뒤 value를 나중에 집어넣는다(push)
 */
