import go from '../utils/go';
import iterMap from '../utils/iterMap';
import iterReduce from '../utils/iterReduce';
import strictUriEncode from 'strict-uri-encode';

interface QueryStringOptions {
  encode: boolean;
  strict: boolean;
  arrayFormat: 'index' | 'bracket' | 'comma' | 'badinput' | 'bracket-separator';
  arrayFormatSeparator: unknown;
  skipNull: boolean;
  skipEmptyString: boolean;
  sort: any;
}

interface IQueryString {
  stringify(params?: unknown, options?: Partial<QueryStringOptions>): string;
}

const isObject = (arg: unknown) => {
  return typeof arg === 'object' && arg !== null && !Array.isArray(arg);
};

const queryString: IQueryString = {
  stringify(params, options) {
    const qsOptions: Partial<QueryStringOptions> = {
      encode: true,
      strict: true,
    };
    Object.assign(qsOptions, options);
    if (!isObject(params)) return '';

    const encodeMapper = ([k, v]: [k: string, v: string]) => {
      if (!qsOptions.encode) return [k, v];
      return qsOptions.strict
        ? [strictUriEncode(k), strictUriEncode(v)]
        : [encodeURIComponent(k), encodeURIComponent(v)];
    };

    const stringified = go(
      params,
      Object.entries,
      iterMap(encodeMapper),
      iterMap(([k, v]: [k: any, v: any]) => `${k}=${v}`),
      iterReduce((prev: any, curr: any) => `${prev}&${curr}`)
    );

    return stringified;
  },
};

export default queryString;
