import * as React from "react";
import Header from "../header/header.component";
import SearchBox from "../search-box/search-box.component";

const App: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <Header />
      <SearchBox />
    </React.Fragment>
  );
};

export default App;