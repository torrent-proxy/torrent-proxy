import * as React from "react";

const ColorTheme: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <div className="color-theme__wrapper">
        <span className="color-theme__text color-theme__text--light">Light |</span>
        <span className="color-theme__text color-theme__text--dark" > Dark</span>
      </div>
    </React.Fragment>
  );
};

export default ColorTheme;