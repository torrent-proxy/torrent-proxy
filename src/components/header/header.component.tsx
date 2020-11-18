import * as React from "react";
import ColorTheme from "../color-theme/color-theme.component";
import Navigation from "../navigation/navigation.component";


const Header: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <a className="header__logo">
        <img className="header__logo-image" src="../../public/img/logo-full.svg" width="193" height="60" alt="Torrent Proxy logo." />
      </a>
      <Navigation />
      <ColorTheme />
    </React.Fragment>
  );
};

export default Header;
