<template>
  <div class="todo-list">
    <div class="todo-list__todos d-flex">
      <v-layout wrap row class="pa-2">
        <v-flex
          v-for="(todo, todoIndex) in todos"
          :key="todo.id"
          grow
          xs6
          class="pa-1"
        >
          <v-card>
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
              <div v-show="activeTodo && activeTodo.id == todo.id">
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
                    :icon="!todo.dueDate"
                    :text="todo.dueDate != null"
                    @click="addDueDate(todo)"
                    :color="todo.dueDate ? 'primary' : ''"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-calendar-outline</v-icon>
                    <span v-if="todo.dueDate" class="ml-1">
                      {{ formatDate(todo.dueDate) }}
                    </span>
                  </v-btn>
                </template>
                <span>Add due date</span>
              </v-tooltip>
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
    <v-dialog v-model="showDueDateDialog" max-width="320">
      <v-card v-if="activeTodo">
        <v-date-picker
          color="primary"
          full-width
          flat
          :value="numberToCode(activeTodo.dueTime)"
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
            v-if="activeTodo.dueDate"
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
import { Vue, Component, Prop } from "@/utils/vue-imports";
import dateUtils from "@/utils/date";

// interfaces
import Todo from "@/interfaces/entities/todo";

// component
@Component({
  name: "TodoList",
})
export default class TodoList extends Vue {
  activeTodo: Todo | null = null;

  showRemoveSnackbar = false;
  removeSnackbarTimeout = 3000;
  removeSnackbarTempTodo: Todo | null = null;

  tooltipOpenDelay = 500;

  showDueDateDialog = false;

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
    if (this.activeTodo && todo.id == this.activeTodo.id) {
      this.activeTodo = null;
    } else {
      this.activeTodo = todo;
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

  addDueDate(todo: Todo) {
    this.activeTodo = todo;
    this.showDueDateDialog = true;
  }

  isDueToDate(code: string): boolean {
    if (this.activeTodo && this.activeTodo.dueDate) {
      return code === dateUtils.numberToCode(this.activeTodo.dueDate);
    } else {
      return false;
    }
  }

  numberToCode(): string {
    if (this.activeTodo)
      return dateUtils.numberToCode(this.activeTodo.dueDate, true);
    else return "";
  }

  setDueDate(code: string) {
    if (this.activeTodo) {
      this.$store.dispatch("setDueDate", {
        todoId: this.activeTodo.id,
        dueDate: dateUtils.codeToNumber(code),
      });
      this.showDueDateDialog = false;
    }
  }

  clearDueDate() {
    if (this.activeTodo) {
      this.$store.dispatch("setDueDate", {
        todoId: this.activeTodo.id,
        dueDate: null,
      });
      this.showDueDateDialog = false;
    }
  }

  formatDate(date: number) {
    return dateUtils.toDisplay(date);
  }

  addTodo(todo: Todo | null = null) {
    if (todo) this.$store.dispatch("addTodo", todo);
    else this.$store.dispatch("addTodo");
  }
}
</script>

<style lang="scss" scoped>
@import "./TodoList.scss";
</style>
