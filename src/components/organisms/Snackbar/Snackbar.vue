<template>
  <v-snackbar v-model="showRemoveSnackbar" :timeout="removeSnackbarTimeout" app>
    Task
    <span v-if="removeSnackbarTempTodo">
      <b>{{ removeSnackbarTempTodo.title }}</b>
    </span>
    has been deleted
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="bringTodoBack()">
        Undo
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
// utils
import EventBus from "@/main";
import { Vue, Component } from "@/utils/vue-imports";
import config from "@/config";

// interfaces
import Todo from "@/interfaces/entities/todo";

// store modules
import { todosModule } from "@/store";

// component
@Component({
  name: "Snackbar",
})
export default class Snackbar extends Vue {
  // data
  private showRemoveSnackbar = false;
  private removeSnackbarTimeout = config.delays.notificationDelay;
  private removeSnackbarTempTodo: Todo | null = null;

  // lifecycle
  private created() {
    setTimeout(() => {
      EventBus.$on("mutationRemoveTodo", (todo: Todo) => {
        this.removeSnackbarTempTodo = todo;
        this.showRemoveSnackbar = true;
      });
    }, 0);
  }

  // private methods
  private bringTodoBack() {
    this.showRemoveSnackbar = false;
    if (this.removeSnackbarTempTodo) {
      todosModule.addTodo({ todo: this.removeSnackbarTempTodo });
      this.removeSnackbarTempTodo = null;
    }
  }
}
</script>
