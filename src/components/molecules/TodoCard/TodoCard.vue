<template>
  <div class="todo-card">
    <v-card>
      <div class="pa-2 pb-0 d-flex align-center">
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
          class="todo-card__title-input mx-2"
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
            class="px-2"
            flat
            solo
            @blur="setBody($event.target.value)"
          />
          <v-divider />
        </div>
      </v-expand-transition>
      <v-card-actions>
        <v-menu bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              :color="customTodoFolder && customTodoFolder.color"
              :icon="!customTodoFolder"
              :text="customTodoFolder != null"
            >
              <v-icon>
                {{
                  customTodoFolder
                    ? customTodoFolder.icon
                    : "mdi-folder-outline"
                }}
              </v-icon>
              <span v-if="customTodoFolder" class="ml-2">
                {{ customTodoFolder.title }}
              </span>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item
              v-if="customTodoFolder"
              link
              @click="setCustomFolderId(null)"
            >
              <v-list-item-icon class="mr-4">
                <v-icon>mdi-close</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                No folder
              </v-list-item-title>
            </v-list-item>
            <v-divider v-if="customTodoFolder" class="my-2" />
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
              :color="todo.important ? 'deep-orange' : ''"
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
import Folder from "@/interfaces/entities/folder";

// store modules
import { todosModule, foldersModule } from "@/store";

// component
@Component({
  name: "TodoCard",
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
  private tooltipOpenDelay = config.delays.tooltipOpenDelay;

  // computed
  get formattedDate(): string {
    return dateUtils.toDisplay(this.todo.dueDate || 0);
  }

  get customTodoFolder(): Folder | null {
    return (
      foldersModule.folders.find(
        (folder: Folder) => folder.id === this.todo.customFolderId
      ) || null
    );
  }

  get foldersToChoose() {
    return foldersModule.folders.filter((folder) => folder.custom);
  }

  // lifecycle
  mounted() {
    if (!this.todo.title) {
      this.$refs.taskTitleInput.focus();
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
}
</script>

<style lang="scss" scoped>
@import "./TodoCard.scss";
</style>
