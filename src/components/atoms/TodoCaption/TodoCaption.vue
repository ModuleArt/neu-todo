<template>
  <div
    :class="{
      'todo-caption caption text--disabled text-right d-flex py-2 px-3': true,
      'justify-space-between': customTodoFolder,
      'justify-end': !customTodoFolder,
    }"
  >
    <div
      v-if="customTodoFolder"
      class="todo-caption__item todo-caption__item--folder mr-3 text-left"
    >
      <v-icon :color="customTodoFolder.color" small class="mr-1">
        {{ customTodoFolder.icon }}
      </v-icon>
      <span :class="`${customTodoFolder.color}--text`">
        {{ customTodoFolder.title }}
      </span>
    </div>
    <div
      v-if="todo.dueDate"
      class="todo-caption__item text-right todo-caption__item--due-date"
    >
      <v-icon :disabled="!isOverdue" small class="mr-1" color="red">
        {{ dueDateIcon }}
      </v-icon>
      <span :class="{ 'red--text': isOverdue }">
        {{ formattedDate }}
      </span>
    </div>
    <div
      v-if="todo.important"
      class="todo-caption__item ml-3 todo-caption__item--important"
    >
      <v-icon small color="orange">mdi-alert-octagram</v-icon>
    </div>
  </div>
</template>

<script lang="ts">
// utils
import { Vue, Component, Prop } from "@/utils/vue-imports";
import dateUtils from "@/utils/date";

// store modules
import { foldersModule } from "@/store";

// interfaces
import Todo from "@/interfaces/entities/todo";
import Folder from "@/interfaces/entities/folder";

// component
@Component({
  name: "TodoCaption",
})
export default class TodoSteps extends Vue {
  // props
  @Prop() readonly todo!: Todo;

  // computed
  get formattedDate(): string {
    return dateUtils.toDisplay(this.todo.dueDate || 0);
  }

  get isOverdue(): boolean {
    return dateUtils.isOverdue(this.todo.dueDate);
  }

  get customTodoFolder(): Folder | null {
    return (
      foldersModule.folders.find(
        (folder: Folder) => folder.id === this.todo.customFolderId
      ) || null
    );
  }

  get dueDateIcon(): string {
    return dateUtils.getIcon(this.todo.dueDate || 0);
  }
}
</script>

<style lang="scss" scoped>
@import "./TodoCaption.scss";
</style>
