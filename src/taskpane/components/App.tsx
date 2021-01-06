import * as React from 'react';
import {
  BrowserRouter as Router,
  Link,
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
import { ChevronLeftSmallIcon } from '@fluentui/react-icons';
import { Main } from './Main';

/* global Button, Header, HeroList, HeroListItem, Progress */

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
      <nav>
        <Link to="/taskpane.html">
          <ChevronLeftSmallIcon /> Foo
          </Link>
      </nav>
      <Switch>
        <Route exact path="/taskpane.html/" component={ LandingPage } />
        <Route exact path="/help" component={ Help } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/main" component={ Main } />
        <Route component={ NotFound } />
      </Switch>
    </Router>
  );
}
