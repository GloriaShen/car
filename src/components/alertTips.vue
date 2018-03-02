 <template>
    <div class="alet_container">
	    <section class="tip_text_container">
            <div class="correct" :class="{error: !alertMsg.result }"></div>
            <p class="tip_text">{{alertMsg.text}}</p>
            <div v-if="alertMsg.confirmBtn" class="confirm-btn" @click="closeTip">确认</div>
        </section>
    </div>
</template>

<script>
    export default {
    	data(){
            return{
                
            }
        },
        mounted(){
      
        },
        props: ['alertMsg'],
        methods: {
            closeTip(){
                this.$emit('closeTip')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../static/style/mixin';
    .alet_container{
    	position: fixed;
    	top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        z-index: 20;
        width: 4rem;
        padding: .35rem;
        text-align: center;
        border-radius: .1rem;
        background-color: rgba(0,0,0,.75);
        &, p{
            color: #fff;
        }
    }
    %tip_icon{
        width: 100%;
        height: .48rem;
        margin-bottom: .35rem;
    }
    .correct{
        @extend %tip_icon;
        background: url('../static/images/i_correct.png') center center no-repeat;
        background-size: .48rem;
    }
    .error{
        @extend %tip_icon;
        background: url('../static/images/i_error.png') center center no-repeat;
        background-size: .48rem;
    }
    .confirm-btn{
        display: inline-block;
        padding: .1rem .4rem;
        margin-top: .4rem;
        border-radius: .1rem;
        background-color: #14b6f6;
    }
</style>
