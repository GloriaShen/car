<template>
	<div class="financial">
		<div class="top-fixed">
			<carTitle :configTitle="configTitle"></carTitle>
			<router-link class="title-link" to="/financial/creditcard/add">添加银行卡</router-link>
		</div>
		<ul class="creditcard-list" v-if="list">
			<li v-for="(item, index) in list" >
				<router-link class="credit-card" :class="index" :to="{ path: to, query: { id: item.id, index: index }}">
					<i class="icon"></i>{{ item.bank_type }}<span v-if="item.account_type">（{{ item.account_type }}）</span> <span v-else>(储蓄卡)</span>
					<div><span>****</span> <span>****</span> <span>****</span> <span>{{ item.account }}</span></div>
				</router-link>
			</li>
		</ul>
		<div v-if="noData" class="noData">没有数据</div>
		<div class="section-nbg box100 fixed">
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
	                title: '银行卡管理',
	                fclick: true
	            },
	            to: '/financial/creditcard/detail',

			}
		},
		computed: {
			...mapGetters('financial', ['creditList']),
			list: function(){
				if(this.creditList){
					this.Indicator.close();
					localStorage.setItem('cid', this.creditList[0].id);
					return this.creditList;
				}
				return null;
			},
			noData: function(){
				return this.list ? !this.list.length : false;
			}
		},
		created(){
			
			if(!this.list){
				this.Indicator.open({
				  text: '加载中...',
				  spinnerType: 'fading-circle'
				});
				this.$store.dispatch('financial/getCreditList', 'shopApi/finance/bank');
			} 
		},
		components: {
			carTitle,
		}
	}
</script>
<style lang="scss">
	@import '../../static/style/financial';
</style>