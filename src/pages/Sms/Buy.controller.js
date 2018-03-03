import {Utils} from '@/model/util';

let utils = new Utils();

export default {
    name : 'Buy',
    data (){
        return {
            totalPrice : '',
            num : '',       
            auth : false,
            errorText : '',
            isShowMask : false,
            smsMsg : {                  //该短信的具体信息
                 smsUnit : '',          //计费单位
                 smsName : '',
                 smsDiscount : '',      //短信折扣
                 price : '0',            //短信折扣单价
            },
            payMoney : 0,
        }
    },
    filters : {
        fix : function(value){ 
            return value.toFixed(3);
        }
    },
    props : {
        smsDesc : Object,
        accountMsg : Object
    },
    mounted (){
        //判断短信购买类型
        if(this.smsDesc.product_type == 0){         //行业
            this.smsMsg.smsName = "行业";
            this.smsMsg.smsUnit = "条";
            this.smsMsg.price   = this.smsDesc.unit_price * this.accountMsg.hy_sms_discount;
            this.smsMsg.smsDiscount = this.accountMsg.hy_sms_discount;
        } else if(this.smsDesc.product_type == 1){  //营销
            this.smsMsg.smsName = "营销";
            this.smsMsg.smsUnit = "条";
            this.smsMsg.price   = this.smsDesc.unit_price * this.accountMsg.yx_sms_discount;
            this.smsMsg.smsDiscount = this.accountMsg.yx_sms_discount;
        } else if(this.smsDesc.product_type == 2){  //国际
            this.smsMsg.smsName = "国际";
            this.smsMsg.smsUnit = "元";
            this.smsMsg.price   = this.accountMsg.hy_sms_discount;
            this.smsMsg.smsDiscount = this.accountMsg.gj_sms_discount;
        }
    },
    methods : {
        inputNum(){
            let num = this.num.replace(/(^\s*)|(\s*$)/g, "");
           
            if(!(/^[0-9]*$/.test(num))){
                this.auth = true;
                this.errorText = "购买数量为大于0的整数";
                return;
            } else if (num[0] == 0){
                this.auth = true;
                this.errorText = "输入的数字格式不正确";
                return;
            }else if( num > 1000000) {
                this.auth = true;
                this.errorText = "购买数量不能超过100万";
                return;
            }  else {
                this.auth = false;
            }

            let price = this.num * this.smsMsg.price;
            this.totalPrice = price.toFixed(3);
        },
        close (){
            this.isShowMask = false;
        },
        goBack (){
            this.$emit("goBack")
        },
        BuySms (){
            if(this.auth){
                return;
            }
            if(this.num === '' || this.num === undefined || this.num === null){
                this.$message.error("购买数量不能为空");
                return;
            }
            //总金额大于10可以使用返点金额
            if(this.totalPrice >= 10){
                this.payMoney = (this.totalPrice - this.accountMsg.rebate_useable) * 1;
            } else {
                this.payMoney = (this.totalPrice) * 1;
            }

            this.isShowMask = true;  //打开弹窗
        },
        addOrder (){
            let params = {};
            params.product_id = this.smsDesc.product_id;
            params.num = this.num;
            utils.post('/sms/order/add', params, {emulateJSON:true}).then(res => {
                this.close();
                this.goBack();
                this.$emit("getSmsList");
                this.$message({
                    message: '购买成功',
                    type: 'success'
                });
            }, res => {
                this.close();
                this.$message.error(res.msg);
            })
        }
    }
}