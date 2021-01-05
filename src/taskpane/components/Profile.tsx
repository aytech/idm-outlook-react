import * as React from "react"
import Header from "./Header"

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

export const Profile = () => {
  const [ ionApiFile, setIonApiFile ] = React.useState<IonApiFile>(null)

  React.useEffect(() => {
    if (ionApiFile != null) {
      console.log("Changed: ", Office.context.ui);
      const f = ionApiFile
      const url = `${ f.pu }${ f.oa }?client_id=${ f.ci }&response_type=token&redirect_uri=${ f.ru }`
      Office.context.roamingSettings.set("dialog", url)
      console.log("Changed: ", url);
      Office.context.ui.displayDialogAsync(`https://localhost:3000/taskpane.html?dialog=${url}`, { height: 50, width: 50 }, (result) => {
        console.log("Result: ", result);
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
    <main className='ms-welcome__main'>
      <Header logo="assets/logo-80.png" title="Document Management" message="Document Management" />
      <h2>Profile</h2>
      <input type="file" name="ionapi" accept=".ionapi" onChange={ async (event) => {
        readFile(event.target.files[ 0 ])
      } } />
    </main>
  )
}