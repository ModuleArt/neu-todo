<template>
  <div class="main-page">
    <PwaBar />
    <!-- <Header /> -->
    <div class="d-flex">
      <Sidebar />
      <v-flex class="main-page__content">
        <div class="main-page__scroll">
          <v-container>
            <v-row justify="center">
              <v-col cols="8">
                <TodoList />
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-flex>
    </div>
    <!-- <Footer /> -->
  </div>
</template>

<script lang="ts">
// utils
import { Vue, Component } from "@/utils/vue-imports";

// componenets
import Header from "@/components/organisms/Header/Header.vue";
import Sidebar from "@/components/organisms/Sidebar/Sidebar.vue";
import TodoList from "@/components/molecules/TodoList/TodoList.vue";
import PwaBar from "@/components/organisms/PwaBar/PwaBar.vue";

// component
@Component({
  name: "MainPage",
  components: {
    Header,
    Sidebar,
    TodoList,
    PwaBar,
  },
})
export default class MainPage extends Vue {}
</script>

<style lang="scss" scoped>
@import "./MainPage.scss";
</style>
