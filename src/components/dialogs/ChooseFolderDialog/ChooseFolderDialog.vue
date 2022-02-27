<template>
  <div class="due-date-dialog">
    <v-dialog v-model="showDialog" max-width="320">
      <v-card v-if="todo">
        <v-list dense class="py-1">
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
        <v-divider />
        <v-card-actions class="pa-2">
          <v-btn
            v-if="todo.customFolderId"
            text
            @click="setCustomFolderId(null)"
            color="red"
          >
            No folder
          </v-btn>
          <v-spacer />
          <v-btn text @click="showDialog = false">
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

// interfaces
import Todo from "@/interfaces/entities/todo";
import Folder from "@/interfaces/entities/folder";

// store modules
import { todosModule, foldersModule } from "@/store";

// component
@Component({
  name: "DueDateDialog",
})
export default class DueDateDialog extends Vue {
  // props

  @Prop() readonly todo!: Todo;

  // data
  private showDialog = false;

  // computed
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

  // private methods
  private setCustomFolderId(customFolderId: string | null) {
    todosModule.setCustomFolderId({
      todoId: this.todo.id,
      customFolderId,
    });
    this.showDialog = false;
  }

  // public methods
  public setDialogOpened(open: boolean) {
    this.showDialog = open;
  }
}
</script>
