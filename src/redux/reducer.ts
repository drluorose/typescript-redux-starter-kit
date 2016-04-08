import { combineReducers } from "redux";
import { routerReducer as router } from "react-router-redux";
import gamesReduces from "./modules/Apply/GameList";

export default combineReducers({
    games: gamesReduces,
    router
})
