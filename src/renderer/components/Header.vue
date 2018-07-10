<template>
<div class="wrap">
  <h1>this is a header.</h1>
  <router-link to="/">Home</router-link>
  <router-link to="/about">About</router-link>
</div>
</template>

<style scoped>
.wrap {
  position: fixed;
  top: 0;
  width: 100%;
  background: #fff;
  border-bottom: #eee 1px solid;
  z-index: 99;
}
</style>
