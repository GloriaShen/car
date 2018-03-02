export const RULES = {
	isNotEmpty: function(val){
		if(val=='undefined' || !val.length){
			return false;
		}
		return true;
	},
	isMobile: function(val){
		var reg = /0?(13|14|15|17|18|19)[0-9]{9}/;
		return reg.test(val);
	},
}