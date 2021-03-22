import * as React from "react"
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";

interface Props {
  message: string | null,
  type: "error" | "success"
}
export const InlineNotification = ({
  message,
  type }: Props
) => {

  const getType = () => {
    if (type === "error") {
      return MessageBarType.error
    }
    return MessageBarType.success
  }

  return message !== null ? (
    <MessageBar
      className="message-bar-inline"
      messageBarType={ getType() }
      isMultiline={ true }
      onDismiss={ () => {
        console.log("Dismissed");
      } }
      dismissButtonAriaLabel="Close">
      {message }
    </MessageBar>
  ) : null
}