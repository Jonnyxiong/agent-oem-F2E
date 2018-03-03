import { Utils } from '@/model/util';
let utils = new Utils();

export default {
    name: 'test',
    data() {
        return {
            params: {
                content: ''
            },
            options: [],
            result: '基本可发送',
            showMask: false,
            resultTrue: false,
            resultFail: false,
            resultCont: "",
        }
    },
    mounted() {

    },
    methods: {
        getTest() {
            let _params = this.params;
            if (!_params.content) {
                this.$message.error('请输入短信内容');
                return;
            }
            if (_params.content.length > 500) {
                this.$message.error("短信内容不能超过500个字符");
            }
            utils.post_('/content/content/test', _params, { emulateJSON: true }).then(res => {
                let keywords = [];
                if (res['200']) {
                    this.showMask = true;
                    this.resultTrue = true;
                    this.resultFail = false;
                    return false;
                }
                for (var k in res) {
                    if (k >= 500) {
                        var obj = {};
                        var arr = res[k].split(",");
                        obj.begin = arr[0];
                        obj.end = arr[1];
                        keywords.push(obj);
                    }
                }
                console.log(keywords);
                if (keywords.length > 0) {
                    var htmlArray = [];
                    var smscont = this.params.content;
                    var p1 = 0,
                        p2 = 0;
                    for (var i = 0; i < keywords.length; i++) {
                        var begin = keywords[i].begin;
                        var end = keywords[i].end;
                        p2 = keywords[i].begin;
                        htmlArray.push(smscont.substring(p1, p2));
                        htmlArray.push("<span>" + smscont.substring(begin, p1 = end) + "</span>");
                    }
                    htmlArray.push(smscont.substring(p1));
                    console.log(htmlArray)
                    this.showMask = true;
                    this.resultTrue = false;
                    this.resultFail = true;
                    this.resultCont = htmlArray.join(""); // 将关键字标红然后替换在短信内容的页面容器中

                }
            }).catch(res => {

            })
        },
        clearAll(){
            this.params.content = ''
        },
        close() {
            this.showMask = false

        }
    }
}
