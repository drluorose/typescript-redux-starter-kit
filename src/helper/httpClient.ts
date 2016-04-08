

export function postJson(url: string, options: {}, successHandler: Function, errorHandler: Function) {
    options = Object.assign({}, options, { method: "POST" });
    return request(url, options, successHandler, errorHandler);
}

export function getJson(url: string, options: {}, successHandler: Function, errorHandler: Function) {

    options = Object.assign({}, options, { method: "GET" });
    return request(url, options, successHandler, errorHandler);
}

export function request(url: string, options: {}, successHandler: Function, errorHandler: Function) {
    return fetch(url, options).then
        (
        // 请求成功
        response => {
            response.json().then(ret => {
                if (ret && ret.status === 0 && ret.data != null) {
                    successHandler(ret.data);
                }
                else {
                    let msg: string;
                    if (ret && ret.message) {
                        msg = ret.message;
                    }
                    else {
                        msg = "请求发生错误，请稍后重试";
                    }
                    errorHandler(msg);
                }
            });
        },
        // 请求失败
        error => {
            errorHandler(error.message);
        }
    );
}
