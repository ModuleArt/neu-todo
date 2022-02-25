<template>
  <div
    :class="{
      'todo-list': true,
      'py-12': !$isMobile,
      'py-4': $isMobile,
    }"
    v-if="currentFolder"
  >
    <div class="d-flex align-center todo-list__title">
      <h1>{{ currentFolder.title }}</h1>
    </div>
    <AddTodoField class="mt-4" />
    <div class="todo-list__todos">
      <div v-for="(todo, todoIndex) in filteredTodos" :key="`todo--${todo.id}`">
        <TodoCard
          :todo="todo"
          @addDueDateClicked="addDueDate"
          @removeTodoClicked="removeTodo"
          :expanded="selectedTodoIndex == todoIndex"
          @expandToggled="expandToggled(todoIndex)"
          class="mt-2"
        />
      </div>
      <div v-if="!filteredTodos.length && currentFolder">
        <v-subheader class="pa-0">
          There are no tasks in this folder. Try to create one.
        </v-subheader>
      </div>
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
    <DueDateDialog ref="dueDateDialog" :selected-todo="selectedTodo" />
  </div>
</template>

<script lang="ts">
// utils
import { Mixins, Component, Watch } from "@/utils/vue-imports";
import config from "@/config";

// interfaces
import Todo from "@/interfaces/entities/todo";
import Folder from "@/interfaces/entities/folder";

// store modules
import { todosModule, foldersModule } from "@/store";

// mixins
import isMobileMixin from "@/mixins/isMobile";

// components
import TodoCard from "@/components/molecules/TodoCard/TodoCard.vue";
import DueDateDialog from "@/components/dialogs/DueDateDialog/DueDateDialog.vue";
import AddTodoField from "@/components/molecules/AddTodoField/AddTodoField.vue";

// component
@Component({
  name: "TodoList",
  components: {
    TodoCard,
    DueDateDialog,
    AddTodoField,
  },
})
export default class TodoList extends Mixins(isMobileMixin) {
  // refs
  public $refs!: {
    dueDateDialog: DueDateDialog;
  };

  // data
  private selectedTodoIndex = -1;
  private selectedTodo: Todo | null = null;

  private showRemoveSnackbar = false;
  private removeSnackbarTimeout = config.delays.notificationDelay;
  private removeSnackbarTempTodo: Todo | null = null;

  // computed
  get currentFolder(): Folder | null {
    return foldersModule.getCurrentFolder;
  }

  get filteredTodos(): Todo[] {
    return todosModule.todos.filter((todo) => {
      if (this.currentFolder) {
        if (this.currentFolder.filter) {
          return this.currentFolder.filter(todo);
        } else {
          return this.currentFolder.id === todo.customFolderId;
        }
      }
    });
  }

  // watchers
  @Watch("currentFolder")
  onCurrentFolderChanged() {
    this.selectedTodoIndex = -1;
  }

  // private methods
  private expandToggled(todoIndex: number) {
    if (this.selectedTodoIndex == todoIndex) {
      this.selectedTodoIndex = -1;
    } else {
      this.selectedTodoIndex = todoIndex;
    }
  }

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
