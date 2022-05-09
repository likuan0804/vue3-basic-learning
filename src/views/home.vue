<template>
  <div class="marketing-tools">
    <header class="header">
      <div class="brand-container">
        <span class="text">营销工具</span>
      </div>
      <Menu />
    </header>
    <router-view />
  </div>
</template>

<script setup>
import Menu from '@/components/menu.vue'
console.log('进来了')
</script>

<style lang="scss" scoped>
  .marketing-tools {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow-x: auto;
    min-width: 1254px;
    background-color: $page-bg;
  }
  .header {
    height: 48px;
    background-color: #fff;
  }
  .brand-container {
    width: 180px;
    height: 48px;
    display: inline-block;
    border-bottom: 1px solid $gray-border;
    padding-left: 10px;
    position: relative;
    .logo {
      width: 82px;
      height: 36px;
      margin-top: 6px;
    }
    .text {
      display: inline-block;
      line-height: 48px;
      color: $primary-color;
      font-size: 14px;
      font-weight: bold;
      padding: 0 12px;
      position: absolute;
      font-family: Microsoft YaHei;
    }
  }
</style>
