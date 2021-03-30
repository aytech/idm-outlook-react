import * as React from "react"
import { TextField } from "office-ui-fabric-react/lib/components/TextField"
import { IAttribute } from "../../types/IAttribute"

interface Props {
  attribute: IAttribute,
  validateMaxLimit: (attribute: IAttribute) => boolean,
  validateRequired: (attribute: IAttribute) => boolean,
  onChange: (value: string) => void,
  setFormError: (name: string, message: string) => void,
}

export const AttributeString = ({
  attribute,
  setFormError,
  validateMaxLimit,
  validateRequired
}: Props) => {

  const [ errorMessage, setErrorMessage ] = React.useState<string>()
  const resetFormError = () => {
    setErrorMessage(null)
    setFormError(attribute.name, null)
  }
  const validate = (): void => {
    if (validateRequired(attribute)) {
      resetFormError()
    } else {
      setErrorMessage("Value is required")
      setFormError(attribute.name, `Field "${ attribute.desc }" is required`)
      return
    }
    if (validateMaxLimit(attribute)) {
      resetFormError()
    } else {
      setErrorMessage(`Value cannot have more than ${ attribute.size } characters`)
      setFormError(attribute.name, `Field "${ attribute.desc }" cannot have more than ${ attribute.size } characters`)
      return
    }
    resetFormError()
  }

  React.useEffect(() => {
    validate()
  }, [])

  return (
    <TextField
      defaultValue={ attribute.default === undefined ? "" : attribute.default }
      errorMessage={ errorMessage }
      label={ attribute.desc }
      required={ attribute.required === "true" ? true : false }
      onChange={ (_event: React.FormEvent<HTMLElement>, value: string): void => {
        attribute.value = value
        validate()
      } } />
  )
}