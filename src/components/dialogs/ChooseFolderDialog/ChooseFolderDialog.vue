<template>
  <BaseDialog
    class="choose-folder-dialog"
    v-model="showDialog"
    :actions="dialogButtons"
    v-if="todo"
    no-padding
    title="Choose folder"
  >
    <v-list nav dense>
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
    </v-list>
  </BaseDialog>
</template>

<script lang="ts">
// utils
import { Vue, Component, Prop } from "@/utils/vue-imports";

// interfaces
import Todo from "@/interfaces/entities/todo";
import Folder from "@/interfaces/entities/folder";
import DialogAction from "@/interfaces/logic/dialogAction";

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
  private dialogButtons: DialogAction[] = [
    {
      text: "No folder",
      onClick: () => {
        this.setCustomFolderId(null);
      },
      color: "red",
      left: true,
    },
    {
      text: "OK",
      onClick: () => {
        this.setDialogOpened(false);
      },
    },
  ];

  // computed
  get customTodoFolder(): Folder | null {
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
    console.log("setDialogOpened");
    this.showDialog = open;
  }
}
</script>
