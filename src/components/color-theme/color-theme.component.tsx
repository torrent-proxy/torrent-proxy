import React from "react";

const ColorTheme: React.FunctionComponent = () => {

  return (
    <div className="color-theme__wrapper">
      <button
      className="color-theme__text color-theme__text--light"
      >Light |</button>
      <button className="color-theme__text color-theme__text--dark"
       > Dark</button>
    </div>
  );
};

export default ColorTheme;
