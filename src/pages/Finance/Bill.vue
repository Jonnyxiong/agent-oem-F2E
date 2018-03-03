<template lang="pug">
    div.page-bill
        .bill-header 
            .grid-list-head 
                .grid-tab.active 短信帐单
        .p-20
            a(href="javascript:;", v-on:click="exportReport" ).btn.btn-md.btn-green.search-btn.ml10 下载报表
        div.p-20.mt20
            .grid-table-head 短信账单报表
            //- .clearfix
                .item
                    .title 行业：
                        span.hy
                    .clearfix.count
                        .fl.name 剩
                            span.fff 占位
                            | 余：
                        .fl.num.surplus
                            span {{headerData.agentPoolRemainNumData.hy_remain_num}}
                            | 条
                    .clearfix.count
                        .fl.name 累计购买：
                        .fl.num 
                            span {{headerData.data.hy_total_purchase_number}}
                            | 条
                    .clearfix.count
                        .fl.name 累计卖出：
                        .fl.num 
                            span {{headerData.data.hy_remain_rebate_number}}
                            | 条
                .item
                    .title 验证码短信：
                        span.sms
                    .clearfix.count
                        .fl.name 剩
                            span.fff 占位
                            | 余：
                        .fl.num.surplus
                            span {{headerData.agentPoolRemainNumData.yzm_remain_num}}
                            | 条
                    .clearfix.count
                        .fl.name 累计购买：
                        .fl.num 
                            span {{headerData.data.yzm_total_purchase_number}}
                            | 条
                    .clearfix.count
                        .fl.name 累计卖出：
                        .fl.num 
                            span {{headerData.data.yzm_remain_rebate_number}}
                            | 条
                .item
                    .title 通知短信：
                        span.tz
                    .clearfix.count
                        .fl.name 剩
                            span.fff 占位
                            | 余：
                        .fl.num.surplus
                            span {{headerData.agentPoolRemainNumData.tz_remain_num}}
                            | 条
                    .clearfix.count
                        .fl.name 累计购买：
                        .fl.num 
                            span {{headerData.data.tz_total_purchase_number}}
                            | 条
                    .clearfix.count
                        .fl.name 累计卖出：
                        .fl.num 
                            span {{headerData.data.tz_remain_rebate_number}}
                            | 条
                .item
                    .title 营销短信：
                        span.market
                    .clearfix.count
                        .fl.name 剩
                            span.fff 占位
                            | 余：
                        .fl.num.surplus
                            span {{headerData.agentPoolRemainNumData.yx_remain_num}}
                            | 条
                    .clearfix.count
                        .fl.name 累计购买：
                        .fl.num 
                            span {{headerData.data.yx_total_purchase_number}}
                            | 条
                    .clearfix.count
                        .fl.name 累计卖出：
                        .fl.num 
                            span {{headerData.data.yx_remain_rebate_number}}
                            | 条
                .item
                    .title 国际短信：
                        span.international
                    .clearfix.count
                        .fl.name 剩
                            span.fff 占位
                            | 余：
                        .fl.num.surplus
                            span {{headerData.agentPoolRemainNumData.gj_remain_amount }}
                            | 元
                    .clearfix.count
                        .fl.name 累计购买：
                        .fl.num 
                            span {{headerData.data.gj_total_purchase_amount}}
                            | 元
                    .clearfix.count
                        .fl.name 累计卖出：
                        .fl.num 
                            span {{headerData.data.gj_remain_rebate_amount}}
                            | 元
        div.clearfix.search-box
            .datepicker.fl.clearfix
                span.fl 时间：
                el-date-picker.input-datepicker.fl.border(v-model="startTime", type="date", placeholder="请选择开始日期", :picker-options="pickerOptions0", @change="changeStartDay")
                span.fl.p-5 至
                el-date-picker.input-datepicker.fl.border(v-model="endTime", type="date", placeholder="请选择开始日期", :picker-options="pickerOptions1", @change="changeEndDay")
            .clearfix.fl.grid-sel.ml10
                span.fl 订单类型：
                el-select.fl.border.sel(
                    v-model="params.order_type",
                    placeholder="请选择",
                    @change="getBillList(1)"
                )
                    el-option(
                        v-for="item in options",
                        :key="item.value",
                        :label="item.label",
                        :value="item.value"
                    )
            .table-search.fl.clearfix.ml20
                a(href="javascript:;", v-on:click="getBillList(1)").btn.btn-md.btn-green.search-btn.fr.ml10 搜索
                input.input.input-md.fr.input-box(type="text", placeholder="子账户ID/子账户名称/订单编号" @keyup.enter="getBillList(1)", v-model="params.orderInfo")
            
        .p-20
            el-table(:data="bill_list.list", style="width:100%", v-loading="loading")
                el-table-column(prop="rownum", label="序号", min-width="50")
                el-table-column(prop="order_id", label="订单编号", min-width="150")
                el-table-column(label="子账户名称", min-width="80")
                    template(scope="scope")
                        span(v-if="scope.row.name != '云之讯'") {{scope.row.name}} 
                el-table-column(prop="client_id", label="子账户ID", min-width="80")
                el-table-column(prop="product_code", label="产品代码", min-width="80")
                el-table-column(prop="product_name", label="产品名称", min-width="140")
                el-table-column(prop="product_type_str", label="产品类型", min-width="110")
                el-table-column(prop="operator_code_str", label="运营商", min-width="70")
                el-table-column(prop="area_code_str", label="区域", min-width="70")
                el-table-column(label="短信单价(元)", min-width="100")
                    template(scope="scope")
                        //- span(v-if="scope.row.order_type == 0") {{scope.row.unit_price}}
                        span {{scope.row.unit_price}}
                el-table-column(prop="order_amount", label="订单金额(元)", min-width="100")
                el-table-column(label="短信余额变动", min-width="120")
                    template(scope="scope")
                        span {{scope.row.sms_balance_change_flag + scope.row.sms_balance_change_amount}}
                        span(v-if="scope.row.product_type == 2") 元
                        span(v-else) 条
                el-table-column(prop="order_type_str", label="订单类型", min-width="150")
                el-table-column(prop="create_time", label="创建时间", min-width="140")
                el-table-column(prop="due_time", label="到期时间", min-width="140") 
        div.p20.tx-c(v-if="bill_list.totalPage > 1")
            el-pagination( @current-change="handleCurrentChange", layout="prev, pager, next, jumper",:current-page="bill_list.currentPage",:total="bill_list.totalCount", :page-size="bill_list.pageRowCount" ).grid-pagination
