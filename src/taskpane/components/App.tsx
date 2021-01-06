import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom"
import Progress from './Progress';
// images references in the manifest
import '../../../assets/logo-16.png';
import '../../../assets/logo-32.png';
import '../../../assets/logo-80.png';
import { LandingPage } from './LandingPage';
import { Help } from './Help';
import { Profile } from './Profile';
import { NotFound } from './NotFound';
import { Main } from './Main';
import { Privacy } from './Privacy';

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

export interface Props {
  title: string,
  isOfficeInitialized: boolean
}

export const App = ({ title, isOfficeInitialized }: Props) => {

  if (!isOfficeInitialized) {
    return (
      <Progress title={ title } logo="assets/logo.png" message="Please open the app in Microsoft Outlook to see the content." />
    );
  }

  // Authentication initial flow
  if (window.location.search.indexOf("dialog") !== -1) {
    const redirectUrl = location.search.substring(location.search.indexOf("=") + 1)
    window.location.href = redirectUrl
    return null
  }

  // Authentication final flow
  if (window.location.hash.indexOf("#access_token") !== -1) {
    const urlParts = window.location.hash.substring(window.location.hash.indexOf("=") + 1).split("&")
    const token = urlParts[ 0 ]
    const type = urlParts[ 1 ].split("=")[ 1 ]
    const expires = urlParts[ 2 ].split("=")[ 1 ]
    const scope = decodeURI(urlParts[ 3 ].split("=")[ 1 ])
    Office.context.ui.messageParent(JSON.stringify({ token, type, expires, scope }))
    return null
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/taskpane.html/" render={ props => { return <LandingPage { ...props } /> } } />
        <Route exact path="/help" render={ props => { return <Help { ...props } /> } } />
        <Route exact path="/profile" render={ props => { return <Profile { ...props } /> } } />
        <Route exact path="/main" render={ props => { return <Main { ...props } /> } } />
        <Route exact path="/privacy" render={ props => { return <Privacy { ...props } /> } } />
        <Route component={ NotFound } />
      </Switch>
    </Router>
  );
}
