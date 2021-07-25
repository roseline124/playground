import go from '../go';

it('go', () => {
  expect(
    go(
      0,
      (a: number) => a + 1,
      (a: number) => a + 10,
      (a: number) => a + 100
    )
  ).toBe(111);
});