</template>
<script src="./Bill.controller.js"></script>
<style lang="scss">
@import '../../assets/styles/config.scss';
.page-bill{
    .bill-header{
        padding: 10px 20px;
        h3{
            font-weight: normal;
            font-size:16px;
            line-height: 44px;
        }
        .item{
            float:left;
            width:20%;
            border:1px solid $border-color;
            padding:10px;
            .title{
                color:$font-weight;
                position: relative;
                margin-bottom:10px;
                padding-left:20px;
                span{
                    position: absolute;
                    left:0;
                    bottom:0px;
                    background-image: url(../../assets/images/sprite.png);
                    background-repeat: no-repeat;
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    vertical-align: middle;
                }
                span.sms {
                    background-position: -16px -16*5 + px;
                }
                span.market {
                    background-position: -16px -16*6 + px;
                }
                span.international {
                    background-position: -16px -16*7 + px;
                }
                span.tz{
                    background-position: -16px -16*10 + px;
                }
                span.hy{
                    background-position: -16px -16*9 + px;
                }
            }
            .count{
                margin-bottom:10px;
                line-height: 30px;
                
            }
            .name{
                font-size:12px;
            }
            .num{
                font-size:20px;
                span{
                    margin-right:5px;
                     color:$font-weight;
                }
            }
            .surplus{
                span{
                    font-size:24px;
                }
               
            }
        }
        .item:nth-child(2){
            border-left:0 none;
            border-right:0 none;
        }
    }
    .search-box{
        .input-datepicker{
            width:145px;
        }
        .sel{
            width:100px;
        }
        .input-box{
            width:200px;
        }
        .search-btn{
            padding:0;
            width:77px;
        }
    }
}
</style>
