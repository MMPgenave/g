import React from "react";
import "./style.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./Home";
import { About } from "./About";
import { Error } from "./Error";
import { SingleProductInfo } from "./SingleProductInfo";
import { DataProvidor } from "./DataProvidor";
import { NavbarBootstrap } from "./NavbarBootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

function App() {
  return (
    <DataProvidor>
      <Router>
        <NavbarBootstrap />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/About">
            <About />
          </Route>
          <Route path="/:id" children={<SingleProductInfo />} />
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Router>
    </DataProvidor>
  );
}

export default App;
