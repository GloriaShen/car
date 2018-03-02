<template>
  <div id="app">
   <router-view />
  </div>
</template>

<script>
import './utils/rem';
export default {
  name: 'app',
}
</script>
<style lang="scss">
    @import './static/style/reset';
    @import './static/style/b.config';
    @import './static/style/common';
</style>
