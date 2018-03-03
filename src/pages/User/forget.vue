<template lang="pug">
    div.forget-page
        div.line
        div.grid-forget
            h2 找回密码
            div.ctx
                .grid-input.border
                    input(type="text",placeholder="请输入您的注册邮箱", @keyup.enter="sendEmail", v-model=
                    "email")
                .grid-code.border
                    input(type="text",placeholder="请输入图片验证码", @keyup.enter="sendEmail", v-model="code")
                    img.code(alt="图片验证码", :src="imgUrl", v-on:click="getImgCode")
                a(href="javascript:;", v-on:click="sendEmail").btn.btn-super.btn-green.btn-bk 提交
        div.icp
            p.tx-c &copy; 2016 ucpaas.com 版权所有 粤ICP备14046848号
</template>
<script src="./Forget.controller.js"></script>
<style lang="scss" scoped>
@import '../../assets/styles/config.scss';
    .forget-page{
        position: fixed;
        background-color: #e7e7e7;
        width:100%;
        height:100%;
        top:0;
        left:0;
        .line{
            height:5px;
            background-color: $btn-green;
        }
        .grid-forget{
            width:420px;
            position: absolute;
            left:50%;
            top:50%;
            margin-left:-210px;
            transform: translateY(-60%);
            h2{
                text-align: center;
                font-weight: normal;
                line-height: 65px;
                font-size:30px;
            }
            input{
                border:0 none;
                padding:0 10px;
            }
            .grid-input{
                height:46px;
                input{
                    height:44px;
                    line-height: 44px;
                    width:100%;
                }
            }
            .grid-code{
                margin-top:25px;
                position: relative;
                height:46px;
                padding-right:100px;
                input{
                    height:44px;
                    line-height: 44px;
                    width:100%;
                }
                img.code{
                    width:100px;
                    height:100%;
                    position: absolute;
                    right:0;
                    top:0;
                    cursor: pointer;
                }
            }
        }
        .ctx{
            padding:60px 30px;
            background-color: #FFF;
        }
        .btn-super{
            margin-top:40px;
        }
    }
.icp{
    border-top:none;
    background-color: transparent;
}
</style>

