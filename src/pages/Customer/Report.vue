<template lang="pug">
    div.page-customer-report 
        h1.page-title.p-20.border-b 客户消耗报表
        div.clearfix.search-box
            .datepicker.fl.clearfix
                span.fl 时间：
                el-date-picker.datesel.fl.border(v-model="startTime", type="date", placeholder="开始日期", :picker-options="pickerOptions0", :clearable="false", :editable="false",@change="changeStartDay" )
                span.fl.p-5 至
                el-date-picker.datesel.fl.border(v-model="endTime", type="date", placeholder="结束日期", :picker-options="pickerOptions1", :clearable="false",:editable="false", @change="changeEndDay" )
            .clearfix.fl.grid-sel
                span.fl 产品类型：
                el-select.fl.border.sel(
                    v-model="params.product_type",
                    @change="getReportTotalList(1)"
                )
                    el-option(
                        v-for="item in product",
                        :key="item.value",
                        :label="item.label",
                        :value="item.value"
                    )
            .table-search.fr.clearfix
                a(href="javascript:;", v-on:click="getReportTotalList(1)").btn.btn-md.btn-green.search-btn.fr 搜索
                input.input.input-md.input-box.fr(v-model="params.customerInfo", type="text", placeholder="客户ID/客户名称", v-on:keyup.enter="getReportTotalList(1)")
        div.p-20
           el-table(:data="report_total_list.list", style="width:100%")
                el-table-column(prop="rownum", label="序号", width="55")
                el-table-column(prop="clientid", label="客户ID", width="65")
                el-table-column(prop="name", label="客户名称")
                el-table-column(prop="product_type_str", label="产品类型", width="100")
                el-table-column(prop="send_num", label="发送条数", width="80")
                el-table-column(prop="success_num", label="成功条数", width="80")
                el-table-column(prop="fail_num", label="失败条数", width="80")
                el-table-column(prop="not_known_num", label="未知条数", width="80")
                el-table-column(prop="wait_send_num", label="待发送", width="80")
                el-table-column(prop="chargeTotal", label="计费条数", width="80")
                el-table-column(label="操作", width="130")
                    template(scope="scope")
                        router-link(:to="{name :'customer_report_daily', query : {id : scope.row.clientid} }").href-green.link-green 查看每日数据
        div.p20.tx-c(v-if="report_total_list.totalPage != 1")
            el-pagination( @current-change="handleCurrentChange", layout="prev, pager, next, jumper",:current-page="report_total_list.currentPage",:total="report_total_list.totalCount", :page-size="report_total_list.pageRowCount" ).grid-pagination
</template>
<script src="./Report.controller.js"></script>
<style lang="scss">
@import '../../assets/styles/config.scss';
.page-customer-report{
    h1{
        span{
            font-size:12px;
            i{
                font-style:normal;
                color:$btn-green;
                font-size:20px;
            }
        }
    }
    .search-box{
        span{
            line-height: 30px;
        }
        .search-btn{
            width:80px;
            margin-left:10px;
            padding:0;
        }
        .datesel{
           width:130px;
        }
        .input-box{
            width:200px;
        }
        .sel{
            width:120px;
        }
        .grid-sel{
            margin-left:60px;
        }
    }
}
</style>
