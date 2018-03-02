<style lang="scss">
	.mint-indexsection > ul{
		background-color: #fff;
		border-top: .01rem solid #eee;
		li{
			padding-left: .2rem;
			line-height: .9rem;
			border-bottom: .01rem solid #eee;
		}
	}
	.carimg{
		display: inline-block;width: .66rem;height: .66rem;
		border-radius: 100%;
		box-sizing: border-box;
		vertical-align: middle;
		margin-right: .3rem;
	}
</style>
<template>
	<div class="brand">
		<carTitle :configTitle="configTitle"></carTitle>
		<mt-index-list v-if="allBrands">
	        <mt-index-section v-for="(item, index) in allBrands" :key="index" :index="item.letter">
	            <li v-for="(cell, index) in item.brands" :key="index" :id="cell.id"  @click="choose(cell)"><img class="carimg" :src="item.icon || defaultImg">{{ cell.title }}</li>
	        </mt-index-section>
	    </mt-index-list>
	</div>
</template>
<script>
	import { mapGetters, mapActions } from 'vuex'
	import carTitle from '@/components/title'
	import { IndexList, IndexSection, MessageBox } from 'mint-ui';

	export default {
		data(){
			return {
				configTitle: { 
	                title: '品牌',
	                fclick: false
	            },
	            defaultImg: 'https://tva1.sinaimg.cn/crop.0.0.180.180.180/61add7e3jw8elz207ln0lj2050050aad.jpg',
			}
		},
		computed: {
			...mapGetters('manage', ['brands']),
			allBrands: function(){
				if(this.brands){
					this.Indicator.close();
					return this.brands;
				}
				return null;
			}
		},
		created(){
			let self = this;
			if(!this.allBrands){
				this.Indicator.open({
				  text: '加载中...',
				  spinnerType: 'fading-circle'
				});
				this.$store.dispatch('manage/getData', { url: 'api/brand', name:'brands' });
			}
		},
		methods:{
			choose(cell){
				let self = this;
				MessageBox.confirm('确定绑定'+ cell.title +'?').then(a=>{
					if(a){
						self.Indicator.open({
						  text: '添加中...',
						  spinnerType: 'fading-circle'
						});
						self.Put('shopApi/shop/brands/'+cell.id).then(res=>{
							self.Indicator.close();
							if(!res.error_code){
								self.$store.dispatch('manage/getData', { url: 'shopApi/shop/brands', name: 'myBrands' });
								setTimeout(function(){
									window.location.href = '/brand';
								}, 500);
							}
							if(res.error_code == 400){
								// 重复绑定
								MessageBox.alert('你已绑定'+ cell.title +',<br/>请勿重复绑定!', '提示');
							}
							if(res.error_code==401){
								// 已达到绑定上限
								 MessageBox.alert('已达到绑定上限!', '提示');
							}
						});
					}
				});
			}
		},
		components:{
			carTitle, 'mt-index-list': IndexList, 'mt-index-section': IndexSection
		}
	}
</script>