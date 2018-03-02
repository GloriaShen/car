<template>
	<div class="financial">
		<div class="top-fixed">
			<carTitle :configTitle="configTitle"></carTitle>
			<div class="title-link" @click="cancelCard">解除绑定</div>
		</div>
		
		<div class="section-nbg box100" v-if="credit">
			<div class="credit-card credit-card-detail radius" :id="credit.abbr+credit.id">
				<i class="icon"></i>{{ credit.bank_type }}<span v-if="credit.type">（{{ credit.account_type }}）</span> <span v-else>(储蓄卡)</span>
					<div><span>****</span> <span>****</span> <span>****</span> <span>{{ credit.account }}</span></div>
			</div>
			<router-link class="btn100 radius" to="/financial/cash">提现管理</router-link>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import carTitle from '@/components/title'
	export default {
		data(){
			return {
				configTitle: { 
	                title: '银行卡详情',
	                fclick: false
	            },
	            to: '/financial/cash',
			}
		},
		computed: {
			...mapGetters('financial', ['creditList']),
			credit: function(){
				localStorage.setItem('cid', this.creditList[this.$route.query.index].id);
				return this.creditList && this.creditList[this.$route.query.index];
			}
		},
		created(){
			this.creditList || this.$store.dispatch('financial/getCreditList', 'shopApi/finance/bank');
		},
		methods: {
			async cancelCard(){
				let res = await(this.Delete('shopApi/finance/bank/' + this.$route.query.id));
				if(!res.error_code){
					this.$store.dispatch('financial/getCreditList', 'shopApi/finance/bank');
					window.location.href = '#/financial/creditcard';
				}
				console.log('解除绑定～～', res);
			}
		},
		components: {
			carTitle, 
		}
	}
</script>
<style lang="scss">
	@import '../../static/style/financial';
	.credit-card-detail{
		padding: .75rem .6rem .7rem;
	}
</style>