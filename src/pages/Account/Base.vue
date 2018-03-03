<template lang="pug">
    div.page-base-info
        .clearfix(v-loading="loading")
            div.fl.base-left
                div.clearfix.item
                    div.title.char
                        span 用户ID
                        | :
                    div.desc {{baseInfo.agent_id}}
                div.clearfix.item
                    div.title
                        span 用户名称
                        | :
                    div.desc  {{baseInfo.agent_name}}
                //- div.clearfix.item
                //-     div.title
                //-         span 代理商简称
                //-         | :
                //-     div.desc {{baseInfo.shorter_name}}
                div.clearfix.item
                    div.title
                        span 用户状态
                        | :
                    div.desc {{baseInfo.status}}
                div.clearfix.item
                    div.title.char4
                        span 认证状态
                        | :
                    div.desc {{baseInfo.oauth_status}}
                div.clearfix.item.char4
                    div.title
                        span 认证时间
                        | :
                    div.desc {{baseInfo.oauth_date}}

                div.clearfix.item.char4
                    div.title
                        span 联系地址
                        | :
                    div.desc {{baseInfo.address}}
                div.clearfix.item.char4
                    div.title
                        span 证件类型
                        | :
                    div.desc {{baseInfo.id_type}}
                div.clearfix.item.char4
                    div.title
                        span 证件号码
                        | :
                    div.desc {{baseInfo.id_nbr}}
            div.fl.base-right
                div.clearfix.item
                    div.title.char4
                        span 联系电话
                        | :
                    div.desc {{user.mobile}}
                div.clearfix.item
                    div.title.char4
                        span 创建时间
                        | :
                    div.desc {{baseInfo.create_time}}
                div.clearfix.item
                    div.title.char4
                        span 修改时间
                        | :
                    div.desc {{baseInfo.update_time}}
</template>
<script src="./Base.controller.js"></script>
<style lang="scss">
.page-base-info {
    padding: 25px 30px;
    .item {
        margin-bottom: 20px;
        .title {
            float: left;
            line-height: 16px;
            height:16px;
        }
        .desc {
            width:310px;
            float: left;
            line-height: 16px;
            
        }
    }
    .base-left {
        width:395px;
        .title {
            width: 85px;
        }
        .char {
            span {
                letter-spacing: 3px;
            }
        }
        .char4 {
            position: relative;
            left:1px;
            span {
                letter-spacing: 3px;
            }
        }
    }
    .base-right{
        width:495px;
        .title{
            width:120px;
            text-align: right;
        }
        .char4{
            span{
                letter-spacing: 3px;
            }
        }
    }
}
</style>
