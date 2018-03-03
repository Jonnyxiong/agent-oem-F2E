import {Utils} from '@/model/util';
let utils = new Utils();

export default {
    name : 'rebate',
    data (){
        return {
            financial : [{
                value : '',
                label : '全部'   
            },{
                value : '0',
                label : '入账'
            },{
                value : '1',
                label : '出账'
            }],
            payment : [{
                value : '',
                label : '所有'
            },{
                value : '0',
                label : '返点收入'
            },{
                value : '1',
                label : '抵扣'
            }],
            params : {
                order_id : '',
                payment_type : '',
                financial_type : '',
                currentPage : 1,
            },
            isexport : false,
        }
    },
    computed : {
        loading : function(){
            return this.$store.getters.load_list;
        },
        rebate_list : function(){
            return this.$store.getters.rebate_list;
        },
        bill_data : function(){
            return this.$store.getters.bill_data;
        },
    },
    mounted (){
        this.getRebateList(1); 
    },
    methods : {
        getRebateList (val){
            let params = this.params;
            params.currentPage = val;

            this.$store.commit('PARAMS',{params: params});
            this.$store.commit('LOAD_LIST', {loading: true})
            this.$store.dispatch('getRebateList');
        },
        handleCurrentChange (val){
            this.getRebateList(val);
        },
        exportReport (){
            if(this.isexport){
                return;
            }
            this.isexport = true;

            let export_params = {}
            export_params.order_id = this.params.order_id;
            export_params.payment_type = this.params.payment_type;
            export_params.financial_type = this.params.financial_type;

           
            utils.post("/finance/bill/rebate/export", export_params, {emulateJSON : true}).then(res => {
                this.isexport = false;
            }, res => {
                this.isexport = false;
                if(res.length > 0){
                    utils.export(export_params, "/finance/bill/rebate/export")
                } else {
                    this.$message.error("当前条件没有数据，无法导出")
                }
            })
        }
    }
}