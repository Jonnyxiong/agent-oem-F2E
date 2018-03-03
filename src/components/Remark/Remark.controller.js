import {Utils} from '@/model/util';
let utils = new Utils();

export default {
    name : 'remark',
    props : {
        id : String,
        remarks : String,
    },
    data (){
        return {
            remark_text : '',
        }
    },
    mounted (){
        this.remark_text = this.remarks;
    },
    methods : {
        close (){
            this.$emit("close");
        },
        changeRemark (){
            let params = {};
            params.client_id = this.id;
            params.remarks   = this.remark_text;
            utils.post('/client/account/remark/update', params, {emulateJSON:true} ).then(res => {
                this.$message({
                    type : 'success',
                    message : '备注修改成功'
                })
                this.close();
                this.$emit("refresh", '1');
            }, res =>{
                this.$message.error(res.msg);
            })
        }
    }
}