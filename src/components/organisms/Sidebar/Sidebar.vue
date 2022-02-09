<template>
  <div class="sidebar pl-14">
    <v-navigation-drawer
      permanent
      fixed
      app
      stateless
      :expand-on-hover="isDesktop && !showFolderContextMenu"
      :mini-variant="!isDesktop && !expandDrawer"
      v-click-outside="drawerClickOutside"
    >
      <div class="d-flex">
        <div v-if="!isDesktop" class="sidebar__menu-button">
          <v-btn icon @click="expandDrawer = !expandDrawer">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </div>
        <v-list class="py-1">
          <v-list-item class="px-3">
            <v-list-item-avatar class="my-0" size="32">
              <v-img
                src="https://avatars.githubusercontent.com/u/40366303?s=64"
              />
            </v-list-item-avatar>
            <v-list-item-content class="py-0">
              <v-list-item-title>
                NeuTodo
              </v-list-item-title>
              <v-list-item-subtitle>
                v0.0.1 (dev)
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
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
    <FolderContextMenu
      ref="folderContextMenu"
      v-model="showFolderContextMenu"
      @removeFolder="removeFolder"
      @editFolder="editFolder"
    />
    <EditFolderDialog ref="editFolderDialog" />
  </div>
</template>

<script lang="ts">
// utils
import { Vue, Component } from "@/utils/vue-imports";
import isMobile from "is-mobile";

// interfaces
import Folder from "@/interfaces/entities/folder";

// store modules
import { foldersModule, todosModule } from "@/store";

// components
import FolderListItem from "@/components/atoms/FolderListItem/FolderListItem.vue";
import EditFolderDialog from "@/components/dialogs/EditFolderDialog/EditFolderDialog.vue";
import FolderContextMenu from "@/components/menus/FolderContextMenu/FolderContextMenu.vue";

// component
@Component({
  name: "Sidebar",
  components: { FolderListItem, EditFolderDialog, FolderContextMenu },
})
export default class Sidebar extends Vue {
  // refs
  public $refs!: {
    editFolderDialog: EditFolderDialog;
    folderContextMenu: FolderContextMenu;
  };

  // data
  private expandDrawer = false;
  private showFolderContextMenu = false;
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

  get isDesktop(): boolean {
    return !isMobile();
  }

  // private methods
  private selectedItemChanged(selectedItem: number) {
    foldersModule.setCurrentFolderId(this.folders[selectedItem].id);
    this.expandDrawer = false;
  }

  private addNewFolder() {
    foldersModule.addNewFolder();
  }

  private setFolderContextMenuOpened(e: MouseEvent, folder: Folder) {
    this.folderWithContextMenu = folder;
    this.$refs.folderContextMenu.setCoordinates(e.clientX, e.clientY);
    this.showFolderContextMenu = true;
  }

  private removeFolder() {
    if (this.folderWithContextMenu) {
      todosModule.removeTodosByCustomFolderId(this.folderWithContextMenu.id);
      foldersModule.removeFolder(this.folderWithContextMenu.id);
    }
  }

  private editFolder() {
    this.$refs.editFolderDialog.setDialogOpened(
      true,
      this.folderWithContextMenu
    );
  }

  private drawerClickOutside() {
    this.expandDrawer = false;
  }
}
</script>

<style lang="scss" scoped>
@import "./Sidebar.scss";
</style>
