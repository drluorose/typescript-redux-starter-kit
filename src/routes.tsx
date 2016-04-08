/// <reference path="./references.d.ts" />

import * as React from "react";
import { Route, IndexRedirect, Link } from "react-router";

import Layout from "./pages/layout";

import { Apply, Category, Detail, GameList, MyList } from "./pages/index";

export default (store) => (
    <Route path="/" component= { Layout } >
        <IndexRedirect to="/Games" />
        <Route path="/Games" component= { GameList } />
        <Route path="/Category/:GameId" component= { Category } />
        <Route path="/MyList" component= { MyList } />
        <Route path="/Apply" component= { Apply } />
        <Route path="/Detail/:Id" component= { Detail } />
    </Route>
)


