<template lang="pug">
    div.content-test
        .tip 检测到敏感内容属于绝对拦截！
        div.test-body
            .grid-test
                span.title 短信内容:&nbsp;
                textarea(placeholder="要检查的内容", v-model="params.content")
            .clearfix          
                a(href="javascript:;",v-on:click="getTest").btn.btn-lg.btn-green.search-btn.ml67.mt20 开始测试
                a(href="javasciprt:;",v-on:click="clearAll").btn.btn-lg.btn-green-block.search-btn.ml67.mt20 清空内容 
        div.mask(v-if="showMask")
            div.mask-ctx.result
                div.mask-header 测试结果
                    span.fa.fa-close(v-on:click="close")     
                .mt50.clearfix.ct(v-if="resultTrue")
                    span.tx-c.sd 无敏感词
                .ctx(v-if="resultFail")
                    .cont(v-html="resultCont")
                .clearfix          
                    a(href="javascript:;" v-on:click="close").btn.btn-lg.btn-green.mt20.sure-btn 确定
</template>
<script src="./Test.controller.js"></script>
<style lang="scss">
@import '../../assets/styles/config.scss';
.content-test{
    .tip{
        line-height: 40px;
        border:1px solid $green;
        padding:0 10px;
        background-color: #f3fff8;
        margin-top:20px;
        color:$green;
    }
    .grid-test{
        position: relative;
        padding-left:67px;
        .title{
            position: absolute;
            top:0;
            left: 0;
            line-height: 36px;
        }
        textarea{
            resize: none;
            display: block;
            width:100%;
            height: 150px;
            padding:8px;
            outline: 0 none;
        }
    }
    .test-body{
        padding-top: 20px;
        font-size: 15px;
        .sel{
            width: 398px;
        }
        .clearfix{
            .sms-textarea{
                width: 400px;
                vertical-align:top;
            }
            .ml67{
                margin-left: 67px;
            }
        }
                
    }
    .result{
        background-color: #FFF;
        width:420px;
        min-height: 200px;
        .mask-header{
            text-align: center;
        }
        .ct{
            text-align: center
        }
        .sd{
            padding-top: 40px;
            font-weight: 700;
            font-size: 20px;
            color: green;
            font-weight: 700;
        }
        .sure-btn{
            margin-left: 152px;
            margin-bottom:10px;
            width: 120px
        }
        .refuse{
            font-size: 20px;
            color: red;
            font-weight: 700;
        }
        .ctx{
            padding:10px;
            .cont{
                padding:10px;
                height: 340px;
                border:1px solid $border-color;
                span{
                    color:#FFF;
                    background-color: #FF0000;
                }
            }
        }
    }
}
</style>

