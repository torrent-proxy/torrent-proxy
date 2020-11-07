import React from "react";
import Navigation from "../navigation/navigation.component";
import ColorTheme from "../color-theme/color-theme.component";

interface Props {
  onColorClick: () => void;
}

const Header: React.FunctionComponent<Props> = (props: Props) => {
  const {onColorClick} = props;

  return (
    <React.Fragment>
      <a className="header__logo">
        <img className="header__logo-image" src="../../public/img/logo-full.svg" width="193" height="60" alt="Torrent Proxy logo." />
      </a>
      <Navigation />
      <ColorTheme
      onColorClick={onColorClick}
        />
    </React.Fragment>
  );
};

export default Header;
