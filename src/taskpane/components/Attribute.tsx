import * as React from "react"
import { IAttribute } from "../types/IAttribute"
import { AttributeValueSet } from "./AttributeValueSet"
import { AttributeString } from "./attributes/AttributeString"
import { AttributeBoolean } from "./attributes/AttributeBoolean"

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
    if (attribute.required === "true") {
      return value.trim().length > 0
    }
    return true
  }

  switch (attribute.type) {
    case ATTRIBUTE_TYPES.DATE:
    case ATTRIBUTE_TYPES.TIMESTAMP:
      // Pending validation functionality
      return null
    // return (
    //   <AttributeDatePicker
    //     label={ attribute.desc }
    //     onChange={ updateAttributeValue }
    //   />
    // )
    case ATTRIBUTE_TYPES.BOOLEAN:
      return (
        <AttributeBoolean
          checked={ attribute.default }
          label={ attribute.desc }
          onChange={ updateAttributeValue } />
      )
    case ATTRIBUTE_TYPES.STRING:
      if (attribute.valueset !== undefined) {
        return (
          <AttributeValueSet
            onChange={ updateAttributeValue }
            value={ attribute.valueset.value } />
        )
      }
      return (
        <AttributeString
          defaultValue={ attribute.default }
          label={ attribute.desc }
          isValidRequired={ isValidRequired }
          onChange={ updateAttributeValue }
          required={ attribute.required === "true" }
          size={ attribute.size } />
      )
    case ATTRIBUTE_TYPES.SHORT:
    case ATTRIBUTE_TYPES.LONG:
    case ATTRIBUTE_TYPES.DECIMAL:
    case ATTRIBUTE_TYPES.TIME:
    case ATTRIBUTE_TYPES.DOUBLE:
    case ATTRIBUTE_TYPES.UUID:
    default:
      return null
  }
}