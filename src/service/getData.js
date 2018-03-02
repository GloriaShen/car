
/**
 * 车友圈临时测试token
 */
// const token1 = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyb3NzIiwiaWF0IjoxNTE1OTk1MjM5LCJleHAiOjE1MjMxOTUyMzksIm5iZiI6MTUxNTk5NTIzOSwianRpIjoiRTZtQjZLT1RwZmhtYVg5MyIsInN1YiI6MiwicHJ2IjoiZjkzMDdlYjVmMjljNzJhOTBkYmFhZWYwZTI2ZjAyNjJlZGU4NmY1NSJ9.IdGuUuUoTXSrjYWv8pbquOwdEbmlSU5-s7rKaWhjTkY';
/**
 * 商户端临时测试token
 */
// userInfo.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTcwLjI0MC4xMDAuMzE6ODAwMC9zaG9wQXBpL2F1dGgvbG9naW5CeVB3ZCIsImlhdCI6MTUxNTY1OTIwMCwiZXhwIjoxNTUxOTQ3MjAwLCJuYmYiOjE1MTU2NTkyMDAsImp0aSI6InFGVm5YRGpPVjZGdWNoVUciLCJzdWIiOjEsInBydiI6ImFjM2M4NDQwYTMwMjJhZWY5NmU1ODJkZGI5ODk2ODgyNmMyOTQwNzMifQ.YkQ8lSdsfBz2OB7WoCdjYpeMUixcTKlVC_-8kYq80BA';

function timeFn(config, cui){
	let u = JSON.parse(localStorage.getItem('userInfo'));
	let time = (new Date().valueOf() - u.expires_time)/1000;
	if(time > -600){
		hx.getUserInfo(res=>{
			console.log('离token过期只有10分钟了，即刻更新userInfo');
			config.headers.Authorization = `Bearer ${res.data.token}`;
			res.data.from = 'timeout';
		    localStorage.setItem('userInfo', JSON.stringify(res.data));
		});
	}
	
};
/**
 * [config description]
 * @type {Object}
 */
import axios from 'axios'

let httpConf = {
	baseURL: 'http://car.hx028.net/',
    timeout: 20000,
    headers: {
        'Accept': 'application/vnd.car2.v1+json',
		'Content-Type': 'application/json',
		// 'Authorization': 'Bearer ' + userInfo.token
    }
}

let $http = axios.create(httpConf);
let cui = JSON.parse(localStorage.getItem('userInfo'));

if(cui){
	// 页面刷新时 localStorage 存在， 读取
	$http.interceptors.request.use(config=>{
		config.headers.Authorization = `Bearer ${cui.token}`;
		// 提前更新userInfo
		timeFn(config, cui);
		return config;
	});
}else{
	// 页面刷新时，localStorage不存在
	hx.getUserInfo(res=>{
		console.log('第一次访问页面，数据即刻存入localStorage');
		$http.interceptors.request.use(config=>{
			config.headers.Authorization = `Bearer ${res.data.token}`;
			res.data.from = 'getData';
			localStorage.setItem('userInfo', JSON.stringify(res.data));
			timeFn(config, res.data);
			
			console.log('no cui :', config);
			return config;
		});
		
	})
}

// 上传图片
let uploadConf = {
	baseURL: 'http://car.hx028.net/',
    timeout: 20000,
    headers: {
        'Accept': 'application/vnd.car2.v1+json',
		"Content-Type": "multipart/form-data",
		// 'Authorization': 'Bearer ' + userInfo.token
    }
}
let $upload = axios.create(uploadConf);
$upload.interceptors.request.use(config=>{
	config.headers.Authorization = `Bearer ${cui.token}`;
	return config;
});
export const uploadImg = (data) => {
	let image = new FormData()
	for(let i in data){
		image.append(i, data[i]);
	}
	console.log('image:', image);
    $upload.post('api/tools/uploadImg', image).then(res=>{
    	res = res.data;
    	if( !res.error_code ){
    		// 上传成功
    		data.callback && data.callback(res.data);
    	}else{
    		console.log('上传图片失败 res:', res);
    	}
    });
}
/**
 * 日周月统计
 */
export const countOrder = (type=1, cb) => {
	if(type=='day'){
		// 日统计
		$http.get('shopApi/order/stat/day').then(res=>{
			cb(res.data);
		});
	}else{
		// 周统计 || 月统计
		let n = type == 'week' ? 7 : 30;
		$http.get('shopApi/order/stat/days/' + n).then(res=>{
			cb(res.data);
		});
	}
}



export const Get = (url) => $http.get(url).then(res=>res.data);
export const Post = (url, data) => $http.post(url, data).then(res=>res.data);
export const Delete = (url) => $http.delete(url).then(res=>res.data);
export const Put = (url) => $http.put(url).then(res=>res.data);

export const pGet = (url) => $http.get(url).then(res=>{
	let data = new Promise(resolve=>{
		resolve(res.data);
	});
	return data;
});

export const pPost = (url, data) => $http.post(url, data).then(res=>{
	return new Promise(resolve=>{
		resolve(res.data);
	});
});


export {userInfo};