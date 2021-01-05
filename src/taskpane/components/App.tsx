import * as React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from "react-router-dom"
import { HeroListItem } from './HeroList';
import Progress from './Progress';
// images references in the manifest
import '../../../assets/logo-16.png';
import '../../../assets/logo-32.png';
import '../../../assets/logo-80.png';
import LandingPage from './LandingPage';
import { Help } from './Help';
import { Profile } from './Profile';
import { NotFound } from './NotFound';
import { ChevronLeftSmallIcon } from '@fluentui/react-icons';

/* global Button, Header, HeroList, HeroListItem, Progress */

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

export interface AppState {
  listItems: HeroListItem[];
}

export default class App extends React.Component<AppProps, AppState> {

  constructor(props) {
    super(props);
    this.state = {
      listItems: []
    };
  }

  componentDidMount() {
    this.setState({
      listItems: [
        {
          icon: 'Ribbon',
          primaryText: 'Achieve more with Office integration'
        },
        {
          icon: 'Unlock',
          primaryText: 'Upload attachments directly to Document Management'
        },
        {
          icon: 'Design',
          primaryText: 'Create and visualize like a pro'
        }
      ]
    });
  }

  click = async () => {
    /**
     * Insert your Outlook code here
     */
  };

  render() {
    const { title, isOfficeInitialized } = this.props;

    if (!isOfficeInitialized) {
      return (
        <Progress title={ title } logo="assets/logo.png" message="Please open the app in Microsoft Outlook to see the content." />
      );
    }

    return (
      <Router>
        <nav>
          <Link to="/taskpane.html">
            <ChevronLeftSmallIcon /> Foo
          </Link>
        </nav>
        <Switch>
          <Route exact path="/taskpane.html/" render={ props => <LandingPage { ...props } /> } />
          <Route exact path="/help" component={ Help } />
          <Route exact path="/profile" component={ Profile } />
          <Route component={ NotFound } />
        </Switch>
      </Router>
    );
  }
}
