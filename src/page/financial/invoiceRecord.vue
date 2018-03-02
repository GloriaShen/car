<template>
	<div class="financial" >
		<div class="top-fixed">
			<carTitle :configTitle="configTitle"></carTitle>
		</div>
		<div class="section bdt" >
			<div v-if="noData" class="noData">没有数据</div>
			<clist v-if="invoiceList" :list="invoiceList" :cnext="next" :clistConf="clistConf"></clist>
		</div>
	</div>
	
</template>
<script>
	import { mapGetters } from 'vuex'
	import carTitle from '@/components/title'
	import clist from '@/components/list'
	export default {
		data(){
			return {
				configTitle: { 
	                title: '开票记录',
	                fclick: false,
	            },
	            clistConf:{
	            	status: 1,
	            	to: '/financial/invoice/detail',
	            	url: 'shopApi/finance/invoice/logs'
	            },
	            invoiceLog: null,
	            invoiceList: null, //  status 1 未开票 0 已开票
	            noData: false,
			}
		},
		computed: {
			next: function(){
				return this.invoiceLog ? this.invoiceLog.next : 0;
			}
		},
		created(){
			this.Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			});
			this.Get('shopApi/finance/invoice/logs').then(res=>{
				this.Indicator.close();
				this.invoiceLog = res.data;
				this.invoiceList = res.data.list;
				this.noData = this.invoiceList ? !this.invoiceList.length : true;
			});
		},
		components: {
			carTitle, clist
		}
	}
</script>
