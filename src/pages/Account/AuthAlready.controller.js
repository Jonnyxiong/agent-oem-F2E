
export default {
    name : 'Authalready',
    computed :{
        loading (){
            return this.$store.getters.load_cer;
        },
        cerInfo (){
            return this.$store.getters.cer_info;
        }
    },
    methods : {
        
    },
    data () {
        return {
            path : '/file/scanPic.html?path='
        }
    }
}