import * as React from "react"
import { Toggle } from "office-ui-fabric-react/lib/components/Toggle"

interface Props {
  checked: string | undefined,
  defaultValue: string | undefined,
  label: string,
  onChange: (checked: boolean | string) => void
}

export const AttributeBoolean = ({
  checked,
  defaultValue,
  label,
  onChange
}: Props) => {

  React.useEffect(() => {
    onChange(defaultValue === "true")
  }, [])

  return (
    <Toggle
      label={ label }
      defaultChecked={ checked === "true" }
      onText="On"
      offText="Off"
      onChange={ (_event: React.MouseEvent<HTMLElement>, checked: boolean) => {
        onChange(checked)
      } } />
  )
}