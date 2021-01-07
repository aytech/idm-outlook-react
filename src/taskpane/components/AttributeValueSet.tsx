import * as React from "react"
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/components/Dropdown"
import { IValueSetValue } from "../types/IAttribute"

interface Props {
  value: IValueSetValue[]
}

export const AttributeValueSet = ({ value }: Props) => {
  return (
    <Dropdown
      label="Valueset"
      selectedKey={ undefined }
      onChange={ (_event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
        console.log("Changing: ", item)
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