import * as http from "./httpClient";
import { REQUEST_URL } from "./constants";

export function queryListApi(callback: Function) {
    
    
    setTimeout(function() {
        callback(null,{
            status:0,
            data:[
                // 填充必要的数据
            ]
        })
    }, 2000);
    
    //真实的情况应该是需要调用服务端数据
    //http.postJson(REQUEST_URL.Apply.queryListUrl, {}, json => callback(null, json), error => callback(error));
};