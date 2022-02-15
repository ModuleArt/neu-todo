<template>
  <Swipeout
    :left-actions="swipeoutLeftActions"
    :right-actions="swipeoutRightActions"
    :enable="isMobile"
    :class="{
      'todo-card': true,
      'todo-card--checked': todo.checked,
    }"
  >
    <v-card>
      <div
        :class="{
          'd-flex align-center': true,
          'pa-2': !isMobile,
          'pa-1': isMobile,
        }"
      >
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
        <div v-show="expanded">
          <v-textarea
            v-model="todo.body"
            placeholder="Description"
            no-resize
            hide-details
            :class="isMobile ? '' : 'px-1'"
            flat
            solo
            @blur="setBody($event.target.value)"
          />
        </div>
      </v-expand-transition>
      <v-divider
        v-if="
          (isMobile && (customTodoFolder || todo.dueDate || todo.important)) ||
          !isMobile
        "
      />
      <div
        v-if="isMobile && (customTodoFolder || todo.dueDate || todo.important)"
        class="caption py-1 px-2 text--disabled todo-card__caption text-right"
      >
        <div
          v-if="customTodoFolder"
          class="todo-card__caption--folder text-left mr-4"
        >
          <v-icon disabled small class="mr-1">
            mdi-folder-outline
          </v-icon>
          <span>{{ customTodoFolder.title }}</span>
        </div>
        <div
          v-if="todo.dueDate"
          class="text-right todo-card__caption--due-date"
        >
          <v-icon disabled small class="mr-1">mdi-calendar-blank</v-icon>
          <span>{{ formattedDate }}</span>
        </div>
        <div v-if="todo.important" class="ml-4 todo-card__caption--important">
          <v-icon small color="orange">mdi-alert-octagram</v-icon>
        </div>
      </div>
      <v-card-actions v-if="!isMobile">
        <v-menu bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              :color="customTodoFolder && customTodoFolder.color"
              :icon="!customTodoFolder"
              :text="customTodoFolder != null"
              :title="
                customTodoFolder ? customTodoFolder.title : 'Choose folder'
              "
            >
              <v-icon>
                {{
                  customTodoFolder
                    ? customTodoFolder.icon
                    : "mdi-folder-outline"
                }}
              </v-icon>
              <span
                v-if="customTodoFolder"
                class="ml-1 todo-card__folder-title"
              >
                {{ customTodoFolder.title }}
              </span>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item link @click="setCustomFolderId(null)">
              <v-list-item-icon class="mr-4">
                <v-icon>mdi-close</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                No folder
              </v-list-item-title>
            </v-list-item>
            <v-divider v-if="foldersToChoose.length" class="my-2" />
            <v-list-item
              v-for="(item, index) in foldersToChoose"
              :key="index"
              link
              @click="setCustomFolderId(item.id)"
              :input-value="customTodoFolder && customTodoFolder.id == item.id"
              :color="(customTodoFolder && customTodoFolder.color) || ''"
            >
              <v-list-item-icon class="mr-4">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
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
      </v-card-actions>
    </v-card>
  </Swipeout>
</template>

<script lang="ts">
// utils
import { Vue, Component, Prop } from "@/utils/vue-imports";
import dateUtils from "@/utils/date";
import mobile from "is-mobile";

// interfaces
import Todo from "@/interfaces/entities/todo";
import Folder from "@/interfaces/entities/folder";

// store modules
import { todosModule, foldersModule } from "@/store";

// interfaces
import SwipeoutButton from "@/interfaces/logic/swipeoutButton";

// components
import Swipeout from "@/components/atoms/Swipeout/Swipeout.vue";

// component
@Component({
  name: "TodoCard",
  components: {
    Swipeout,
  },
})
export default class TodoCard extends Vue {
  // refs
  public $refs!: {
    taskTitleInput: HTMLInputElement;
  };

  // props
  @Prop() readonly todo!: Todo;

  // data
  private expanded = false;
  private swipeoutLeftActions: SwipeoutButton[] = [
    {
      icon: "mdi-folder-outline",
      text: "Folder",
      color: "primary",
      onClick: () => {
        this.chooseFolder();
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

  get foldersToChoose(): Folder[] {
    return foldersModule.folders.filter((folder) => folder.custom);
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

  get isMobile(): boolean {
    return mobile();
  }

  // lifecycle
  mounted() {
    if (this.todo.lastAdded) {
      this.$refs.taskTitleInput.focus();
      this.todo.lastAdded = false;
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
    this.expanded = !this.expanded;
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

  private setCustomFolderId(customFolderId: string | null) {
    todosModule.setCustomFolderId({
      todoId: this.todo.id,
      customFolderId,
    });
  }

  private chooseFolder() {
    console.log("swipeout choose folder");
  }
}
</script>

<style lang="scss" scoped>
@import "./TodoCard.scss";
</style>
