<template>
  <div class="main-page">
    <Header />
    <div class="d-flex">
      <Sidebar />
      <v-flex class="pt-14 main-page__content">
        <div class="main-page__scroll">
          <v-container class="py-12 mb-10">
            <TodoList />
          </v-container>
        </div>
      </v-flex>
    </div>
  </div>
</template>

<script lang="ts">
// utils
import { Vue, Component } from "@/utils/vue-imports";

// componenets
import Header from "@/components/organisms/Header/Header.vue";
import Sidebar from "@/components/organisms/Sidebar/Sidebar.vue";
import TodoList from "@/components/molecules/TodoList/TodoList.vue";

// component
@Component({
  name: "MainPage",
  components: {
    Header,
    Sidebar,
    TodoList,
  },
})
export default class MainPage extends Vue {}
</script>

<style lang="scss" scoped>
@import "./MainPage.scss";
</style>
