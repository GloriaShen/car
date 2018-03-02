<!-- 发票 -->
<template>
<div class="invoice">
	<div class="lritem">
		<div>发票信息</div>
		<div><a href="#" class="xsbtn">查看发票状态</a></div>
	</div>
	<div class="bdline"></div>
	<div class="lritem">
		<div>
			发票抬头：
			<span v-if="invoiceData.tax_no">纳税人识别号：</span>
			<span v-if="invoiceData.mobile">手机号：</span>
			<span v-if="invoiceData.email">电子邮箱：</span>
			<span v-if="invoiceData.desc">开票明细：</span>
			<span v-if="invoiceData.content">开票内容：</span>
			<span v-if="invoiceData.create_datetime">申请时间：</span>
			<span v-if="invoiceData.note">备注：</span>
		</div>
		<div>
			<template v-if="invoiceData.title">{{ invoiceData.title }}</template>
			<template v-if="invoiceData.name">{{ invoiceData.name }}</template>
			<span>{{ invoiceData.tax_no }}</span>
			<span>{{ invoiceData.mobile }}</span>
			<span>{{ invoiceData.email }}</span>
			<span>{{ invoiceData.desc }}</span>
			<span>{{ invoiceData.content }}</span>
			<span>{{ invoiceData.create_datetime }}</span>
			<span>{{ invoiceData.note }}</span>
		</div>
	</div>
</div>
</template>
<script>
export default {
	props: ['invoiceData'],
}
</script>
<style lang="scss">
	@import '../static/style/order';
</style>