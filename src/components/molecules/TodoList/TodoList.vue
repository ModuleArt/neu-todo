<template>
  <div class="todo-list">
    <div class="todo-list__todos d-flex">
      <v-layout wrap row>
        <v-flex
          v-for="(todo, todoIndex) in todos"
          :key="todo.id"
          grow
          xs6
          class="pa-2"
        >
          <v-card outlined>
            <div class="py-1 pl-4 pr-2 d-flex align-center">
              <v-checkbox
                v-model="todo.checked"
                hide-details
                class="shrink ma-0 pa-0"
              />
              <v-text-field
                v-model="todo.title"
                flat
                solo
                hide-details
                :placeholder="`Task ${todoIndex + 1}`"
              />
              <v-btn icon @click="toggleActiveTodo(todo.id)">
                <v-icon>
                  {{ todo.expand ? "mdi-chevron-up" : "mdi-chevron-down" }}
                </v-icon>
              </v-btn>
            </div>
            <v-divider />
            <v-expand-transition>
              <div v-show="activeTodo == todo.id">
                <v-textarea
                  v-model="todo.body"
                  placeholder="Description"
                  no-resize
                  hide-details
                  class="px-2"
                  flat
                  solo
                />
                <v-divider />
              </div>
            </v-expand-transition>
            <v-card-actions>
              <v-spacer />
              <v-btn icon @click="addDueDate(todo)">
                <v-icon>mdi-calendar-outline</v-icon>
              </v-btn>
              <v-btn
                icon
                @click="toggleImportant(todo)"
                :color="getCardColor(todo)"
              >
                <v-icon v-if="todo.important">mdi-alert-octagram</v-icon>
                <v-icon v-else>mdi-octagram-outline</v-icon>
              </v-btn>
              <v-btn icon @click="removeTodo(todo)">
                <v-icon>mdi-delete-outline</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-subheader v-if="!todos.length">
          No tasks. Try to create one
        </v-subheader>
      </v-layout>
    </div>
    <v-snackbar v-model="showRemoveSnackbar" :timeout="removeSnackbarTimeout">
      Task has been deleted
      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="bringTodoBack">
          Undo
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "@/utils/vue-imports";

// interfaces
import Todo from "@/interfaces/entities/todo";

// component
@Component({
  name: "TodoList",
})
export default class TodoList extends Vue {
  activeTodo = -1;

  showRemoveSnackbar = false;
  removeSnackbarTimeout = 2000;
  removeSnackbarTempTodo: Todo | null = null;

  get todos(): Todo[] {
    return this.$store.state.todos;
  }

  toggleActiveTodo(todoId: number) {
    if (todoId == this.activeTodo) {
      this.activeTodo = -1;
    } else {
      this.activeTodo = todoId;
    }
  }

  removeTodo(todo: Todo) {
    this.removeSnackbarTempTodo = todo;
    this.showRemoveSnackbar = true;
    this.$store.dispatch("removeTodo", todo.id);
  }

  bringTodoBack() {
    this.showRemoveSnackbar = false;
    if (this.removeSnackbarTempTodo) this.addTodo(this.removeSnackbarTempTodo);
  }

  toggleImportant(todo: Todo) {
    this.$store.dispatch("setImportant", todo.id);
  }

  addDueDate(todo: Todo) {}

  getCardColor(todo: Todo) {
    return todo.important ? "orange" : "";
  }

  addTodo(todo: Todo) {
    this.$store.dispatch("addTodo", todo);
  }
}
</script>
