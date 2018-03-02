<template>
	<div class="financial">
		<div class="top-fixed">
			<carTitle :configTitle="configTitle"></carTitle>
			<router-link class="title-link" to="/financial/cash/record">提现记录</router-link>
		</div>
		
		<div class="section-nbg">
			<img class="purse" src="../../static/images/b/purse.png">
			<p class="money">当前余额 <strong v-if="balance">¥{{ balance }}</strong></p>
			<div class="cash-desc">
				<span class="l1">100元起提</span>
				<span class="l1">极速到账</span>
				<span class="l1">平台保障</span>
			</div>
		</div>
		<div class="section-nbg box100">
			<router-link class="btn100 radius" :to="{path: '/financial/cash/apply'}">申请提现</router-link>
		</div>
	</div>
</template>
<script>
	import { mapActions } from 'vuex'
	import carTitle from '@/components/title'
	export default {
		data(){
			return {
				configTitle: { 
	                title: '提现管理',
	                fclick: false
	            },
	            balance: '',
			}
		},
		created(){
			let self = this;
			let config = {
				url: 'shopApi/finance/balance',
				callback: function(data){
					if(data.balance){
						self.balance = data.balance;
						self.setCash(self.balance);
					}
				}
			}
			self.init(config);
		},
		methods:{
			...mapActions(['init']),
			...mapActions('financial', ['setCash'])
		},
		components: {
			carTitle,
		}
	}
</script>
<style lang="scss" scoped>
	@import '../../static/style/common';
	@import '../../static/style/financial';
	.purse{
		width: 2.4rem;margin: .8rem auto 0;
	}
	.money{
		text-align: center;
		padding: .4rem 0 .4rem;
		strong{
			display: block;
			font-size: .6rem;font-weight: 700;
		}
	}
</style>