<style lang="scss" scoped>
@import '../../static/style/b.config';
	.ib{
		&, div, span{
			display: inline-block;
		}
	}
	.quantity{
		height: .4rem;line-height: .4rem; 
		border: 1px solid $bdColor;
		vertical-align: middle;
		overflow: hidden;
		span, .num{
			display: inline-block;
			line-height: 1;
			width: .4rem;text-align: center;
			font-size: .32rem;
			vertical-align: middle;
			position: relative;margin-top: -0.13rem;
		}
		.num{
			width: 1rem;padding: 0 .2rem;height: 100%;
			border-left: 1px solid $bdColor;
			border-right: 1px solid $bdColor;
			font-size: .24rem;margin-top: -.1rem;line-height: .45rem;
		}
	}
	.deleteit{
		display: block;width: .36rem;height: .36rem;
		border-radius: 100%;
		background: #ccc url('../../static/images/b/wrong.png') center center no-repeat;
		background-size: .18rem;
		vertical-align: middle;
	}
	.add-icon{
		display: inline-block;width: .32rem;height: 100%;
		vertical-align: middle; margin-right: .1rem;
		background: url('../../static/images/i4.png') center 45% no-repeat;
		background-size: .32rem;
	}
	.price{
		display: inline-block;margin: 0 .5rem 0 .3rem;
		vertical-align: middle;
	}
	.lritem{
		background-color: $mbg;
		margin-bottom: .2rem;
		padding: .25rem;
	}
	.section{
		background: none;padding: 0;
		.btn100{
			background: #eee;
			color: $color3;
		}
	}
	.box100{
		width: 100%;
	}
	html, body{
		min-height: 100%;
	}
	.order{
		width: 100%;min-height: 100%;
	}
	.pop-box{
		width: 100%;height: 100%;overflow: hidden;
		padding: .5rem;
		box-sizing: border-box; 

		position: absolute;left: 0;top: 0;
		background: rgba(0,0,0,.5);
		.inner{
			width: 100%;border-radius: .2rem;
			padding: .3rem .2rem;
			background-color: $mbg;
			margin-top: 1rem;
		}
		.title{
			position: relative;
			height: .7rem;line-height: .7rem;
			border-bottom: 1px solid $bdColor;
			.btn{
				padding: 0 .25rem;
				position: absolute;right: 0;bottom: .2rem;
			}
		}
		.navs{
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			li{
				display: inline-block;padding: .1rem .2rem;
				border-bottom: 2px solid $mbg;
			}
			.active{
				color: $color;
				border-color: $color;
			}
		}
	}
	input[type="checkbox"], input[type="radio"]{
		opacity: 0;
		display: none;
		& + i{
			display: inline-block;
			width: .32rem;height: .32rem;
			border-radius: 100%;
			border: 1px solid $bdColor;
			vertical-align: middle;
		}
		&:checked{
			& + i{
				border-color: #49d163;
				background: url('../../static/images/b/right.png') center center no-repeat;
				background-size: .32rem;
			}
		}
	}
	.list{
		margin: .2rem 0;
		label{
			display: inline-block;
			margin: .1rem 0;
			&:nth-child(2n+1){
				margin-right: .5rem;
			}
		}
	}

