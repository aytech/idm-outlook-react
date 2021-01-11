import * as React from "react"
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/components/Dropdown"
import { IValueSetValue } from "../types/IAttribute"

interface Props {
  onChange: (value: boolean | string) => void,
  value: IValueSetValue[]
}

export const AttributeValueSet = ({ onChange, value }: Props) => {
  return (
    <Dropdown
      label="Valueset"
      selectedKey={ undefined }
      onChange={ (_event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
        onChange(item.text)
      } }
      placeholder="Select value"
      options={ value.map((set: IValueSetValue) => {
        return {
          key: set.name,
          text: set.desc
        }
      }) }
      styles={ { dropdown: { width: "100%" } } } />
  )
}