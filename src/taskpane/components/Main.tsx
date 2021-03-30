import * as React from "react"
import { RouteComponentProps } from "react-router-dom";
import { ChoiceGroup, IChoiceGroupOption } from "office-ui-fabric-react/lib/ChoiceGroup"
import { Navigation } from "./Navigation"
import { IIonApiFile } from "../types/IIonApiFile"
import { ProgressIndicator } from "office-ui-fabric-react/lib/ProgressIndicator"
import { Dropdown, IDropdownOption, IDropdownStyles } from "office-ui-fabric-react/lib/Dropdown"
import { IDocumentEntity } from "../types/IDocumentEntity"
import { IAcl, IEntity } from "../types/IEntity"
import { IAttribute } from "../types/IAttribute"
import { Attributes } from "./Attributes"
import { Acls } from "./Acls";
import { PrimaryButton } from "office-ui-fabric-react/lib/components/Button";
import { DefaultEffects } from "office-ui-fabric-react/lib/Styling";
import { IFormErrors } from "../types/IFormErrors";
import { ErrorMessage } from "./ErrorMessage";
import { InlineNotification } from "./notifications/InlineNotification";

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
  const [ originalEntities, setOriginalEntities ] = React.useState<IEntity[]>([])
  const [ selectedAcl, setSelectedAcl ] = React.useState<string>(null)
  const [ selectedEntity, setSelectedEntity ] = React.useState<IDropdownOption>();
  const [ attributes, setAttributes ] = React.useState<IAttribute[]>([]);
  const [ formError, setFormError ] = React.useState<string>(null)
  const [ formErrors, setFormErrors ] = React.useState<IFormErrors>({})
  const [ acls, setAcls ] = React.useState<IAcl[]>([]);
  const [ ionFile, setIonFile ] = React.useState<IIonApiFile>()
  const [ token, setToken ] = React.useState<IIonToken>()

  const getEntities = async () => {
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
    const entities: IEntity[] = json.entities.entity
    setLoading(false)
    setEntities(entities.map((entity: IEntity) => {
      return { key: entity.name, text: entity.desc }
    }))
    setOriginalEntities(entities)
  }

  const validateRequired = (attribute: IAttribute): boolean => {
    if (attribute.required !== "true") {
      return true
    }
    let value: string | boolean = attribute.value;
    if (value === undefined) {
      value = attribute.default
    }
    if (typeof value === "string") {
      return value !== undefined && value.trim().length > 0
    }
    return value !== undefined
  }

  const validateMaxLimit = (attribute: IAttribute): boolean => {
    if (attribute.size === undefined) {
      return true
    }
    const max = Number(attribute.size)
    let value: string | boolean = attribute.value;
    if (value === undefined) {
      value = attribute.default
    }
    if (typeof value === "string") {
      return value !== undefined && max !== NaN && value.trim().length <= max
    }
    return true
  }

  React.useEffect(() => {
    if (token !== undefined && ionFile !== undefined) {
      getEntities()
    }
  }, [ ionFile, token ])

  React.useEffect(() => {
    const ionFile: IIonApiFile = Office.context.roamingSettings.get("ionFile")
    const token: IIonToken = Office.context.roamingSettings.get("token")
    if (token !== undefined && ionFile !== undefined) {
      setIonFile(ionFile)
      setToken(token)
    }
  }, [])

  // const uploadAttachment = async (ewsToken: string) => {
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
  //       "entity": selectedEntity.key,
  //       "accessControlList": "Public",
  //       "attributes": attributes
  //     })
  //   }
  //   const url = `${ ionFile.iu }/${ ionFile.ti }/IDM/api/v1/outlook/upload`
  //   const request = await fetch(url, postRequest)
  //   const json = await request.json()
  //   console.log("Response: ", json);
  // }

  const postAttachmentToIdm = async () => {
    for (const key in formErrors) {
      const value = formErrors[ key ]
      if (value !== null && value.length > 0) {
        setFormError("Please correct errors")
        return
      }
    }
    if (selectedAcl === null) {
      setFormError("Please select Access Control List")
      return
    }
    setFormError(null)

    // Check for ACL errors
    console.log("Attributes: ", attributes);


    //Office.context.mailbox.getCallbackTokenAsync((result: Office.AsyncResult<string>) => {
    // console.log("EWS: ", result.value);
    //uploadAttachment(result.value)
    //})

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
  }

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

  const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: "100%" } };
  const selectEntity = (_event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    const originalEntity: IEntity = originalEntities.find((entity: IEntity) => entity.name === item.key)
    setAttributes(originalEntity.attrs.attr.filter((attribute: IAttribute): IAttribute | boolean => {
      const invisibleAttributes = [
        "MDS_ID",
        "MDS_TemplateName",
        "MDS_TemplateDetails"
      ]
      return invisibleAttributes.indexOf(attribute.name) === -1;
    }))
    setSelectedEntity(item)
    setAcls(originalEntity.acls.acl)
  }
  const renderDocumentEntities = () => {
    return entities.length > 0 ? (
      <div className="ms-Card__main" style={ { boxShadow: DefaultEffects.elevation4 } }>
        <Dropdown
          label="Document entities"
          selectedKey={ selectedEntity ? selectedEntity.key : undefined }
          onChange={ selectEntity }
          placeHolder="Select entity"
          options={ entities }
          styles={ dropdownStyles } />
      </div>
    ) : null
  }
  const renderSubmitButton = () => {
    return selectedEntity !== undefined ? (
      <React.Fragment>
        <InlineNotification
          type="error"
          message={ formError } />
        <PrimaryButton
          iconProps={ { iconName: "CloudUpload" } }
          onClick={ (_event: React.MouseEvent<HTMLElement>) => {
            postAttachmentToIdm()
          } }
          text="Upload" />
      </React.Fragment>
    ) : null
  }
  const renderErrorMessage = () => {
    return formError === undefined && formError.length > 0 ? (
      <ErrorMessage
        message={ formError }
        setShow={ () => { setFormError(null) } }
        show={ true } />
    ) : null
  }

  return (
    <React.Fragment>
      <Navigation
        history={ history }
        showSettingsPath={ true } />
      <main className="ms-welcome__main">
        { renderErrorMessage() }
        <div className="ms-Card__main" style={ { boxShadow: DefaultEffects.elevation4 } }>
          <ChoiceGroup
            selectedKey={ selectedAttachment }
            options={ attachments }
            onChange={ onSelectedAttachmentChange }
            label="Select attachment" />
        </div>
        { renderDocumentEntities() }
        <Attributes
          attributes={ attributes }
          formErrors={ formErrors }
          validateMaxLimit={ validateMaxLimit }
          validateRequired={ validateRequired }
          setFormErrors={ setFormErrors } />
        <Acls
          acls={ acls }
          setSelectedAcl={ setSelectedAcl } />
        { renderLoadingIndicator() }
        { renderSubmitButton() }
      </main>
    </React.Fragment >
  )
}