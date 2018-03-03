<template lang="pug">
    div.page-own
        .border-b.own-header
            h2 返点账单
                //- span (授信额度：{{bill_data.credit_balance}}元)
            .clearfix.col-12
                .col-4.item  剩余金额：
                    span {{bill_data.rebate_income}}
                    | 元
                .col-4.item 累计收入返点：
                    span {{bill_data.accumulated_rebate_income}}
                    | 元
                .col-4.item 累计支出返点：
                    span {{bill_data.accumulated_rebate_pay}}
                    | 元
        div.clearfix.search-box
            .clearfix.fl.grid-sel
                span.fl 财务类型：
                el-select.fl.border.sel(
                    v-model="params.financial_type",
                    placeholder="请选择",
                    @change="getRebateList(1)"
                )
                    el-option(
                        v-for="item in financial",
                        :key="item.value",
                        :label="item.label",
                        :value="item.value"
                    )
            .clearfix.fl
                span.fl 业务类型：
                el-select.fl.border.sel(
                    v-model="params.payment_type",
                    placeholder="请选择",
                    @change="getRebateList(1)"
                )
                    el-option(
                        v-for="item in payment",
                        :key="item.value",
                        :label="item.label",
                        :value="item.value"
                    )
            .table-search.fr.clearfix
                a(href="javascript:;", v-on:click="exportReport" ).btn.btn-md.btn-green-block.search-btn.fr 下载报表
                a(href="javascript:;", v-on:click="getRebateList(1)").btn.btn-md.btn-green.search-btn.fr.mr10 搜索
                input.input.input-md.fr.input-box.mr10(type="text", placeholder="订单编号", v-model="params.order_id", @keyup.enter="getRebateList(1)" )
        .p-20
            el-table(:data="rebate_list.list", style="width:100%", v-loading="loading")
                el-table-column(prop="rownum", label="序号", width="50")
                el-table-column(prop="id", label="业务单号", width="80")
                el-table-column(prop="financial_type_str", label="业务类型", width="90")
                el-table-column(prop="payment_type_str", label="财务类型", width="80")
                el-table-column(prop="balance", label="金额(元)", width="100")
                el-table-column(prop="order_id", label="订单编号", width="160")
                el-table-column(prop="id", label="操作者", width="60")
                el-table-column(prop="remark", label="备注", width="160")
                el-table-column(prop="create_time", label="创建时间") 
        div.p20.tx-c(v-if="rebate_list.totalPage != 1")
            el-pagination( @current-change="handleCurrentChange", layout="prev, pager, next, jumper",:current-page="rebate_list.currentPage",:total="rebate_list.totalCount", :page-size="rebate_list.pageRowCount" ).grid-pagination
</template>
<script src="./Rebate.controller.js"></script>
<style lang="scss">
@import '../../assets/styles/config.scss';
.page-own{
    .own-header{
         padding:15px 20px 20px;
         h2{
             line-height: 36px;
             font-weight: normal;
             font-size:16px;
             span{
                 color:$font-light;
                 font-size:12px;
             }
         }
         .item{
             line-height: 56px;
             border:1px solid $border-color;
             padding:0 20px;
             span{
                 font-size:24px;
                 color:$font-weight;
             }
             &:nth-child(2){
                 border-left:0 none;
                 border-right:0 none;
             }
         }
    }
    .search-box{
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
