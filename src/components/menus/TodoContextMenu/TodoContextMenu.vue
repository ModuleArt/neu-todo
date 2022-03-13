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
    <v-list dense outlined class="rounded py-1" v-if="todo">
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
      <v-list-item link @click="toggleChecked">
        <v-list-item-icon class="mr-4">
          <v-icon>mdi-checkbox-marked-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title v-if="todo.checked">
          Mark as not completed
        </v-list-item-title>
        <v-list-item-title v-else>
          Mark as completed
        </v-list-item-title>
      </v-list-item>
      <v-divider class="my-1" />
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
      <v-list-item v-if="todo.dueDate" link @click="clearDueDate()">
        <v-list-item-icon class="mr-4">
          <v-icon color="red">mdi-calendar-remove</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="red--text">Remove due date</v-list-item-title>
      </v-list-item>
      <v-divider class="my-1" />
      <v-list-item link @click="chooseFolder()">
        <v-list-item-icon class="mr-4">
          <v-icon>mdi-folder-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Choose folder ...</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="todo.customFolderId" link @click="clearFolder()">
        <v-list-item-icon class="mr-4">
          <v-icon color="red">mdi-folder-remove-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="red--text">No folder</v-list-item-title>
      </v-list-item>
      <v-divider class="my-1" />
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
import Folder from "@/interfaces/entities/folder";

// store modules
import { todosModule, foldersModule } from "@/store";

// component
@Component({
  name: "TodoContextMenu",
})
export default class TodoListItem extends Vue {
  // props
  @Prop() readonly todo!: Todo;

  // model
  @Model("showChanged") show!: boolean;

  // data
  private showMenu = false;
  private contextMenuX = 0;
  private contextMenuY = 0;

  // computed
  get customFolders(): Folder[] {
    return foldersModule.getCustomFolders || [];
  }

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
    todosModule.setImportant({
      todoId: this.todo.id,
      important: !this.todo.important,
    });
  }

  private toggleChecked() {
    todosModule.setChecked({
      todoId: this.todo.id,
      checked: !this.todo.checked,
    });
  }

  private addDueDate(code: string | null) {
    this.$emit(
      "addDueDate",
      this.todo,
      code ? dateUtils.codeToNumber(code) : null
    );
  }

  private clearDueDate() {
    todosModule.setDueDate({
      todoId: this.todo.id,
      dueDate: null,
    });
  }

  private chooseFolder() {
    this.$emit("chooseFolder", this.todo);
  }

  private clearFolder() {
    todosModule.setCustomFolderId({
      todoId: this.todo.id,
      customFolderId: null,
    });
  }

  private removeTodo() {
    todosModule.removeTodo(this.todo.id);
  }

  // public methods
  public setCoordinates(x: number, y: number) {
    this.contextMenuX = x;
    this.contextMenuY = y;
  }
}
</script>
