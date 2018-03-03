import "@/assets/styles/reset.css";
import { Utils } from '@/model/util';
let utils = new Utils();

export default {
    name: 'app',
    components: {
        'GridMenu': (resolve) => {
            require(['@/components/Menu/Menu.vue'], resolve)
        },
        'PageHeader': (resolve) => {
            require(['@/components/Header/Header.vue'], resolve)
        }
    },
    mounted() {
        let body = document.getElementsByTagName("body")[0];
        body.style.backgroundColor = "#E7E7E7";
        this.setHeight();

        this.getClientUrl();

        this.getUserInfo();

        this.getBillData();

        this.getCerInfo();

        //获取是否可以显示一键发送短信账号
        utils.get('/index/data').then(res => {
            this.$store.commit('CAN_CREATE', { data: res.data.canCreateTestAccount })
        }, res => {

        })

    },
    methods: {
        setHeight() {
            let winHeight;
            if (window.innerHeight)
                winHeight = window.innerHeight;
            else if ((document.body) && (document.body.clientHeight))
                winHeight = document.body.clientHeight;
            let cont = document.getElementById("layout");
            cont.style.minHeight = winHeight + "px";
            // if(winHeight < 800){
            //     this.$store.commit("PAGE_SIZE",{pageSize : "10"});
            // } else {
            //     this.$store.commit("PAGE_SIZE",{pageSize : "15"});
            // }
        },
        getClientUrl() {
            utils.get("/client/weburl").then(res => {
                localStorage.setItem("url", res.data);
            }, res => {

            })
        },

        getUserInfo() {
            this.$store.commit('LOAD_USER', { loading: true });
            this.$store.dispatch("getUserInfo");
        },
        getBillData() {
            this.$store.commit('LOAD_BILLDATA', { loading: true });
            this.$store.dispatch("getBillData");
        },
        getCerInfo() {
            this.$store.commit('LOAD_CER', { loading: true });
            this.$store.dispatch("getCerInfo");
        },
    }
}
