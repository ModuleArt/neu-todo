<template>
  <div class="main-page">
    <div class="d-flex">
      <Sidebar />
      <v-row>
        <v-col>
          <Header />
          <v-container class="py-12 mb-7">
            <TodoList />
          </v-container>
        </v-col>
      </v-row>
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
