import { IAttribute } from "./IAttribute";

export interface IEntity {
  attrs: IAttributes,
  name: string,
  desc: string
}

export interface IAttributes {
  attr: IAttribute[]
}