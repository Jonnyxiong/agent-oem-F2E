
import { Message } from 'element-ui';

function loginClient(user, pwd){
    let part = [];
    part.push(encodeURIComponent("loginAccount") + "=" + encodeURIComponent(user));
    part.push(encodeURIComponent("password") + "=" + encodeURIComponent(pwd));
    let data = part.join("&");

    var request = new XMLHttpRequest();
    request.open('POST', 'http://oem.jsms.com/login', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send(data);

    request.onreadystatechange = function(){
        if (this.readyState === 4) {
            if (this.status >= 200 && this.status < 400) {
                // Success!
                //console.log(this.getAllResponseHeaders())
                var resp = JSON.parse(this.responseText);
                if(resp.isSuccess){
                    Message.success({
                        type:'success',
                        message : '登录成功'
                    })
                } else {
                    Message.error(resp.body.message)
                }
                
            } else {
                // Error :(
            }
        }
    }
    // Vue.http.post("http://oem.jsms.com/login", params, { emulateJSON: true }).then(res => {
    //     if(res.body.isSuccess){
    //         Message.success({
    //             type:'success',
    //             message : '登录成功'
    //         })
    //         let cookie = res;
    //         console.log(cookie)
    //     } else {
    //         Message.error(res.body.message)
    //     }
    // }, res => {
    //     Message.error(res.body.message)
    // })
}

export default loginClient