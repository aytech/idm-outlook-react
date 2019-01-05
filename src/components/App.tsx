import * as React from 'react';
import { DefaultButton, ButtonType } from 'office-ui-fabric-react';
import Header from './Header';
import HeroList, { HeroListItem } from './HeroList';
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
          primaryText: 'Unlock features and functionality'
        },
        {
          icon: 'Design',
          primaryText: 'Create and visualize like a pro'
        }
      ]
    });
  }

        return (
            <div className='ms-welcome'>
                <Header logo='assets/logo-filled.png' title={this.props.title} message='Welcome' />
                <HeroList message='Discover what idm-outlook can do for you today!' items={this.state.listItems}>
                    <p className='ms-font-l'>Modify the source files, then click <b>Run</b>.</p>
                    <Button className='ms-welcome__action' buttonType={ButtonType.hero} iconProps={{ iconName: 'ChevronRight' }} onClick={this.click}>Run</Button>
                </HeroList>
            </div>
        );
    }

    return (
      <div className='ms-welcome'>
        <Header logo='assets/logo-filled.png' title={this.props.title} message='Welcome' />
        <HeroList message='Discover what idm-outlook can do for you today!' items={this.state.listItems}>
          <p className='ms-font-l'>Modify the source files, then click <b>Run</b>.</p>
          <Button className='ms-welcome__action' buttonType={ButtonType.hero} iconProps={{ iconName: 'ChevronRight' }} onClick={this.click}>Run</Button>
        </HeroList>
      </div>
    );
  }
}
