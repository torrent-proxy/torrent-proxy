import React from "react";

const DownloadButton: React.FunctionComponent = (props) => {
  const {onClick} = props;

  return (
    <button
      className="download-button"
      onClick={onClick}
    >Download</button>
  );
};

export default DownloadButton;
