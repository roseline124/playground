// https://github.com/ike18t/ts-mockery/blob/ccb5daf99423ae304d516b51837a2335ef5e0fae/lib/mockery.ts#L14
type RecursivePartial<T> = Partial<
  {
    [key in keyof T]: T[key] extends (...a: Array<infer U>) => any
      ? (
          ...a: Array<U>
        ) => RecursivePartial<ReturnType<T[key]>> | ReturnType<T[key]> // tslint:disable-line
      : T[key] extends Array<any>
      ? Array<RecursivePartial<T[key][number]>>
      : RecursivePartial<T[key]> | T[key];
  }
>;

interface DataPayload {
  id: string;
  title: string;
  content: string;
}

type NestedType = {
  a: string;
  b: string;
  fetch: (...args: string[]) => DataPayload;
  arry: Array<DataPayload>;
};

const a: RecursivePartial<NestedType> = {};
