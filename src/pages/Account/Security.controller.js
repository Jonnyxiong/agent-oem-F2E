export default {
    name : 'security',
    data (){
        return {

        }
    },
    computed : {
        user : function(){
            return this.$store.getters.user;
        }
    }
}