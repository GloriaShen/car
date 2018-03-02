<template>
	<div class="service cxh" v-if="serviceList">
		<div class="top-fixed">
			<orderTitle v-if="configTitle"  :configTitle="configTitle"></orderTitle>
			<div class="back2home" @click="back2home">关闭</div>
			<div class="title-link" @click="setIt">{{ setTxt }}</div>
		</div>
		<!-- <div class="section" v-if="serviceList.list_on.length && serviceList.list_off.length ">
			<div class="noData">没有数据</div>
		</div> -->
		<div  class="section">
			<div v-if="serviceList.list_on.length" class="service-lists">
				<div class="lritem" v-for="(item, index) in serviceList.list_on"> 
					<div class="l">
						<i v-if="setStatus" class="i3"></i>
						<router-link class="link" :to="{ path: '/service/detail', query:{ id: item.id } }">
							<img :src="item.img" :alt="item.name">
							<div class="bt">
								<span>{{ item.name }}</span>
								<span class="h">¥{{ item.price }}</span>
							</div>
						</router-link>
					</div>
					<div v-if="setStatus" class="r">
						<div class="deleteit" @click="deleteIt(item.id, index)"></div>
					</div>
					<div v-else class="r bt">
						<router-link :to="{ path: '/service/edit', query:{ id: item.id } }" class="btn blue">编辑</router-link>
						<div class="btn white" @click="Off(item.id)">下架</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="serviceList.list_off.length" class="section">
			<div class="service-lists disabled">
				<div class="lritem" v-for="(item, index) in serviceList.list_off"> 
					<div class="l">
						<router-link class="link" :to="{ path: '/service/detail', query:{ id: item.id } }">
							<img :src="item.img" :alt="item.name">
							<div class="bt">
								<span>{{ item.name }}</span>
								<span class="h">¥{{ item.price }}</span>
							</div>
						</router-link>
					</div>
					<div class="r bt">
						<router-link :to="{ path: '/service/edit', query:{ id: item.id } }" class="btn blue">编辑</router-link>
						<div class="btn white active" @click="On(item.id)">上架</div>
					</div>
				</div>
			</div>
		</div>
		<div class="section-nbg box100">
			<router-link class="btn100 radius" :to="{ path: '/service/edit', query: { type: ctype } }"><i class="add-icon"></i>添加</router-link>
		</div>
		<div v-if="show"></div>
	</div>
</template>
<script>
	import { mapGetters, mapActions } from 'vuex'
	import orderTitle from '@/components/titleQuery'
	export default {
		data(){
			return {
	            setStatus: false,
	            serviceList: null,
			}
		},
		computed: {
			...mapGetters('manage', [ 'categories']),
			setTxt: function(){
				return  this.setStatus?'完成':'设置';
			},
			configTitle: function(){
				if(this.categories){
					console.log('this.ctype:', this.ctype);
					console.log('name:', this.categories[this.ctype].name);
					return {
						titles: {
		                	title: this.categories[this.ctype].name,
		                	fclick: true
		                },
		                path: '/order/count/brief',
		                subNavs: this.categories
					}
				}
				
			},
			ctype: function(){
				return this.$route.query.type || 1;
			},
			show: function(){
				var temp = this.categories && this.serviceList;
				temp && this.Indicator.close();
				return temp;
			}
		},
		created(){
			this.Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			});
			let self = this;
			self.Get('shopApi/shop/services/index/' + this.ctype).then(res=>{
				this.Indicator.close();
				this.serviceList = res.data;
			});
			this.$store.dispatch('manage/getData', {
				url: 'shopApi/shop/categoryAndSub',
				name: 'categories'
			});		
		},
		methods: {
			...mapActions('manage', ['getData']),
			updateList(type){
				this.Indicator.open({
				  text: '加载中...',
				  spinnerType: 'fading-circle'
				});
				// console.log('更新列表：', this.configTitle.subNavs[type].name);
				let self = this;
				self.Get('shopApi/shop/services/index/' + this.ctype).then(res=>{
					this.Indicator.close();
					this.serviceList = res.data;
				});
			},
			setIt(){
				this.setStatus = !this.setStatus;
			},
			async deleteIt(id,index){
				let res = await(this.Delete('shopApi/shop/services/' + id));
				res.error_code || this.serviceList.list_on.splice(index,1);
			},
			async On(id){
				let res = await(this.Put('shopApi/shop/services/'+ id +'/up'));
				res.error_code || this.updateList(this.ctype);
			},
			async Off(id){
				let res = await(this.Put('shopApi/shop/services/'+ id +'/down'));
				res.error_code || this.updateList(this.ctype);
			},
			back2home(){
                hx.finishWebview && hx.finishWebview();
            }
		},
		components:{
			orderTitle,
		},
		watch: {
			$route (to, from){
				this.updateList(to.query.type);
			}
		}
	}
</script>
<style lang="scss">
	@import '../../static/style/others';
	.add-icon{
		display: inline-block;width: .32rem;height: 100%;
		vertical-align: middle; margin-right: .1rem;
		background: url('../../static/images/b/add.png') center 45% no-repeat;
		background-size: .32rem;
	}
	.service{
		.header{
			border-bottom: 1px solid $bdColor;
		}
	}
	.service-lists{
		&.disabled{
			.l{
				opacity: .3;
			}
		}
		& > div{
			padding: .25rem 0;
			border-top: 1px solid $bdColor;
			&:nth-child(1){
				border-top: 0;
			}
		}
		.i3{
			display: inline-block;width: .36rem;height: 1.2rem;
			background: url('../../static/images/b/i3.png') center center no-repeat;
			background-size: .36rem;
			margin: 0 .3rem 0 .15rem;
			vertical-align: middle;
		}
		.deleteit{
			display: block;width: .6rem;height: .6rem;
			border-radius: 100%;
			background: #ccc url('../../static/images/b/wrong.png') center center no-repeat;
			background-size: .24rem;
		}
		img{
			width: 1.8rem;height: 1.2rem;
			float: left;
			margin-right: .2rem;
		}
		.l{
			span{
				text-align: left;
			}
		}
		.link{
			display: inline-block;
			color: inherit;
			vertical-align: middle;
		}
		.h{
			color: $color2;
		}
		.bt{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 1.2rem;
			span{
				display: block; line-height: .28rem;
			}
		}
		.btn{
			height: .48rem; line-height: .48rem;
			padding: 0 .3rem;
			border-radius: .48rem;
			border: 1px solid $mbg;
			&.blue{
				background-color: $color;
				border-color: $color;
				color: $mbg;
			}
			&.white{
				border-color: $color3;
				background-color: $mbg;
				color: #333; 
			}
			&.active{
				border-color: $color;
				color: $color;
			}
		}
	}
</style>