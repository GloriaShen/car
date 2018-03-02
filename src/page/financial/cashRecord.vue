<template>
	<div class="financial">
		<div class="top-fixed">
			<carTitle :configTitle="configTitle"></carTitle>
		</div>
		<div class="section bdt" >
			<clist v-if="list" :list="list" :cnext="next" :clistConf="clistConf"></clist>
			<div v-if="noData" class="noData">没有数据</div>
		</div>
	</div>
</template>
<script>
	import carTitle from '@/components/title'
	import clist from '@/components/list'
	export default {
		data(){
			return {
				configTitle: { 
	                title: '提现记录',
	                fclick: false,
	            },
	            list: null,
	            next: 0,
	            clistConf:{
	            	status: 0,
	            	url: 'shopApi/finance/balance/logs'
	            },
	            noData: false,
			}
		},
		created(){
			this.Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			});
			let self = this;
			this.pGet('shopApi/finance/balance/logs').then(res=>{
				if(!res.error_code){
					self.init(res.data);
				}
			});
		},
		methods: {
			init(data){
				this.Indicator.close();
				this.list = data.list;
				this.next = data.next;
				this.noData = !this.list.length;
			},
		},
		components: {
			carTitle, clist
		}
	}
</script>
