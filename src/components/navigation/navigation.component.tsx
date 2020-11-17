import * as React from "react";
import NavigationItem from "../navigation-item/navigation-item.component";

const menuItems = [`Main`, `About`, `Contacts`];

const Navigation: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <nav className="navigation">
        <ul className="navigation__list">
          {menuItems.map((item, index) => {
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
