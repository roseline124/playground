import pipe from "../pipe";

test("pipe", () => {
  const fn = pipe(
    (a: number) => a + 1,
    (a: number) => a + 10,
    (a: number) => a + 100
  );
  expect(fn(0)).toBe(111);
});
