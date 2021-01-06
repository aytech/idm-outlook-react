import * as React from "react"
import { IconButton, IContextualMenuProps, IIconProps } from "@fluentui/react"

interface Props {
  history: { push: (path: string) => void }
  showDocumentPath?: boolean,
  showSettingsPath?: boolean
}

export const Navigation = ({ history, showDocumentPath, showSettingsPath }: Props) => {

  const renderSettingsLink = () => {
    if (!showSettingsPath) {
      return null
    }
    const settingsIcon: IIconProps = { iconName: "Settings" }
    return (
      <IconButton
        iconProps={ settingsIcon }
        title="Profile"
        ariaLabel="Profile"
        onClick={ () => {
          history.push("/profile")
        } } />
    )
  }

  const renderDocumentLink = () => {
    if (!showDocumentPath) {
      return null
    }
    const documentIcon: IIconProps = { iconName: "BulkUpload" }
    return (
      <IconButton
        iconProps={ documentIcon }
        title="Upload Document"
        ariaLabel="Upload Document"
        onClick={ () => {
          history.push("/main")
        } } />
    )
  }

  const infoIcon: IIconProps = { iconName: "Info" }
  const menuProps: IContextualMenuProps = {
    items: [
      {
        key: "help",
        text: "Documentation",
        iconProps: { iconName: "KnowledgeArticle" },
        onClick: () => { history.push("/help") }
      },
      {
        key: "privacy",
        text: "Privacy Statement",
        iconProps: { iconName: "SignIn" },
        onClick: () => { history.push("/privacy") }
      }
    ]
  }

  return (
    <nav>
      <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
            { renderSettingsLink() }
          </div>
          <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 pull-right">
            { renderDocumentLink() }
            <IconButton
              menuProps={ menuProps }
              iconProps={ infoIcon }
              title="Information"
              ariaLabel="Information" />
          </div>
        </div>
      </div>
    </nav>
  )
}