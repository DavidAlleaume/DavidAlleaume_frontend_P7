<template>
<div>
  <router-view></router-view>
</div> 
</template>

<script>

export default {
  name: 'App',
  components: {}
}

</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap");

* {
  margin:0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: "Poppins", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #091f43;
  margin-top: 60px;
}
body {
  padding: 32px;
  min-width: 300px;
  min-height: 100vh;
}
</style>
