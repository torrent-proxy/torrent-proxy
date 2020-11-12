import React from "react";

interface Props {
  navigationItem: string;
}

const NavigationItem: React.FunctionComponent<Props> = (props: Props) => {
  const {navigationItem} = props;

  return (
    <li className="navigation__item">
      <a
        className="navigation__link"
      >{navigationItem}</a>
    </li>
  );
};

export default NavigationItem;
