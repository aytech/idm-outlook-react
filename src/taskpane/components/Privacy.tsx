import * as React from "react"
import { FontSizes } from "office-ui-fabric-react"
import { RouteComponentProps } from "react-router-dom"
import { Navigation } from "./Navigation";

export const Privacy = ({ history }: RouteComponentProps) => {
  return (
    <React.Fragment>
      <Navigation
        history={ history }
        showDocumentPath={ true }
        showSettingsPath={ true } />
      <main className="ms-welcome__main">
        <div style={ { fontSize: FontSizes.size20 } }>
          The Infor Document Management Add-In for Outlook does not store or transmit any personal data. However, any
          personal data that is present in attachments will be stored in the Document Management system after the upload, and
          may become visible to every user that is authorized within that system. Visibility of an attachment uploaded to Infor
          Document Management is controlled by the user via the Access Control List (ACL) option when uploading attachments.
        </div>
      </main>
    </React.Fragment>
  )
}