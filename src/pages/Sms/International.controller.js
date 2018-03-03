export default {
    name : 'International',
    data (){
        return {
            condition : ''
        }
    },
    mounted (){
        this.getInternationalList(1);
    },
    methods : {
        getInternationalList (val){
            let params = {};
            params.currentPage = val;
            params.condition = this.condition;
          
            this.$store.commit("PARAMS",{params : params});
            this.$store.commit('LOAD_LIST', {loading: true});
            this.$store.dispatch('getInternationalList')
        },
        jump (val){
            this.getInternationalList(val);
        },
        handleCurrentChange (val){
            this.getInternationalList(val);
        }
    },
    computed : {
        loading : function(){
            return this.$store.getters.load_list;
        },
        international_list : function(){
            return this.$store.getters.international_list;
        },
        pageSize : function(){
            return this.$store.getters.pageSize;
        }
    }
}