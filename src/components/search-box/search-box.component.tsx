import * as React from "react";

const SearchBox: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <input
        className="search-box__input"
        type="search"
        placeholder="Enter torrent hash"
      />
      <button
        className="search-box__button"
      >Search</button>
    </React.Fragment>
  );
};

export default SearchBox;
