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
    <v-card outlined>
      <div class="d-flex align-center pa-1">
        <v-simple-checkbox
          :value="todo.checked"
          @input="toggleChecked()"
          :color="(customTodoFolder && customTodoFolder.color) || 'primary'"
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
          :color="(customTodoFolder && customTodoFolder.color) || 'primary'"
          ref="taskTitleInput"
          class="todo-card__title-input mx-1"
          @blur="setTitle($event.target.value)"
        />
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
          />
          <!-- <v-card-actions v-if="!isMobile" class="pa-1">
            <ChooseFolderMenu :todo="todo" :button="true" />
            <v-spacer />
            <v-btn
              :icon="!todo.dueDate"
              :text="todo.dueDate != null"
              @click="addDueDate()"
              :color="isOverdue ? 'red' : ''"
              title="Due date"
            >
              <v-icon>{{ dueDateIcon }}</v-icon>
              <span v-if="todo.dueDate" class="ml-1">
                {{ formattedDate }}
              </span>
            </v-btn>
            <v-btn
              icon
              @click="toggleImportant()"
              :color="todo.important ? 'orange' : ''"
              title="Important"
              class="ma-0"
            >
              <v-icon v-if="todo.important">mdi-alert-octagram</v-icon>
              <v-icon v-else>mdi-octagram-outline</v-icon>
            </v-btn>
            <v-btn icon @click="removeTodo()" title="Delete task" class="ma-0">
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
          </v-card-actions> -->
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
        @click="rightClick"
      >
        <div
          v-if="customTodoFolder"
          class="todo-card__caption--folder mr-4 text-left"
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
        <div v-if="todo.important" class="ml-4 todo-card__caption--important">
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

  get dueDateIcon(): string {
    if (!this.todo.dueDate) {
      return "mdi-calendar-blank";
    } else {
      const code = dateUtils.numberToCode(this.todo.dueDate);
      if (code == "today") {
        return "mdi-calendar-today";
      } else if (dateUtils.isOverdue(this.todo.dueDate)) {
        return "mdi-calendar-arrow-left";
      } else {
        return "mdi-calendar-arrow-right";
      }
    }
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
    this.$emit("addDueDateClicked", this.todo);
  }

  private toggleImportant() {
    todosModule.setImportant({
      todoId: this.todo.id,
      important: !this.todo.important,
    });
  }

  private removeTodo() {
    this.$emit("removeTodoClicked", this.todo);
  }

  private setTitle(title: string) {
    todosModule.setTitle({
      todoId: this.todo.id,
      title,
    });
  }

  private setBody(body: string) {
    todosModule.setBody({
      todoId: this.todo.id,
      body,
    });
  }

  private rightClick(e: MouseEvent) {
    if (!this.$isMobile) {
      this.$emit("contextmenu", { x: e.clientX, y: e.clientY });
    }
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
