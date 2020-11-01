import * as React from "react";

const Navigation: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <nav className="navigation">
        <ul className="navigation__list">
          <li className="navigation__item">
            <a className="navigation__link">Main</a>
          </li>
          <li className="navigation__item">
            <a className="navigation__link">About</a>
          </li>
          <li className="navigation__item">
            <a className="navigation__link">Contacts</a>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Navigation;
