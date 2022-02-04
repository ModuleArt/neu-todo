<template>
  <div class="sidebar pl-14">
    <v-navigation-drawer
      permanent
      fixed
      :expand-on-hover="!showFolderContextMenu"
    >
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar class="my-0">
            <v-img
              src="https://avatars.githubusercontent.com/u/46830450?s=40"
            />
          </v-list-item-avatar>
          <v-list-item-content class="py-0">
            <v-list-item-title>
              NeuTodo
            </v-list-item-title>
            <v-list-item-subtitle>
              by ModuleArt
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider class="mb-1" />
      <v-list nav dense class="py-1 pb-16 mb-6">
        <v-list-item-group
          :value="selectedItem"
          :color="(currentFolder && currentFolder.color) || 'primary'"
          @change="selectedItemChanged($event)"
          mandatory
        >
          <FolderListItem
            v-for="folder in systemFolders"
            :key="`folder--${folder.id}`"
            :folder="folder"
          />
          <v-divider v-if="customFolders.length" class="my-2" />
          <FolderListItem
            v-for="folder in customFolders"
            :key="`folder--${folder.id}`"
            :folder="folder"
            @contextmenu="setFolderContextMenuOpened($event, folder)"
          />
        </v-list-item-group>
      </v-list>
      <div class="sidebar__new-folder">
        <v-list nav dense class="pt-0">
          <v-divider class="mb-2" />
          <v-list-item link @click="addNewFolder()">
            <v-list-item-icon>
              <v-icon>mdi-folder-plus-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>New folder</v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>
    <v-menu
      v-model="showFolderContextMenu"
      :position-x="folderContextMenuX"
      :position-y="folderContextMenuY"
      absolute
      offset-y
    >
      <v-list dense>
        <v-list-item link @click="editFolder()">
          <v-list-item-icon class="mr-4">
            <v-icon>mdi-pencil-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Edit folder</v-list-item-title>
        </v-list-item>
        <v-divider class="my-2" />
        <v-list-item link @click="removeFolder()">
          <v-list-item-icon class="mr-4">
            <v-icon color="red">mdi-delete-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="red--text">Delete folder</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <EditFolderDialog ref="editFolderDialog" />
  </div>
</template>

<script lang="ts">
// utils
import { Vue, Component } from "@/utils/vue-imports";

// interfaces
import Folder from "@/interfaces/entities/folder";

// store modules
import { foldersModule } from "@/store";

// components
import FolderListItem from "@/components/atoms/FolderListItem/FolderListItem.vue";
import EditFolderDialog from "@/components/dialogs/EditFolderDialog/EditFolderDialog.vue";

// component
@Component({
  name: "Sidebar",
  components: { FolderListItem, EditFolderDialog },
})
export default class Sidebar extends Vue {
  // refs
  public $refs!: {
    editFolderDialog: EditFolderDialog;
  };

  // data
  private showFolderContextMenu = false;
  private folderContextMenuX = 0;
  private folderContextMenuY = 0;
  private folderWithContextMenu: Folder | null = null;

  // computed
  get folders(): Folder[] {
    return foldersModule.folders;
  }

  get systemFolders(): Folder[] {
    return foldersModule.getSystemFolders || [];
  }

  get customFolders(): Folder[] {
    return foldersModule.getCustomFolders || [];
  }

  get currentFolder(): Folder | null {
    return foldersModule.getCurrentFolder;
  }

  get selectedItem(): number {
    return this.folders.findIndex(
      (folder: Folder) => folder.id === foldersModule.currentFolderId
    );
  }

  // private methods
  private selectedItemChanged(selectedItem: number) {
    foldersModule.setCurrentFolderId(this.folders[selectedItem].id);
  }

  private addNewFolder() {
    foldersModule.addNewFolder();
  }

  private setFolderContextMenuOpened(e: MouseEvent, folder: Folder) {
    this.folderWithContextMenu = folder;
    this.folderContextMenuX = e.clientX;
    this.folderContextMenuY = e.clientY;
    this.showFolderContextMenu = true;
  }

  private removeFolder() {
    if (this.folderWithContextMenu) {
      foldersModule.removeFolder(this.folderWithContextMenu.id);
    }
  }

  private editFolder() {
    this.$refs.editFolderDialog.setDialogOpened(
      true,
      this.folderWithContextMenu
    );
  }
}
</script>

<style lang="scss" scoped>
@import "./Sidebar.scss";
</style>
