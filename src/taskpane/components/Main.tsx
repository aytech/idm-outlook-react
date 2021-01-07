import * as React from "react"
import { RouteComponentProps } from "react-router-dom";
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Navigation } from "./Navigation";
import { IIonApiFile } from "../types/IIonApiFile";
import { ProgressIndicator } from "office-ui-fabric-react/lib/ProgressIndicator";
import { Dropdown, IDropdownOption, IDropdownStyles } from "office-ui-fabric-react/lib/Dropdown";
import { IDocumentEntity } from "../types/IDocumentEntity";
import { IEntity } from "../types/IEntity";

interface IIonToken {
  token: string,
  type: string,
  expires: number,
  scope: string
}

export const Main = ({ history }: RouteComponentProps) => {
  const [ selectedAttachment, setSelectedAttachment ] = React.useState(null)
  const [ loading, setLoading ] = React.useState(true)
  const [ loadingDescription ] = React.useState("Fetching document entities...")
  const [ entities, setEntities ] = React.useState<IDocumentEntity[]>([])
  const [ selectedEntity, setSelectedEntity ] = React.useState<IDropdownOption>();

  const getEntities = async (token: IIonToken) => {
    const ionFile: IIonApiFile = Office.context.roamingSettings.get("ionFile");
    const request = {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${ token.token }`
      }
    };
    const url = `${ ionFile.iu }/${ ionFile.ti }/IDM/api/datamodel/entities`
    const response = await fetch(url, request)
    if (response.status === 401) { // Token has expired
      Office.context.roamingSettings.set("error", "Profile has expired, please re-authenticate")
      Office.context.roamingSettings.saveAsync()
      history.push("/profile")
      return
    }
    const json = await response.json()
    setLoading(false)
    setEntities(json.entities.entity.map((entity: IEntity) => {
      return { key: entity.name, text: entity.desc }
    }))
  }

  React.useEffect(() => {
    const token: string = Office.context.roamingSettings.get("token");
    if (token !== undefined) {
      getEntities(JSON.parse(token))
    }
  }, [])

  // const postAttachmentToIdm = async (token: any, ewsToken: string) => {
  //   const postRequest = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `Bearer ${ token.token }`
  //     },
  //     body: JSON.stringify({
  //       "exchangeUrl": Office.context.mailbox.ewsUrl,
  //       "exchangeToken": ewsToken,
  //       "attachmentId": Office.context.mailbox.item.attachments[ 0 ].id,
  //       "emailId": Office.context.mailbox.item.itemId,
  //       "entity": "Oleg_Test",
  //       "accessControlList": "Public",
  //       "attributes": []
  //     })
  //   }
  //   const url = `${ ionFile.iu }/${ ionFile.ti }/IDM/api/v1/outlook/upload`
  //   // const request = await fetch(url, postRequest)
  //   // const json = await request.json()
  //   console.log("Response: ", postRequest, url);
  // }

  // if (token !== undefined && ionFile !== undefined) {
  //   token = JSON.parse(token)
  //   //ionFile = JSON.parse(ionFile)
  //   //getEntities(token)
  //   //postAttachmentToIdm(token)
  //   Office.context.mailbox.getCallbackTokenAsync((response: Office.AsyncResult<string>) => {
  //     if (response.status === Office.AsyncResultStatus.Succeeded) {
  //       postAttachmentToIdm(token, response.value)
  //     }
  //   })
  // }

  const attachments: IChoiceGroupOption[] = Office.context.mailbox.item.attachments.map((attachment): IChoiceGroupOption => {
    return {
      key: attachment.id,
      text: attachment.name,
      disabled: attachment.isInline
    }
  })
  const onSelectedAttachmentChange = React.useCallback((_event: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) => {
    setSelectedAttachment(option.key)
  }, [])

  const renderLoadingIndicator = () => {
    return loading ? (
      <ProgressIndicator label="Loading..." description={ loadingDescription } />
    ) : null
  }

  const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };
  const selectEntity = (_event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    setSelectedEntity(item)
  }
  const renderDocumentEntities = () => {
    return entities.length > 0 ? (
      <Dropdown
        label="Document entities"
        selectedKey={ selectedEntity ? selectedEntity.key : undefined }
        onChange={ selectEntity }
        placeHolder="Select entity"
        options={ entities }
        styles={ dropdownStyles } />
    ) : null
  }

  return (
    <React.Fragment>
      <Navigation
        history={ history }
        showSettingsPath={ true } />
      <main className="ms-welcome__main">
        <ChoiceGroup
          selectedKey={ selectedAttachment }
          options={ attachments }
          onChange={ onSelectedAttachmentChange }
          label="Select attachment" />
        <hr />
        { renderLoadingIndicator() }
        { renderDocumentEntities() }
      </main>
    </React.Fragment>
  )
}