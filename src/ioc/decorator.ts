import 'reflect-metadata';
import { PROPERTY_DEPS_METADATA, PARAMS_DEPS_METADATA } from './constants';

/**
 * @index index가 있으면 parameter decorator, 없으면 property decorator
 */
export function Inject() {
  return (target: object, key: string | symbol, index?: number) => {
    if (typeof index !== 'undefined') {
      injectParamsMetadata(target, index);
      return;
    }

    injectPropsMetadata(target, key);
  };
}

function injectParamsMetadata(target: object, index: number) {
  let dependencies = Reflect.getMetadata(PARAMS_DEPS_METADATA, target) || [];
  dependencies = [...dependencies, { index }];
  // index 정보를 추가한 dependencies를 SELF_DECLARED_DEPS_METADATA키를 가진 메타데이터에 추가한다.
  Reflect.defineMetadata(PARAMS_DEPS_METADATA, dependencies, target);
}

function injectPropsMetadata(target: object, key: string | symbol) {
  let propertis =
    Reflect.getMetadata(PROPERTY_DEPS_METADATA, target.constructor) || [];
  propertis = [...propertis, { key }];
  Reflect.defineMetadata(PROPERTY_DEPS_METADATA, propertis, target.constructor);
}
