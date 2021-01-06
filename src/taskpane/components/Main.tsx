import * as React from "react"
import { RouteComponentProps } from "react-router-dom";
import { Navigation } from "./Navigation";

export const Main = (props: RouteComponentProps) => {
  let token = Office.context.roamingSettings.get("token");
  const ionFile = Office.context.roamingSettings.get("ionFile");
  // const attachments = Office.context.mailbox.item.attachments
  console.log("Token", token);
  console.log("ION", ionFile);

  // const getEntities = async (token: any) => {
  //   const request = {
  //     method: "GET",
  //     headers: {
  //       "Accept": "application/json",
  //       "Authorization": `Bearer ${ token.token }`
  //     }
  //   };
  //   const url = `${ ionFile.iu }/${ ionFile.ti }/IDM/api/datamodel/entities`
  //   const response = await fetch(url, request)
  //   const json = await response.json()
  //   console.log("Response: ", json);
  // }

  const postAttachmentToIdm = async (token: any, ewsToken: string) => {
    const postRequest = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ token.token }`
      },
      body: JSON.stringify({
        "exchangeUrl": Office.context.mailbox.ewsUrl,
        "exchangeToken": ewsToken,
        "attachmentId": Office.context.mailbox.item.attachments[ 0 ].id,
        "emailId": Office.context.mailbox.item.itemId,
        "entity": "Oleg_Test",
        "accessControlList": "Public",
        "attributes": []
      })
    }
    const url = `${ ionFile.iu }/${ ionFile.ti }/IDM/api/v1/outlook/upload`
    // const request = await fetch(url, postRequest)
    // const json = await request.json()
    console.log("Response: ", postRequest, url);
  }

  if (token !== undefined && ionFile !== undefined) {
    token = JSON.parse(token)
    //ionFile = JSON.parse(ionFile)
    //getEntities(token)
    //postAttachmentToIdm(token)
    Office.context.mailbox.getCallbackTokenAsync((response: Office.AsyncResult<string>) => {
      if (response.status === Office.AsyncResultStatus.Succeeded) {
        postAttachmentToIdm(token, response.value)
      }
    })
  }

  return (
    <React.Fragment>
      <Navigation
        history={ props.history }
        showSettingsPath={ true } />
      <h2>Main</h2>
    </React.Fragment>
  )
}