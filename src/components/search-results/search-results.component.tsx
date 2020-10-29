import * as React from "react";

const SearchResults: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <table className="search-results__table table">
        <tr className="table__row table__row--header">
          <th className="table__cell table__cell--header">
            <input className="table__checkbox" type="checkbox" />
          </th>
          <th className="table__cell table__cell--header">File name</th>
          <th className="table__cell table__cell--header">Size</th>
          <th className="table__cell table__cell--header">Preview</th>
        </tr>
        <tr className="table__row">
          <td className="table__cell">
            <input className="table__checkbox" type="checkbox" checked />
          </td>
          <td className="table__cell">1971 - Sticky Fingers</td>
          <td className="table__cell">117 MB</td>
        </tr>
        <tr className="table__row">
          <td className="table__cell">
            <input className="table__checkbox" type="checkbox" checked />
          </td>
          <td className="table__cell">01. Brown Sugar.mp3</td>
          <td className="table__cell">8.74 MB</td>
          <td className="table__cell">Available</td>
        </tr>
        <tr className="table__row">
          <td className="table__cell">
            <input className="table__checkbox" type="checkbox" />
          </td>
          <td className="table__cell">02. Sway.mp3</td>
          <td className="table__cell">8.9 MB</td>
          <td className="table__cell">Available</td>
        </tr>
        <tr className="table__row">
          <td className="table__cell">
            <input className="table__checkbox" type="checkbox" checked />
          </td>
          <td className="table__cell">03. Wild Horses.mp3</td>
          <td className="table__cell">13.1 MB</td>
          <td className="table__cell">Available</td>
        </tr>
        <tr className="table__row">
          <td className="table__cell">
            <input className="table__checkbox" type="checkbox" checked />
          </td>
          <td className="table__cell">Scans</td>
          <td className="table__cell">11.6 MB</td>
        </tr>
        <tr className="table__row">
          <td className="table__cell">
            <input className="table__checkbox" type="checkbox" />
          </td>
          <td className="table__cell">1.jpg</td>
          <td className="table__cell">2.6 MB</td>
          <td className="table__cell">Available</td>
        </tr>
        <tr className="table__row">
          <td className="table__cell">
            <input className="table__checkbox" type="checkbox" checked />
          </td>
          <td className="table__cell">2.jpg</td>
          <td className="table__cell">1.5 MB</td>
          <td className="table__cell">Available</td>
        </tr>
        <tr className="table__row">
          <td className="table__cell">
            <input className="table__checkbox" type="checkbox" checked />
          </td>
          <td className="table__cell">3.jpg</td>
          <td className="table__cell">1.4 MB</td>
          <td className="table__cell">Available</td>
        </tr>
        <tr className="table__row">
          <td className="table__cell">
            <input className="table__checkbox" type="checkbox" checked />
          </td>
          <td className="table__cell">1973 - Goat’s Head Soup</td>
          <td className="table__cell">118 MB</td>
        </tr>
        <tr className="table__row">
          <td className="table__cell">
            <input className="table__checkbox" type="checkbox" checked />
          </td>
          <td className="table__cell">1974 - It’s Only Rock’n’Roll</td>
          <td className="table__cell">122 MB</td>
        </tr>
      </table>
    </React.Fragment>
  );
};

export default SearchResults;