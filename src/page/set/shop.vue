<template>
	<div class="set">
		<carTitle :configTitle="configTitle"></carTitle>
		<div class="section bdt">
			<ul class="list-required">
				<li>
					<label>门店主图</label><span>每张大小不超过5M</span>
					<div class="upload">
						<img v-if="shop.spic" class="main-pic" :src="shop.spic">
					</div>
				</li>
				<li>
					<div class="lritem">
						<label>服务时间</label>
						<div class="st noarrow">
							<span class="start-time">2017.12.12</span> -
							<span class="end-time">2017.12.13</span>
						</div>
					</div>
				</li>
				<li>
					<label>门店简介</label>
					<div class="textarea">
						<textarea v-model="shop.brief" placeholder="请输入门店简介">
							
						</textarea>
					</div>
				</li>
			</ul>
		</div>
		<div class="section-nbg box100">
			<div class="btn100 radius" @click="save">确认绑定</div>
		</div>
	</div>
</template>
<script>
	import { mapActions } from 'vuex'
	import carTitle from '@/components/title'
	export default {
		data(){
			return {
				configTitle: { 
	                title: '门店信息',
	                fclick: false
	            },
	            shop: {
	            	pic: '',
	            	brief: ''
	            }
		
			}
		},
		created(){
			let self = this;
			let config = {
				url: 'shopApi/finance/index',
				callback: function(data){
					
				}
			}
			self.init(config);
		},
		methods: {
			...mapActions(['']),
			init(){

			},
			save(){
				let data = {
					img: this.shop.pic,
					brief: this.shop.brief
				}
				console.log('确认绑定:', data);
			}
		},
		components:{
			carTitle,
		}
	}
</script>
<style lang="scss">
	@import '../../static/style/common';
	@import '../../static/style/others';
	.list-required{
		.lritem{
			span{
				display: inline-block;
			}
		}
	}
	
</style>