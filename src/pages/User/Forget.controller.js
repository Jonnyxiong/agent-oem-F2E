import {Utils} from '@/model/util';
let utils = new Utils();

export default {
    name : 'Forget',
    data (){
        return {
            imgUrl : '/api/captcha.jpg',
            code : '',
            email : '',
        }
    },
    methods : {
        getImgCode (){
            let timestamp = Date.parse(new Date());
            this.imgUrl = '/api/captcha.jpg'+"?v=" + timestamp;
        },
        sendEmail (){
            let captcha = this.code,
                email   = this.email;
            if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)) { 
                this.$message.error("邮箱格式不正确");
                return false; 
            } 
            if(captcha === '' || captcha === null || captcha === undefined){
                 this.$message.error("请填写图片验证码");
                 return false; 
            }

            utils.post("/password/email", {captcha : captcha, email : email}, {emulateJSON:true}).then(res => {
                this.$message({
                    type:'success',
                    message : res.msg,
                })
                this.$router.push("/login")
            }, res => {
                this.$message.error(res.msg);
            })
        }   
    }
}