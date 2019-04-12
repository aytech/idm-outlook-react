import { ButtonType, DefaultButton } from 'office-ui-fabric-react';
import * as React from 'react';
import { Constants } from '../constants/constants';
import Header from './Header';
import HeroList, { HeroListItem } from './HeroList';
import Progress from './Progress';

export interface AppProps {
  isOfficeInitialized: boolean;
}

export interface AppState {
  listItems: HeroListItem[];
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      listItems: []
    };
  }

  public componentDidMount(): void {
    this.setState({
      listItems: [
        {
          icon: 'Ribbon',
          primaryText: 'Achieve more with Office integration'
        },
        {
          icon: 'CloudUpload',
          primaryText: 'Upload attachment directly to Document Management'
        }
      ]
    });
  }

  public click = (): void => {
    /**
     * Insert your Outlook code here
     */
  };

  public render(): JSX.Element {
    const isOfficeInitialized = this.props.isOfficeInitialized;

    if (!isOfficeInitialized) {
      return (
        <Progress
          title={Constants.APP_TITLE}
          logo='assets/logo.png'
          message='Please open the app in Microsoft Outlook to see the content.'
        />
      );
    }

    return (
      <div className='ms-welcome'>
        <Header logo='assets/logo.png' title={Constants.APP_TITLE} message='Welcome'/>
        <HeroList items={this.state.listItems}>
          <p className='ms-font-l'>
            Download ION API authentication file, then click on <b>Add Profile</b>.
          </p>
          <DefaultButton className='ms-welcome__action' buttonType={ButtonType.hero}
                         iconProps={{iconName: 'ChevronRight'}} onClick={this.click}>
            Add Profile
          </DefaultButton>
        </HeroList>
      </div>
    );
  }
}
