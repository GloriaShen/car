<template>
	<div class="user" :class="'user_'+user.uid">
		<div class="avatar">
   			<img :src="user.avatar" :alt="user.nickname" >
   		</div>
   		<div class="username">
   			{{user.nickname}}
   			<span class="info">{{user.mobile}}</span>
   		</div>	
	</div>
</template>
<script>
	export default {
		props: ['user']
	}
</script>
<style lang="scss" scoped>
	.user{
		position: relative;
		padding: .2rem 0;
		text-align: left;
		background-color: #fff;
		.avatar{
			display: inline-block;
			width: .8rem;height: .8rem;overflow: hidden;
			vertical-align: middle;
			border-radius: 100%;
			background-color: #e1e1e1;
			img{
				width: .8rem;height: .8rem;
				border-radius: 100%;
			}
		}
		.username{
			display: inline-block;
			vertical-align: middle;
			.info{
				display: block;
			}
		}
	}
</style>
