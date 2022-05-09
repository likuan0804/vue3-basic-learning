<template>
  <div class="menu">
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="LuckyDraw">抽奖活动</el-menu-item>
      <el-menu-item index="Questionnaire">问卷</el-menu-item>
    </el-menu>
  </div>
    
</template>

<script>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default {
  setup() {
    const router = new useRouter()
    const route = new useRoute()
    const activeIndex = ref(route.name)
    const handleSelect = (key) => {
      router.push({ name: key })
    }
    return {
      activeIndex,
      handleSelect
    }
  },
}
</script>

<style scoped lang="scss">
.menu {
  position: absolute;
  height: 48px;
  width: calc(100% - 180px);
  top: 0;
  left: 180px;
}
.el-menu {
  .el-menu-item {
    height: 47px;
    font-size: 14px;
    user-select: none;
  }
  .is-active {
    background-color: $select-background;
  }
}
</style>
