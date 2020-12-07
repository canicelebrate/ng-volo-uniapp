import utils from "./utils";

let host = process.env.VUE_APP_BASE_API;

const getRequest = utils.httpsPromisify(uni.request);

const request = (
    method: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT',
    url: string,
    data?: string | object | ArrayBuffer | undefined) => {

   // uni.showLoading();
    uni.showNavigationBarLoading();

    let _url = (url.startsWith("http") ? url : host + url);

    // method为请求方法，url为接口路径，data为传参
    return getRequest({
        url: _url,
        data: data,
        method: method,
        header: {
            //"__tenant":"4DF058F8-FB18-6524-A154-39F49F58A925",
            "content-type": "application/json",
            "Authorization": `Bearer ${uni.getStorageSync("token") || ''}`,
            // #ifdef MP
            "AppName": "mall_mini"
            // #endif

            // #ifdef H5
            "AppName": "mall_h5"
            // #endif
        }
    });
};

export default {
//...
    // auth
    client_miniAuth: (data: any) => request("POST", `/api/weixin/wexin/miniAuth`, data),

//...
}