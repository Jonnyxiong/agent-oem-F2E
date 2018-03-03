<template lang="pug">
    div.page-own
        .p-20.mt10
            .grid-list-head 
                .grid-tab.active 子账户消费记录
        div.p-20.mt20
            a(href="javascript:;", v-on:click="exportReport").btn.btn-md.btn-green.search-btn 下载报表
        div.p-20.mt20
            .grid-table-head 子账户消费报表
        div.clearfix.search-box
            .clearfix.fl
                span.fl 子账户ID：
                el-input.fl.border.sel(
                    v-model="params.clientid",
                )
                span.fl.ml10 子账户名称：
                el-input.fl.border.sel(
                    v-model="params.realname",
                )
                span.fl.ml10 操作类型：
                el-select.fl.border.sel(
                    v-model="params.order_type",
                    placeholder="请选择",
                )
                    el-option(
                        v-for="item in operate",
                        :key="item.value"
                        :label="item.label",
                        :value="item.value"
                    )
                span.fl.ml10 产品类型：
                el-select.fl.border.sel(
                    v-model="params.product_type",
                    placeholder="请选择",
                )
                    el-option(
                        v-for="item in product",
                        :key="item.value",
                        :label="item.label",
                        :value="item.value"
                    )
            div.clearfix.fl.search-box2
                span.fl 操作日期：
                el-date-picker.input-datepicker.fl.border(v-model="startTime", type="date", placeholder="请选择开始日期", :picker-options="pickerOptions0", @change="changeStartDay")
                span.fl.p-5 至
                el-date-picker.input-datepicker.fl.border(v-model="endTime", type="date", placeholder="请选择结束日期", :picker-options="pickerOptions1", @change="changeEndDay")
                a(href="javascript:;", v-on:click="getRecorList(1)").btn.btn-md.btn-green.search-btn.fl.ml10 搜索                 
        .p-20
            el-table(:data="record_list.list", style="width:100%", v-loading="loading")
                el-table-column(prop="rownum", label="序号", width="50")
                el-table-column(prop="client_id", label="子账户ID", width="80")
                el-table-column(prop="name", label="子账户名称")
                el-table-column(prop="orderTypeStr", label="操作类型")
                el-table-column(prop="productTypeStr", label="产品类型")
                el-table-column(prop="operatorCodeStr", label="运营商类型")
                el-table-column(prop="areaCodeStr", label="区域")
                el-table-column(prop="unit_price", label="单价（元）")
                el-table-column(prop="due_time", label="到期时间")
                el-table-column(prop="order_number", label="短信数量")        
                el-table-column(prop="consumer_date", label="消费日期")        
                el-table-column(prop="create_time", label="操作日期")
        .p20.tx-c(v-if="record_list.totalCount > 1")
            el-pagination( @current-change="handleCurrentChange", layout="prev, pager, next, jumper",:current-page="record_list.currentPage",:total="record_list.totalCount", :page-size="record_list.pageRowCount" ).grid-pagination                                                              
</template>
<script src="./Record.controller.js"></script>
<style lang="scss" scoped>
.search-box2{
    margin-top:10px;
}
@media screen and (min-width:1630px){
    .search-box2{
        margin-top:0px;
        margin-left:10px;
    }
}
</style>
