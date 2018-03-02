<template>
	<div v-if="invoice" class="financial">
		<div class="top-fixed">
			<carTitle :configTitle="configTitle"></carTitle>
		</div>
		<div class="section bdt">
			<div class="lritem">
				<div>订单号</div>
				<div><span class="order-num">{{ invoice.order_no }}</span><button class="xsbtn">复制</button><router-link :to="{ path: '/order/detail', query: { id: invoice.order_id  }}" class="xsbtn">查看</router-link></div>
			</div>
			<div class="bdline"></div>
			<div class="lritem">
				<div class="dark">订单金额</div>
				<div class="light">¥{{ invoice.price }}</div>
			</div>
		</div>
		<div class="section">
			<invoice :invoiceData="invoice"></invoice>
		</div>
		<div class="section-nbg">
			<div v-if="invoice.status == 0" class="btn100 radius" @click="confirm">确定完成</div>
		</div>
	</div>
</template>
<script>
	import carTitle from '@/components/title'
	import invoice from '@/components/invoice'

	export default {
		data(){
			return {
				currentType: 0,
				configTitle: { 
	                title: '开票详情',
	                fclick: false,
	            },
	            invoice: null,
			}
		},
		created(){
			let self = this;
			if(!this.invoice){
				this.Indicator.open({
				  text: '加载中...',
				  spinnerType: 'fading-circle'
				});
				self.pGet('shopApi/finance/invoice/' + self.$route.query.id).then(res=>{
					self.Indicator.close();
					self.invoice = res.data;
				});
			}

		},
		methods: {
			async confirm(){
				let res = await(this.Post('shopApi/finance/invoice/' + this.invoice.id));
				if(!res.error_code){
					this.$store.dispatch('financial/getData', {
						url: 'shopApi/finance/invoice/logs',
						name: 'invoiceLog'
					});
					window.location.href = '#/financial/invoice/record';
				}
			}
		},
		components: {
			carTitle, invoice
		}
	}
</script>
