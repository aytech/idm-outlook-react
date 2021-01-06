import * as React from "react"
import { RouteComponentProps } from "react-router-dom"
import { Text } from 'office-ui-fabric-react/lib/Text';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Navigation } from "./Navigation";

export const Help = ({ history }: RouteComponentProps) => {
  return (
    <React.Fragment>
      <Navigation
        history={ history }
        showDocumentPath={ true }
        showSettingsPath={ true } />
      <main className="ms-welcome__main">
        <Stack tokens={ { childrenGap: 10 } }>
          <Stack tokens={ { childrenGap: 5 } }>
            <Text variant="large" block>
              How to obtain ION API file?
            </Text>
            <Text>
              Explanation here
            </Text>
          </Stack>
          <Stack tokens={ { childrenGap: 5 } }>
            <Text variant="large" block>
              How to authenticate?
            </Text>
            <Text>
              Explanation here
            </Text>
          </Stack>
        </Stack>
      </main>
    </React.Fragment>
  )
}