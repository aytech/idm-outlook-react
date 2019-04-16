import * as React from 'react';
import { Header } from './Header';
import LandingPage from './LandingPage';

export interface IAppProps {
  isOfficeInitialized: boolean;
}

export default class App extends React.Component<IAppProps, {}> {
  constructor(props: IAppProps) {
    super(props);
  }

  public render(): JSX.Element {

    return (
      <div className='ms-welcome'>
        <Header appInitialized={this.props.isOfficeInitialized} />

        {this.props.isOfficeInitialized ? <LandingPage /> : null}

      </div>
    );
  }
}
