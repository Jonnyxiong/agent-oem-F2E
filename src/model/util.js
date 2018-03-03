import Vue from "vue";
import store from '../store';
import $http from "vue-resource";
Vue.use($http);

let vm = new Vue();
let configPath = "/api";

Vue.http.interceptors.push(function (request, next) {
    next(function (response) {
        if (response.headers.map.sessionstatus /* && store.state.islogged */ ) {
            let sessionstatus = response.headers.map.sessionstatus[0];
            if (sessionstatus == 'timeout') {
                let target = document.getElementById("_timeout");
                target.style.display = "block";
                response.body = { code: "401", msg: "登录超时" };
                return;
            }
        }
    });
});

let test = false;
if (test) {
    configPath += "test";
}

export class Utils {
    //获取静态资源
    get_(url) {
        return new Promise((resolve, reject) => {
            vm.$http.get(url).then(response => {
                resolve(response.body);
            }, function () {
                reject(response.body);
                console.log("接口异常");
            });
        });
    }
    get(url, data = {}, type = { emulateJSON: false }) {
        url = configPath + url;
        return new Promise((resolve, reject) => {
            vm.$http.get(url, { params: data }, type).then(response => {
                if (response.body.code == 0) {
                    resolve(response.body);
                } else {
                    reject(response.body);
                }
            }, function (response) {
                reject(response.body);
                console.log("接口异常");
            });
        });
    }
    post(url, data = {}, type = { emulateJSON: false }) {
        url = configPath + url;
        return new Promise((resolve, reject) => {
            vm.$http.post(url, data, type).then(response => {
                if (response.body.code == 0) {
                    resolve(response.body);
                } else {
                    reject(response.body);
                }
            }, function (response) {
                reject(response.body);
                console.log("接口异常");
            });
        });
    }
    post_(url, data = {}, type = { emulateJSON: false }) {
        url = configPath + url;
        return new Promise((resolve, reject) => {
            vm.$http.post(url, data, type).then(response => {
                console.log(response)
                    //let res = JSON.stringify(response.bodyText)
                let res = JSON.parse(response.body);
                console.log("===", typeof res)
                resolve(res);
            }, function (response) {
                reject(response.body);
                console.log("接口异常");
            });
        });
    }
    jsonp(url, data = {}) {
        return new Promise((resolve, reject) => {
            vm.$http.jsonp(url, { params: data, jsonp: "_callback" }).then(
                res => {
                    resolve(res.body);
                },
                res => {
                    console.log("接口异常");
                }
            );
        });
    }
    export (params, url) {
        let turnForm = document.createElement("form");
        document.body.appendChild(turnForm);
        turnForm.method = "post";
        turnForm.action = configPath + url;
        //  turnForm.target = "_blank";

        for (let k in params) {
            let newElement = document.createElement("input");
            newElement.setAttribute("name", k);
            newElement.setAttribute("type", "hidden");
            newElement.setAttribute("value", params[k]);
            turnForm.appendChild(newElement);
        }
        turnForm.submit();
    }
    exportGet(params, url) {
        let turnForm = document.createElement("form");
        document.body.appendChild(turnForm);
        turnForm.method = "get";
        turnForm.action = configPath + url;
        //  turnForm.target = "_blank";

        for (let k in params) {
            let newElement = document.createElement("input");
            newElement.setAttribute("name", k);
            newElement.setAttribute("type", "hidden");
            newElement.setAttribute("value", params[k]);
            turnForm.appendChild(newElement);
        }
        turnForm.submit();
    }
}
