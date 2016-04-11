
import { createAction, handleActions } from "redux-actions";

//使用公告的服务
import { requestError } from "./common";

//调用服务端接口
import { queryListApi } from "../../helper/testClient";


// ------------------------------------
// Action Type
// ------------------------------------
export const QUERY_LIST = "myapp/test/querylist";
export const LIST_LOADED = "myapp/test/listloaded";


export const FILTER_LIST = "myapp/test/filterlist";
export const CANCEL_FILTER_LIST  = "myapp/test/cancelfilterlist";


// ------------------------------------
// Actions Creator
// ------------------------------------

// 需要同步处理的Action

// 内部不需要公开的action
const queryListStart = createAction(QUERY_LIST); 
const listLoaded = createAction(LIST_LOADED);


export const filterList = createAction(FILTER_LIST);
export const cancelFilterList = createAction(CANCEL_FILTER_LIST);


// 异步 Action creators: 使用 redux-thunk.
export function queryList() {
    return (dispatch, getState) => {
        if (shouldFetchList(getState())) {
            dispatch(queryListStart());
            queryListApi((error, data) => {
                if (error) {
                    dispatch(requestError(error));
                }
                else {
                    dispatch(listLoaded(data));
                }
            });
        }
        
    }
}

function shouldFetchList(state): boolean{
   
    const isloading = state.user.isloading;
    return !isloading && state.user.data.length===0;
}



// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    isloading: false,
    filting: false,
    filter:"",
    data: []
};

const reducer = handleActions({
    [QUERY_LIST]: (state, action) => {
        return Object.assign({}, state, { isloading: true });
    },
    [LIST_LOADED]: (state, action) => {
        return Object.assign({}, state, { isloading: false, data: action.payload });
    },
    [FILTER_LIST]: (state, action) => {
        return Object.assign({}, state, { filting: true, filter: action.payload });
    },
    [CANCEL_FILTER_LIST]: (state,action) => {
        return Object.assign({}, state, { filting: false, filter:"" });
    }
}, initialState);

export default reducer;


