<template lang="pug">
    div.page-invoicelist
        div.clearfix.search-box
            .clearfix.fl.grid-sel.mt10
                input.input.input-md(type="text", placeholder="申请ID/发票金额/发票抬头", v-model="params.applicationOEM", @keyup.enter="getInvoiceList(1)" )
            .clearfix.fl.grid-sel.mt10
                span.fl 申请状态：
                el-select.fl.border.sel(
                    v-model="params.status",
                    placeholder="请选择",
                    @change="getInvoiceList(1)"
                )
                    el-option(
                        v-for="item in status_type",
                        :key="item.value",
                        :label="item.label",
                        :value="item.value"
                    )
            .clearfix.fl.mt10
                span.fl 申请时间：
                el-date-picker.fl.border(v-model="datetime",type="datetimerange",range-separator="~",placeholder="选择时间范围",v-on:change="dateHandle",:picker-options="pickerOptions")
            .fl.clearfix.mt10.ml10
                a(href="javascript:;", v-on:click="getInvoiceList(1)").btn.btn-md.btn-green.search-btn.fr.mr10 查询
        div
            el-table(:data="invoice_list.data", style="width:100%", v-loading="loading")
                el-table-column(prop="rowNum", label="序号", width="50")
                el-table-column(prop="invoiceId", label="申请ID", width="130")
                el-table-column(prop="invoiceAmountStr", label="发票金额", min-width="90")
                el-table-column(prop="invoiceProject", label="开票项目", min-width="80")
                el-table-column(prop="invoiceTypeStr", label="发票类型", min-width="100")
                el-table-column(prop="invoiceBodyStr", label="开票主体")
                el-table-column(prop="invoiceHead", label="发票抬头",width="280")
                    template(scope="scope")
                        .ellipsis(:title="scope.row.invoiceHead") {{scope.row.invoiceHead}}
                el-table-column(prop="creditCode", label="统一社会信用代码", min-width="180")
                    template(scope="scope")
                        div(v-if="scope.row.invoiceBody == 2") {{scope.row.creditCode}}
                el-table-column(prop="applicantStr", label="申请人")
                el-table-column(prop="createTimeStr", label="申请时间", width="140")
                el-table-column(prop="statusStr", label="申请状态")
                el-table-column(prop="updateTimeStr", label="更新时间", width="140")
                el-table-column(prop="remark", label="备注",width="280")
                    template(scope="scope")
                        .ellipsis(:title="scope.row.remark") {{scope.row.remark}}
                el-table-column(prop="auditFailCause", label="不通过原因",width="280")
                    template(scope="scope")
                        .ellipsis(:title="scope.row.auditFailCause") {{scope.row.auditFailCause}}
                el-table-column(label="操作",width="140",fixed="right")
                    template(scope="scope")
                        a(href="javascript:;",v-if="true",v-on:click="view(scope.row.id, scope.row.invoiceType)").link-green.mr10 查看
                        a(href="javascript:;",v-if="scope.row.status == 0",v-on:click="beforeCancel(scope.row.id, scope.row.invoiceId, scope.row.status, scope.row.updateTime)").link-green 取消
        div.p20.tx-c(v-if="invoice_list.totalPage > 1")
            el-pagination(@current-change="handleCurrentChange", layout="prev, pager, next, jumper",:current-page="invoice_list.page",:total="invoice_list.totalRecord", :page-size="invoice_list.rows" ).grid-pagination
        .mask(v-if="isShowInvoice")  
            .mask-ctx
                .mask-header 查看发票申请记录
                    span.fa.fa-close(v-on:click="close")    
                .ctx
                    .head-tips.p-10(v-if="invoice.invoiceType == 1") 普票信息
                    .head-tips.p-10(v-if="invoice.invoiceType == 2") 增值发票信息
                    .warp
                        .clearfix.col-12
                            .col-6
                                .item 申请ID：{{invoice.invoiceId}}
                                .item 开票项目：{{invoice.invoiceProject}}
                                .item 发票金额：{{invoice.invoiceAmountStr}}
                                .item 发票类型：{{invoice.invoiceTypeStr}}
                                .item 开票主体：{{invoice.invoiceBodyStr}}
                                .item 发票抬头：{{invoice.invoiceHead}}
                                .item(v-if="invoice.invoiceType == 2") 统一社会信用代码：{{invoice.creditCode}}
                                .item(v-if="invoice.invoiceType == 1") 备注：{{invoice.remark}}
                                .item(v-if="invoice.invoiceType == 2") 公司注册地址：{{invoice.companyRegAddr}}
                            .col-6
                                .item(v-if="invoice.invoiceType == 2") 基本户开户银行：{{invoice.bank}}
                                .item(v-if="invoice.invoiceType == 2") 基本户开户银行账号：{{invoice.bankAccount}}
                                .item(v-if="invoice.invoiceType == 2") 公司固定电话：{{invoice.telphone}}
                                .item(v-if="invoice.invoiceType == 1 && invoice.invoiceBody == 2") 统一社会信用代码：{{invoice.creditCode}}
                                .item(v-if="invoice.invoiceType == 1") 电子邮箱：{{invoice.email}}
                                .item 申请人：{{invoice.applicantStr}}
                                .item 申请时间：{{invoice.createTimeStr}}
                                .item 申请状态：{{invoice.statusStr}}
                                .item(v-if="invoice.status == 2") 不通过原因：{{invoice.auditFailCause}}
                                .item 更新时间：{{invoice.updateTimeStr}}
                                .item(v-if="invoice.invoiceType == 2") 备注：{{invoice.remark}}
                    .head-tips.p-10.mt10(v-if="invoice.invoiceType == 2") 收件人信息
                    .warp(v-if="invoice.invoiceType == 2")
                        .clearfix.col-12
                            .col-6
                                .item
                                    span.link-red * 
                                    |收件人：{{invoice.toName}}
                                .item 
                                    span.link-red * 
                                    |收件人地址：{{invoice.toAddr}}
                            .col-6
                                .item 
                                    span.link-red * 
                                    |收件人手机：{{invoice.toPhone}}
                                .item 收件人QQ：{{invoice.toQq}}
                        .col-12
                            .item 
                                span.link-red * 
                                |详细地址：{{invoice.toAddrDetail}}
                    .head-tips.p-10.mt10(v-if="invoice.status == 4 && invoice.invoiceType == 2") 邮寄快递信息
                    .warp(v-if="invoice.status == 4 && invoice.invoiceType == 2")
                        .clearfix.col-12
                            .col-6
                                .item 快递公司：{{invoice.expressCompanyStr}}
                            .col-6
                                .item 快递单号：{{invoice.expressOrder}}
                    .p10.tx-c
                        a(href="javascript:;",style="width:200px;",v-on:click="close").btn.btn-green.btn-md 关闭

</template>
<script src="./InvoiceList.controller.js"></script>
<style lang="scss" scoped>
@import '../../assets/styles/config.scss';
.mask-ctx{
    background-color: #FFF;
    width:600px;
    position: absolute;
    top:50%;
    left:50%;
    transform : translatex(-50%) translateY(-50%);
    .ctx{
        padding:20px 20px;
        .warp{
            margin-top:10px;
            border:1px dashed $border-color;
            padding:10px;
        }
        .item{
            padding:5px 0;
            word-break: break-all;
        }
      
    }
}
</style>
<style lang="scss">
@import '../../assets/styles/config.scss';
.page-invoicelist{
    .search-box{
        margin-bottom:10px;
        padding:0;
        .sel{
            width:130px;
        }
        .input{
            width: 250px;
        }
        .search-btn{
            padding:0;
            width:75px;
        }
        .grid-sel{
            margin-right:60px;
        }
    }
    
}
</style>
