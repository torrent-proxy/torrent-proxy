import * as React from "react";

import DownloadButton from "../download-button/download-button.component";
import Header from "../header/header.component";
import SearchBox from "../search-box/search-box.component";
import SearchResults from "../search-results/search-results.component";

const App: React.FunctionComponent = () => {
  const onDownloadButtonClick = () => {};
  const onDownloadButtonHover = () => {};

  return (
    <React.Fragment>
      <Header />
      <SearchBox />
      <SearchResults />
      <DownloadButton
        onDownloadButtonClick={onDownloadButtonClick}
        onDownloadButtonHover={onDownloadButtonHover}
      />
    </React.Fragment>
  );
};

export default App;
