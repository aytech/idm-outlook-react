import * as React from "react"
import { Toggle } from "office-ui-fabric-react/lib/components/Toggle"

interface Props {
  checked: string | undefined,
  label: string,
  onChange: (checked: boolean | string) => void
}

export const AttributeBoolean = ({
  checked,
  label,
  onChange
}: Props) => {
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