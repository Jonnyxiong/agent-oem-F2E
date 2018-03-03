<template lang="pug">
    div.page-payorder
        .own-header
            .grid-list-head 
                .grid-tab.active 支付订单
        .p-20
            .head-tips.tx-l 若存在支付异常情况，请拨打客服热线 ： 0755-36654524 转 0033
        div.clearfix.search-box
            .clearfix.fl.grid-sel
                span.fl 支付方式：
                el-select.fl.border.sel(
                    v-model="params.paymentMode",
                    placeholder="请选择",
                    @change="getPayOrderList(1)"
                )
                    el-option(
                        v-for="item in pay_type",
                        :key="item.value",
                        :label="item.label",
                        :value="item.value"
                    )
            .clearfix.fl.grid-sel
                span.fl 支付状态：
                el-select.fl.border.sel(
                    v-model="params.paymentState",
                    placeholder="请选择",
                    @change="getPayOrderList(1)"
                )
                    el-option(
                        v-for="item in pay_status",
                        :key="item.value"
                        :label="item.label",
                        :value="item.value"
                    )
            .clearfix.fl.grid-sel
                span.fl 支付时间：
                el-date-picker.fl.border(v-model="datetime",type="datetimerange",range-separator="~",placeholder="选择时间范围",v-on:change="dateHandle",:picker-options="pickerOptions")
            .table-search.fl.clearfix
                a(href="javascript:;", v-on:click="getPayOrderList(1)").btn.btn-md.btn-green.search-btn.fr.mr10 查询
                input.input.input-md.fr.input-box.mr10(type="text", placeholder="支付订单号/金额", v-model="params.searchText", @keyup.enter="getPayOrderList(1)" )
        .p-20
            el-table(:data="list", style="width:100%", v-loading="loading")
                el-table-column(prop="rowNum", label="序号", width="50")
                el-table-column(prop="paymentId", label="支付订单号", min-width="120")
                el-table-column(prop="paymentAmountStr", label="金额", min-width="90")
                el-table-column(prop="paymentModeStr", label="支付方式", min-width="80")
                el-table-column(prop="payTimeStr", label="支付时间", min-width="100")
                el-table-column(prop="paymentStateStr", label="支付状态")
                    template(scope="scope")
                        span(v-if="scope.row.paymentState != 5") {{scope.row.paymentStateStr}}
                        span(v-else) 支付成功
                el-table-column(prop="remark", label="备注", min-width="160")
                el-table-column(label="操作",width="360")
                    template(scope="scope")
                        div(v-if="scope.row.paymentState == 0")
                            a(href="javascript:;").btn.btn-white.btn-md 
                                span 支付剩余时间
                                span {{scope.row.countDownStr | timeFilter}}
                            a(href="javascript:;",v-on:click="pay(scope.row.paymentId,scope.row.paymentAmountStr, scope.row.paymentMode)",v-if="scope.row.countDownStr != '' && scope.row.countDownStr >= 0 ").btn.btn-md.btn-green-block.ml10.mr10 立即支付
                            a(href="javascript:;",v-on:click="cancelpay(scope.row.paymentId)",v-if="scope.row.countDownStr != '' && scope.row.countDownStr >= 0 ").btn.btn-md.btn-green-block 取消支付
                            a(href="javascript:;",v-if="scope.row.countDownStr == '' || scope.row.countDownStr <= 0 ").btn.btn-md.btn-disable.ml10.mr10 立即支付
                            a(href="javascript:;",v-if="scope.row.countDownStr == '' || scope.row.countDownStr <= 0 ").btn.btn-md.btn-disable 取消支付
        div.p20.tx-c(v-if="pay_order_list.totalPage > 1")
            el-pagination( @current-change="handleCurrentChange", layout="prev, pager, next, jumper",:current-page="pay_order_list.page",:total="pay_order_list.totalRecord", :page-size="pay_order_list.rows" ).grid-pagination
        OnlineRecharge(:price="order.price",v-on:goBack="closeOnlineRecharge",v-if="showOnlineRecharge",v-on:open="openPayDialog",:directPay="1",:orderId="order.orderId",v-on:refresh="getPayOrderList",:payType="order.payType")
        PayDialog(v-if="showPayDialog",v-on:close="closePayDialog")
</template>
<script src="./PayOrder.controller.js"></script>
<style lang="scss" scoped>
.mask-ctx{
    background-color: #FFF;
    width:500px;
    height:320px;
    position: absolute;
    top:50%;
    left:50%;
    transform : translatex(-50%) translateY(-50%);
    .ctx{
        padding:40px 50px;
        .item{
            margin:0 auto 10px auto;
        }
        .title{
            line-height: 32px;
            width:72px;
        }
        p{
            font-size:12px;
            color:#999;
        }
        .mobile{
            width:320px;
        }
        .price{
            width:160px;
            margin:0 10px;
        }
        .btn{
            display: block;
            width:265px;
            margin:35px auto 0;
        }
    }
}
</style>
<style lang="scss">
@import '../../assets/styles/config.scss';
.page-payorder{
    .head-tips{
        padding-left:15px;
    }
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
        .head-l{
            padding:15px 5px 0 15px;
        }
        .head-r{
            padding:15px 15px 0 5px;
        }
        .own-item{
            background-color:#F8F8F8;
            .right-item1{
                padding:23px 0 12px;
            }
            .right-item2{
                padding-bottom:23px;
            }
             line-height: 30px;
             padding:0 20px;
             .fa{
                 font-size:18px;
                 color:#999;
                 margin-left:10px;
             }
             .left-item{
                 padding:6px 0;
             }
             span{
                 font-size:24px;
                 color:$font-weight;
             }
             &:nth-child(2){
                 border-left:0 none;
                
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
        margin-bottom:10px;
        padding-top:0;
        padding-bottom:0;
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
            margin-top:10px;
            margin-right:60px;
        }
         .table-search{
            margin-top:10px;
        }
    }
    
}
</style>
