<template>
	<div class="order cxh">
		<div class="top-fixed">
			<carTitle :configTitle="configTitle"></carTitle>
		</div>
		<div v-if="allList" class="order-section">
			<clist :list="clistData" :cnext="next" :clistConf="clistConf"></clist>
		</div>
		<!-- <div v-else class="noData">没有数据</div> -->
	</div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import carTitle from '@/components/titleQuery'
import clist from '@/components/list'
export default {
	data(){
		return {
			configTitle: { 
                titles: {
                	title: '所有订单',
                	fclick: false,
                }
            },
            clistConf:{
            	status: 1,
            	tips: 1,
            	to: '/order/detail',
            	url: 'shopApi/order/all'
            },
		}
	},
	computed: {
		...mapGetters('order',['allList']),
		clistData: function(){
			if(this.allList){
				this.Indicator.close();
				return [...this.allList.list];
			}else{
				return null;
			}
		},
		next: function(){
			return this.allList ? this.allList.next : 0;
		}
	},
	created(){
		this.Indicator.open({
		  text: '加载中...',
		  spinnerType: 'fading-circle'
		});
		let config = {
			url: 'shopApi/order/all',
			name: 'allList',
		};
		this.$store.dispatch('order/getData', config);
	},
	
	components: {
		carTitle,
		clist,
	}
}
</script>
<style lang="scss">
	@import '../../static/style/order';
	.order-section{
		border-top:1px solid $bdColor;
	}
	
</style>