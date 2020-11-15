import * as React from "react";
import {FileInfo} from "../../types";

interface Props {
  file: FileInfo;
}

const File: React.FunctionComponent<Props> = (props: Props) => {
  const {file: {fileName, fileSize, isPreviewable}} = props;

  return (
    <tr className="table__row">
      <td className="table__cell">
        <input className="table__checkbox" type="checkbox" />
      </td>
      <td className="table__cell">{fileName}</td>
      <td className="table__cell">{fileSize}</td>
      <td className="table__cell">{isPreviewable ? `Available` : ``}</td>
    </tr>
  );
};

export default File;
