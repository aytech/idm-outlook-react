// import { ButtonType, DefaultButton } from 'office-ui-fabric-react';
import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from './Header';
import HeroList from './HeroList';

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


export const LandingPage = () => {
  const token = Office.context.roamingSettings.get("token")
  let history = useHistory()
  console.log("Token: ", token);
  console.log("Settings: ", Office.context.roamingSettings);

  if (token !== undefined) {
    history.push("/main")
  }
  
  return (
    <main className='ms-welcome__main'>
      <Header logo="assets/logo-80.png" title="Document Management" message="Document Management" />
      <HeroList message="Discover what Infor Document Management can do for you today!" items={ LIST_ITEMS } />

      <p className='ms-font-l'>
        Download ION API authentication file, then click on <b>Add Profile</b>.
      </p>

      {/* <DefaultButton
          className='ms-welcome__action'
          buttonType={ ButtonType.hero }
          iconProps={ { iconName: 'ChevronRight' } }
          onClick={ this.click }
        >
          Add Profile
        </DefaultButton> */}
      <Link to="/profile" className="ms-Button ms-Button--primary root-292">
        <span>Add Profile</span>
      </Link>
    </main>
  )
}
