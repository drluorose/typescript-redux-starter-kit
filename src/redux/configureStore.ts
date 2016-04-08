
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";
import { routerMiddleware } from "react-router-redux";
import myDevTools from "../container/DevTools";

export default function configureStore(initialState = {}, history) {

    // Compose final middleware and use devtools in debug environment
    let middleware = applyMiddleware(thunk, routerMiddleware(history));
    if (__DEBUG__) {
        const devTools = window.devToolsExtension
            ? window.devToolsExtension()
            : myDevTools.instrument();
        middleware = compose(middleware, devTools);
    }

    // Create final store and subscribe router in debug env ie. for devtools
    const store = middleware(createStore)(rootReducer, initialState);

    if (module.hot) {
        module.hot.accept("./reducer", () => {
            store.replaceReducer(rootReducer);
        });
    }

    return store;
}





