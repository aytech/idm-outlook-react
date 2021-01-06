import * as React from "react"

export const Main = () => {
  let token = Office.context.roamingSettings.get("token");
  const ionFile = Office.context.roamingSettings.get("ionFile");
  // const attachments = Office.context.mailbox.item.attachments
  console.log("Token", token);
  console.log("ION", ionFile);

  const getEntities = async (token: any) => {
    const request = {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${ token.token }`
      }
    };
    const url = `${ ionFile.iu }/${ ionFile.ti }/IDM/api/datamodel/entities`
    const response = await fetch(url, request)
    const json = await response.json()
    console.log("Response: ", json);
  }

  if (token !== undefined && ionFile !== undefined) {
    token = JSON.parse(token)
    //ionFile = JSON.parse(ionFile)
    getEntities(token)
  }
  return <h2>Main</h2>
}