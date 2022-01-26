<template>
  <div class="todo-card">
    <v-card>
      <div class="pa-2 d-flex align-center">
        <v-simple-checkbox
          :value="todo.checked"
          @input="toggleChecked()"
          :color="todo.important ? 'orange' : 'primary'"
          class="todo-card__checkbox"
        />
        <v-text-field
          v-model="todo.title"
          flat
          solo
          hide-details
          dense
          placeholder="Task title"
          outlined
          :color="todo.important ? 'orange' : ''"
          :id="`task-title--${todo.id}`"
          class="todo-card__title-input mx-2"
          @blur="setTitle($event.target.value)"
        />
        <v-btn icon @click="toggleExpandedTodo()">
          <v-icon>
            {{ expanded ? "mdi-chevron-up" : "mdi-chevron-down" }}
          </v-icon>
        </v-btn>
      </div>
      <v-divider />
      <v-expand-transition>
        <div v-show="expanded">
          <v-textarea
            v-model="todo.body"
            placeholder="Description"
            no-resize
            hide-details
            class="px-2"
            flat
            solo
            @blur="setBody($event.target.value)"
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
              @click="addDueDate()"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-calendar-outline</v-icon>
              <span v-if="todo.dueDate" class="ml-1">
                {{ formattedDate }}
              </span>
            </v-btn>
          </template>
          <span>Add due date</span>
        </v-tooltip>
        <v-tooltip bottom :open-delay="tooltipOpenDelay">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              @click="toggleImportant()"
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
            <v-btn icon @click="removeTodo()" v-bind="attrs" v-on="on">
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
          </template>
          <span>Delete task</span>
        </v-tooltip>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
// utils
import { Vue, Component, Prop } from "@/utils/vue-imports";
import dateUtils from "@/utils/date";
import config from "@/config";

// interfaces
import Todo from "@/interfaces/entities/todo";

// store modules
import { todosModule } from "@/store";

// component
@Component({
  name: "TodoCard",
})
export default class TodoCard extends Vue {
  // props
  @Prop() readonly todo!: Todo;

  // data
  expanded = false;
  tooltipOpenDelay = config.delays.tooltipOpenDelay;

  // computed
  get formattedDate(): string {
    return dateUtils.toDisplay(this.todo.dueDate || 0);
  }

  mounted() {
    const titleInput = document.getElementById(
      `task-title--${this.todo.id}`
    ) as HTMLInputElement;
    titleInput.focus();
  }

  // methods
  toggleChecked() {
    todosModule.setChecked({
      todoId: this.todo.id,
      checked: !this.todo.checked,
    });
    todosModule.syncTodo(this.todo.id);
  }

  toggleExpandedTodo() {
    this.expanded = !this.expanded;
  }

  addDueDate() {
    this.$emit("addDueDateClicked", this.todo);
  }

  toggleImportant() {
    todosModule.setImportant({
      todoId: this.todo.id,
      important: !this.todo.important,
    });
  }

  removeTodo() {
    this.$emit("removeTodoClicked", this.todo);
  }

  setTitle(title: string) {
    todosModule.setTitle({
      todoId: this.todo.id,
      title,
    });
  }

  setBody(body: string) {
    todosModule.setBody({
      todoId: this.todo.id,
      body,
    });
  }
}
</script>

<style lang="scss" scoped>
@import "./TodoCard.scss";
</style>
