
import { createAction, handleActions } from "redux-actions";

//调用服务端接口
import {queryGamesApi} from "../../../helper/applyClient";


// ------------------------------------
// Action Type
// ------------------------------------
export const REQUEST_ERROR = "webchatapp/common/requesterror";


// ------------------------------------
// Actions Creator
// ------------------------------------

// 需要同步处理的Action

export const requestError = createAction(REQUEST_ERROR);

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};

const reducer = handleActions({
    [REQUEST_ERROR]: (state, action) => {
        return Object.assign({}, state, { error: action.payload });
    }
}, initialState);

export default reducer;


