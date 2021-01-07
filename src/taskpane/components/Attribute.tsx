import * as React from "react"
import { TextField } from "office-ui-fabric-react/lib/components/TextField"
import { Toggle } from "office-ui-fabric-react/lib/components/Toggle"
import { IAttribute } from "../types/IAttribute"
import { AttributeValueSet } from "./AttributeValueSet"
import { AttributeDatePicker } from "./AttributeDatePicker"

interface Props {
  attribute: IAttribute
}

export const Attribute = ({ attribute }: Props) => {
  switch (attribute.type) {
    case "7":   // Date, exists in both ICR and CM
    case "8":   // Time, exists in both ICR and CM
    case "9":   // TimeDate, exists in both ICR and CM
      return <AttributeDatePicker label={ attribute.desc } />
    case "20":  // Boolean, exists only in ICR
      return (
        <Toggle
          label={ attribute.desc }
          defaultChecked={ attribute.default === "true" }
          onText="On"
          offText="Off"
          onChange={ (_event: React.MouseEvent<HTMLElement>, checked: boolean) => {
            console.log("Checked: ", checked)
          } } />
      )
    case "1": // String, exists in both ICR and CM
      if (attribute.valueset !== undefined) {
        return <AttributeValueSet value={ attribute.valueset.value } />
      }
    case "3":   // Short, exists in both ICR and CM
    case "4":   // Long, exists in both ICR and CM
    case "6":   // Decimal, exists in both ICR and CM
    case "10":  // Double, exists in both ICR and CM
    case "21":  // UUID, exists only in ICR
    default:
      return <TextField label={ attribute.desc } required={ attribute.required === "true" } />
  }
}