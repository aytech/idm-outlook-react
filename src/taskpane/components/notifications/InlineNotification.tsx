import * as React from "react"
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";

interface Props {
  type: "error" | "success",
  message: string | null
}
export const InlineNotification = ({
  type,
  message }: Props
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
      isMultiline={ false }
      onDismiss={ () => {
        console.log("Dismissed");
      } }
      dismissButtonAriaLabel="Close">
      { message }
    </MessageBar>
  ) : null
}