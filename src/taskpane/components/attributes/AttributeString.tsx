import * as React from "react"
import { TextField } from "office-ui-fabric-react/lib/components/TextField"

interface Props {
  defaultValue: string | undefined,
  label: string,
  isValidRequired: (value: string | undefined) => boolean,
  name: string,
  onChange: (value: string) => void,
  required: boolean,
  setFormError: (name: string, message: string) => void,
  size: string | undefined
}

export const AttributeString = ({
  setFormError,
  defaultValue,
  label,
  isValidRequired,
  name,
  onChange,
  required,
  size
}: Props) => {

  const [ errorMessage, setErrorMessage ] = React.useState<string>()
  const validateRequired = (value: string | undefined): boolean => {
    if (isValidRequired(value)) {
      setErrorMessage(null)
      setFormError(name, null)
      return true
    } else {
      setErrorMessage("Value is required")
      setFormError(name, `Field "${ label }" is required`)
      return false
    }
  }
  const validateLength = (value: string | undefined): boolean => {
    if (value !== undefined && size !== undefined) {
      const limit = Number(size)
      if (limit !== NaN && value.length > limit) {
        setErrorMessage(`Value cannot have more than ${ limit } characters`)
        setFormError(name, `Field "${ label }" cannot have more than ${ limit } characters`)
        return false
      }
    }
    setErrorMessage(null)
    setFormError(name, null)
    return true
  }

  React.useEffect(() => {
    validateRequired(defaultValue)
    validateLength(defaultValue)
    onChange(defaultValue)
  }, [])

  return (
    <TextField
      defaultValue={ defaultValue === undefined ? "" : defaultValue }
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
      } } />
  )
}