<template lang="pug">
    div.page-customer-report 
        a(href="javascript:;", v-on:click="exportReport()",title="导出预付费子账户消耗报表").btn.btn-md.btn-green.search-btn.ml20.mt20 下载报表   
        div.head.ml20.mr20.mt20 
            span.ml10 报表列表
        div.clearfix.search-box
            .clearfix.fl.grid-sel
                span.fl 产品类型：
                el-select.fl.border.sel(
                    v-model="params.smstype",
                    @change="getReportTotalList(1)"
                )
                    el-option(
                        v-for="item in smstypes",
                        :key="item.value",
                        :label="item.label",
                        :value="item.value"
                    )
            .datepicker.fl.clearfix.ml40
                span.fl 时间：
                el-date-picker.datesel.fl.border(v-model="startTime", type="date", placeholder="开始日期", :picker-options="pickerOptions0", :clearable="false", :editable="false",@change="changeStartDay" )
                span.fl.p-5 至
                el-date-picker.datesel.fl.border(v-model="endTime", type="date", placeholder="结束日期", :picker-options="pickerOptions1", :clearable="false",:editable="false", @change="changeEndDay" )
            .table-search.clearfix
                input.input.input-md.input-box.mr10.ml40(v-model="params.customerInfo", type="text", placeholder="子账户ID/子账户名称", v-on:keyup.enter="getReportTotalList(1)")
                a(href="javascript:;", v-on:click="getReportTotalList(1)").btn.btn-md.btn-green.search-btn.mr10 查询
                
        div.p-20
           el-table(:data="report_total_list.list", style="width:100%",v-loading="loading")
                el-table-column(prop="rownum", label="序号", min-width="55")
                el-table-column(prop="clientid", label="子账户ID", min-width="65")
                el-table-column(prop="name", label="子账户名称")
                el-table-column(prop="smstype_str", label="短信类型", min-width="100")
                el-table-column(prop="send_num", label="提交条数", min-width="80")
                el-table-column(prop="chargeTotal", label="计费条数", min-width="80")
                el-table-column(prop="success_num", label="成功条数", min-width="80")
                el-table-column(prop="not_known_num", label="未知条数", min-width="80")
                el-table-column(prop="fail_num", label="失败条数", min-width="80")
                el-table-column(prop="wait_send_num", label="待发送条数", min-width="80")
                el-table-column(prop="intercept_num", label="拦截条数", min-width="80")
                el-table-column(label="操作", min-width="130")
                    template(scope="scope")
                        a(v-if="scope.row.clientid != null",href="javascript:;", v-on:click="showDaily(scope.row)").href-green.link-green 查看每日数据
        div.p20.tx-c(v-if="report_total_list.totalPage != 1")
            el-pagination( @current-change="handleCurrentChange", layout="prev, pager, next, jumper",:current-page="report_total_list.currentPage",:total="report_total_list.totalCount", :page-size="report_total_list.pageRowCount" ).grid-pagination
</template>
<script src="./ReportPre.controller.js"></script>
<style lang="scss">
@import '../../assets/styles/config.scss';
.page-customer-report{
    .top-nav{
        padding-left: 0;
        margin-left: 20px;
    }
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
    .head{
        height: 40px;
        font-size: 16px;
        line-height: 40px;
        color: #333333;
        border-bottom: 1px solid #e7e7e7;
        background-color: #f9f9f9;
    }
    .search-box{
        span{
            line-height: 30px;
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
        .datesel{
           width:130px;
        }
        .input-box{
            width:200px;
        }
        .sel{
            width:83px;
        }
        .grid-sel{
            margin-left:10px;
        }
    }
}
</style>
