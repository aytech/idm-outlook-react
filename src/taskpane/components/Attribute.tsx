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

  const ATTRIBUTE_TYPES = {
    BOOLEAN: "20", // ICR
    DATE: "7", // ICR & CM
    DECIMAL: "6", // ICR & CM
    DOUBLE: "10", // ICR & CM
    LONG: "4", // ICR & CM
    SHORT: "3", // ICR & CM
    STRING: "1", // ICR & CM
    TIME: "8", // ICR & CM
    TIMESTAMP: "9", // ICR & CM
    UUID: "21" // ICR
  }

  const updateAttributeValue = (value: boolean | string): void => {
    attribute.value = value
  }

  const isValidRequired = (value: string | undefined): boolean => {
    if (attribute.required === "true" && value.trim().length < 1) {
      setErrorMessage("Value is required")
      return false
    }
    return true
  }

  const isValidString = (value: string | undefined): boolean => {
    if (!isValidRequired(value)) {
      return false
    }
    return true
  }

  const [ errorMessage, setErrorMessage ] = React.useState<string>()

  switch (attribute.type) {
    case ATTRIBUTE_TYPES.DATE:
    case ATTRIBUTE_TYPES.TIMESTAMP:
      return (
        <AttributeDatePicker
          label={ attribute.desc }
          onChange={ updateAttributeValue }
        />
      )
    case ATTRIBUTE_TYPES.BOOLEAN:
      return (
        <Toggle
          label={ attribute.desc }
          defaultChecked={ attribute.default === "true" }
          onText="On"
          offText="Off"
          onChange={ (_event: React.MouseEvent<HTMLElement>, checked: boolean) => {
            updateAttributeValue(checked)
          } } />
      )
    case ATTRIBUTE_TYPES.STRING:
      if (attribute.valueset !== undefined) {
        return (
          <AttributeValueSet
            onChange={ updateAttributeValue }
            value={ attribute.valueset.value } />
        )
      }
    case ATTRIBUTE_TYPES.SHORT:
    case ATTRIBUTE_TYPES.LONG:
    case ATTRIBUTE_TYPES.DECIMAL:
    case ATTRIBUTE_TYPES.TIME:
    case ATTRIBUTE_TYPES.DOUBLE:
    case ATTRIBUTE_TYPES.UUID:
    default:
      return <TextField
        label={ attribute.desc }
        required={ attribute.required === "true" }
        onChange={ (_event: React.FormEvent<HTMLElement>, value: string) => {
          updateAttributeValue(value)
        } } />
  }
}