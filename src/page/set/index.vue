<template>
	<div class="set">
		<carTitle :configTitle="configTitle"></carTitle>
		<div class="section bdt">
			<ul class="list list2">
				<li v-for="item in list">
					<router-link class="item" :to="{ path: item.path }">
						{{ item.name }}
					</router-link>
				</li>
			</ul>
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
	                title: '设置',
	                fclick: false
	            },
	            list: [
					{ path: '/set/shop', name: '门店信息' },
					{ path: '/set/modifyPsd', name: '修改密码' },
					{ path: '/', name: '版本介绍' },
					{ path: '/brand', name: '品牌管理' },
				],
		
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

			}
		},
		components:{
			carTitle,
		}
	}
</script>
<style lang="scss">
	@import '../../static/style/others';
</style>