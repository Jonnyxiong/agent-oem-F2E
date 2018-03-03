<template lang="pug">
    div.page-SendRecord
        a(href="javascript:;", v-on:click="exportReport").btn.btn-md.btn-green.ml20.mt20 下载报表   
        div.head.ml20.mr20.mt20 
            span.ml10 记录列表   
        div(v-loading="isexport")
            div.clearfix.search-box
                span.fl 子账户：
                el-select.fl.border.sel(
                    v-model="params.clientid",
                    placeholder="输入搜索",
                    filterable
                )
                    el-option(
                        v-for="item in options",
                        :key="item.value",
                        :label="item.label",
                        :value="item.value"
                    )
                div.clearfix 
                    span.fl.ml20 &nbsp;发送状态：
                    el-select.fl.border.sel.sendStatus(
                        v-model="params.stateList",
                        placeholder="请选择",
                    )
                        el-option(
                        v-for="item in product",
                        :key="item.value",
                        :label="item.label",
                        :value="item.value"
                    )                   
                    span.fl.ml40 发送时间：
                    el-date-picker.input-datepicker.fl.border(v-model="date", type="date", placeholder="请选择开始时间", align="right", :picker-options="pickerOptions0", @change="changeStartDay")
                    el-time-picker(is-range,v-model="time",placeholder="选择时间范围",@change="changeTime").fl.border.ml10
                    .clearfix.fl.seach-box2
                        span.fl 手机号码：
                        el-input.fl.border.sel.sendCont(
                            v-model="params.phone",
                            placeholder="手机号码"
                        )
                        span.fl.ml20 &nbsp; 发送内容：
                        el-input.fl.border.sel.sendCt(
                            v-model="params.searchContent",
                            placeholder="发送内容"                        
                        )       
                        a(href="javascript:;", v-on:click="getSendRecordList(1)").btn.btn-md.btn-green.search-btn.fl.ml10 查询
            .p-20
                el-table(:data="send_record_list.data", style="width:100%", v-loading="loading")
                    el-table-column(prop="rowNum", label="序号", width="50")
                    el-table-column(prop="phone", label="手机号")
                    el-table-column(prop="content", label="发送内容", width="300")
                    el-table-column(prop="stateStr", label="发送状态")
                        template(scope="scope")
                            //- 发送失败
                            span(v-if="scope.row.state == 4 || scope.row.state == 6").link-red {{scope.row.stateStr}}   
                            //- 发送中
                            span(v-else-if="scope.row.state == 0").link-yellow {{scope.row.stateStr}}
                            //- 发送成功
                            span(v-else-if="scope.row.state == 3").link-green {{scope.row.stateStr}}
                            //- 未知
                            span(v-else-if="scope.row.state == 1").link-grey {{scope.row.stateStr}}
                            //- 拦截
                            span(v-else).link-red {{scope.row.stateStr}}
                    el-table-column(prop="errorcodeStr", label="状态码")
                    el-table-column(prop="dateStr", label="发送时间")
                    el-table-column(prop="chargeNum", label="计费条数")
        .p20.tx-c(v-if="send_record_list.totalPage > 1")
            el-pagination( @current-change="handleCurrentChange", layout="prev, pager, next, jumper",:current-page="send_record_list.page",:total="send_record_list.totalRecord", :page-size="send_record_list.rows" ).grid-pagination                                                         
</template>
<script src="./SendRecord.controller.js"></script>
<style lang="scss">
@import '../../assets/styles/config.scss';
.page-SendRecord{
    .head{
        height: 40px;
        font-size: 16px;
        line-height: 40px;
        color: #333333;
        border-bottom: 1px solid #e7e7e7;
        background-color: #f9f9f9;
    }
    .sendStatus{
        width: 160px !important;        
    }
    .sendCont{
        width: 190px !important;
    }
    .sendCt{
        width: 350px !important;        
    }
    .seach-box2{
        margin-top:10px;
    }
    @media screen and (min-width:2043px){
        .seach-box2{
            margin-top:0px;
        }
    }
}

</style>
