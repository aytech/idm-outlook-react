import * as React from "react"
import { TextField } from "office-ui-fabric-react/lib/components/TextField"
import { IAttribute } from "../../types/IAttribute"

interface Props {
  attribute: IAttribute,
  // defaultValue: string | undefined,
  // label: string,
  validateMaxLimit: (attribute: IAttribute) => boolean,
  validateRequired: (attribute: IAttribute) => boolean,
  // name: string,
  onChange: (value: string) => void,
  // required: boolean,
  setFormError: (name: string, message: string) => void,
  // size: string | undefined
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
  // const validateLength = (): boolean => {
  //   if (value !== undefined && size !== undefined) {
  //     const limit = Number(size)
  //     if (limit !== NaN && value.length > limit) {
  //       setErrorMessage(`Value cannot have more than ${ limit } characters`)
  //       setFormError(name, `Field "${ label }" cannot have more than ${ limit } characters`)
  //       return false
  //     }
  //   }
  //   setErrorMessage(null)
  //   setFormError(name, null)
  //   return true
  // }

  React.useEffect(() => {
    // validateRequired()
    // validateLength()
    // onChange(attribute.default)
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

        // if (!validateRequired(value)) {
        //   return
        // }
        // if (!validateLength(value)) {
        //   return
        // }
        // onChange(value)
      } } />
  )
}