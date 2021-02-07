import * as React from "react"
import { IAttribute } from "../types/IAttribute"
import { AttributeValueSet } from "./AttributeValueSet"
import { AttributeString } from "./attributes/AttributeString"
import { AttributeBoolean } from "./attributes/AttributeBoolean"

interface Props {
  attribute: IAttribute,
  setFormError: (name: string, message: string | null) => void
}

interface AttributeType {
  [ key: string ]: string
}

export const Attribute = ({
  attribute,
  setFormError
}: Props) => {

  const AttributeTypes: AttributeType = {
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
  } as const;

  React.useEffect(() => {
    for (const attributeName in AttributeTypes) {
      if (AttributeTypes[ attributeName ] === attribute.type) {
        attribute.type = attributeName
        break
      }
    }
  }, [ attribute ])

  const updateAttributeValue = (value: boolean | string): void => {
    attribute.value = value
  }

  const isValidRequired = (value: string | undefined): boolean => {
    if (attribute.required === "true") {
      return value.trim().length > 0
    }
    return true
  }

  /***
   * Attribute might have 2 types of type definitions:
   *  - number (when retrieved from API)
   *  - string (explicitly set, as POST expects this)
   */
  switch (attribute.type) {
    case "DATE":
    case "TIMESTAMP":
    case AttributeTypes.DATE:
    case AttributeTypes.TIMESTAMP:
      // Pending validation functionality
      return null
    // return (
    //   <AttributeDatePicker
    //     label={ attribute.desc }
    //     onChange={ updateAttributeValue }
    //   />
    // )
    case "BOOLEAN":
    case AttributeTypes.BOOLEAN:
      return (
        <AttributeBoolean
          checked={ attribute.default }
          defaultValue={ attribute.default }
          label={ attribute.desc }
          onChange={ updateAttributeValue } />
      )
    case "STRING":
    case AttributeTypes.STRING:
      if (attribute.valueset !== undefined) {
        return (
          <AttributeValueSet
            onChange={ updateAttributeValue }
            value={ attribute.valueset.value } />
        )
      }
      return (
        <AttributeString
          setFormError={ setFormError }
          defaultValue={ attribute.default }
          label={ attribute.desc }
          isValidRequired={ isValidRequired }
          name={ attribute.name }
          onChange={ updateAttributeValue }
          required={ attribute.required === "true" }
          size={ attribute.size } />
      )
    case "SHORT":
    case AttributeTypes.SHORT:
    case "LONG":
    case AttributeTypes.LONG:
    case "DECIMAL":
    case AttributeTypes.DECIMAL:
    case "TIME":
    case AttributeTypes.TIME:
    case "DOUBLE":
    case AttributeTypes.DOUBLE:
    case "UUID":
    case AttributeTypes.UUID:
    default:
      return null
  }
}