</style>
<template>
	<div class="order cxh">
		<div class="top-fixed">
			<orderTitle  :configTitle="configTitle"></orderTitle>
		</div>
		
		<template v-if="detail">
			<div class="section">
				<div class="lritem" v-for="(item, index) in serviceList" :key="index">
					<div>{{ item.name }}</div>
					<div class="ib">
						<div class="quantity">
							<span @click="minus(index)">-</span>
							<input class="num" type="number" name="quantity" max="100" min="1" v-model="item.quantity">
							<span @click="add(index)">+</span>
							
						</div>
						<span class="price">{{ item.price }}</span>
						<div class="deleteit" @click="deleteit(index)"></div>
					</div>
				</div>
			</div>	
			<div class="section">
				<div class="btn100" @click="showPop"><i class="add-icon"></i>添加新服务</div>
			</div>
			<div class="section-nbg box100 fixed">
				<div class="btn100 radius" @click="save">保存修改</div>
			</div>
		</template>
		<div v-show="showpop" class="pop-box" ref="pop" @click="closePop">
			<div class="inner" @click.stop="showPop">
				<h6 class="title">选择服务  <div class="btn" @click.stop="confirmChoose">确认</div> </h6>
				<ul class="navs">
					<li v-for="(item, index) in myservices" :class="{ active: activeIndex == index }" :index="index" :id="item.id" @click="changeService(index)">{{ item.name }}</li>
				</ul>
				<div class="list">
					<label v-for="(item, index) in list" :index="index" :id="item.id">
						<input name="car" type="radio" :id="item.id"  :value="item.id" v-model="item.checked"><i></i>
						{{ item.name }}
					</label>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import orderTitle from '@/components/titleQuery'

	export default{
		data(){
			return {
				configTitle: {
					titles: {
						title: '编辑服务'
					}
				},
				serviceList: null,
				// data: mockData,
				activeIndex: 0,
				result: {},
				showpop: false,
			}
		},
		computed:{
			...mapGetters('order', {
				myservices: 'servicesData',
				cdetail: 'orderDetail'
			}),
			detail: function(){
				this.Indicator.close();
				return this.cdetail;
			},
			cid: function(){
				return this.$route.query.id || 1;
			},
			list: function(){
				return this.myservices && this.myservices[this.activeIndex].services;
			},
		},
		created(){
			if(!this.detail){
				this.Indicator.open({
				  text: '加载中...',
				  spinnerType: 'fading-circle'
				});
				this.init();
				this.$store.dispatch('order/getData', {
					url: 'shopApi/order/' + this.cid,
					name: 'orderDetail'
				});
			}else{
				this.serviceList = this.detail.service_list;
			}
			this.myservices || this.$store.dispatch('order/getData', {
				url: 'shopApi/shop/allCategoryAndServices',
				name: 'servicesData'
			});

		},
		mounted(){
			this.$refs.pop.style.height = window.innerHeight + 'px';
		},
		methods:{
			async init(){
				let data = await(this.Get('shopApi/order/' + this.cid));
				if(!data.error_code){
					this.serviceList = data.data.service_list;
				}
			},
			add(index){
				this.serviceList[index].quantity==100 || this.serviceList[index].quantity++;
			},
			minus(index){
				this.serviceList[index].quantity > 1 && this.serviceList[index].quantity--;
			},
			deleteit(index){
				this.serviceList.splice(index, 1);
			},
			async save(){
				this.Indicator.open({
				  text: '修改中...',
				  spinnerType: 'fading-circle'
				});
				let self = this;
				let res = await(this.Post('shopApi/order/confirm/'+ this.cid +'/services', {
					service_list: this.serviceList
				}));
				if(!res.error_code){
					let config = {
						url: 'shopApi/order/' + this.cid,
						name: 'orderDetail'
					}
					this.$store.dispatch('order/getData', config);
					setTimeout(function(){
						self.Indicator.close();
						window.location.href= '#/order/detail?id=' + self.cid;
					}, 1000);
				}
			},
			showPop(){
				this.showpop = true;
			},
			changeService(index){
				// console.log('index:', index);
				this.getChecked();
				this.activeIndex = index;
				this.getChecked();
			},
			getChecked(){
				let temp = this.myservices[this.activeIndex].services.filter(item => item.checked);
				if(temp.length){
					temp = temp[temp.length-1];
					this.result[this.activeIndex] = { category_id: this.myservices[this.activeIndex].category_id, category_fid: this.myservices[this.activeIndex].category_fid, ...temp };
				}
			},
			confirmChoose(){
				this.getChecked();
				console.log('this.result: ',this.result);
				for(let i in this.result){
					this.result[i].quantity = 1;
					this.serviceList = [...this.serviceList, this.result[i]];
					this.myservices[i].services.map(item=>{
						delete item.checked;
					});
				}
				this.closePop();
			},
			closePop(){
				this.showpop = false;
				this.activeIndex = 0;
				this.result = {};
			},
		},
		components: {
			orderTitle,
		},
	}
</script>