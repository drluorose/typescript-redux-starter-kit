import { combineReducers } from "redux";
import { routerReducer as router } from "react-router-redux";
import testReduces from "./modules/Apply/GameList";

export default combineReducers({
    user: testReduces,
    router
})
