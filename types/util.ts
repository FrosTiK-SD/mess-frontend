export type RedefineKeyTypes<Type extends object,KeysTypeMapping extends Partial<Record<keyof Type,any>>> ={
    [key in keyof Type]: key extends keyof KeysTypeMapping? KeysTypeMapping[key] : Type[key];
}

export type PopulatedWith<BaseType,PopulatedType,PopulatedKeys extends (keyof BaseType) & (keyof PopulatedType)>={
    [key in keyof BaseType]:key extends PopulatedKeys? PopulatedType[key] : BaseType[key];
}

export type Filter<Type extends object> = {
  [key in keyof Type]: Array<Type[key]>
} 

export type DeepReadonly<T> = T extends (infer R)[]
  ? DeepReadonlyArray<R>
  : T extends Function
    ? T
    : T extends object
      ? DeepReadonlyObject<T>
      : T;

export type DeepReadonlyArray<T> = ReadonlyArray<DeepReadonly<T>>;

export type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export type DeepWriteable<T> =
  T extends DeepReadonlyArray<infer R>
    ? WriteableArray<R>
    : T extends Function
      ? T
      : T extends object
        ? DeepWriteableObject<T>
        : T;
export type DeepWriteableObject<T> = {
  -readonly [P in keyof T]: DeepWriteable<T[P]>;
};

export interface WriteableArray<T> extends Array<Writeable<T>> {}

export interface IdObject {
  _id: string;
}
