<template lang="pug">
    div.page-report-daily
        div.page-title.p-20.border-b
            a(href="javascript:;",v-on:click="goBack").btn.btn-md.btn-white
                span.fa.fa-angle-left.mr5
                | 返回上一级
        div.clearfix.search-box
            .datepicker.fl.clearfix
                span.fl 时间：
                el-date-picker.input-datepicker.fl.border(v-model="startTime", type="date", placeholder="开始日期", :picker-options="pickerOptions0", @change="changeStartDay")
                span.fl.p-5 至
                el-date-picker.input-datepicker.fl.border(v-model="endTime", type="date", placeholder="结束日期", :picker-options="pickerOptions1", @change="changeEndDay")
            .clearfix.fl.grid-sel
                span.fl 短信类型：
                el-select.fl.border.sel(
                    v-model="params.smstype",
                    @change="getReportDailyList(1)"
                )
                    el-option(
                        v-for="item in smstypes",
                        :key="item.value",
                        :label="item.label",
                        :value="item.value"
                    )
            .table-search.fr.clearfix
                a(href="javascript:;", v-on:click="exportReport()",title="导出预付费客户每日消耗报表").fr.icon-btn
                    span.fa.fa-download
                a(href="javascript:;", v-on:click="getReportDailyList(1)", title="搜索").fr.icon-btn
                    span.fa.fa-search
                input.input.input-md.fr.input-box(type="text", placeholder="客户ID/客户名称", v-model="params.customerInfo",readonly)
        .p-20
            el-table(:data="daily_list.list", style="width:100%", v-loading="loading", show-summary)
                el-table-column(prop="date", label="日期", min-width="100")
                el-table-column(prop="clientid", label="客户ID", min-width="95")
                el-table-column(prop="name", label="客户名称", min-width="90")
                el-table-column(prop="smstype_str", label="短信类型", min-width="55")
                el-table-column(prop="send_num", label="提交条数", min-width="110")
                el-table-column(prop="chargeTotal", label="计费条数", min-width="110")
                el-table-column(prop="success_num", label="成功条数", min-width="110")
                el-table-column(prop="not_known_num", label="未知条数", min-width="110")
                el-table-column(prop="fail_num", label="失败条数", min-width="110")
                el-table-column(prop="wait_send_num", label="待发送", min-width="110")
                el-table-column(prop="intercept_num", label="拦截条数", min-width="110")
                
        div.p20.tx-c(v-if="daily_list.totalPage != 1")
            el-pagination( @current-change="handleCurrentChange", layout="prev, pager, next, jumper",:current-page="daily_list.currentPage",:total="daily_list.totalCount", :page-size="daily_list.pageRowCount" ).grid-pagination
                
</template>
<script src="./ReportDailyPre.controller.js"></script>
<style lang="scss">
@import '../../assets/styles/config.scss';
.page-report-daily{
    .search-box{
        .input-datepicker{
            width:135px;
        }
        .grid-sel{
            margin-left:10px;
        }
        .sel{
            width:83px;
        }
        .search-btn{
            padding:0;
            width:77px;
        }
        .icon-btn{
            line-height: 32px;
            display: inline-block;
            width:35px;
            text-align: center;
            color:$btn-green;
            cursor: pointer;
            &:hover{
                background-color: $btn-green;
                color:#FFF;
            }
        }
    }

}
</style>