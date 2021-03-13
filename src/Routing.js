import React from "react";
import { Switch, Route } from "react-router-dom";
import { Exchange } from "./pages/Exchange";

export const Routing = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Exchange />
        </Route>
      </Switch>
    </>
  );
};
