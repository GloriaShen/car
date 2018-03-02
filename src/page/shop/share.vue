<template>
	<div class="shop">
		<div class="banner">
			
		</div>
		<div class="section">
			<h1 class="shop-title">奥利维亚养的老骥伏枥的<span class="status">认证商家</span></h1>
			<ul class="list">
				<li>
					<span class="l">评分：</span>
					<ul class="star-list"><li class="active"></li> <li></li> <li></li> <li></li> <li></li></ul>
				</li>
				<li>
					<span class="l">时间：</span>
					8:00 - 18:00
				</li>
				<li>
					<span class="l">地址：</span>
					重庆市沙坪坝区勒是雾都街12号
				</li>
			</ul>
			<div class="average">
				<div class="item">
					<span class="i-map"></span>导航
				</div>
				<div class="item">
					<span class="i-phone"></span>电话
				</div>
				<div class="item">
					<span class="i-comment"></span>评论
				</div>
				<div class="item">
					<span class="i-detail"></span>详情
				</div>
			</div>
		</div>
		<div class="section">
			<mTitle :mtitle="titles.default"></mTitle>
			<div class="average-navs">
                <router-link class="nav" v-for="(item, index) in subNavs" :key="index" :class="{active: item.active}" :to="{ path: '/shop/detail/share', query: { type: index }}">{{item.name}}</router-link>
            </div>
            <div class="service-list">
            	<div class="item" v-for="item in list" :class="{picitem: item.pic}">
            		<img  v-if="item.pic" :src="item.pic" alt="item.name" class="pic">
            		<h6 class="name">{{ item.name }}</h6>
            		<p class="content">{{ item.p }}</p>
            		<div class="lritem">
            			<div class="l">
            				<span class="h">¥{{ item.price }}</span>
            				<span>已售{{ item.no }}</span>
            			</div>
            			
						<div class="btn">支付</div>
            		</div>
            	</div>
            </div>
		</div>
	</div>
</template>
<script>
	import mTitle from '@/components/mTitle'
	export default {
		data(){
			return {
				title: '这是标题标题～',
				titles: {
					default: {
						title: '门店服务',
						borderLeft: 'bl'
					},
				},
				subNavs: {
					XC: { id: 1, name: '洗车', to: 'XC', active: 0 },
					MR: { id: 2, name: '美容', to: 'MR', active: 0 },
					WX: { id: 3, name: '维修', to: 'WX', active: 0 },
					CX: { id: 4, name: '活动促销', to: 'CX', active: 0 },
					DK: { id: 4, name: '抵扣券', to: 'DK', active: 0 },
				},
				list: [
					{ name: '普通洗车', p: '了圣诞节福利觉得浪费了圣诞节福利觉得浪费了圣诞节福利觉得浪费', price: '343', no:'21', pic: 'https://wx4.sinaimg.cn/mw690/9585038cly1fnvio5z4x3j20c80g9tbv.jpg' },
					{ name: '普通洗车22', p: '了圣诞节福利觉得浪费', price: '343', no:'21', pic: 'https://wx4.sinaimg.cn/mw690/9585038cly1fnvio5z4x3j20c80g9tbv.jpg' },
					{ name: '普通洗车22', p: '了圣诞节福利觉得浪费', price: '343', no:'21', pic: '' },
				],
			}
		},
		computed: {
			cid: function(){
				return this.$route.query.id || 1;
			},
			ctype: function(){
				return this.$route.query.type || 'XC';
			}
		},
		created(){
			document.title = this.title;
			console.log(this.cid);

			this.subNavs[this.ctype].active = 1;
		},
		components: {
			mTitle,
		},
		methods: {
			updateData(param){
				console.log(param);
				this.subNavs[param.from].active = 0;
				this.subNavs[param.to].active = 1;
				// 获取新数据
				
			}
		},
		watch: {
			$route (to, from){
				this.updateData({
					from: from.query.type || 'XC',
					to: to.query.type
				});
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '../../static/style/common';
	.service-list{
		.item{
			@extend .bdt;
			clear: both;
			padding: .2rem 0;
			&:nth-child(1){
				border-top: 0;
			}
		}
		.picitem{
			height: 2.2rem;overflow: hidden;
		}
		.pic{
			width: 2.7rem;height: 1.8rem;
			float: left;
			margin-right: .2rem;
		}
		.name{
			font-size: .32rem; @extend .bold;
		}
		.content{
			height: .68rem; overflow: hidden;margin: .1rem auto;
			font-size: .24rem; line-height: .34rem;
		}
		.lritem{
			height: .56rem; line-height: .56rem;
			align-items: center;
			span{
				display: inline-block;
			}
			.h{
				font-size: .48rem; color: $color2;
				margin-right: .3rem;
				@extend .bold;
			}
		}
		.btn{
			@include btn(.56rem, .3rem);
			margin-top: -.15rem;
		}
	}
	.banner{
		height: 3.6rem;
		background-color: #525068;
	}
	.shop-title{
		font-size: .36rem;
		font-weight: 600;
		margin-bottom: .1rem;
		.status{
			display: inline-block;
			padding: 0 .1rem; margin-left: .1rem;
			vertical-align: middle;
			color: $mbg;
			font-size: .2rem;
			background: $color2;
			border-radius: .2rem;
		}
		& + .list{
			line-height: .5rem;
		}
	}
	.star-list{
		display: inline-block;
		margin-left: .1rem;
		li{
			display: inline-block;width: .24rem;height: .24rem;
			margin: 0;overflow: hidden;
			background: url(../../static/images/b/collect.png) center center no-repeat;
			background-size: .24rem;
			&.active{
				background: url(../../static/images/b/collected.png) center center no-repeat;
				background-size: .24rem;
			}
		}
	}
	.average{
		span{
			height: .5rem;
		}
	}
	.i-map{
		background: url('../../static/images/map.png') center center no-repeat;
		background-size: .48rem;
	}
	.i-phone{
		background: url('../../static/images/phone.png') center center no-repeat;
		background-size: .44rem;
	}
	.i-comment{
		background: url('../../static/images/info.png') center center no-repeat;
		background-size: .5rem;
	}
	.i-detail{
		background: url('../../static/images/shop.png') center center no-repeat;
		background-size: .48rem;
	}
	.average-navs{
		position: static;
		a, .item{
			line-height: .8rem;
			border-bottom: .06rem solid $mbg;
			border-radius: 0;
		}
		.active{
	        border: 0;
	        border-bottom: .06rem solid $color;
	        color: $color;
	    }
	}

</style>