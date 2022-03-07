<template>
  <div
    class="todo-caption caption text--disabled py-1 pl-3"
    v-if="customTodoFolder || todo.steps.length > 0 || todo.dueDate"
  >
    <span
      v-if="customTodoFolder"
      class="todo-caption__item todo-caption__item--folder mr-3"
    >
      <v-icon :color="customTodoFolder.color" small class="mr-1">
        {{ customTodoFolder.icon }}
      </v-icon>
      <span :class="`${customTodoFolder.color}--text`">
        {{ customTodoFolder.title }}
      </span>
    </span>
    <span
      v-if="todo.steps.length > 0"
      class="todo-caption__item todo-caption__item--steps mr-3"
    >
      <v-icon disabled small class="mr-1">
        {{
          checkedStepsCount == todo.steps.length ? "mdi-check-all" : "mdi-check"
        }}
      </v-icon>
      <span>{{ checkedStepsCount }} of {{ todo.steps.length }}</span>
    </span>
    <span
      v-if="todo.dueDate"
      class="todo-caption__item todo-caption__item--due-date mr-3"
    >
      <v-icon :disabled="!isOverdue" small class="mr-1" color="red">
        {{ dueDateIcon }}
      </v-icon>
      <span :class="{ 'red--text': isOverdue }">
        {{ formattedDate }}
      </span>
    </span>
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

  get checkedStepsCount(): number {
    return this.todo.steps.filter((step) => step.checked).length;
  }
}
</script>

<style lang="scss" scoped>
@import "./TodoCaption.scss";
</style>
