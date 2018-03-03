<template lang="pug">
    div
        .mask
            div.mask-ctx.result
                div.mask-header {{title}}
                    span.fa.fa-close(v-on:click="close")    
                .ctx
                    el-table(:data="expiration_list.data", style="width:100%", v-loading="loading",:summary-method="getSummaries",show-summary)
                        el-table-column(prop="client_id", label="客户ID", width="75")
                        el-table-column(prop="client_name", label="客户名称", width="110")
                        el-table-column(prop="product_type_str", label="产品类型")
                        el-table-column(prop="operator_code_str", label="运营商")
                        el-table-column(prop="area_code_str", label="区域")
                        el-table-column(prop="due_time", label="到期时间")
                        el-table-column(prop="account_balance", label="剩余条数")
                    //- div.p20.tx-c
                    //-     el-pagination( @current-change="handleCurrentChange", layout="prev, pager, next, jumper",:current-page="expiration_list.currentPage",:total="expiration_list.totalCount", :page-size="expiration_list.pageRowCount" ).grid-pagination
</template> 
<script src="./Expiration.controller.js"></script>
<style scoped lang="scss">
input{
    width:230px;
    margin-right:10px;
    display: inline-block;
}
.mask-ctx{
    width:700px;
    height:700px;
}
.ctx{
    padding:20px;
    max-height:700px;
    overflow:auto;
}
</style>

