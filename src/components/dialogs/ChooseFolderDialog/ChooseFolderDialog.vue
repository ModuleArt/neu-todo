<template>
  <BaseDialog
    class="choose-folder-dialog"
    v-model="showDialog"
    v-if="todo"
    title="Choose folder"
  >
    <v-list nav dense class="pa-0">
      <v-list-item
        v-for="(item, index) in foldersToChoose"
        :key="index"
        link
        @click="setCustomFolderId(item.id)"
        :input-value="customTodoFolder && customTodoFolder.id == item.id"
        :color="(customTodoFolder && customTodoFolder.color) || ''"
        :title="item.title"
      >
        <v-list-item-icon class="mr-4">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider v-if="foldersToChoose.length" class="ma-2" />
      <v-list-item @click="addNewFolder">
        <v-list-item-icon class="mr-4">
          <v-icon>mdi-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Create new folder</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:left-buttons>
      <v-btn
        v-if="todo.customFolderId"
        text
        @click="setCustomFolderId(null)"
        color="red"
      >
        <v-icon left>mdi-close</v-icon>
        <span>No folder</span>
      </v-btn>
    </template>
    <template v-slot:right-buttons>
      <v-btn text @click="setDialogOpened(false)">
        <v-icon left>mdi-check</v-icon>
        <span>OK</span>
      </v-btn>
    </template>
  </BaseDialog>
</template>

<script lang="ts">
// utils
import { Vue, Component, Prop } from "@/utils/vue-imports";

// interfaces
import Todo from "@/interfaces/entities/todo";
import Folder from "@/interfaces/entities/folder";

// store modules
import { todosModule, foldersModule } from "@/store";

// components
import BaseDialog from "@/components/bases/BaseDialog.vue";

// component
@Component({
  name: "ChooseFolderDialog",
  components: {
    BaseDialog,
  },
})
export default class DueDateDialog extends Vue {
  // props
  @Prop() readonly todo!: Todo;

  // data
  private showDialog = false;

  // computed
  private get customTodoFolder(): Folder | null {
    if (this.todo) {
      return (
        foldersModule.folders.find(
          (folder: Folder) => folder.id === this.todo.customFolderId
        ) || null
      );
    } else {
      return null;
    }
  }

  private get foldersToChoose(): Folder[] {
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

  private addNewFolder() {
    foldersModule.addNewFolder();
  }

  // public methods
  public setDialogOpened(open: boolean) {
    this.showDialog = open;
  }
}
</script>
