import * as React from "react";

interface Props {
  onDownloadButtonClick: () => void;
  onDownloadButtonHover: () => void;
}

const DownloadButton: React.FunctionComponent<Props> = (props: Props) => {
  const {onDownloadButtonClick, onDownloadButtonHover} = props;

  return (
    <button
      className="download-button"
      onClick={onDownloadButtonClick}
      onMouseOver={onDownloadButtonHover}
    >Download</button>
  );
};

export default DownloadButton;
