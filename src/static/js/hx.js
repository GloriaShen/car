var  hx1 = {
  u:navigator.userAgent,
  data:null,
  callback:function(res){
    res = JSON.parse(res);
    hx.data(res);
  },
  getUserInfo:function(callback){
    hx.data=callback;
    if (this.u.indexOf('Android') > -1 || this.u.indexOf('Linux') > -1) {//安卓手机
      //alert("安卓手机");
      window.HXFunction.functionGetUserInfo && window.HXFunction.functionGetUserInfo();
    }else if (this.u.indexOf('iPhone') > -1){
      //alert("苹果手机");
      window.webkit.messageHandlers.functionGetUserInfo.postMessage(null);
    }
  },
  finishWebview:function(){
    if (this.u.indexOf('Android') > -1 || this.u.indexOf('Linux') > -1) {//安卓手机
      //alert("安卓手机");
      window.HXFunction.functionFinish();
    }else if (this.u.indexOf('iPhone') > -1){
      //alert("苹果手机");
      window.webkit.messageHandlers.functionFinish.postMessage(null);
    }
  },
};

var  hxtest = {
  u:navigator.userAgent,
  data:null,
  callback:function(res){
    res = JSON.parse(res);
    hx.data(res);
  },
 getUserInfo: function(callback){
    var b = new Date('Tue Feb 28 2018 16:00:04 GMT+0800 (CST)')
    var res = {
        error_code: 0,
        data: {
          phone: '18209890988',
          expires_time:b.valueOf(),
          token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vY2FyLmh4MDI4Lm5ldC9zaG9wQXBpL2F1dGgvbG9naW5CeVB3ZCIsImlhdCI6MTUxODQ5MTkyNywiZXhwIjoxNTI1NjkxOTI3LCJuYmYiOjE1MTg0OTE5MjcsImp0aSI6ImZYeFFidVU4c0NSRGlBUUYiLCJzdWIiOjE1LCJwcnYiOiJhYzNjODQ0MGEzMDIyYWVmOTZlNTgyZGRiOTg5Njg4MjZjMjk0MDczIn0.iy3KIkVyHIux-NxUrX2EhK9_O6BvCfxKE96HsZ2ncTY'
        }
    };

    // callback(res)
    
    setTimeout(function(){
         console.log('返回token！！！！！！')
        callback(res)
    },1000);
    
  },
  finishWebview:function(){
    console.log('hxest:', hx);
    console.log('返回原生首页');
  },
};



var debug = true;
var hx = debug ? hxtest : hx1;
var userInfo = null;