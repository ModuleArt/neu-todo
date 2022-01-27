<template>
  <div class="todo-list">
    <h1 class="mb-4">{{ currentFolder && currentFolder.title }}</h1>
    <div class="todo-list__todos d-flex">
      <v-layout wrap row class="pa-2">
        <v-flex
          v-for="todo in filteredTodos"
          :key="`todo--${todo.id}`"
          grow
          xs6
          class="pa-1"
        >
          <TodoCard
            :todo="todo"
            @addDueDateClicked="addDueDate"
            @removeTodoClicked="removeTodo"
          />
        </v-flex>
        <v-subheader v-if="!filteredTodos.length && currentFolder" class="px-1">
          There are no tasks in this list. Try to
          <a
            @click="addTodo()"
            :class="{
              'ml-1': true,
              [`${currentFolder.color}--text`]: currentFolder.color,
            }"
          >
            create one
          </a>
        </v-subheader>
      </v-layout>
    </div>
    <v-snackbar
      v-model="showRemoveSnackbar"
      :timeout="removeSnackbarTimeout"
      class="pl-14"
    >
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
    <v-dialog v-model="showDueDateDialog" max-width="320">
      <v-card v-if="selectedTodo">
        <v-date-picker
          color="primary"
          full-width
          flat
          :value="numberToCode(selectedTodo.dueTime)"
          @change="setDueDate($event)"
          class="rounded-0 todo-list__due-date-picker"
        />
        <div class="pa-2">
          <v-btn
            depressed
            class="mr-2"
            :color="isDueToDate('today') ? 'primary' : ''"
            @click="setDueDate('today')"
          >
            Today
          </v-btn>
          <v-btn
            depressed
            :color="isDueToDate('tomorrow') ? 'primary' : ''"
            @click="setDueDate('tomorrow')"
          >
            Tomorrow
          </v-btn>
        </div>
        <v-divider />
        <v-card-actions class="pa-2">
          <v-btn
            v-if="selectedTodo.dueDate"
            text
            @click="clearDueDate()"
            color="red"
          >
            Remove due date
          </v-btn>
          <v-spacer />
          <v-btn text @click="showDueDateDialog = false" color="primary">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
// utils
import { Vue, Component } from "@/utils/vue-imports";
import dateUtils from "@/utils/date";
import config from "@/config";

// interfaces
import Todo from "@/interfaces/entities/todo";
import Folder from "@/interfaces/entities/folder";

// store modules
import { todosModule, foldersModule } from "@/store";

// components
import TodoCard from "@/components/molecules/TodoCard/TodoCard.vue";

// component
@Component({
  name: "TodoList",
  components: {
    TodoCard,
  },
})
export default class TodoList extends Vue {
  // data
  selectedTodo: Todo | null = null;

  showRemoveSnackbar = false;
  removeSnackbarTimeout = config.delays.notificationDelay;
  removeSnackbarTempTodo: Todo | null = null;

  showDueDateDialog = false;

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

  // methods
  removeTodo(todo: Todo) {
    this.removeSnackbarTempTodo = todo;
    this.showRemoveSnackbar = true;
    todosModule.removeTodo(todo.id);
  }

  bringTodoBack() {
    this.showRemoveSnackbar = false;
    if (this.removeSnackbarTempTodo) {
      this.addTodo(this.removeSnackbarTempTodo);
      this.removeSnackbarTempTodo = null;
    }
  }

  addDueDate(todo: Todo) {
    this.selectedTodo = todo;
    this.showDueDateDialog = true;
  }

  isDueToDate(code: string): boolean {
    if (this.selectedTodo && this.selectedTodo.dueDate) {
      return code === dateUtils.numberToCode(this.selectedTodo.dueDate);
    } else {
      return false;
    }
  }

  numberToCode(): string {
    if (this.selectedTodo)
      return dateUtils.numberToCode(this.selectedTodo.dueDate, true);
    else return "";
  }

  setDueDate(code: string) {
    if (this.selectedTodo) {
      todosModule.setDueDate({
        todoId: this.selectedTodo.id,
        dueDate: dateUtils.codeToNumber(code),
      });
      this.showDueDateDialog = false;
    }
  }

  clearDueDate() {
    if (this.selectedTodo) {
      todosModule.setDueDate({
        todoId: this.selectedTodo.id,
        dueDate: null,
      });
      this.showDueDateDialog = false;
    }
  }

  addTodo(todo?: Todo) {
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
