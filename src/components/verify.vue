<template>
	<div class="verify-box">
		<p>请输入{{ myphone }}收到的验证码</p>
		<div class="lritem">
			<input type="number" class="textinput" name="verifyCode" placeholder="请输入验证码" v-model="verifyCode" value="" >
			<div  v-if="sendStatus == 0" class="send-btn active" @click="sendVerify">{{sendArr[sendStatus]}}</div>
			<div v-else class="send-btn">{{ sendArr[sendStatus] }}</div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				verifyCode: '',
				djsTime: 30, //倒计时预设时间
	            time: 0,//倒计时 实时时间
	            sendStatus: 0, //0 未发送 1 发送中 2倒计时
	            myphone: ''
			}
		},
		computed:{
			sendArr: function(){
				return ['发送验证码', '发送中', this.time + 's'];
			},
		},
		created(){
			let userInfo = JSON.parse(localStorage.getItem('userInfo'));
			this.myphone = userInfo.phone;
		},
		methods: {
			djs(){
				let self = this, timer = null;
				timer = setInterval(function(){
					if(self.time){
						self.time--;
					}else{
						clearInterval(timer);
						self.sendStatus = 0;
						self.time = self.djsTime;
					}
				}, 1000);
			},
			getCode(){
				return this.verifyCode;
			},
			async sendVerify(){
				// console.log('发送验证码');
				this.sendStatus = 1;
				let temp = '?phone=' + this.mobile + '&type=balance';
				let res = await(this.Get('shopApi/auth/getVerifyCode'+ temp));
				// console.log('sendVerify: ', res);
				this.sendStatus = 2;
				this.djs();
				if(!res.error_code){
					// 验证码发送成功
					
				}
			},
		},
	}
</script>
<style lang="scss" scoped>
/*验证码*/
.verify-box{
    p{
        margin-bottom: .4rem;
    }
    .textinput{
        width: 2.6rem;
    }
    .send-btn{
        width: 1.6rem;text-align: center;
        height: .48rem;line-height: .48rem;
        font-size: .24rem;vertical-align: middle;
        border-radius: .1rem;
        background: #e6e6e6;
    }
}
</style>