import { PROPERTY_DEPS_METADATA, PARAMS_DEPS_METADATA } from '../constants';
import { Inject } from '../decorator';

describe('Inject Decorator', () => {
  it('injects property of class', () => {
    const deps = Reflect.getMetadata(PARAMS_DEPS_METADATA, TestClass);
    expect(deps).toEqual([{ index: 0 }]);
  });
  it('injects parameteres of class method', () => {
    const props = Reflect.getMetadata(PROPERTY_DEPS_METADATA, TestClass);
    expect(props).toEqual([{ key: 'prop' }]);
  });
});

class DepClass {}

class TestClass {
  constructor(@Inject() dep: DepClass) {}

  @Inject()
  prop = 1;
}
