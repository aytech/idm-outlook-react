import { FeatureList } from './FeatureList';
import { ButtonType, DefaultButton } from 'office-ui-fabric-react';
import * as React from 'react';
import { Constants } from '../constants/constants';

const LIST_ITEMS = [
  {
    icon: 'Ribbon',
    primaryText: 'Achieve more with Office integration'
  },
  {
    icon: 'CloudUpload',
    primaryText: 'Upload attachment directly to Document Management'
  }
];

export default class LandingPage extends React.Component<{}, {}> {

  public click = (): void => {
    /**
     * Insert your Outlook code here
     */
  };

  public render(): JSX.Element {
    return (
      <main className='ms-welcome__main'>
        <h2 className='ms-font-xl ms-fontWeight-semilight ms-fontColor-neutralPrimary ms-u-slideUpIn20'>
          <a
            href={Constants.PLUGIN_BROCHURE_LINK}
            title='Infor Document Management'
            target='_blank'
          >
            Discover what Infor Document Management can do for you today!
          </a>
        </h2>

        <FeatureList items={LIST_ITEMS} />

        <p className='ms-font-l'>
          Download ION API authentication file, then click on <b>Add Profile</b>.
        </p>

        <DefaultButton
          className='ms-welcome__action'
          buttonType={ButtonType.hero}
          iconProps={{ iconName: 'ChevronRight' }}
          onClick={this.click}
        >
          Add Profile
        </DefaultButton>
      </main>

    );
  }

}
