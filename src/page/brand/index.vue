<style lang="scss">
	.add-icon{
		display: inline-block;width: .32rem;height: 100%;
		vertical-align: middle; margin-right: .1rem;
		background: url('../../static/images/i5.png') center 45% no-repeat;
		background-size: .32rem;
	}
	.i3{
		display: inline-block;width: .36rem;height: 1.2rem;
		background: url('../../static/images/b/i3.png') center center no-repeat;
		background-size: .36rem;
		margin: 0 .3rem 0 .15rem;
		vertical-align: middle;
	}
	.mint-cell-wrapper{
		background: none;
	}
	.mint-cell{
		position: relative;
		padding: .32rem .25rem;
		margin-top: .2rem;
		.mint-cell-wrapper{
			background: none;
		}
	}
	.mint-cell-swipe-button{
		background-color: #ff5c26;
		color: #fff;
		line-height: 1.6rem;
		padding: 0 .6rem;
	}
	.section-nbg{
		padding: 0;
	}
	.brand{
		.fixed{
			bottom: 0;
		}
	}
</style>
<template>
	<div class="brand">
		<carTitle :configTitle="configTitle"></carTitle>
		<div class="section-nbg">
			<div class="list">
			<mt-cell-swipe class="item"
		      v-for="(item, index) in brands" :key="item.id"
		      icon="../../static/images/b/i3.png"
		      :right="[{content: '删除', handler: () => deleteIt(item.id) } ]"
		      :title="index+1+'. '+item.title">
		    </mt-cell-swipe>
		</div>
		
		</div>
		<router-link to="/brand/list" class="btn100 fixed"><i class="add-icon"></i>添加新品牌</router-link>

	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import carTitle from '@/components/title'
	import { CellSwipe } from 'mint-ui';
	export default {
		data(){
			return {
				configTitle: { 
	                title: '擅长品牌',
	                fclick: false
	            },
			}
		},
		computed:{
			...mapGetters('manage', ['myBrands']),
			brands: function(){
				if(this.myBrands){
					this.Indicator.close();
					console.log('this.brands:', this.myBrands);
					return this.myBrands.list;
				}
				return null;
			}
		},
		created(){
			if(!this.brands){
				this.Indicator.open({
				  text: '加载中...',
				  spinnerType: 'fading-circle'
				});
				this.$store.dispatch('manage/getData', { url: 'shopApi/shop/brands', name: 'myBrands' })
			}
		},
		methods: {
			deleteIt(id) {
				this.Indicator.open({
				  text: '删除中...',
				  spinnerType: 'fading-circle'
				});
		        this.Delete('shopApi/shop/brands/' + id).then(res=>{
		        	console.log('resss:', res);
		        	// 解绑成功
		        	res.error_code || this.$store.dispatch('manage/getData', { url: 'shopApi/shop/brands', name: 'myBrands' });
		        	this.Indicator.close();
		        })
		    }
		},
		components: {
			carTitle, 'mt-cell-swipe': CellSwipe,
		}
	}
</script>