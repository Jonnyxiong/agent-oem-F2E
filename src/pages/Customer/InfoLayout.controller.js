import {Utils} from '@/model/util';
let utils = new Utils();

export default {
    name : 'InfoLayout',
    mounted (){
        
        this.client_id    = this.$route.params.id;
        this.oauth_status = this.$route.query.status;
        this.type         = this.$route.query.type;

        this.getCustomerInfo();
    },
    data (){
        return {
            client_id : '',
            oauth_status : '',
            type : '',
        }
    },
    methods : {
        getCustomerInfo (){
            this.$store.commit('LOAD_USER',{loading: true})
            utils.get('/client/account/detail',{client_id:this.client_id}, { emulateJSON: true }).then(res => {
                this.$store.commit('CUSTOMER_DATA',{data : res.data})
                this.$store.commit('LOAD_USER',{loading: false})

                
            }, res => {
                this.$message.error(res.msg);
            })
        },
        goBack() {
            this.$router.go(-1);
        }
    }
}