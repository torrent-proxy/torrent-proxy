import * as React from "react";
import File from "../file/file.component";
import {files} from "../../mocks/files";


const SearchResults: React.FunctionComponent = () => {

  return (
    <React.Fragment>
      <table className="search-results__table table">
        <tr className="table__row table__row--header">
          <thead className="table__cell table__cell--header">
            <input className="table__checkbox" type="checkbox" />
          </thead>
          <th className="table__cell table__cell--header">File name</th>
          <th className="table__cell table__cell--header">Size</th>
          <th className="table__cell table__cell--header">Preview</th>
        </tr>
        {files.map((file) => {
          return (
            <File
            key={file.id}
            file={file}
            />
          )
        })
        }
      </table>
    </React.Fragment>
  );
};

export default SearchResults;
