import {Utils} from '@/model/util';
let utils = new Utils();


export default {
    name : "CustomerAuth",
    data (){
        return {
           
            status : '',    //认证状态
            type : '',      //客户类型
        }
    },
    
    mounted (){
        this.status = this.$route.query.status;     //认证状态
        this.type = this.$route.query.type;         //用户类型
        let clientId = this.$route.params.id;       //用户id
        
        this.$store.commit("CLIENT_ID", {id: clientId});
        this.$store.dispatch("getCustomerCer")
    },
    computed : {
        customer_cer : function(){
            return this.$store.getters.customer_cer;
        }
    },
    components: {
        'EnterpriseAuth': (resolve) => {
            require(['./EnterpriseAuth.vue'], resolve)
        },
        'AuthAlready': (resolve) => {
            require(['./AuthAlready.vue'], resolve)
        },
        'PersonalAuth': (resolve) => {
            require(['./PersonalAuth.vue'], resolve)
        }
    },
    
}