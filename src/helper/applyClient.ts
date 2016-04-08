import * as http from "./httpClient";
import { REQUEST_URL } from "./constants";

export function queryGamesApi(callback: Function) {
    http.postJson(REQUEST_URL.Apply.queryGamesUrl, {}, json => callback(null, json), error => callback(error));
};