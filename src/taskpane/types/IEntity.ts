import { IAttribute } from "./IAttribute"

export interface IEntity {
  acls: IAcls,
  attrs: IAttributes,
  name: string,
  desc: string
}

export interface IAcls {
  acl: IAcl[]
}

export interface IAcl {
  id: string,
  name: string,
  desc: string
}

export interface IAttributes {
  attr: IAttribute[]
}