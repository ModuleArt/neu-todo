<template>
  <v-menu class="choose-folder-menu" bottom v-model="showMenu">
    <template v-if="button" v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        :color="customTodoFolder && customTodoFolder.color"
        :icon="!customTodoFolder"
        :text="customTodoFolder != null"
        :title="customTodoFolder ? customTodoFolder.title : 'Choose folder'"
      >
        <v-icon>
          {{ customTodoFolder ? customTodoFolder.icon : "mdi-folder-outline" }}
        </v-icon>
        <span v-if="customTodoFolder" class="ml-1 todo-card__folder-title">
          {{ customTodoFolder.title }}
        </span>
      </v-btn>
    </template>
    <component :is="button ? 'div' : 'v-dialog'" v-model="showMenu">
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
    </component>
  </v-menu>
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
  name: "FolderContextMenu",
})
export default class FolderListItem extends Vue {
  // props
  @Prop() readonly todo!: Todo;
  @Prop() readonly button!: boolean;

  // data
  private showMenu = false;
  private menuPosX = 0;
  private menuPosY = 0;

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
  }

  // public methods
  public show() {
    this.showMenu = true;
  }
}
</script>
