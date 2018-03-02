<template>
	<div class="service cxh" v-if="serviceDetail">
		<div class="top-fixed">
			<carTitle :configTitle="configTitle"></carTitle>
			<router-link class="title-link" :to="{ path: '/service/edit', query: { id: cid } }">编辑</router-link>
		</div>
		
		<div class="section bdt">
			<ul class="list-required">
				<li>
					<label>服务名称</label>{{ serviceDetail.name }}
				</li>
				<li>
					<label>一级服务</label>{{ category }}
				</li>
				<li>
					<label>价格</label><span class="h">{{ serviceDetail.price }}</span>
				</li>
				<li>
					<label>上架时间</label>{{ serviceDetail.sell_begin_datetime }}
				</li>
				<li>
					<label>下架时间</label>{{ serviceDetail.sell_end_datetime }}
				</li>
				<li>
					<label>服务简介</label>
					<p>{{ serviceDetail.desc }}</p>
				</li>
				<li>
					<label>门店主图</label>
					<p>
						<img class="main-pic" :src="serviceDetail.img">
					</p>
				</li>
			</ul>
		</div>
		<div class="section-nbg box100">
			<div v-if="serviceDetail.status == 0" class="btn100 radius" @click="On">上架</div>
			<div v-if="serviceDetail.status == 1" class="btn100 radius orange" @click="Off">下架</div>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import carTitle from '@/components/title'
	export default {
		data(){
			return {
				configTitle: { 
	                title: '服务详情',
	                fclick: false
	            },
		
			}
		},
		computed: {
			...mapGetters('manage', ['serviceDetail','categories']),
			cid: function(){
				return this.$route.query.id;
			},
			category: function(){
				if(this.serviceDetail && this.categories){
					this.Indicator.close();
					console.log('this.categories[this.serviceDetail.category_fid]:', this.categories[this.serviceDetail.category_fid]);
					return this.categories[this.serviceDetail.category_fid].name;
				}
				return null;
			}
		},
		created(){
			this.Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			});
			if(!this.categories){
				this.$store.dispatch('manage/getData', {
					url: 'shopApi/shop/category',
					name: 'categories'
				});
			}

			let config = {
				url: 'shopApi/shop/services/' + this.cid,
				name: 'serviceDetail'
			};
			this.$store.dispatch('manage/getData', config);
		},
		methods: {
			async On(id){
				let res = await(this.Put('shopApi/shop/services/'+ this.cid +'/up'));
				res.error_code || (window.location.href = '/service?type=' + this.serviceDetail.category_fid);
			},
			async Off(id){
				let res = await(this.Put('shopApi/shop/services/'+ this.cid +'/down'));
				res.error_code || (window.location.href = '/service?type=' + this.serviceDetail.category_fid);
			}
		},
		components:{
			carTitle,
		}
	}
</script>
<style lang="scss">
	@import '../../static/style/others';
	.main-pic{
		width: 2.7rem;height: 1.8rem;
		margin-top: .1rem;
	}
	.box100{
		margin-top:.6rem;
	}
	.radius{
		margin-top: .3rem;
	}
	.orange{
		background-color: $color2;
	}
</style>