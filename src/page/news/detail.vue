<template>
	<div v-if="news" class="news-detail">
		<carTitle :configTitle="configTitle"></carTitle>
		<div class="section">
			<h6 class="news-title">{{news.title}}</h6>
			<p class="extra-info">{{news.create_time}}  {{news.nickname}}</p>
			<div class="content" v-html="news.content">{{ news.content }}</div>
		</div>
		<div class="download">
			<p class="title"></p>
			<img src="../../static/images/code.png" alt="成都范儿二维码">
		</div>

	</div>
</template>
<script>
import carTitle from '@/components/title'
	export default {
		data(){
			return {
				configTitle: { 
	                title: '',
	                fclick: false
	            },
				news: null,
				showLoading: true, //显示加载动画
			}
		},
		created(){
			this.Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			});
			let self = this;
			this.pGet('api/news/detail/' + (this.$route.params.id || 1)).then(res=>{
				this.Indicator.close();
				if(!res.error_code){
					self.configTitle.title = res.data[0].title;
					res.data[0].content = res.data[0].content.replace(/position: fixed;/g, '');
					self.news = res.data[0];
				}
			});
		},
		components:{
			carTitle,
		}
	}
</script>
<style lang="scss">
	@import '../../static/style/b.config';
	.section{
		padding: 0 .25rem;
	}
	.news-detail{
		width: 100%;min-height: 100%;
		background: #fff url('../../static/images/dec_bg.png') right bottom no-repeat;
		background-size: 7.5rem;
		& > .order-section{
			border-top: 1px solid $bdColor;
		}
		.news-title{
			font-size: .32rem;line-height: .42rem;color: #333;font-weight: 600;
			padding: .3rem 0;
			border-bottom: 1px solid $bdColor;

		}
		.extra-info{
			color: $color3;
			margin: .18rem auto;
		}
		.content{
			position: relative;
			overflow: hidden;
			img{
				max-width: 100%;
				margin:.2rem auto;
			}
		}
	}
	.download{
		padding: .4rem 0 .6rem;
		.title{
			height: .27rem;
			width: 100%;
			background: url(../../static/images/download_app.png) center center no-repeat;
			background-size: auto .27rem;
		}
		img{
			width: 2rem;
			margin: .4rem auto;
		}
	}
</style>