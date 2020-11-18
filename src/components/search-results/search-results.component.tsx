import * as React from "react";
import {files} from "../../mocks/files";
import File from "../file/file.component";

const SearchResults: React.FunctionComponent = () => {

  return (
    <React.Fragment>
      <table className="search-results__table table">
        <thead>
          <tr className="table__row table__row--header">
            <th className="table__cell table__cell--header">
              <input className="table__checkbox" type="checkbox" />
            </th>
            <th className="table__cell table__cell--header">File name</th>
            <th className="table__cell table__cell--header">Size</th>
            <th className="table__cell table__cell--header">Preview</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => {
            return (
              <File
                key={file.id}
                file={file}
              />
            );
          })
          }
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default SearchResults;
