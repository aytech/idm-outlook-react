import * as React from "react"
import { IStackProps, Stack } from "office-ui-fabric-react/lib/components/Stack";
import { DefaultEffects } from "office-ui-fabric-react/lib/Styling";
import { IAttribute } from "../types/IAttribute"
import { Attribute } from "./Attribute";
import { IFormErrors } from "../types/IFormErrors";

interface Props {
  attributes: IAttribute[],
  formErrors: IFormErrors,
  setFormErrors: (errors: IFormErrors) => void
}

export const Attributes = ({
  attributes,
  formErrors,
  setFormErrors
}: Props) => {

  const setFormError = (name: string, message: string | null): void => {
    const errors = formErrors
    errors[ name ] = message
    setFormErrors(errors)
  }

  const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 300 } },
  };

  return attributes.length > 0 ? (
    <div className="ms-Card__main" style={ { boxShadow: DefaultEffects.elevation4 } }>
      <Stack horizontal tokens={ { childrenGap: 50 } } styles={ { root: { width: "100%" } } }>
        <Stack { ...columnProps }>
          {
            attributes.map((attribute: IAttribute) => {
              return (
                <Attribute
                  attribute={ attribute }
                  key={ attribute.name }
                  setFormError={ setFormError }
                />
              )
            })
          }
        </Stack>
      </Stack>
    </div>
  ) : null
}