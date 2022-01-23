<template>
  <div class="main-page">
    <Header />
    <v-container class="py-12">
      <h1 class="mb-4">Tasks</h1>
      <TodoList />
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "@/utils/vue-imports";
import Header from "@/components/organisms/Header/Header.vue";
import TodoList from "@/components/molecules/TodoList/TodoList.vue";

@Component({
  name: "MainPage",
  components: {
    Header,
    TodoList,
  },
})
export default class MainPage extends Vue {}
</script>
