import {Utils} from '@/model/util';
let utils = new Utils();

export default {
    name: 'app',
    components: {
        'AgentAuth': (resolve) => {
            require(['./AgentAuth.vue'], resolve)
        },
        'AuthAlready': (resolve) => {
            require(['./AuthAlready.vue'], resolve)
        }
    },
    data (){
        return {

        }
    },
    mounted (){
        //进入页面重新刷新一下认证状态
        this.$store.dispatch("getCerInfo");
    },
    computed: {
        status (){
            return this.$store.getters.oauth_status;
        },
        submit (){
            return this.$store.getters.submit;
        }
    }
}