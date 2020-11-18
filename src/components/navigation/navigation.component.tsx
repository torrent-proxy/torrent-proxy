import * as React from "react";

import NavigationItem from "../navigation-item/navigation-item.component";

const MENU_ITEMS = [`Main`, `About`, `Contacts`];

const Navigation: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <nav className="navigation">
        <ul className="navigation__list">
          {MENU_ITEMS.map((item, index) => {
            return (
              <NavigationItem
                key={`${item}-${index}`}
                navigationItem={item}
              />
            );
          })
          }
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Navigation;
