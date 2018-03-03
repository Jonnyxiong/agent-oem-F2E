<template lang="pug">
    div.page-userinfo
        h1.page-title.p-20.border-b.f-lg.f-weight 个人资料
        div.ctx(v-loading="loading")
            //- div.clearfix.item
            //-     div.title.char
            //-         span 管理员ID
            //-         | :
            //-     div.desc {{user.id}}
            //- div.clearfix.item
            //-     div.title
            //-         span 管理员身份
            //-         | :
            //-     div.desc {{user.role_name}}
            div.clearfix.item
                div.title.char4
                    span 邮
                        i.fff 占位
                        |箱
                    | :
                div.desc 
                    span(v-if="!ismodify") {{user.email}}
                    input.input.input-md(type="text", v-model="params.email",v-else ) 
            div.clearfix.item
                div.title.char4
                    span 真实姓名
                    | :
                div.desc 
                    span(v-if="!ismodify" ) {{user.realname}}
                    input.input.input-md(type="text", v-model="params.realName",v-else) 
            div.clearfix.item
                div.title.char4
                    span 联系方式
                    | :
                div.desc 
                    span(v-if="!ismodify") {{user.mobile}}
                    input.input.input-md(type="text", v-model="params.mobile",v-else )
            a.btn.btn-md.btn-green.change(href="javascript:;", v-on:click="changeInfo", v-if="!ismodify") 修改资料
            div.clearfix.btn-group(v-else)
                a.btn.btn-green.btn-md(href="javascript:;", v-on:click="confirmChange").fl.mr10 确认修改
                a.btn.btn-green-block.btn-md(href="javascript:;", v-on:click="cancle").fl 取消
</template>
<script src="./UserInfo.controller.js"></script>
<style lang="scss">
.page-userinfo{
    .ctx{
        padding:25px 30px;
        .btn-group{
            margin-top:30px;
            .btn{
                width:100px;
            }
        }
        .item{
            margin-bottom:10px;
        }
        .title, .desc{
            float:left;
            line-height: 32px;
        }
        .desc{
            margin-left:5px;
            .input{
                width:200px;
            }
        }
        .char{
            position: relative;
            span{
                letter-spacing: 3px;
            }
        }
        .char4{
            position: relative;
            left:-1px;
            span{
                letter-spacing: 4px;
            }
        }
        .change{
            margin-top:30px;
            width:100px;
        }
    }
}
</style>
