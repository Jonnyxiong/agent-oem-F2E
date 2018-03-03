<template lang="pug">
    div.page-index#page-index
        div.clearfix.grid-info
            .col-4.item()
                div.bg-fff.item-ctx
                    .cell-title.clearfix 账户信息
                    .cell-ctx
                        .account-info
                            .col-12.clearfix
                                img(src="./img/backindex.png").fl
                                .fl
                                    div.name(style="width:260px;height:30px;").ellipsis {{baseInfo.agent_name}}
                                    .clearfix
                                        div.status(v-bind:class="[baseInfo.oauth_status =='认证通过' ? 'green' : 'red']").fl {{baseInfo.oauth_status}}
                                        router-link(to="/account/info/base/auth",v-if="baseInfo.oauth_status != '认证通过'").btn.btn-green.btn-md.auth.fr.ml30 认证
                            div.balance.mt15 可用额度：
                                span {{headerData.agent_account_data.available_line}} 元
                            div.balance.clearfix 账户余额：
                                span {{headerData.agent_account_data.balance}} 元
                                a(href="javascript:;",v-on:click="openOnlineRecharge").btn.btn-md.btn-green.fr 在线充值
                        .line 
                        .account-child( v-bind:class="{ countChild: alarmCount != 0}")
                            .clearfix.child 子账户数量: 
                                span {{count}}个
                                router-link(to="/customer/selfsevicelayout/manager/open").link-green.fr 自助开户
                            .clearfix.less(v-if="alarmCount != 0")
                                span 有{{alarmCount}}个短信不足子账户
                                router-link(to="/customer/finance").link-green.fr 前往充值
            .col-4.item
                div.bg-fff.item-ctx
                    .cell-title.clearfix 今日数据
                        router-link(to="/customer/sendlayout/sendrecord").fr.link-green 发送记录
                    .cell-ctx.p-15
                        .clearfix.account-box
                            .title.fl 子账户：
                            el-select(v-model="value",placeholder="请选择子账户",filterable,v-on:change="changeClient").border.sel
                                el-option(v-for="item in clientOptions",:label="item.label",:value="item.value")
                        .submit 今日提交量
                        .submit-num {{today.submitTotal || 0}}条
                        .send 发送情况
                        .clearfix.send-num
                            .fl.grid1 发送中
                                span.orange {{today.sending | assetsData}}
                            .fl.grid2 发送成功
                                span.green {{today.sendSuccess | assetsData}}
                            .fl.grid3 拦截
                                span.red {{lanjie}}
                            .fl.grid1 未知
                                span.orange {{today.unknown | assetsData}}
                            .fl.grid2 发送失败
                                span.red {{today.sendFail | assetsData}}
            .col-4.item
                div.bg-fff.item-ctx
                    .cell-title.clearfix 公告
                        router-link(to="/notice/notice").fr.link-green 更多公告
                    .cell-ctx
                    ul.notice-list
                        li(v-for="item in notice") 
                            router-link(:to="{name : 'notice_view', query : {noticeId : item.id}}").relative.li-box 
                                span.point.absolute(v-bind:class="[item.isTop == 1 ? 'isTop' : '' ]") 
                                span.name-box {{ item.noticeName }}
                                span.time.absolute [{{ item.releaseTimeToStr }}]
                            
        div.p-10
            div.grid-top.bg-fff
                div
                    h2 短信库存
                        router-link(to="/sms/smspurchaselayout/purchase",style="font-size:14px;font-weight:normal;").fr.link-green.mr10 库存不足？前往购买
                div.clearfix.p-10
                    .ctx
                        .item(v-on:click="jumpPage(0)")
                            div.icon
                                span.hy
                            p.tx-c.count {{headerData.data.hy_remain_num}}
                                span 条
                            p.tx-c.title 剩余行业短信
                            router-link(:to={path:"/remain",query : {type : 0}}, v-show="headerData.agent_pool_due_time_data.hy_remain_num != 0").tip.tx-c.bk 有{{headerData.agent_pool_due_time_data.hy_remain_num}}条即将到期
                    .ctx
                        .item(v-on:click="jumpPage(3)")
                            div.icon
                                span.tz
                            p.tx-c.count {{headerData.data.yzm_remain_num}}
                                span 条
                            p.tx-c.title 剩余验证码短信
                            router-link(:to={path:"/remain",query : {type : 0}}, v-show="headerData.agent_pool_due_time_data.yzm_remain_num != 0").tip.tx-c.bk 有{{headerData.agent_pool_due_time_data.yzm_remain_num}}条即将到期
                    .ctx
                        .item(v-on:click="jumpPage(4)")
                            div.icon
                                span.sms
                            p.tx-c.count {{headerData.data.tz_remain_num}}
                                span 条
                            p.tx-c.title 剩余通知短信
                            router-link(:to={path:"/remain",query : {type : 0}}, v-show="headerData.agent_pool_due_time_data.tz_remain_num != 0").tip.tx-c.bk 有{{headerData.agent_pool_due_time_data.tz_remain_num}}条即将到期
                    .ctx
                        .item(v-on:click="jumpPage(1)")
                            div.icon
                                span.market
                            p.tx-c.count {{headerData.data.yx_remain_num}}
                                span 条
                            p.tx-c.title 剩余会员营销短信
                            router-link(:to={path:"/remain",query : {type : 0}}, v-show="headerData.agent_pool_due_time_data.yx_remain_num != 0").tip.tx-c.bk 有{{headerData.agent_pool_due_time_data.yx_remain_num}}条即将到期
                    .ctx
                        .item(v-on:click="jumpPage(2)")
                            div.icon
                                span.international
                            p.tx-c.count {{headerData.data.gj_remain_amount}}
                                span 元
                            p.tx-c.title 剩余国际短信余额
                            router-link(:to={path:"/remain",query : {type : 0}}, v-show="headerData.agent_pool_due_time_data.gj_remain_amount != 0").tip.tx-c.bk 有{{headerData.agent_pool_due_time_data.gj_remain_amount}}元即将到期
        div.p-10
            div.grid-top.bg-fff
                div
                    h2 一周短信提交量
                        router-link(to="/customer/report/pre",style="font-size:14px;font-weight:normal;").fr.link-green.mr10 消耗报表
            .chart
                .clearfix.mb15
                    span 子账户：
                    el-select(v-model="value1",placeholder="请选择子账户",filterable,v-on:change="changeWeekSubmit").border.sel
                        el-option(v-for="item in clientOptions",:label="item.label",:value="item.value")
                #echart(v-loading="chartLoading")
        div.mask(v-if="showMask")
            div.mask-ctx
                div.mask-header {{remainProduct}}
                    span.fa.fa-close(v-on:click="close")
                div.ctx
                    el-table(:data="clientRemainData", style="width:100%", v-loading="loading",:summary-method="getSummaries",show-summary)
                        el-table-column(prop="client_id", label="客户ID", width="60")
                        el-table-column(prop="client_name", label="客户名称", width="100")
                        el-table-column(prop="product_type_str", label="产品类型", width="70")
                        el-table-column(prop="operator_code_str", label="运营商", width="50")
                        el-table-column(prop="area_code_str", label="区域", width="50")
                        el-table-column(prop="account_balance", label="剩余条数", width="100")
                        el-table-column(prop="due_time", label="到期时间")
        OnlineRecharge(:price="headerData.agent_account_data.balance",v-on:goBack="closeOnlineRecharge",v-if="showOnlineRecharge",v-on:open="openPayDialog")
        PayDialog(v-if="showPayDialog",v-on:close="closePayDialog")
