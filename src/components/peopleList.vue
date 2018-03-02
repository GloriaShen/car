<template>
    <div class="loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore :top-method="loadTop"   :bottom-method="loadBottom"  :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill='autoFill'>

		<ul class="list" :class="{ list2: clistConf.name=='role' }">
		
			<li  v-for="(item, index) in clist">
				<router-link class="item" :to="{ path: clistConf.to, query:{ id: item.id } }">
					<!-- 员工列表 -->
					<template v-if="clistConf.name=='employee'">
						<img :src="item.avatar" :alt="item.username">
						{{ item.username }}
						<span class="role">{{ item.role }}</span>	
					</template>
					<!-- 角色列表 -->
					<template v-if="clistConf.name=='role'">
						{{ item.display_name }}
					</template>

				</router-link>
			</li>
			<!-- 没有更多数据 -->
			<li class="nomore" v-show="allLoaded">
				<span >没有更多数据了</span>
			</li>
		</ul>
      </mt-loadmore>
    </div>
</template>

<style lang="scss">
@import '../static/style/common';
@import '../static/style/others';
.loadmore-wrapper {
    overflow: scroll
}
</style>

<script>
  export default {
    data() {
      return {
        clist: [],
        currentPage: 1,
        allLoaded: false,
        wrapperHeight: 0,
        translate: 0,
        moveTranslate: 0,
        next: null,
        autoFill: false,
      };
    },
	props: ['data', 'clistConf'],
	created() {
      	this.clist = [...this.data.list];
      	this.next = this.data.next;
    },
    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
    methods: {
		loadBottom() {
			let self = this;
			if(!self.next){
				this.allLoaded = true;
			}else{
				self.currentPage++;
				self.pGet(this.clistConf.url + '?page=' + self.currentPage).then(res=>{
					self.clist = [...self.clist, ...res.data.list];
					self.next = res.data.next;
					self.allLoaded = self.next ? false : true;
					self.$refs.loadmore.onBottomLoaded();
				});
			}
		},
		loadTop() {
			let self = this;
			self.allLoaded = false;
			self.currentPage = 1;
			self.pGet(this.clistConf.url).then(res=>{
				self.clist = [...res.data.list];
				self.next = res.data.next;
				self.next || (self.allLoaded = true);
				self.$refs.loadmore.onTopLoaded();
			});
		},
    
	},
    
  };
</script>