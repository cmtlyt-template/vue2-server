<template>
  <section class="layout-page">
    <el-container>
      <el-header>
        <div class="project-name">{{ config.projectName }}</div>
        <div class="user-info">
          <el-dropdown>
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside>
          <el-menu router default-active="2" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
            <component
              v-for="(item, idx) in menuList"
              :key="item.name"
              :is="item.children ? 'el-submenu' : 'el-menu-item'"
              :index="idx + ''"
              :route="{ name: item.name }"
            >
              <template v-if="item.children">
                <template slot="title">
                  <i :class="item.meta.icon || 'el-icon-location'"></i>
                  <span>{{ item.meta.title }}</span>
                </template>
                <el-menu-item
                  v-for="(citem, cidx) in item.children"
                  :key="citem.name"
                  :index="`${idx}-${cidx}`"
                  :route="{ name: item.name }"
                >
                  <i :class="citem.meta.icon || 'el-icon-location'"></i>
                  <span slot="title">{{ citem.meta.title }}</span>
                </el-menu-item>
              </template>
              <template v-else>
                <i :class="item.meta.icon || 'el-icon-location'"></i>
                <span slot="title">{{ item.meta.title }}</span>
              </template>
            </component>
          </el-menu>
          <div class="collapse-btn" @click="isCollapse = !isCollapse">
            <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
          </div>
        </el-aside>
        <el-container>
          <el-main>
            <router-view />
          </el-main>
          <el-footer>
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.name" :to="{ name: item.name }">{{
                item.label
              }}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </section>
</template>

<script>
import config from '@conf/index'
import {
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Avatar,
} from 'element-ui'
export default {
  name: 'layout',
  components: {
    [Container.name]: Container,
    [Header.name]: Header,
    [Aside.name]: Aside,
    [Main.name]: Main,
    [Footer.name]: Footer,
    [Menu.name]: Menu,
    [MenuItem.name]: MenuItem,
    [MenuItemGroup.name]: MenuItemGroup,
    [Submenu.name]: Submenu,
    [Tooltip.name]: Tooltip,
    [Breadcrumb.name]: Breadcrumb,
    [BreadcrumbItem.name]: BreadcrumbItem,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Avatar.name]: Avatar,
  },
  data() {
    return {
      isCollapse: true,
      config,
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
  },
  computed: {
    breadcrumbList() {
      const list = this.$route.matched.slice(1)
      return list.map(item => ({
        name: item.name,
        label: item.meta.title,
      }))
    },
    menuList() {
      return this.$router.options.routes
    },
  },
}
</script>

<style scoped lang="scss">
.layout-page {
  .el-container {
    width: 100%;
    height: 100%;
    .el-header {
      display: flex;
      justify-content: space-between;
      .project-name {
        display: flex;
        align-items: center;
        font-size: 24px;
      }
      .user-info {
        display: flex;
        align-items: center;
      }
    }
    .el-aside {
      display: flex;
      flex-direction: column;
      width: max-content !important;
      .el-menu {
        flex: 1;
        border-right: none;
        &:not(.el-menu--collapse) {
          width: 200px;
        }
      }
      .collapse-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        font-size: 18px;
        transition: background-color 300ms;
        &:hover {
          background-color: #efefef;
        }
      }
    }
    .el-main {
      background-color: #fafafa;
      padding: 12px;
      & > section {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        border-radius: 12px;
        background-color: #fff;
      }
    }
    .el-footer {
      display: flex;
      align-items: center;
      height: 40px !important;
      .el-breadcrumb__item:last-child {
        pointer-events: none;
      }
    }
  }
}
</style>
