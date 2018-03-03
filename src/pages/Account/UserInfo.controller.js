import {Utils} from '@/model/util';
let utils = new Utils();

export default {
    name : "userinfo",
    data (){
        return {
            ismodify : false,
            params : {
                email : '',
                realName : '',
                mobile : ''
            }
        }
    },
    mounted (){
        
    },
    methods : {
        changeInfo (){
            this.params.email    = this.user.email;
            this.params.realName = this.user.realname;
            this.params.mobile   = this.user.mobile;
            this.ismodify        = true;
        },
        cancle (){
            this.params.email    = "";
            this.params.realName = "";
            this.params.mobile   = "";
            this.ismodify        = false;
        },
        confirmChange (){
            for(let k in this.params){
                if(this.params[k] === '' || this.params[k] === undefined || this.params[k] === null){
                    this.$message.error(`请完善输入内容之后再提交`);
                    return;
                }
            }
            if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.params.email)) { 
                this.$message.error("邮箱格式不正确");
                return false; 
            } 
            if (!/^[1][0-9][0-9]{9}$/.test(this.params.mobile)) { 
                this.$message.error("联系方式为正确的手机号码");
                return false; 
            }

            utils.post('/admin/info/save', this.params, { emulateJSON: true }).then(res => {
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
                this.$store.dispatch("getUserInfo");
                this.cancle();
            }, res => {
                this.$message.error(res.msg)
            })
        }
    },
    computed : {
        loading : function(){
            return this.$store.getters.load_user;
        },
        user : function(){
            return this.$store.getters.user;
        },
    }
}