<template>
  <div class="todo-list">
    <div class="d-flex align-center mb-4 todo-list__title">
      <h1>{{ currentFolder && currentFolder.title }}</h1>
    </div>
    <div class="todo-list__todos d-flex">
      <v-layout wrap row class="pa-2 todo-list__list">
        <v-flex
          v-for="todo in filteredTodos"
          :key="`todo--${todo.id}`"
          grow
          xs6
          shrink
          class="pa-1 todo-list__item"
        >
          <TodoCard
            :todo="todo"
            @addDueDateClicked="addDueDate"
            @removeTodoClicked="removeTodo"
          />
        </v-flex>
        <div v-if="!filteredTodos.length && currentFolder" class="px-1">
          <span>There are no tasks in this folder.</span>
          <span v-if="currentFolder.transform || currentFolder.custom">
            Try to
            <a
              @click="addTodo()"
              :class="{
                [`${currentFolder.color}--text`]: currentFolder.color,
              }"
            >
              create one
            </a>
          </span>
        </div>
      </v-layout>
    </div>
    <v-snackbar v-model="showRemoveSnackbar" :timeout="removeSnackbarTimeout">
      Task
      <span v-if="removeSnackbarTempTodo">
        <b>{{ removeSnackbarTempTodo.title }}</b>
      </span>
      has been deleted
      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="bringTodoBack()">
          Undo
        </v-btn>
      </template>
    </v-snackbar>
    <DueDateDialog ref="dueDateDialog" :selectedTodo="selectedTodo" />
  </div>
</template>

<script lang="ts">
// utils
import { Vue, Component } from "@/utils/vue-imports";
import config from "@/config";

// interfaces
import Todo from "@/interfaces/entities/todo";
import Folder from "@/interfaces/entities/folder";

// store modules
import { todosModule, foldersModule } from "@/store";

// components
import TodoCard from "@/components/molecules/TodoCard/TodoCard.vue";
import DueDateDialog from "@/components/dialogs/DueDateDialog/DueDateDialog.vue";

// component
@Component({
  name: "TodoList",
  components: {
    TodoCard,
    DueDateDialog,
  },
})
export default class TodoList extends Vue {
  // refs
  public $refs!: {
    dueDateDialog: DueDateDialog;
  };

  // data
  private selectedTodo: Todo | null = null;

  private showRemoveSnackbar = false;
  private removeSnackbarTimeout = config.delays.notificationDelay;
  private removeSnackbarTempTodo: Todo | null = null;

  // computed
  get currentFolder(): Folder | null {
    return foldersModule.getCurrentFolder;
  }

  get filteredTodos(): Todo[] {
    if (this.currentFolder) {
      return todosModule.todos.filter((todo) => {
        if (this.currentFolder) {
          if (this.currentFolder.filter) {
            return this.currentFolder.filter(todo);
          } else {
            return this.currentFolder.id === todo.customFolderId;
          }
        }
      });
    } else {
      return todosModule.todos;
    }
  }

  // private methods
  private removeTodo(todo: Todo) {
    this.removeSnackbarTempTodo = todo;
    this.showRemoveSnackbar = true;
    todosModule.removeTodo(todo.id);
  }

  private bringTodoBack() {
    this.showRemoveSnackbar = false;
    if (this.removeSnackbarTempTodo) {
      this.addTodo(this.removeSnackbarTempTodo);
      this.removeSnackbarTempTodo = null;
    }
  }

  private addDueDate(todo: Todo) {
    this.selectedTodo = todo;
    this.$refs.dueDateDialog.setDialogOpened(true);
  }

  private addTodo(todo?: Todo) {
    if (todo) {
      todosModule.addTodo({ todo });
    } else if (this.currentFolder) {
      todosModule.addTodo({
        transform: this.currentFolder.transform,
        customFolderId: this.currentFolder.id,
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./TodoList.scss";
</style>
