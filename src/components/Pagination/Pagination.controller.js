
export default {
    name: 'pagination',
    props: {
        currentPage: Number,
        totalPage: Number
    },
    methods : {
        pageProp () {
           this.pagenow -= 1;
           this.goPage();
        },
        pageNext (){
            this.pagenow += 1;  
            this.goPage();
        },
        goPage (){
            let param = this.pagenow || 1;
            this.$emit("pageChange", param)
        }

    },
    mounted (){
        this.pagenow = this.currentPage;
        console.log(this.pagenow)
    },
    watch : {
        pagenow : function(newval, oldval){
           
            if(!/^[0-9]*$/.test(newval)){
                this.pagenow = oldval
            }
            if(newval > this.totalPage){
                this.pagenow = oldval
            }
            if(newval < 1){
                this.pagenow = ''
            }

        }
    },
    data() {
        return {
            now : '',
            total : '',
            pagenow : ''
        }
    }
}