<template>
  <div class="container">
    
    <h1>{{ msg }}</h1>
    <!-- <router-link to="/test" class="link">测试</router-link> -->
    <div class="link" @click="home">点击回到原生页面</div>
    <router-link :to="{ path: '/brand' }" class="link">品牌管理</router-link>
    <router-link :to="{ path: '/news/detail/1'}" class="link">资讯详情</router-link>
    <router-link :to="{ path: '/shop/detail/share', query:{ id: 1} }" class="link">商家分享页</router-link>
    <router-link to="/cheyouhui/7" class="link">车友圈详情</router-link>
    <a href="/order" class="link">订单</a>
    <router-link to="/financial/routine" class="link">财务管理</router-link>
    <router-link to="/employee" class="link">员工管理</router-link>
    <router-link to="/role" class="link">角色管理</router-link>
    <router-link to="/set" class="link">设置</router-link>
    <router-link :to="{ path: '/service', query:{ type: '1' } }" class="link">服务管理</router-link>
    
    <div>
      <h2>用户信息：</h2>
      <p class="red" v-if="userInfo.token == ''">没有获取到客户端的数据，此处展示默认数据</p>
      <p class="green" v-else>恭喜你成功获取到客户端用户信息！</p>
      <p>用户名 ： {{ userInfo.username }}</p>
      <p>token ： {{ userInfo.token }}</p>
      <p>电话号码 ： {{ userInfo.phone }}</p>
    </div>
  </div>
</template>

<script>
import {  mapGetters, mapActions } from 'vuex'

export default {
  name: 'temp',
  data () {
    return {
      msg: '车小二导航',
      userInfo: {
        username: 'Gloria',
        token: '',
        phone: '12345678'
      },
    }
  },
  created(){
    this.init();
  },
  methods: {
    init(){
      console.log('temp userInfo:', this.userInfo);
      let self = this;
      hx.getUserInfo && hx.getUserInfo(function(res){
        self.userInfo = {...self.userInfo, ...res.data};
      });
    },
    home(){
       // hx.finishWebview && hx.finishWebview();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.red{
  color: #c00;
}
.green{
  color: #0c0;
}
.container{
	padding: .2rem;
}
.link{
	display: block;
	font-size: .4rem;
  margin: .1rem auto;
}
button{
  display: inline-block;padding: .1rem .2rem;
}
</style>
