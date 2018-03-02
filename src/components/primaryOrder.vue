<template>
<div class="primary-order">
	<div class="order-section">
		<div class="lritem">
			<div class="grey">服务内容</div>
			<router-link v-if="ifEdit" class="btn" :to="{ path: '/order/service-list', query:{ id: cid }}">编辑服务</router-link>
		</div>
		<div class="lritem" v-for="item in primaryOrder.service_list">
			<div class="dark">{{ item.name }}</div>
			<div class="">{{ item.price }} x {{ item.quantity }}<span class="ib">¥{{ item.total_price }}</span></div>
		</div>
		<div class="lritem">
			<div class="grey">服务总价</div>
			<div class="light">{{ servicePrice }}</div>
		</div>
		<div class="bdline"></div>
		<div class="lritem">
			<div class="grey"><span>优惠券</span>订单总额</div>
			<div class="dark">
				<span>¥{{ primaryOrder.discount_amount }}</span>
				¥{{ primaryOrder.amount }}
			</div>
		</div>
	</div>
	<div class="order-section">
		<div class="lritem">
			<div>用户实付款</div>
			<div class="light">¥{{ primaryOrder.pay_amount }}</div>
		</div>
		<div class="bdline"></div>
		<div class="lritem">
			<div>支付方式</div>
			<div v-if="primaryOrder.pay_channel==1" class="dark">微信</div>
			<div v-if="primaryOrder.pay_channel==2" class="dark">支付宝</div>
		</div>	
	</div>
	<div class="order-section">
		<div class="lritem">
			<div class="grey">订单号</div>
			<div><span class="order-num" ref="orderNo">{{ primaryOrder.order_no }}</span><button class="xsbtn" v-clipboard:copy="primaryOrder.order_no"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError">复制</button></div>
		</div>
		<div class="bdline"></div>
		<div class="lritem">
			<div class="grey">
				下单时间 <span>付款时间</span><span>完成时间</span>
			</div>
			<div class="dark">
				<template v-if="primaryOrder.create_datetime">{{ primaryOrder.create_datetime }}</template>
				<template v-else>-</template>
				<span v-if="primaryOrder.payed_datetime">{{ primaryOrder.payed_datetime }}</span>
				<span v-else>-</span>
				<span v-if="primaryOrder.serviced_datetime">{{ primaryOrder.serviced_datetime }}</span>
				<span v-else>-</span>
			</div>
		</div>
	</div>
</div>
</template>
<script>

export default {
	props: ['primaryOrder'],
	computed:{
		servicePrice: function(){
			let temp = 0;
			Object.keys(this.primaryOrder.service_list).length && this.primaryOrder.service_list.map(item=>{
				temp = temp + parseFloat(item.price);
			});
			return temp;
		},
		ifEdit: function(){
			let cs = this.primaryOrder.status;
			return cs == 'STANDBY' || cs == 'SERVICED' || cs == 'PAYING'; 
		},
		cid: function(){
			return this.$route.query.id || 1;
		}
	},
	created(){
		console.log('currentStatus:', this.ifEdit);
	},
	methods:{
		onCopy: function (e) {
	      console.log('You just copied: ' + this.primaryOrder.order_no)
	    },
	    onError: function (e) {
	      console.log('Failed to copy texts')
	    },
	}
}
</script>
<style lang="scss" scoped>
	@import '../static/style/order';
	.ib{
		margin-left: .5rem;
	}
	.order-section{
		padding: .25rem;
	}
</style>