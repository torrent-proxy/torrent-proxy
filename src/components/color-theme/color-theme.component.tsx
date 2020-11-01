import React from "react";

const ColorTheme: React.FunctionComponent = () => {
  return (
    <div className="color-theme__wrapper">
      <span className="color-theme__text color-theme__text--light">Light |</span>
      <span className="color-theme__text color-theme__text--dark" > Dark</span>
    </div>
  );
};

export default ColorTheme;
