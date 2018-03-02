<template>
	<div>
		<span>
			<template v-if="item.name && item.name!=undefined">{{ item.name }}</template>
			<template v-if="item.account">{{ item.account }}</template>
			<span class="ino" v-if="item.order_no && clistConf.ifOrderNo">订单号{{ item.order_no }}</span>
			<span class="ino" v-if="item.tax_no">税号{{ item.tax_no }}</span>
			<span class="ino" v-if="item.thus_balance">账户余额 ¥{{ item.thus_balance }}</span>
		</span>
		<span v-if="clistConf.tips && item.status!=undefined && item.status!= 'undefied'"  class="tips" :class="'tips'+item.status">{{ allStatus[item.status].name }}</span>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	export default {
		props: [ 'item', 'clistConf' ] ,
		computed: {
			...mapGetters('order', ['allStatus']),
		},
	}
</script>
