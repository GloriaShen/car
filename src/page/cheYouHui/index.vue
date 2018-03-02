<template>
	<div class="wrapper">
	  	<div class="cyh_container" v-if="cyqDetailData">
	  		<div class="detail">
	  			<div class="header">
		       		<router-link to="item" class="avatar">
		       			<img :src="cyqDetailData.avatar" :alt="cyqDetailData.nickname" >
		       		</router-link>
		       		<div class="username">
		       			{{cyqDetailData.nickname}}
		       			<span class="time">{{cyqDetailData.create_time}}</span>
		       		</div>
		       		<div class="complain" @click="complain">举报</div>
		       </div>
		       <section class="section">
		       		<img v-if="cyqDetailData.image.length>0" v-for="item in cyqDetailData.image" :src="item" alt="图片">
		       		<p>{{cyqDetailData.content}}</p>
		       </section>
	  		</div>
	       <div class="comment">
	       		<section class="comment-list">
		       		<div class="title">评论详情<span>共{{cyqDetailData.comment_num}}条评论</span></div>
		       		<ul v-if="cyqDetailData.comment_num > 0">
		       			<li v-for="comment in cyqDetailData.comment">
		       				<img :src="comment.avatar" :alt="comment.username">
		       				<span class="name">{{comment.username}}</span>
		       				<p>{{comment.content}}</p>
		       				<div class="complain" @click="complain">举报</div>
		       				<!-- <router-link :to="{ path: '/complain', query: { id: comment.id, type:3 }}" class="complain">举报</router-link> -->
		       				<span class="time">{{comment.create_time}}</span>
		       			</li>
		       		</ul>
		       		<p class="bottom-line">————我也是有底线的～～———</p>
		       </section>
		       
	       </div>
	    </div>
	    <transition name="fade">
	    <div class="pop-win" v-if="showpop">
	    	<div class="header">请选择举报类型</div>
			<div class="item" v-for="(item, index) in list">
				<input name="complain" type="checkbox" :id="index" :value="item.name" v-model="item.checked">
				<label :for="index">{{item.name}}</label>
			</div>
			<button @click="submitData" class="submit-btn">提交举报</button>
		</div>
		</transition>
	    <section class="comment-box">
	   		<div class="input-box">
	   			<input type="text" name="comment" placeholder="请填写评论内容······"  v-model="commentVal"  />
	   			<button @click="submitComment" class="submit-btn" :class="{active:commentVal}">提交</button>
	   		</div>
	   </section>
	</div>
