<template>
  <v-menu
    class="todo-context-menu"
    v-model="showMenu"
    :position-x="contextMenuX"
    :position-y="contextMenuY"
    absolute
    offset-y
    :transition="false"
  >
    <v-list dense outlined class="rounded" v-if="todo">
      <v-list-item link @click="toggleImportant">
        <v-list-item-icon class="mr-4">
          <v-icon v-if="todo.important" color="orange">
            mdi-alert-octagram
          </v-icon>
          <v-icon v-else>mdi-octagram-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="orange--text" v-if="todo.important">
          Remove importance
        </v-list-item-title>
        <v-list-item-title v-else>
          Mark as important
        </v-list-item-title>
      </v-list-item>
      <v-divider class="my-2" />
      <v-list-item link @click="addDueDate('today')">
        <v-list-item-icon class="mr-4">
          <v-icon>mdi-calendar-today</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Due today</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="addDueDate('tomorrow')">
        <v-list-item-icon class="mr-4">
          <v-icon>mdi-calendar-today</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Due tomorrow</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="addDueDate()">
        <v-list-item-icon class="mr-4">
          <v-icon>mdi-calendar-blank</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Pick a date ...</v-list-item-title>
      </v-list-item>
      <v-divider class="my-2" />
      <v-list-item link @click="removeTodo()">
        <v-list-item-icon class="mr-4">
          <v-icon color="red">mdi-delete-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="red--text">Delete task</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
// utils
import { Vue, Component, Model, Watch, Prop } from "@/utils/vue-imports";
import dateUtils from "@/utils/date";

// interfaces
import Todo from "@/interfaces/entities/todo";

// component
@Component({
  name: "TodoContextMenu",
})
export default class TodoListItem extends Vue {
  // props
  @Prop() readonly todo!: Todo | null;

  // model
  @Model("showChanged", { type: Boolean }) show!: boolean;

  // data
  private showMenu = false;
  private contextMenuX = 0;
  private contextMenuY = 0;

  // watchers
  @Watch("show")
  onShowChanged(value: boolean) {
    this.showMenu = value;
  }

  @Watch("showMenu")
  onShowMenuChanged(value: boolean) {
    this.$emit("showChanged", value);
  }

  // private methods
  private toggleImportant() {
    this.$emit("toggleImportant");
  }

  private addDueDate(code: string | null) {
    this.$emit("addDueDate", code ? dateUtils.codeToNumber(code) : null);
  }

  private removeTodo() {
    this.$emit("removeTodo");
  }

  // public methods
  public setCoordinates(x: number, y: number) {
    this.contextMenuX = x;
    this.contextMenuY = y;
  }
}
</script>
