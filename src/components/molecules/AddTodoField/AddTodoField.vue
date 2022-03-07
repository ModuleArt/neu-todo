<template>
  <div class="add-todo-field">
    <v-text-field
      dense
      label="Add a task"
      hide-details
      solo
      flat
      placeholder="Task title"
      prepend-inner-icon="mdi-plus"
      :color="currentFolder.color"
      outlined
      @contextmenu.stop
      v-model="tempStepTitle"
      @keypress.enter="addTodo"
    />
  </div>
</template>

<script lang="ts">
// utils
import { Vue, Component } from "@/utils/vue-imports";

// interfaces
import Folder from "@/interfaces/entities/folder";

// store modules
import { todosModule, foldersModule } from "@/store";

// component
@Component({
  name: "AddTodoField",
})
export default class Header extends Vue {
  // data
  private tempStepTitle = "";

  // computed
  get currentFolder(): Folder | null {
    return foldersModule.getCurrentFolder;
  }

  // methods
  private addTodo() {
    if (this.currentFolder && this.tempStepTitle.length) {
      todosModule.addTodo({
        title: this.tempStepTitle,
        transform: this.currentFolder.transform,
        customFolderId: this.currentFolder.id,
      });
      this.tempStepTitle = "";
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./AddTodoField.scss";
</style>
