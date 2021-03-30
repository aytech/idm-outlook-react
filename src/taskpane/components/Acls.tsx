import * as React from "react"
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/components/Dropdown"
import { IAcl } from "../types/IEntity"
import { DefaultEffects } from "office-ui-fabric-react/lib/Styling"
import { IStackProps, Stack } from "office-ui-fabric-react/lib/components/Stack"

interface Props {
  acls: IAcl[],
  setSelectedAcl: (acl: string) => void
}

export const Acls = ({ acls, setSelectedAcl }: Props) => {
  const options = acls.map((acl: IAcl) => {
    return { key: acl.id, text: acl.name }
  })
  const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 300 } },
  };
  const [ selectedItem, setSelectedItem ] = React.useState<IDropdownOption>();

  return acls.length > 0 ? (
    <div className="ms-Card__main" style={ { boxShadow: DefaultEffects.elevation4 } }>
      <Stack horizontal tokens={ { childrenGap: 50 } } styles={ { root: { width: "100%" } } }>
        <Stack { ...columnProps }>
          <Dropdown
            label="Access Control Lists"
            onChange={ (_event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
              setSelectedAcl(item.text)
              setSelectedItem(item)
            } }
            options={ options }
            placeholder="Select an option"
            selectedKey={ selectedItem ? selectedItem.key : undefined }
            styles={ { dropdown: { width: "100%" } } } />
        </Stack>
      </Stack>
    </div>
  ) : null
}