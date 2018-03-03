<template lang="pug">
    div.page-own
        .own-header
            .grid-list-head 
                .grid-tab.active 我的账单
            .clearfix.col-12
                .col-7.head-l
                    .own-item  
                        div.clearfix.left-item 可用额度：
                            span {{bill_data.available_line | fix}}
                            | 元
                            a.btn.btn-green.btn-md.fr(href="javascript:;", v-on:click="openSetting") 设置提醒
                        div.clearfix 账号余额：
                            span {{bill_data.balance | fix}}
                            | 元
                            a.btn.btn-green.btn-md.fr(href="javascript:;", v-on:click="openOnlineRecharge") 在线充值
                .col-5.head-r
                    .own-item 
                        div.clearfix.left-item 历史授信：
                            span {{bill_data.credit_balance | fix}}
                            | 元
                        div.clearfix 授信余额：
                            span {{bill_data.current_credit | fix}}
                            | 元      
        div.p-20
            a(href="javascript:;", v-on:click="exportReport").btn.btn-md.btn-green.search-btn 下载报表
        div.p-20.mt20
            .grid-table-head 我的账单报表
        div.clearfix.search-box
            .clearfix.fl.grid-sel
                span.fl 财务类型：
                el-select.fl.border.sel(
                    v-model="params.financial_type",
                    placeholder="请选择",
                    @change="getOwnOrderList(1)"
                )
                    el-option(
                        v-for="item in financial",
                        :key="item.value",
                        :label="item.label",
                        :value="item.value"
                    )
            .clearfix.fl.grid-sel
                span.fl 业务类型：
                el-select.fl.border.sel(
                    v-model="params.payment_type",
                    placeholder="请选择",
                    @change="getOwnOrderList(1)"
                )
                    el-option(
                        v-for="item in payment",
                        :key="item.value"
                        :label="item.label",
                        :value="item.value"
                    )
            .table-search.fl.clearfix
                a(href="javascript:;", v-on:click="getOwnOrderList(1)").btn.btn-md.btn-green.search-btn.fr.mr10 搜索
                input.input.input-md.fr.input-box.mr10(type="text", placeholder="订单号", v-model="params.order_id", @keyup.enter="getOwnOrderList(1)" )
        .p-20
            el-table(:data="own_list.list", style="width:100%", v-loading="loading")
                el-table-column(prop="rownum", label="序号", min-width="50")
                el-table-column(prop="id", label="业务单号", min-width="80")
                el-table-column(prop="financial_type_str", label="财务类型", min-width="90")
                el-table-column(prop="payment_type_str", label="业务类型", min-width="80")
                el-table-column(prop="amount_str", label="金额(元)", min-width="100")
                el-table-column(prop="order_id", label="订单编号", min-width="160")
                    template(scope="scope")
                        span(v-if="scope.row.payment_type == 11") {{scope.row.paymentId}}
                        span(v-else) {{scope.row.order_id}}
                el-table-column(prop="admin_name", label="操作者", min-width="60")
                el-table-column(prop="remark", label="备注", min-width="160")
                el-table-column(prop="create_time", label="创建时间",min-width="160") 
        div.p20.tx-c(v-if="own_list.totalPage != 1")
            el-pagination( @current-change="handleCurrentChange", layout="prev, pager, next, jumper",:current-page="own_list.currentPage",:total="own_list.totalCount", :page-size="own_list.pageRowCount" ).grid-pagination
        div.mask(v-if="showSetting")
            div.mask-ctx
                div.mask-header 可用额度提醒设置
                    span.fa.fa-close(v-on:click="closeSetting")
                div.ctx
                    .clearfix.item
                        .fl.title 手机号码：
                        input.fl.input.mobile(type="text", v-model="creditInfo.alarmPhone")
                    .clearfix.item 当账户可用额度低于
                        input.input.price(type="text", v-model="creditInfo.alarmAmount")
                        | 元时开始提醒
                    p *当余额>=0时，可用额度=余额+授信额度，当余额<0时，可用额度=授信额度，例如：余额为￥100，授信额度为￥1000，则可用额度为￥1100。余额为￥-100，授信额度为￥1000，则可用额度为￥1000当授信额度提醒设置为0元时，则默认不进行提醒。可设置多个提醒号码，使用英文逗号分隔即可
                    a(href="javascript:;", v-on:click="setCredit").btn.btn-green.btn-lg 确定
        div.mask(v-if="showRecord")
            div.mask-ctx
                div.mask-header 授信额度
                    span.fa.fa-close(v-on:click="closeRecord")
                div.p20.small-table(style="height:284px;overflow:auto;")
                    el-table(:data="record_list", style="width:100%", v-loading="loading")
                        el-table-column(prop="amount", label="授信额度(元)", width="120")
                        el-table-column(prop="beginTime", label="开始时间")
                        el-table-column(prop="endTIme", label="结束时间")
        OnlineRecharge(:price="bill_data.balance",v-on:goBack="closeOnlineRecharge",v-if="showOnlineRecharge",v-on:open="openPayDialog")
        PayDialog(v-if="showPayDialog",v-on:close="closePayDialog")
</template>
<script src="./Own.controller.js"></script>
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
