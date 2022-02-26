<template>
  <Swipeout
    :left-actions="swipeoutLeftActions"
    :right-actions="swipeoutRightActions"
    :enable="$isMobile"
    :class="{
      'todo-card': true,
      rounded: true,
      'todo-card--checked': todo.checked,
    }"
  >
    <v-card
      outlined
      @contextmenu.prevent="rightClick"
      v-touch:touchhold="touchHold"
    >
      <div class="d-flex align-center pa-1">
        <v-simple-checkbox
          :value="todo.checked"
          @input="toggleChecked()"
          :color="(customTodoFolder && customTodoFolder.color) || 'primary'"
          class="todo-card__checkbox"
        />
        <div class="todo-card__title mx-1">
          <v-text-field
            v-if="titleInEdit"
            v-model="tempTitleValue"
            flat
            solo
            hide-details
            dense
            placeholder="Task title"
            outlined
            :color="(customTodoFolder && customTodoFolder.color) || 'primary'"
            ref="taskTitleInput"
            class="todo-card__title-input"
            @blur="setTitle"
            @contextmenu.stop
            @keypress.enter="unfocus"
          />
          <div
            v-else
            class="py-1 px-3 todo-card__title-text"
            @click="editTitle"
          >
            {{ todo.title }}
          </div>
        </div>
        <v-btn icon @click="toggleExpandedTodo()">
          <v-icon>
            {{ expanded ? "mdi-chevron-up" : "mdi-chevron-down" }}
          </v-icon>
        </v-btn>
      </div>
      <v-expand-transition>
        <div v-show="expanded" class="todo-card__body">
          <v-divider />
          <v-textarea
            v-model="todo.body"
            placeholder="Description"
            no-resize
            hide-details
            flat
            solo
            @blur="setBody($event.target.value)"
            @contextmenu.stop
          />
        </div>
      </v-expand-transition>
      <v-divider v-if="customTodoFolder || todo.dueDate || todo.important" />
      <div
        v-if="customTodoFolder || todo.dueDate || todo.important"
        :class="{
          'caption text--disabled todo-card__caption text-right d-flex py-1 px-3': true,
          'justify-space-between': customTodoFolder,
          'justify-end': !customTodoFolder,
        }"
      >
        <div
          v-if="customTodoFolder"
          class="todo-card__caption--folder mr-3 text-left"
        >
          <v-icon :color="customTodoFolder.color" small class="mr-1">
            mdi-folder-outline
          </v-icon>
          <span :class="`${customTodoFolder.color}--text`">
            {{ customTodoFolder.title }}
          </span>
        </div>
        <div
          v-if="todo.dueDate"
          class="text-right todo-card__caption--due-date"
        >
          <v-icon :disabled="!isOverdue" small class="mr-1" color="red">
            mdi-calendar-blank
          </v-icon>
          <span :class="{ 'red--text': isOverdue }">
            {{ formattedDate }}
          </span>
        </div>
        <div v-if="todo.important" class="ml-3 todo-card__caption--important">
          <v-icon small color="orange">mdi-alert-octagram</v-icon>
        </div>
      </div>
      <ChooseFolderMenu v-else :todo="todo" ref="chooseFolderMenu" />
    </v-card>
  </Swipeout>
</template>

<script lang="ts">
// utils
import { Mixins, Component, Prop } from "@/utils/vue-imports";
import dateUtils from "@/utils/date";

// interfaces
import Todo from "@/interfaces/entities/todo";
import Folder from "@/interfaces/entities/folder";

// store modules
import { todosModule, foldersModule } from "@/store";

// mixins
import isMobileMixin from "@/mixins/isMobile";

// interfaces
import SwipeoutButton from "@/interfaces/logic/swipeoutButton";

// components
import Swipeout from "@/components/atoms/Swipeout/Swipeout.vue";
import ChooseFolderMenu from "@/components/menus/ChooseFolderMenu/ChooseFolderMenu.vue";

// component
@Component({
  name: "TodoCard",
  components: {
    Swipeout,
    ChooseFolderMenu,
  },
})
export default class TodoCard extends Mixins(isMobileMixin) {
  // refs
  public $refs!: {
    taskTitleInput: HTMLInputElement;
    chooseFolderMenu: ChooseFolderMenu;
  };

  // props
  @Prop() readonly todo!: Todo;
  @Prop() readonly expanded!: boolean;

  // data
  private titleInEdit = false;
  private tempTitleValue = "";
  private swipeoutLeftActions: SwipeoutButton[] = [
    {
      icon: "mdi-folder-outline",
      text: "Folder",
      color: "primary",
      onClick: () => {
        this.$refs.chooseFolderMenu.show();
      },
    },
    {
      icon: "mdi-calendar-blank",
      text: "Due date",
      color: "red",
      onClick: () => {
        this.addDueDate();
      },
    },
  ];
  private swipeoutRightActions: SwipeoutButton[] = [
    {
      icon: "mdi-octagram-outline",
      text: "Important",
      color: "orange",
      onClick: () => {
        this.toggleImportant();
      },
    },
    {
      icon: "mdi-delete-outline",
      text: "Delete",
      color: "red",
      onClick: () => {
        this.removeTodo();
      },
    },
  ];

  // computed
  get formattedDate(): string {
    return dateUtils.toDisplay(this.todo.dueDate || 0);
  }

  get isOverdue(): boolean {
    return dateUtils.isOverdue(this.todo.dueDate);
  }

  get customTodoFolder(): Folder | null {
    return (
      foldersModule.folders.find(
        (folder: Folder) => folder.id === this.todo.customFolderId
      ) || null
    );
  }

  // private methods
  private toggleChecked() {
    todosModule.setChecked({
      todoId: this.todo.id,
      checked: !this.todo.checked,
    });
  }

  private toggleExpandedTodo() {
    this.$emit("expandToggled");
  }

  private addDueDate() {
    this.$emit("addDueDate", this.todo);
  }

  private toggleImportant() {
    todosModule.setImportant({
      todoId: this.todo.id,
      important: !this.todo.important,
    });
  }

  private removeTodo() {
    this.$emit("removeTodo", this.todo);
  }

  private editTitle() {
    this.tempTitleValue = this.todo.title;
    this.titleInEdit = true;
    setTimeout(() => {
      this.$refs.taskTitleInput.focus();
    }, 0);
  }

  private setTitle() {
    this.titleInEdit = false;
    if (this.tempTitleValue.length && this.tempTitleValue !== this.todo.title) {
      todosModule.setTitle({
        todoId: this.todo.id,
        title: this.tempTitleValue,
      });
    }
    this.tempTitleValue = "";
  }

  private unfocus() {
    (document.activeElement as HTMLElement).blur();
  }

  private setBody(body: string) {
    todosModule.setBody({
      todoId: this.todo.id,
      body,
    });
  }

  private rightClick(e: MouseEvent) {
    this.$emit("contextmenu", { x: e.clientX, y: e.clientY });
  }

  private touchHold(e: MouseEvent) {
    if (this.$isMobile) {
      const p = (e.target as HTMLElement).getBoundingClientRect();
      this.$emit("contextmenu", { x: p.x, y: p.y + p.height - 8 });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./TodoCard.scss";
</style>
