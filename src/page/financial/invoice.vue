<template>
	<div class="financial">
		<div class="top-fixed">
			<carTitle :configTitle="configTitle"></carTitle>
			<router-link class="title-link" to="/financial/invoice/record">开票记录</router-link>
		</div>
		<div class="section bdt" >
			<mTitle :mtitle="titles.default"></mTitle>
			<div v-if="noData" class="noData">没有数据</div>
			<clist v-if="invoiceList" :list="invoiceList" :cnext="next" :clistConf="clistConf"></clist>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import carTitle from '@/components/title'
	import mTitle from '@/components/mTitle'
	import clist from '@/components/list'
	export default {
		data(){
			return {
				configTitle: { 
	                title: '发票管理',
	                fclick: true
	            },
				titles: {
					default: {
						title: '待开票',
						borderLeft: 'bl'
					},
				},
				clistConf:{
	            	status: 1,
	            	to: '/financial/invoice/detail',
	            	url: 'shopApi/finance/invoice'
	            },
			}
		},
		computed: {
			...mapGetters('financial',['invoiceIndex']),
			invoiceList: function(){
				if(this.invoiceIndex){
					this.Indicator.close();
					return this.invoiceIndex.list;
				}
				return null;
			},
			noData: function(){
				return this.invoiceIndex ? !this.invoiceIndex.list.length : true;
			},
			next: function(){
				return this.invoiceIndex ? this.invoiceIndex.next : 0;
			}
		},
		created(){
			
			let self = this;
			if(!this.invoiceIndex){
				this.Indicator.open({
				  text: '加载中...',
				  spinnerType: 'fading-circle'
				});
				this.$store.dispatch('financial/getData', { url: 'shopApi/finance/invoice' , name: 'invoiceIndex'});
			}	
		},
		components: {
			carTitle, mTitle, clist
		}
	}
</script>
