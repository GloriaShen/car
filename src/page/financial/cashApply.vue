<template>
	<div class="financial">
		<div class="top-fixed">
			<carTitle :configTitle="configTitle"></carTitle>
			<router-link class="title-link" to="/financial/cash/record">提现记录</router-link>
		</div>
		<template v-if="cashInfo">
			<div class="section apply">
				<div class="lritem">
					<div class="l tag">银行卡</div>
					<div class="r">
						<span class="blue">
							{{ currentBank }}
						</span> 
						<select v-model='bank_id' class="select">
							<option v-for="(item, index) in bankList"  :value="index">{{ item.bank_type + item.account }}</option>
						</select>
						<i class="triangle"></i>
					</div>
				</div>
				<p class="tiny">提现手续费{{ cashInfo.bank_procedure_rate }}</p>
				<p class="money">提现金额   <input v-model="cashInfo.balance" type="number" name="cash" class="strong" min="100" :max="cashInfo.balance" ></p>
				<div class="bdline"></div>
				<p class="tiny">当前账户余额{{cashInfo.all_balance}}元，有{{cashInfo.freezed_balance}}元不可提现。<br/>极速提现，2小时内到账</p>
			</div>
			<div class="section-nbg box100">
				<div class="cash-desc">
					<span class="l1">100元起提</span>
					<span class="l1">极速到账</span>
					<span class="l1">平台保障</span>
				</div>
				<div class="btn100 radius" @click="showit">申请提现</div>
			</div>
		</template>
		<div v-if='pop' class="pop-win">
			<div class="pop-box radius">
				<verify ref="verify"></verify>
				<div class="bdline"></div>
				<div class="lritem">
					<div class="btn active" @click="confirmApply">确认</div>
					<div class="btn" @click="showit">取消</div>
				</div>
			</div>
			<div class="mask" @click="showit"></div>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import carTitle from '@/components/title'
	import verify from '@/components/verify'
	export default {
		data(){
			return {
				configTitle: { 
	                title: '提现管理',
	                fclick: false
	            },
	            djsTime: 30, //倒计时预设时间
	            time: 0,//倒计时 实时时间
	            sendStatus: 0, //0 未发送 1 发送中 2倒计时
	            pop: false, //弹窗显示与否
	            verifyCode: null, //验证码
	            // bankList: null, //可选银行列表
	            bank_id: null, //提现金额

			}
		},
		computed: {
			...mapGetters('financial', ['cashApplyConfig', 'creditList']),
			sendArr: function(){
				return ['发送验证码', '发送中', this.time + 's'];
			},
			cashInfo: function(){
				if(this.cashApplyConfig){
					this.Indicator.close();
					return this.cashApplyConfig;
				}
				return null;
			},
			bankList:function(){
				if(this.creditList){
					let banks = this.creditList;
					let len = banks.length, temp = {};
					banks.map(item => {
						let i = item.account;
						item.account = item.account.substr(item.account.length - 4);
						temp[item.id] = item;
					});
					this.Indicator.close();
					console.log('self.bankList: ',temp);
					return temp;
				}
				return null;
			},
			currentBank: function(){
				let temp = this.bankList && this.bank_id && this.bankList[this.bank_id];
				return temp ? (temp.bank_type + temp.account) : '请选择您的银行卡';
			}
		},
		created(){
			let self = this;
			self.bank_id = localStorage.getItem('cid');

			if(!this.bankList){
				this.Indicator.open({
				  text: '加载中...',
				  spinnerType: 'fading-circle'
				});
				this.$store.dispatch('financial/getCreditList', 'shopApi/finance/bank');
			}
			// 初始化提现页面配置数据
			if(!this.cashInfo){
				this.Indicator.open({
				  text: '加载中...',
				  spinnerType: 'fading-circle'
				});
				let cashconfig = {
					url: 'shopApi/finance/balance',
					name: 'cashApplyConfig'
				};
				this.$store.dispatch('financial/getData', cashconfig);
			}
		},
		methods: {
			showit(){
				this.pop = !this.pop;
			},
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
			async sendVerify(){
				console.log('发送验证码');
				this.sendStatus = 1;
				let temp = '?phone=' + this.mobile + '&type=balance';
				let res = await(this.Get('shopApi/auth/getVerifyCode'+ temp));
				console.log('sendVerify: ', res);
				this.sendStatus = 2;
				this.djs();
				if(!res.error_code){
					// 验证码发送成功
				}
			},
			async confirmApply(){
				let balance = this.cashInfo.all_balance - this.cashInfo.freezed_balance;
				if(this.cashInfo.balance >= balance){
					this.verifyCode = this.$refs.verify.verifyCode;
					let data = {
						cash: this.cashInfo.balance,
						bank_id: this.bank_id,
						verify_code: this.verifyCode
					}
					let res = await(this.Post('shopApi/finance/balance', data));
					res.error_code || ( window.location.href = '#/financial/cash/applyconfirm' );
				}else{
					console.log('输入金额超出账户余额！！')
				}
				
			}
		},
		components: {
			carTitle,verify
		},
	}
</script>
<style lang="scss" scoped>
	@import '../../static/style/financial';
	.pop-win{
		.mask{
			top: .85rem;
			z-index: 20;
		}
	}
	.pop-box{
		position: relative;z-index: 30;
		width: 5.2rem;padding: .4rem .4rem;
		margin: -2rem auto 0;
		background: $mbg;
		.bdline{
			height: .3rem;
			margin-bottom: .4rem;
		}
		
		.btn{
			height: .7rem;line-height: .7rem;
			color: $mbg;
			padding: 0 .6rem;
			border-radius: .1rem;
			background: #ccc;
			&.active{
				background: $color;
			}	
		}
		
	}

	.apply{
		padding:   .3rem .2rem .3rem;
		margin: .2rem 0 .5rem;
	}
	.triangle{
		@include triangle(.12rem, $color);
	}
	.tag{
		padding: 0 .2rem;
		background-color: #e6e6e6;
		/*display: inline-block;*/
	}
	.tiny{
		font-size: .24rem;
	}
	.money{
		margin-top: .3rem;
		.strong{
			display: block;margin-top: .1rem;
			font-size: .6rem;font-weight: 700;
		}
	}
	.bdline{
		height: .1rem;margin-bottom: .1rem;
	}
	.lritem{
		
		.r{
			position: relative;
		}
		.blue{
			color: $color;
		}
		span{
			display: inline-block;
		}
		& + .tiny{
			text-align: right;
		}
	}
	.select{
		width: 2.7rem; opacity: 0;
		position: absolute;right: 0;bottom: 0;
	}
</style>