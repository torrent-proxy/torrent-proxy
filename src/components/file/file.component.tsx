import React from "react";

interface Props {
  isToDownload: boolean;
  fileName: string;
  fileSize: number;
  isPreviewable: boolean;
}

const File: React.FunctionComponent<Props> = (props: Props) => {
  const {isToDownload, fileName, fileSize, isPreviewable} = props;
  const toDownload = isToDownload ? `checked` : ``;

  return (
    <tr className="table__row">
      <td className="table__cell">
        <input className="table__checkbox" type="checkbox" {...toDownload} />
        </td>
        <td className="table__cell">{fileName}</td>
  <td className="table__cell">{fileSize}</td>
  <td className="table__cell">{isPreviewable}</td>
        </tr>
  );
};

export default File;
