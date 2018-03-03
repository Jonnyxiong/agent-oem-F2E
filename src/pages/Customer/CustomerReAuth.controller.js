export default {
    name : 'customerReAuth',
    data (){
        return {
            type : '',
        }
    },
    mounted (){
        this.type = this.$route.query.type;
        
    },
    components: {
        'EnterpriseAuth': (resolve) => {
            require(['./EnterpriseAuth.vue'], resolve)
        },
        'PersonalAuth': (resolve) => {
            require(['./PersonalAuth.vue'], resolve)
        }
    },
}