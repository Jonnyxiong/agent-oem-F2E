import { Utils } from '@/model/util';
let utils = new Utils();
export default {
    data() {
        return {
            list:[],
            condition:''
        }
    },
    mounted() {
        this.getNoticeList(1);
    },
    methods: {
        handleCurrentChange(val) {
            this.getNoticeList(val);
        },
        getNoticeList(val) {
            let params = {};
            params.condition = this.condition;
            params.Page = val;
            this.$store.commit("PARAMS",{params : params});
            this.$store.commit('NOTICE_LIST', {loading: true});
            this.$store.dispatch('getNoticeList');
        },
       //打开详情页弹窗
       openDetails(row) {
        localStorage.setItem("noticeId", row.id);
        // eventBus.$emit('noticeId', row.id);
        this.$router.push('/notice/view');
      },
    },
    computed: {
        loading : function(){
            return this.$store.getters.load_list;
        },
        notice_list : function(){
            return this.$store.getters.notice_list;
        },
        pageSize : function(){
            return this.$store.getters.pageSize;
        }
    }
}