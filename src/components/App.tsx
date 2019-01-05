import * as React from 'react';
import {DefaultButton, ButtonType} from 'office-ui-fabric-react';
import Header from './Header';
import HeroList, {HeroListItem} from './HeroList';
import Progress from './Progress';


export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

export interface AppState {
  listItems: HeroListItem[];
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props, context) {
    super(props, context);
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
          icon: 'CloudUpload',
          primaryText: 'Upload attachment directly to Document Management'
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
    const {
      title,
      isOfficeInitialized,
    } = this.props;

    if (!isOfficeInitialized) {
      return (
        <Progress
          title={title}
          logo='assets/trail.png'
          message='Please open the app in Microsoft Outlook to see the content.'
        />
      );
    }

    return (
      <div className='ms-welcome'>
        <Header logo='assets/trail.png' title={this.props.title} message='Welcome'/>
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
