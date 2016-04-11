/// <reference path="./references.d.ts" />

import * as React from "react";
import { Route, IndexRedirect, Link } from "react-router";

import Layout from "./pages/layout";

import { MyList } from "./pages/index";

export default (store) => (
    <Route path="/" component= { Layout } >
        <IndexRedirect to="/Users" />
        <Route path="/Users" component= { MyList } />
    </Route>
)


