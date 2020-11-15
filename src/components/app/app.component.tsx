import * as React from "react";
import Header from "../header/header.component";
import SearchBox from "../search-box/search-box.component";
import SearchResults from "../search-results/search-results.component";
import DownloadButton from "../download-button/download-button.component";

const App: React.FunctionComponent = () => {

  return (
    <React.Fragment>
      <Header />
      <SearchBox />
      <SearchResults />
      <DownloadButton />
    </React.Fragment>
  );
};

export default App;
