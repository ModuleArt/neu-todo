<template>
  <div class="todo-list">
    <div class="todo-list__todos d-flex">
      <v-layout wrap row class="pa-2">
        <v-flex v-for="todo in todos" :key="todo.id" grow xs6 class="pa-1">
          <todo-card
            :todo="todo"
            @addDueDateClicked="addDueDate"
            @removeTodoClicked="removeTodo"
          />
        </v-flex>
        <v-subheader v-if="!todos.length" class="px-1">
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
import { Vue, Component, Prop } from "@/utils/vue-imports";
import dateUtils from "@/utils/date";

// interfaces
import Todo from "@/interfaces/entities/todo";

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
  selectedTodo: Todo | null = null;

  showRemoveSnackbar = false;
  removeSnackbarTimeout = 3000;
  removeSnackbarTempTodo: Todo | null = null;

  showDueDateDialog = false;

  @Prop({ default: "" }) readonly filter!: string;

  get todos(): Todo[] {
    return this.$store.state.todos;
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
      this.$store.dispatch("setDueDate", {
        todoId: this.selectedTodo.id,
        dueDate: dateUtils.codeToNumber(code),
      });
      this.showDueDateDialog = false;
    }
  }

  clearDueDate() {
    if (this.selectedTodo) {
      this.$store.dispatch("setDueDate", {
        todoId: this.selectedTodo.id,
        dueDate: null,
      });
      this.showDueDateDialog = false;
    }
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
