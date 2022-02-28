<template>
  <div class="main-page">
    <PwaBar />
    <div class="d-flex">
      <Sidebar />
      <div class="main-page__scroll d-flex justify-center">
        <v-container class="main-page__content">
          <v-row justify="center" class="main-page__row">
            <v-col cols="8" class="main-page__col">
              <TodoList />
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
    <EditFolderDialog />
    <Snackbar />
  </div>
</template>

<script lang="ts">
// utils
import { Vue, Component } from "@/utils/vue-imports";

// componenets
import Sidebar from "@/components/organisms/Sidebar/Sidebar.vue";
import TodoList from "@/components/molecules/TodoList/TodoList.vue";
import PwaBar from "@/components/organisms/PwaBar/PwaBar.vue";
import EditFolderDialog from "@/components/dialogs/EditFolderDialog/EditFolderDialog.vue";
import Snackbar from "@/components/organisms/Snackbar/Snackbar.vue";

// component
@Component({
  name: "MainPage",
  components: {
    Sidebar,
    TodoList,
    PwaBar,
    EditFolderDialog,
    Snackbar,
  },
})
export default class MainPage extends Vue {}
</script>

<style lang="scss" scoped>
@import "./MainPage.scss";
</style>
