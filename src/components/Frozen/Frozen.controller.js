import {Utils} from '@/model/util';
let utils = new Utils();

export default {
    props : {
        name :String,
        id : String,
        type : String,
    },
    data (){
        return {
            
        }
    },
    methods : {
        close (){
            this.$emit("close");
        },
        frozen (){
            let params = {};
            params.client_id = this.id;
            params.status = this.type;

            utils.post("/client/account/status/update", params, {emulateJSON: true}).then(res => {
                this.$message({
                    message: res.msg,
                    type: 'success'
                });
                this.close();
                this.$emit("refresh", '1');
            }, res => {
                this.$message.error(res.msg);
                this.close();
            })
        },
  
    }
}