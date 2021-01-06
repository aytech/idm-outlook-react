import * as React from "react"
import { RouteComponentProps } from "react-router-dom"
import { ErrorMessage } from "./ErrorMessage"
import { Navigation } from "./Navigation"

interface IonApiFile {
  ci: string,
  cn: string,
  cs: string,
  dt: string,
  ev: string,
  iu: string,
  oa: string,
  or: string,
  ot: string,
  pu: string,
  ru: string,
  ti: string,
  v: string
}

export const Profile = ({ history }: RouteComponentProps) => {
  const [ ionApiFile, setIonApiFile ] = React.useState<IonApiFile>(null)
  const [ error, setError ] = React.useState(null)
  const [ showError, setShowError ] = React.useState(false)

  React.useEffect(() => {
    if (ionApiFile != null) {
      Office.context.roamingSettings.set("ionFile", ionApiFile)
      Office.context.roamingSettings.saveAsync()
      const url = `${ ionApiFile.pu }${ ionApiFile.oa }?client_id=${ ionApiFile.ci }&response_type=token&redirect_uri=${ ionApiFile.ru }`
      const options = { height: 50, width: 50 }

      Office.context.ui.displayDialogAsync(`${ location.origin }/taskpane.html?dialog=${ url }`, options, (result: Office.AsyncResult<Office.Dialog>) => {
        if (result.status === Office.AsyncResultStatus.Failed) {
          setError(result.error.message)
          setShowError(true)
        }
        result.value.addEventHandler(Office.EventType.DialogEventReceived, () => {
          // This can be used to handle close and other scenarios, 
          // see https://docs.microsoft.com/en-us/office/dev/add-ins/develop/dialog-handle-errors-events
        })
        result.value.addEventHandler(Office.EventType.DialogMessageReceived, (data: { message: string | boolean } | { error: number }) => {
          Office.context.roamingSettings.set("token", data[ "message" ])
          Office.context.roamingSettings.saveAsync()
          result.value.close()
          history.push("/main")
        })
      })
    }
  }, [ ionApiFile ])

  const readFile = (data: File) => {
    const fileReader = new FileReader()
    fileReader.readAsText(data, "UTF-8")
    fileReader.onload = event => {
      setIonApiFile(JSON.parse(event.target.result.toString()))
    }
  }

  return (
    <React.Fragment>
      <Navigation
        history={ history }
        showDocumentPath={ true }
        showSettingsPath={ false } />
      <main className='ms-welcome__main'>
        { <ErrorMessage message={ error } setShow={ setShowError } show={ showError } /> }
        <h2>Profile</h2>
        <input type="file" name="ionapi" accept=".ionapi" onChange={ async (event) => {
          readFile(event.target.files[ 0 ])
        } } />
      </main>
    </React.Fragment >
  )
}