</template>
<script>
import { MessageBox } from 'mint-ui';
export default {
	name: 'cyqdetail',
	data(){
		return {
			cyqDetailData: null, //显示车友圈详情页信息
			preventRepeatRequest: false,// 防止多次触发数据请求
			loadRatings: false, //加载更多评论是显示加载组件
			ratingOffset: 0, //评价获取数据offset值
			ratingList: null, //评价列表
			showLoading: true, //显示加载动画
			commentVal: null,
			temp: 0,
			list: [
				{ id: 1, name: '欺骗资金' },
				{ id: 2, name: '垃圾广告' },
				{ id: 3, name: '违法内容' },
				{ id: 4, name: '其它内容' },
			],
			showpop: false,
		}
	},
	computed: {
		cid: function(){
			return this.$route.params.id || 1;
		}
	},
    created(){
    	this.Indicator.open({
		  text: '加载中...',
		  spinnerType: 'fading-circle'
		});
        this.initData(); 
    },
    methods: {
    	complain(){
    		this.showpop = true;
    		console.log('complain!!!')
    	},
    	getChecked(){
			let temp = this.list.filter(item => item.checked).map(item => item.name);
			return temp.join(',');
		},
		clearIt(){
			this.list.map(item=>{
				item.checked = false;
			});
		},
    	submitData(){
			let self = this;
			let data = {
				type: this.$route.query.type || 1,
				reason: this.getChecked()
			}
			console.log('data: ', data);
			self.showpop = false;
			this.Indicator.open({
			  text: '举报提交中...',
			  spinnerType: 'fading-circle'
			});

			this.Post('api/report/'+ self.cid, data).then(res=>{
				this.Indicator.close();
				MessageBox.alert(res.message, '提示');
				self.clearIt();
			});
		},
    	initData(){
    		let self = this;
    		// 获取车友圈列表信息
			// let list = await(this.Get('api/qa'));
	    	//获取车友圈详情页信息s
    	 	this.Get('api/qa/detail/'+self.cid).then(res=>{
    	 		if(!res.error_code){
	    			self.Indicator.close();
	    			self.cyqDetailData = res.data[0];
	    			document.title = (self.cyqDetailData && self.cyqDetailData.title) || '车友圈详情';
	    		}
    	 	});
    		
    	},
    	async submitComment(){
    		console.log('提交评论！')
    		let self = this;
    		this.Post('api/qa/answer/'+ self.cid, { content: self.commentVal }).then(res=>{
    			if(!res.error_code){
	    			self.cyqDetailData.comment_num++;
	    			self.cyqDetailData.comment = [...self.cyqDetailData.comment, res.data.list[0]];
	    			self.commentVal = '';
	    		}
    		});
    	}
    }
}
</script>
<style lang="less" scoped>
	.complain{
		position: absolute;
		right: .2rem;top: 0;
		height: .4rem;line-height: .4rem;
		color: #0db4f6;
	}
	.time{
		display: block;
		font-size: .26rem;
	}
    .cyh_container{
    	font-size: .28rem;line-height: .4rem;
    	background: #f8f8f8;
    	min-height: 100%;
		.detail{
			background-color: #fff;
		}
    }
    .detail{
    	padding: 0 .2rem;
    	margin-bottom: .3rem;
    	& > .header{
			position: relative;
			padding: .2rem 0;
			text-align: left;
			border-bottom: 1px solid #eee;
			background-color: #fff;
			.avatar{
				display: inline-block;
				width: 1.31rem;height: 1.31rem;
				vertical-align: middle;
				border-radius: 100%;
				background-color: #e1e1e1;
				img{
					width: 1.31rem;height: 1.31rem;
					border-radius: 100%;
				}
			}
			.username{
				display: inline-block;
				vertical-align: middle;
			}
			.complain{
				top: 50%;
				transform: translateY(-50%);
			}
		}
		.section{
			padding: .2rem 0;
			p{
				text-indent: 2em;
				line-height: 1.8;
			}
			img{
				max-width: 100%;
				margin: .2rem auto;
				&:nth-child(1){
					margin-top: 0;
				}
			}
		}
    }
    .comment{
		padding-bottom: .3rem;
    }
    .comment-list{
    	padding: 0 0 1rem .2rem;
    	background-color: #fff;
    	.title{
    		position: relative;
    		height: .34rem;
    		padding: .3rem 0 .62rem .2rem;
    		font-weight: 700;
    		border-bottom: 1px solid #eee;
    		&:before{
    			display: inline-block;
    			position: absolute;left: 0;top: .3rem;
    			content: '';
    			width: .05rem;
    			height: .34rem;
    			background-color: #0db4f6;
    		}
    		span{
    			display: inline-block;
    			position: absolute;right: .2rem;
    			font-weight: 100;
    		}
    	}
    	ul{
    		margin-left: .2rem;
    		li{
				position: relative;
				padding: 0 0 .15rem 1.05rem;
				margin-top: .25rem;
				border-bottom: 1px solid #eee;
    		}
			img{
				position: absolute;left: 0;top: 0;
				width: .87rem;height: .87rem;
				border-radius: 100%;
			}
			.name{
				line-height: .87rem;
				color: #929191;
			}
			p{
				color: #666;
			}
			.time{
				display: block;text-align: right;
				padding-right: .2rem;
				margin-top: .2rem;
				color: #9f9e9e;
			}
    	}
    }
    
    .comment-box{
    	position: fixed;z-index: 10;
    	width: 100%;
    	left: 0;bottom: 0;
    	box-sizing: border-box;
    	padding: .15rem .2rem;
    	border: 1px solid #eee;
    	border-width: 1px 0;
    	background-color: #f8f8f8;
    }
    .input-box{
    	position: relative;
    	input, .submit-btn{
    		display: block;
    	}
		input{
			width: 90%;
			height: .68rem;
			line-height: .3rem;
			padding: .19rem .1rem;
			box-sizing: border-box;
			background-color: #eee;
			border-radius: .1rem;
		}
		.submit-btn{
			position: absolute;right: -.2rem;top: 0;
			width: 13%;height: 100%;
			text-align: center;
			background: none;
			margin: 0;
			&.active{
				color: #0db4f6;
			}
		}
    }
    .bottom-line{
    	margin: .2rem auto 0;
    	text-align: center;
    	color: #ccc;
    }
    .pop-win{
    	position: fixed;left: 50%;top: 50%;
    	transform: translate(-50%, -50%);
    	background-color: rgba(0,0,0,.7);
    	border-radius: .1rem;
    	padding: .4rem 1.5rem .6rem;
    	.header{
    		background: none;color: #fff;
    	}
    }
    .item{
		position: relative;
		padding: .2rem 0;
		color: #fff;
		input{
			display: none;
		}
		input:checked + label{
			&:before{
				background: url('../../static/images/Cancel_btn@2x.png') center center no-repeat;
				background-size: .36rem;
				border-color: #f9593a;
			}
		}
		label{
			display: block;
			height: .48rem;line-height: .48rem;
			padding-left: 1.4rem;
			&:before{
				position: absolute;
				left: .42rem; top: .26rem;
				margin:0;padding-left: 0;
				display: block;
				content: '';
				width: .36rem;height: .36rem;
				box-sizing: border-box;
				border-radius: .36rem;
				border:.02rem solid #a9a9a9;
			}
		}
	}
	.submit-btn{
		display: block;
		width: 3rem;
		border-radius: .1rem;
		margin: .25rem auto 0; 
		height: .8rem; line-height: .8rem;color: #fff;
		text-align: center;font-size: .32rem;font-weight: 700;
		background-color: #14b6f6;
	}
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  opacity: 0;
	}
</style>
