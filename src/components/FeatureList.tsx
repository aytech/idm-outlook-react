import * as React from 'react';

export interface IFeatureListItem {
  icon: string;
  primaryText: string;
}

export interface IFeatureListProps {
  items: IFeatureListItem[];
}

function FeatureListItem(props: IFeatureListItem): JSX.Element {
  return (
    <li className='ms-ListItem'>
      <i className={`ms-Icon ms-Icon--${props.icon}`}/>
      <span className='ms-font-m ms-fontColor-neutralPrimary'>
        {props.primaryText}
      </span>
    </li>
  );
}

export function FeatureList(props: IFeatureListProps): JSX.Element {
  const listItems = props.items.map((item, index): JSX.Element => {
    return (<FeatureListItem icon={item.icon} primaryText={item.primaryText} key={index}/>);
  });

  return (
    <ul className='ms-List ms-welcome__features ms-u-slideUpIn10'>
      {listItems}
    </ul>
  );
}
