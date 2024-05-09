export type RedefineKeyTypes<Type extends object,KeysTypeMapping extends Partial<Record<keyof Type,any>>> ={
    [key in keyof Type]: key extends keyof KeysTypeMapping? KeysTypeMapping[key] : Type[key];
}

export type PopulatedWith<BaseType,PopulatedType,PopulatedKeys extends (keyof BaseType) & (keyof PopulatedType)>={
    [key in keyof BaseType]:key extends PopulatedKeys? PopulatedType[key] : BaseType[key];
}