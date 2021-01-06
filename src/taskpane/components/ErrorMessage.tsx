import { MessageBar, MessageBarType } from "office-ui-fabric-react"
import * as React from "react"

interface Props {
  message: string
  setShow: (status: boolean) => void
  show: boolean
}

export const ErrorMessage = ({ message, setShow, show }: Props) => {
  if (show !== true) {
    return null
  }

  return (
    <MessageBar
      messageBarType={ MessageBarType.error }
      isMultiline={ false }
      onDismiss={ () => { setShow(false) } }
      dismissButtonAriaLabel="Close">
      { message }
    </MessageBar>
  )
}