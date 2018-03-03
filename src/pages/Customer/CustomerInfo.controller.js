import {Utils} from '@/model/util';
let utils = new Utils();

export default {
   
    data (){
        return {
            client_id : '',
            password : '',
            isChangePwd : false,
            isUpdate :false,
            isNeedmo:false,
            isNeedreport:false,
            params:{
                clientid:'',
                name:'',
                mobile:'',
                email:'',
                address:'',
                realname:'',
                needreport:'',
                needmo:'',
                deliveryurl:'',
                mourl:''
            },
            statusReportOptions: [{
                value: '0',
                label: '不获取'
            }, {
                value: '1',
                label: '系统推送'
            }, {
                value: '3',
                label: '自己拉取'
            }],
            moOptions: [{
                value: '0',
                label: '不获取'
            }, {
                value: '1',
                label: '系统推送'
            }, {
                value: '3',
                label: '自己拉取'
            }],
        }
    },
    mounted (){
        this.client_id = this.$route.params.id;
    },
    methods : {
        changePwd (){
            let params = {};
            params.email = this.customerInfo.email;
            params.clientId = this.client_id;

            utils.post("/client/account/resetPsd", params, {emulateJSON : true}).then(res => {
                this.$message({
                    type : "success",
                    message : res.msg
                })
            }, res => {
                this.$message.error(res.msg);
            })
        },
        cancle (){
            this.isChangePwd = false;
        },
        updateClient() {
            if(this.params.needreport != '1'){
                this.params.deliveryurl ="";
            }else{
                if(!this.params.deliveryurl){
                    this.$message({
                        type:'error',
                        message : '请填写状态报告回调地址'
                    })
                    return false;
                }
            }
            if(this.params.needmo != '1'){
                this.params.mourl ="";
            }else{
                if(!this.params.mourl){
                    this.$message({
                        type:'error',
                        message : '请填写上行回调地址'
                    })
                    return false;
                }
            }
            utils.post('/account/updateClient',this.params).then(res => {
                this.isUpdate = false;
                this.$message({
                    type : 'success',
                    message : '修改成功'
                })
                this.$router.push('/customer/selfsevicelayout/manager')
            }, res => {
                this.$message.error(res.msg)
            })
        },
        modify() {
            this.isUpdate = true;
            for(let k in this.params){
                this.params[k] = this.customerInfo[k];
            }
            this.params.clientid = this.client_id;
            if(this.customerInfo.needreport == '系统推送'){
                this.params.needreport = '1' 
                this.isNeedreport =true;
            }else if(this.customerInfo.needreport == '自己拉取'){
                this.params.needreport = '3' 
            }else{
                this.params.needreport = '0' 
            }
            if(this.customerInfo.needmo == '系统推送'){
                this.params.needmo = '1' 
                this.isNeedmo =true;
                
            }else if(this.customerInfo.needmo == '自己拉取'){
                this.params.needmo = '3' 
            }else{
                this.params.needmo = '0' 
            }
        },
        changeMo() {
            if(this.params.needmo !='1'){
                this.isNeedmo =false;
            }else {
                this.isNeedmo =true;
            }
        },
        changeReport() {
            if(this.params.needreport !='1'){
                this.isNeedreport =false;
            }else {
                this.isNeedreport =true;
            }
        },
        cancel() {
            this.isUpdate = false;
        },
        save (){
            utils.post('/client/account/resetPsd', {clientId : this.client_id, password : this.password}, {emulateJSON : true}).then(res => {
                this.isChangePwd = false;
                this.$message({
                    type : 'success',
                    message : '重置密码成功'
                })
            }, res => {

            })
        }
    },
    computed : {
        loading : function(){
            return this.$store.getters.load_user;
        },
        customerInfo : function(){
            return this.$store.getters.customer_data;
        }
    }
}