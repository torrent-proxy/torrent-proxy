import React from "react";

interface Props {
  onColorClick: () => void;
}

const ColorTheme: React.FunctionComponent<Props> = (props: Props) => {
  const {onColorClick} = props;

  return (
    <div className="color-theme__wrapper">
      <span
      className="color-theme__text color-theme__text--light"
      onClick={onColorClick}
      >Light |</span>
      <span className="color-theme__text color-theme__text--dark" > Dark</span>
    </div>
  );
};

export default ColorTheme;
