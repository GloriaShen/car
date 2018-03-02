<!-- 评论 -->
<template>
<div>
	<div v-for="item in commentData" class="comment-item">
		<div class="bdline"></div>
		<div class="lritem">
			<div>{{ item.user.name }}用户评分<ul class="star-list"><li class="active"></li> <li></li> <li></li> <li></li> <li></li></ul></div>
			<div>{{ item.rating_time }}</div>
		</div>
		<p class="content">{{ item.comment }}</p>
		<ul v-if="item.pics.length>0" class="imgbox">
			<li v-for="(pic, index) in item.pics"><img :src="pic" :alt="index"></li>
		</ul>
	</div>
</div>
</template>
<script>

export default {
	props: ['commentData'],
	created(){
		console.log('commentData: ',this.commentData);
	}
}
</script>
<style lang="scss">
	@import '../static/style/b.config';
	.comment-item{
		.lritem{
			font-size: .24rem;
		}
		.bdline{
			margin-bottom: .1rem;
		}
		.content{
			color:$mcolor;
			margin: .06rem auto;
		}
	}
	.imgbox{
		/*display: flex;
		justify-content: space-around;*/
		li{
			display: inline-block;
			width: 1.95rem;height: 1.3rem;
			background-color: #b3b3b3;
			overflow: hidden;
			margin: 0 .1rem 0 .05rem;
		}
		img{
			display: block;width: 100%;height: 100%;
		}
	}
	.star-list{
		display: inline-block;
		margin-left: .1rem;
		li{
			display: inline-block;width: .24rem;height: .24rem;
			margin: 0;overflow: hidden;
			background: url(../static/images/b/collect.png) center center no-repeat;
			background-size: .24rem;
			&.active{
				background: url(../static/images/b/collected.png) center center no-repeat;
				background-size: .24rem;
			}
		}
	}
</style>
