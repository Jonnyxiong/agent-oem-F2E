import { Utils } from '@/model/util';
let utils = new Utils();

export default {
    data() {
        return {
            noticeId:'',
            noticeName:'',
            releaseTime:'',
            noticeContent:''
        }
    },created(){
        // eventBus.$on('noticeId', function(val) { 
        //     console.log(val)
        //  })
    },
    mounted() {
        
        this.getDetail();
    },
    methods: {
        getDetail() {
            let params = {};
            if(this.$route.query.noticeId){
                params.noticeId = this.$route.query.noticeId;
            }else{
                params.noticeId = localStorage.getItem("noticeId");
            }
            utils.get('/agent/notice/detail', params, { emulateJSON: true }).then(res => {
                this.noticeName = res.data.noticeName;
                this.releaseTime = res.data.releaseTime;
                this.noticeContent = res.data.noticeContent;
            }, res => {
            })
        },
    },
    components: {
        'autoTemplate': (resolve) => {
            require(['@/components/AutoTemplateAdd/AutoTemplateAdd.vue'], resolve)
        }
    }
}