import * as React from 'react';
import { Constants } from '../constants/constants';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react';

export interface IHeaderProps {
  appInitialized: boolean;
}

const WELCOME_CLASS_NAME = 'ms-welcome__progress ms-u-fadeIn500';

const INITIALIZED_CLASS_NAME = 'ms-welcome__header ms-bgColor-neutralLighter';
const INITIALIZED_LOGO_CLASS_NAME = 'round';

export function Header(props: IHeaderProps): JSX.Element {
  const logo = Constants.HEADER_LOGO;
  const spinnerMessage = 'Please open the app in Microsoft Outlook to see the content.';

  let logoClassName = '';
  let sectionClassName = WELCOME_CLASS_NAME;
  let title = Constants.APP_TITLE;

  if (props.appInitialized) {
    logoClassName = INITIALIZED_LOGO_CLASS_NAME;
    sectionClassName = INITIALIZED_CLASS_NAME;
    title = 'Welcome';
  }

  return (
    <section className={sectionClassName + 'ms-u-fadeIn500'}>
      <img width='90' height='90' src={logo} alt={title} title={title} className={logoClassName} />

      <h1 className='ms-fontSize-su ms-fontWeight-light ms-fontColor-neutralPrimary'>{title}</h1>

      {props.appInitialized ? null : <Spinner size={SpinnerSize.large} label={spinnerMessage} />}
    </section>
  );
}
