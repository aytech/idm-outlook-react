import * as React from "react"
import { TextField } from "office-ui-fabric-react/lib/components/TextField"

interface Props {
  defaultValue: string | undefined,
  label: string,
  isValidRequired: (value: string | undefined) => boolean,
  onChange: (value: string) => void
  required: boolean,
  size: string | undefined
}

export const AttributeString = ({
  defaultValue,
  label,
  isValidRequired,
  onChange,
  required,
  size
}: Props) => {
  const [ errorMessage, setErrorMessage ] = React.useState<string>()
  const validateRequired = (value: string | undefined): boolean => {
    if (isValidRequired(value)) {
      setErrorMessage(null)
    } else {
      setErrorMessage("Value is required")
      return false
    }
    return true
  }
  const validateLength = (value: string | undefined): boolean => {
    if (value !== undefined && size !== undefined) {
      const limit = Number(size)
      if (limit !== NaN && value.length > limit) {
        setErrorMessage(`Value cannot have more then ${ limit } characters`)
        return false
      }
    }
    setErrorMessage(null)
    return true
  }

  return (
    <TextField
      errorMessage={ errorMessage }
      label={ label }
      required={ required }
      onChange={ (_event: React.FormEvent<HTMLElement>, value: string): void => {
        if (!validateRequired(value)) {
          return
        }
        if (!validateLength(value)) {
          return
        }
        onChange(value)
      } }
      value={ defaultValue === undefined ? "" : defaultValue } />
  )
}