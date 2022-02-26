<template>
  <div class="add-todo-field">
    <v-text-field
      dense
      label="Add a task"
      hide-details
      solo
      placeholder="Task title"
      prepend-inner-icon="mdi-plus"
      :color="currentFolder.color || 'primary'"
      outlined
      @contextmenu.stop
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
  // computed
  get currentFolder(): Folder | null {
    return foldersModule.getCurrentFolder;
  }

  // methods
  private addTodo() {
    if (this.currentFolder) {
      todosModule.addTodo({
        transform: this.currentFolder.transform,
        customFolderId: this.currentFolder.id,
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./AddTodoField.scss";
</style>
