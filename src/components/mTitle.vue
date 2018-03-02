<template>
	<div class="mtitle" :class="mtitle.borderLeft">
		{{mtitle.title}}
		<span class="st" v-if="mtitle.subtitle">{{mtitle.subtitle}}</span>
		<router-link class="st" v-if="mtitle.path" :to="mtitle.path">{{mtitle.subtitle}}</router-link>	
	</div>
</template>
<script>
	export default {
		props: ['mtitle']
	}
</script>

