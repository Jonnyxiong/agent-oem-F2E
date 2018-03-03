import {Utils} from '@/model/util';
let utils = new Utils();


export default {
    name : 'authalready',
  
    mounted (){
        this.clientId = this.$route.params.id;
        this.getCusCerInfo();
    },
    data () {
        return {
            clientId : '',
            cerInfo : {},
            loading : false,
        }
    },
    methods : {
        getCusCerInfo () {
            this.loading = true;
            utils.get("/client/cer/info", {clientId : this.clientId}).then(res => {
               this.cerInfo = res.data.cerInfo;
               this.loading = false;
            }, res => {
                this.$message.error(res.msg);
            })
        },
        reAuth (){
            let client_id = this.$route.params.id;
            let type = this.$route.query.type;
            this.$router.push({path:"/customer/manager/" + client_id + "/auth/re", query :{type : type, edit : 1}})
        }
    }
}