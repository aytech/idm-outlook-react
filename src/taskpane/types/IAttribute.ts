export interface IValueSet {
  value: IValueSetValue[]
}

export interface IValueSetValue {
  desc: string,
  name: string
}

export interface IAttribute {
  default?: string,
  desc: string,
  name: string,
  required: string,
  type: string,
  valueset?: IValueSet
}