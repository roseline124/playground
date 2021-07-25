import go from '../utils/go';
import iterMap from '../utils/iterMap';
import iterReduce from '../utils/iterReduce';
import strictUriEncode from 'strict-uri-encode';
import iterFilter from '../utils/iterFilter';

interface QueryStringOptions {
  encode: boolean;
  strict: boolean;
  arrayFormat: 'index' | 'bracket' | 'comma' | 'badinput' | 'bracket-separator';
  arrayFormatSeparator: unknown;
  skipNull: boolean;
  skipEmptyString: boolean;
  sort: any;
}

const isObject = (arg: unknown) => {
  return typeof arg === 'object' && arg !== null && !Array.isArray(arg);
};

function* iterFlatten(iter: IterableIterator<any>) {
  for (const [k, v] of iter) {
    if (Array.isArray(v)) {
      for (const item of v) {
        yield [k, item];
      }
    } else {
      yield [k, v];
    }
  }
}

function stringify(
  params?: unknown,
  options?: Partial<QueryStringOptions>
): string {
  const qsOptions: Partial<QueryStringOptions> = {
    encode: true,
    strict: true,
  };
  Object.assign(qsOptions, options);
  if (!isObject(params)) return '';

  const encodeMapper = ([k, v]: [k: string, v: string]) => {
    if (v === null) {
      if (!qsOptions.encode) return k;
      return qsOptions.strict ? strictUriEncode(k) : encodeURIComponent(k);
    }

    if (!qsOptions.encode) return `${k}=${v}`;
    return qsOptions.strict
      ? `${strictUriEncode(k)}=${strictUriEncode(v)}`
      : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`;
  };

  const stringified = go(
    params,
    Object.entries,
    iterFlatten,
    iterFilter(([k, v]: [k: string, v: string]) => v !== undefined),
    iterMap(encodeMapper),
    iterReduce((prev: any, curr: any) => `${prev}&${curr}`)
  );

  return stringified;
}

export default stringify;
