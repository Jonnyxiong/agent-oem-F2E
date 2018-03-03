import { Utils } from '@/model/util';
import { fail } from 'assert';

let utils = new Utils();


export default {
    name: 'index',
    data() {
        return {
            value: "",
            value1: "",
            showMask: false,
            showOnlineRecharge: false,
            showPayDialog: false,
            chartLoading: false,
            clientRemainData: [],
            remainProduct: '',
            clientOptions: [],
            notice: [],
            sum: '', //剩余的合计
            lanjie: '',
            count: 0,
            alarmCount: '',
            myChart: null, //图表
            today: {
                submitTotal: "",
                unknown: "",
                sending: "",
                sendSuccess: "",
                sendFail: "",
            },
            pro_map: {
                '0': '行业',
                '1': '营销',
                '2': '国际',
                '3': '验证码',
                '4': '通知',
            },
            baseInfo: {},
            radio: 1
        }
    },

    filters: {
        fix: function (value) {
            if (value !== undefined && value !== null) {
                return value.toFixed(2);
            }
        },
        assetsData(value) {
            if (/^\d+(?:\.\d{1,2})?$/.test(value)) {
                let per = (value * 1).toFixed(2) + "%";
                return per;
            } else {
                return value;
            }
        },
    },
    mounted() {
        // this.getIndexList("1");
        this.getIndexData();
        this.getBaseInfo();
        this.getClient();
        this.getNotice();
        this.getWeekNumber();

        this.myChart = echarts.init(document.getElementById('echart'));
        this.initChart();
        //设定高度
        let winHeight;
        if (window.innerHeight)
            winHeight = window.innerHeight;
        else if ((document.body) && (document.body.clientHeight))
            winHeight = document.body.clientHeight;
        let cont = document.getElementById("page-index");
        cont.style.minHeight = winHeight + "px";
    },
    methods: {
        changeClient(val) {
            this.getClientInfo(val);
        },
        changeWeekSubmit(val) {
            this.getWeekNumber(val);
        },
        initChart(x = [], y = []) {
            let myChart = this.myChart;
            // 显示标题，图例和空的坐标轴
            myChart.setOption({
                title: {
                    left: 'center'
                },
                color: ['#2fb26a'],
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} <br/>{a} : {c}'
                },
                xAxis: {
                    type: 'category',
                    name: '日期',
                    splitLine: { show: false },
                    data: x
                },
                grid: {
                    top: '4%',
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                yAxis: {
                    splitLine: {
                        lineStyle: {
                            type: 'dotted'
                        }
                    },
                    axisLine: {
                        show: false
                    }
                },
                series: [{
                    name: '提交量',
                    type: 'line',
                    data: y
                }]
            });
        },
        getClient() {
            utils.post("/send/getclients", { getAll: '1' }, { emulateJSON: true }).then(res => {
                let list = res.data;
                let arr = [{ value: '', label: '全部' }];
                this.count = list.length;
                for (let i = 0; i < list.length; i++) {
                    // if (i == 0) {
                    //     this.value = list[i].clientid;
                    //     this.getClientInfo(this.value);
                    // }
                    let obj = {};
                    obj.value = list[i].clientid;
                    obj.label = list[i].clientid + "-" + list[i].name;
                    arr.push(obj)
                }
                this.getClientInfo(this.value);
                this.clientOptions = arr;
            }, res => {

            })
        },
        getNotice() {
            utils.get("/agent/notice").then(res => {
                this.notice = res.data
            }, res => {

            })
        },
        getWeekNumber(clientId = "") {
            this.chartLoading = true;
            utils.post("/WeekSubmitNumber", { clientid: clientId }, { emulateJSON: true }).then(res => {
                let data = res.data,
                    y = [],
                    x = [];
                for (let k in data) {
                    x.push(k);
                    y.push(data[k]);
                }
                this.chartLoading = false;
                this.initChart(x, y)
            }, res => {
                this.chartLoading = false;
                this.$message(res.msg);
            })
        },
        getClientInfo(client_id) {
            utils.get("/index/dataoftoday", { clientId: client_id }).then(res => {

            }, res => {

                if (res.submitTotal) {

                    this.lanjie = (100 - res.sendFail - res.sendSuccess - res.sending * 1 - res.unknown * 1).toFixed(2) + "%";

                } else {
                    this.lanjie = '--';
                }
                this.today = res;
            })
        },
        getBaseInfo() {
            utils.get('/admin/baseinfo').then(res => {
                this.loading = false;
                this.baseInfo = res.data;
                this.alarmCount = res.data.alarmCount;

            }, res => {
                this.$message.error(res.msg);
            })
        },
        jumpPage(val) {
            this.$router.push({ path: "/remain", query: { type: val } });
        },
        getIndexData() {
            this.$store.dispatch("getIndexData");
        },
        showRemain(id, pro_type) {
            let product = this.pro_map[pro_type];
            this.remainProduct = `剩余${product}短信`
            let params = {};
            params.clientid = id;
            params.product_type = pro_type;
            utils.get("/index/clientsmsdetail", params).then(res => {
                let data = res.data.data;
                let sum = res.data.sum;
                this.sum = sum;
                this.clientRemainData = data;
                this.showMask = true;
            }, res => {
                this.$message.error(res.msg);
            })
        },
        close() {
            this.showMask = false;
        },
        getSummaries() {
            let remain_sum = this.sum;
            let sum = ["合计", "", "", "", "", remain_sum];
            return sum;
        },
        closeOnlineRecharge() {
            this.showOnlineRecharge = false;
        },
        openOnlineRecharge() {
            this.showOnlineRecharge = true;
        },
        closePayDialog() {
            this.showPayDialog = false;
        },
        openPayDialog() {
            this.showPayDialog = true;
        }
    },
    computed: {
        headerloading: function () {
            return this.$store.getters.load_index;
        },
        headerData: function () {
            return this.$store.getters.index_data;
        },
        bill_data: function () {
            return this.$store.getters.bill_data;
        }

    },
    components: {
        'OnlineRecharge': (resolve) => {
            require(['@/components/OnlineRecharge/OnlineRecharge.vue'], resolve)
        },
        'PayDialog': (resolve) => {
            require(['@/components/PayDialog/PayDialog.vue'], resolve)
        },
    },
}
