<template>
  <div
    :class="{
      'todo-list': true,
      'py-12': !$isMobile,
      'py-4': $isMobile,
    }"
    v-if="currentFolder"
  >
    <div
      class="d-flex align-center todo-list__title mb-4 d-flex justify-space-between align-center"
    >
      <h2 v-if="$isMobileExtra">{{ currentFolder.title }}</h2>
      <h1 v-else>{{ currentFolder.title }}</h1>
      <FolderContextMenu
        v-if="currentFolder.custom"
        :folder="currentFolder"
        :button="true"
      />
    </div>
    <AddTodoField v-if="currentFolder.transform || currentFolder.custom" />
    <div class="todo-list__todos">
      <div v-for="(todo, todoIndex) in filteredTodos" :key="`todo--${todo.id}`">
        <TodoCard
          :todo="todo"
          @addDueDate="addDueDate"
          :expanded="expandedIndex == todoIndex"
          @expandToggled="expandToggled(todoIndex)"
          class="mt-2"
          @contextmenu="setTodoContextMenuOpened($event, todo)"
          @chooseFolder="chooseFolder"
        />
      </div>
      <div v-if="!filteredTodos.length && currentFolder">
        <v-subheader class="pa-0">
          There are no tasks here.
        </v-subheader>
      </div>
    </div>
    <TodoContextMenu
      ref="todoContextMenu"
      v-model="showTodoContextMenu"
      :todo="selectedTodo"
      @addDueDate="addDueDate"
      @chooseFolder="chooseFolder"
    />
    <ChooseFolderDialog ref="chooseFolderDialog" :todo="selectedTodo" />
    <DueDateDialog ref="dueDateDialog" :todo="selectedTodo" />
  </div>
</template>

<script lang="ts">
// utils
import EventBus from "@/main";
import { Mixins, Component, Watch } from "@/utils/vue-imports";

// interfaces
import Todo from "@/interfaces/entities/todo";
import Folder from "@/interfaces/entities/folder";

// store modules
import { todosModule, foldersModule } from "@/store";

// mixins
import isMobileMixin from "@/mixins/isMobile";

// components
import TodoCard from "@/components/molecules/TodoCard/TodoCard.vue";
import ChooseFolderDialog from "@/components/dialogs/ChooseFolderDialog/ChooseFolderDialog.vue";
import DueDateDialog from "@/components/dialogs/DueDateDialog/DueDateDialog.vue";
import AddTodoField from "@/components/molecules/AddTodoField/AddTodoField.vue";
import TodoContextMenu from "@/components/menus/TodoContextMenu/TodoContextMenu.vue";
import FolderContextMenu from "@/components/menus/FolderContextMenu/FolderContextMenu.vue";

// component
@Component({
  name: "TodoList",
  components: {
    TodoCard,
    ChooseFolderDialog,
    DueDateDialog,
    AddTodoField,
    TodoContextMenu,
    FolderContextMenu,
  },
})
export default class TodoList extends Mixins(isMobileMixin) {
  // refs
  public $refs!: {
    chooseFolderDialog: ChooseFolderDialog;
    dueDateDialog: DueDateDialog;
    todoContextMenu: TodoContextMenu;
  };

  // data
  private expandedIndex = -1;
  private selectedTodo: Todo | null = null;

  private showTodoContextMenu = false;

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
    this.expandedIndex = -1;
  }

  // lifecycle
  private created() {
    setTimeout(() => {
      EventBus.$on("mutationAddTodo", () => {
        this.expandedIndex = 0;
      });
    }, 0);
  }

  // private methods
  private expandToggled(todoIndex: number) {
    if (this.expandedIndex == todoIndex) {
      this.expandedIndex = -1;
    } else {
      this.expandedIndex = todoIndex;
    }
  }

  private addDueDate(todo: Todo, date: number | null) {
    this.selectedTodo = todo;
    if (date) {
      todosModule.setDueDate({
        todoId: todo.id,
        dueDate: date,
      });
    } else {
      this.$refs.dueDateDialog.setDialogOpened(true);
    }
  }

  private chooseFolder() {
    this.$refs.chooseFolderDialog.setDialogOpened(true);
  }

  private setTodoContextMenuOpened(e: { x: number; y: number }, todo: Todo) {
    this.selectedTodo = todo;
    this.$refs.todoContextMenu.setCoordinates(e.x, e.y);
    this.showTodoContextMenu = true;
  }
}
</script>
