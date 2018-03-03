

export default {
    name : 'LoginClient',
    data (){
        return {
           
        }
    },
    props : {
        oemUrl : String
    },
    methods : {
        close (){
            this.$emit("close");
        },
        loginClient (){

        }
    }
}