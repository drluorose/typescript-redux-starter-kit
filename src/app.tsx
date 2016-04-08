/// <reference path="references.d.ts" />


import * as React from "react";
import * as ReactDOM from "react-dom";


import { Provider } from "react-redux";
import { Router, hashHistory } from "react-router";
import { syncHistoryWithStore, routerReducer } from "react-router-redux";

import makeRoutes from "./routes";

import "./static/app.css";
import configureStore from "./redux/configureStore";

import Root from "./container/Root";

const initialState = __INITIAL_STATE__;

const store = configureStore(initialState, hashHistory);


// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store,{
    selectLocationState: (state) => state.router
});

const routes = makeRoutes(store);

ReactDOM.render(
    <Provider store={store}>
        <Root history={history} routes={routes} store={store} />
    </Provider>,
    document.getElementById('appMountNode')
);