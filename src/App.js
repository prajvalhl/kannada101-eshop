import React from "react";
import { Header } from "./components/Header";
import { Filters } from "./components/Filters";
import { Main } from "./components/Main";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <div className="header">
          <Header />
        </div>
        <div className="side-menu">
          <Filters />
        </div>
        <div className="main">
          <Main />
        </div>
      </div>
    </div>
  );
}

export default App;
