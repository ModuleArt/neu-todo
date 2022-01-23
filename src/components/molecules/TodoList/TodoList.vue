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
              <v-simple-checkbox
                :value="todo.checked"
                @input="toggleChecked(todo)"
                color="primary"
              />
              <v-text-field
                v-model="todo.title"
                flat
                solo
                hide-details
                :placeholder="`Task ${todoIndex + 1}`"
                :color="todo.important ? 'orange' : ''"
              />
              <v-btn icon @click="toggleActiveTodo(todo)">
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
              <v-tooltip bottom :open-delay="tooltipOpenDelay">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    @click="toggleImportant(todo)"
                    :color="todo.important ? 'orange' : ''"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon v-if="todo.important">mdi-alert-octagram</v-icon>
                    <v-icon v-else>mdi-octagram-outline</v-icon>
                  </v-btn>
                </template>
                <span>Important</span>
              </v-tooltip>
              <v-tooltip bottom :open-delay="tooltipOpenDelay">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    @click="addDueDate(todo)"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-calendar-outline</v-icon>
                  </v-btn>
                </template>
                <span>Add due date</span>
              </v-tooltip>
              <v-tooltip bottom :open-delay="tooltipOpenDelay">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    @click="removeTodo(todo)"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-delete-outline</v-icon>
                  </v-btn>
                </template>
                <span>Delete task</span>
              </v-tooltip>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-subheader v-if="!todos.length">
          No tasks. Try to <a @click="addTodo()" class="ml-1">create one</a>
        </v-subheader>
      </v-layout>
    </div>
    <v-snackbar v-model="showRemoveSnackbar" :timeout="removeSnackbarTimeout">
      Task has been deleted
      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="bringTodoBack()">
          Undo
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "@/utils/vue-imports";

// interfaces
import Todo from "@/interfaces/entities/todo";

// component
@Component({
  name: "TodoList",
})
export default class TodoList extends Vue {
  activeTodo = "";

  showRemoveSnackbar = false;
  removeSnackbarTimeout = 3000;
  removeSnackbarTempTodo: Todo | null = null;

  tooltipOpenDelay = 500;

  @Prop({ default: "" }) readonly filter!: string;

  get todos(): Todo[] {
    return this.$store.state.todos;
  }

  toggleChecked(todo: Todo) {
    this.$store.dispatch("setChecked", {
      todoId: todo.id,
      checked: !todo.checked,
    });
  }

  toggleActiveTodo(todo: Todo) {
    if (todo.id == this.activeTodo) {
      this.activeTodo = "";
    } else {
      this.activeTodo = todo.id;
    }
  }

  removeTodo(todo: Todo) {
    this.removeSnackbarTempTodo = todo;
    this.showRemoveSnackbar = true;
    this.$store.dispatch("removeTodo", todo.id);
  }

  bringTodoBack() {
    this.showRemoveSnackbar = false;
    this.addTodo(this.removeSnackbarTempTodo);
  }

  toggleImportant(todo: Todo) {
    this.$store.dispatch("setImportant", {
      todoId: todo.id,
      important: !todo.important,
    });
  }

  addDueDate(todo: Todo) {}

  addTodo(todo: Todo | null = null) {
    if (todo) this.$store.dispatch("addTodo", todo);
    else this.$store.dispatch("addTodo");
  }
}
</script>
