<template lang="pug">
    div.page-remain
        div.page-title.p-20.border-b
            a(href="javascript:;",v-on:click="goBack").btn.btn-md.btn-white
                span.fa.fa-angle-left.mr5
                | 返回首页
        div.clearfix.search-box
            a(href="javascript:;", v-on:click="getRemainList(1)").btn.btn-md.btn-green.search-btn.fr.mr10 搜索
            .clearfix.fr.grid-sel
                span.fl 运营商：
                el-select.fl.border.sel(
                    v-model="params.operator_code",
                    placeholder="请选择",
                )
                    el-option(
                        v-for="item in operator",
                        :key="item.value",
                        :label="item.label",
                        :value="item.value"
                    )
            .clearfix.fr.grid-sel
                span.fl 产品类型：
                el-select.fl.border.sel(
                    v-model="params.product_type",
                    placeholder="请选择",
                )
                    el-option(
                        v-for="item in product",
                        :key="item.value"
                        :label="item.label",
                        :value="item.value"
                    )
        .p-20
            el-table(:data="remain_list", style="width:100%", v-loading="loading",:summary-method="getSummaries",show-summary)
                el-table-column(prop="product_type_str", label="产品类型", width="100")
                el-table-column(prop="operator_code_str", label="运营商", )
                el-table-column(prop="area_code_str", label="区域",)
                el-table-column(prop="sms_unitprice", label="短信价格", )
                el-table-column(prop="account_balance", label="剩余条数", )
                el-table-column(prop="due_time", label="到期时间", )
                el-table-column(label="备注", )
                    template(scope)
                        span(v-if="scope.row.dead == 0").link-yellow 即将到期

</template>
<script src="./Remain.controller.js"></script>
<style lang="scss">
.page-remain{
    .search-box{
        .input-datepicker{
            width:135px;
        }
       .grid-sel{
           margin-right:20px;
       }
        .sel{
            width:120px;
        }
        .search-btn{
            padding:0;
            width:77px;
        }
    }

}
</style>