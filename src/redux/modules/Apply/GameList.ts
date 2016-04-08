
import { createAction, handleActions } from "redux-actions";

//使用公告的服务
import { requestError } from "../Common/index";

//调用服务端接口
import {queryGamesApi} from "../../../helper/applyClient";


// ------------------------------------
// Action Type
// ------------------------------------
export const QUERY_GAMES = "webchatapp/apply/querygames";
export const GAMES_LOADED = "webchatapp/apply/gamesloaded";


export const FILTER_GAMES = "webchatapp/apply/filtergames";
export const CANCEL_FILTER_GAMES = "webchatapp/apply/cancelfiltergames";


// ------------------------------------
// Actions Creator
// ------------------------------------

// 需要同步处理的Action

// 内部不需要公开的action
const queryGamesStart = createAction(QUERY_GAMES); 
const gamesLoaded = createAction(GAMES_LOADED);


export const filterGames = createAction(FILTER_GAMES);
export const cancelFilterGames = createAction(CANCEL_FILTER_GAMES);


// 异步 Action creators: 使用 redux-thunk.
export function queryGames() {
    return (dispatch, getState) => {
        if (shouldFetchGames(getState())) {
            dispatch(queryGamesStart());
            queryGamesApi((error, data) => {
                if (error) {
                    dispatch(requestError(error));
                }
                else {
                    dispatch(gamesLoaded(data));
                }
            });
        }
        
    }
}

function shouldFetchGames(state): boolean{
   
    const isloading = state.games.isloading;
    return !isloading && state.games.data.groups.length===0;
}



// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    isloading: false,
    filting: false,
    filter:"",
    data: { groups: [] }
};

const reducer = handleActions({
    [QUERY_GAMES]: (state, action) => {
        return Object.assign({}, state, { isloading: true });
    },
    [GAMES_LOADED]: (state, action) => {
        return Object.assign({}, state, { isloading: false, data: action.payload });
    },
    [FILTER_GAMES]: (state, action) => {
        return Object.assign({}, state, { filting: true, filter: action.payload });
    },
    [CANCEL_FILTER_GAMES]: (state,action) => {
        return Object.assign({}, state, { filting: false, filter:"" });
    }
}, initialState);

export default reducer;