</template>
<script src="./Index.controller.js"></script>
<style lang="scss">
@import '../../assets/styles/config.scss';
.page-index {
    .green{
        color:$green;
    }
    .red{
        color:#FF0000;
    }
    padding-top:10px;
    background-color:#F8F8F8;
    .account-box{
        padding:20px 0;
        position: relative;
        padding-left:58px;
        .title{
            width:58px;
            line-height: 30px;
            position: absolute;
            left: 0;
            top:20px;
        }
        .sel{
            width:100%;
        }
        .el-input__inner{
            height:30px;
        }
        .el-select-dropdown__item{
            height:30px;
        }
    }
    .grid-info{
        padding: 0 5px;
        .item{
            padding:0 5px;
            .item-ctx{
                height:290px;
            }
            .line{
                height: 10px;
                background-color: #F8F8F8;
            }
            .grid1{
                padding-left:20px;
                width:135/386*100%;
                line-height: 24px;
            }
            .grid2{
                width:134/386*100%;
                line-height: 24px;
            }
            .grid3{
                width:115/386*100%;
                line-height: 24px;
            }
        }
        .cell-title{
            border-bottom:1px solid $border-color;
            line-height: 35px;
            padding:0 10px;
        }
        .account-info{
            padding: 15px 10px 10px;
            img{
                margin-right:25px;
                width:66px;
                height:66px;
            }
            .name,.status{
                line-height: 30px;
            }
            .auth{
                width:88px;
                margin-top:30px;
            }
            .balance{
                line-height: 30px;
                color:#666;
                span{
                    color:#333;
                    font-weight: 800;
                    font-size:16px;
                }
            }
        }
       
        .account-child{
            padding:25px 18px;
            .less{
                line-height: 26px;
                span {
                    color:#FF0000;
                    font-size:12px;
                }
            }
            .child{
                line-height: 28px;
                color:#666;
                span{
                    color:#333;
                    font-weight: 800;
                    font-size:16px;
                }
            }
        }
         .countChild{
            padding:12px 18px;
        }
        .notice-list{
            margin-top: 5px;
            li {
                height: 30px;
                line-height: 30px;
                width: 100%;
                box-sizing: border-box;
                position: relative;
                padding-left: 30px;
                &:hover{
                    cursor: pointer;
                }

                .li-box{
                    position: relative;
                    display: block;
                    width: 100%;
                    padding-right: 40px;
                    .point{
                    display: block;
                    position: absolute;
                    top:12px;
                    left:0;
                    width:7px;
                    height:7px;
                    border-radius: 50%;
                    background-color: #e0dddd;
                    
                    }
                    .name-box{
                        display: block;
                        width: 95%;
                        padding-left: 20px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .time{
                        top: 0;
                        right: 0;
                    }
                }
                .isTop{
                        background-color: #639e7d !important;
                }
            }

        }
        .submit{
            color:#666;
            padding:0 18px;
            position: relative;
            line-height: 18px;
            margin-top:16px;
            margin-bottom:16px;
            &::after{
                content:'';
                width:7px;
                height:7px;
                border-radius: 50%;
                position: absolute;
                top:5px;
                left:0;
                background-color: #e0dddd;
            }
        }
        .send{
            color:#666;
            padding:0 18px;
            position: relative;
            line-height: 18px;
            margin-bottom:10px;
            &::after{
                content:'';
                width:7px;
                height:7px;
                border-radius: 50%;
                position: absolute;
                top:5px;
                left:0;
                background-color: #e0dddd;
            }
        }
        .send-num{
            padding-bottom:12px;
            span{
                font-size:16px;
                font-weight: 800;
                margin-left:5px;
            }
            .orange{
                color:#ff8a00;
            }
            .green{
                color:$green;
            }
            .red{
                color:#ef0000;
            }
        }
        .submit-num{
            color:#333;
            font-size:16px;
            font-weight: 800;
            padding:0 18px 26px;
        }
    }
    .grid-top {
        margin-top:10px;
        h2{
            padding-left:10px;
            line-height: 35px;
            font-size:18px;
            font-weight:300;
            border-bottom:1px solid $border-color;
        }
        .ctx{
            padding:15px 5px;
            width:20%;
            float:left;
        }
        .item {
            height: 160px;
            background-color: #F8F8F8;
            cursor: pointer;
            overflow: hidden;
            &:hover{
                background-color: #F0F0F0;
            }
            .icon {
                width: 34px;
                height: 34px;
                margin: 20px auto 20px;
                line-height: 50px;
                text-align: center;
                span {
                    background-image: url(./img/icon-index.png);
                    background-repeat: no-repeat;
                    display: inline-block;
                    width: 34px;
                    height: 34px;
                    vertical-align: middle;
                }
            }

            span.sms {
                background-position: 0 -34*2 + px;
            }
            span.market {
                background-position: 0 -34*3 + px;
            }
            span.international {
                background-position: 0 -34*4 + px;
            }
            span.tz{
                background-position: 0 -34 + px;
            }
            span.hy{
                background-position: 0 0px;
            }
            .count {
                font-size: 24px;
                color: $font-weight;
            }
            .title {
                font-size: 12px;
                margin-top: 15px;
            }
            .tip {
                font-size: 12px;
                color: $link-red;
                margin-top: 15px;
            }
        }
        
    }
    .grid-top-right {
        width: 225px;
        .chart {
            height: 220px;
            .total{
                padding : 10px;
                height:48px;
                span{
                    font-size: 24px;
                }
            }
            .canvas{
                height:220-48 + px;
            }
        }
    }
    .chart{
        background-color: #FFF;
        padding:15px 25px;
    }
    #echart{
        height:300px;
    }
    @media screen and (max-width:1500px){
        .send-num{
            font-size:12px;
        }  
    }
    @media screen and (min-width:1600px){
        #echart{
            height:400px;
        }
    }
    @media screen and (min-width:1800px){
        #echart{
            height:500px;
        }
    }
}
</style>
<style lang="scss" scoped>
.mask-ctx{
    background-color: #FFF;
    width:580px;
    position: absolute;
    top:50%;
    left:50%;
    transform : translatex(-50%) translateY(-50%);
    .ctx{
        padding:20px;
        
    }
}
</style>

