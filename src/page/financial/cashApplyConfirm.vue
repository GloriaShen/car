<template>
	<div class="financial">
		<div class="top-fixed">
			<carTitle :configTitle="configTitle"></carTitle>
		</div>
		
		<div class="section-nbg">
			<p class="tip">
				我们已经收到您的提现申请，<br>2小时之内将到账。
			</p>
		</div>
		<div class="section-nbg box100">
			<router-link class="btn100 radius" to="/">确认</router-link>
		</div>
	</div>
</template>
<script>
	import carTitle from '@/components/title'
	export default {
		data(){
			return {
				configTitle: { 
	                title: '申请提现',
	                fclick: false
	            },
			}
		},
		components: {
			carTitle,
		}
	}
</script>
<style lang="scss">
	@import '../../static/style/financial';
	.tip{
		margin: 2.3rem auto;
		text-align: center;
	}
</style>