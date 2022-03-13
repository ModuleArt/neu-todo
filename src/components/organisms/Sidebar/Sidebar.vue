<template>
  <div
    :class="{
      sidebar: true,
      'pl-14': $isMobile,
      'sidebar--expanded': expandDrawer,
    }"
    v-touch:swipe="sidebarSwipe"
  >
    <v-navigation-drawer
      permanent
      :app="$isMobile"
      stateless
      :mini-variant="$isMobile && !expandDrawer"
      v-click-outside="drawerClickOutside"
      class="sidebar__drawer"
    >
      <div class="d-flex flex-column sidebar__content">
        <div class="sidebar__top">
          <div v-if="$isMobile" class="sidebar__menu-button">
            <v-btn icon @click="expandDrawer = !expandDrawer">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </div>
          <v-list nav dense>
            <UserMenu />
            <SearchButton />
          </v-list>
        </div>
        <v-divider />
        <div class="sidebar__scroll">
          <v-list nav dense>
            <v-list-item-group
              :value="selectedItem"
              :color="currentFolder ? currentFolder.color : 'primary'"
              @change="selectedItemChanged($event)"
              mandatory
            >
              <FolderListItem
                v-for="folder in systemFolders"
                :key="`folder--${folder.id}`"
                :folder="folder"
              />
              <v-divider v-if="customFolders.length" class="ma-2" />
              <FolderListItem
                v-for="folder in customFolders"
                :key="`folder--${folder.id}`"
                :folder="folder"
                @contextmenu="setFolderContextMenuOpened($event, folder)"
              />
            </v-list-item-group>
          </v-list>
        </div>
        <v-divider />
        <div class="sidebar__bottom">
          <v-list nav dense>
            <NewFolderMenu />
          </v-list>
        </div>
      </div>
    </v-navigation-drawer>
    <FolderContextMenu
      ref="folderContextMenu"
      v-model="showFolderContextMenu"
      :folder="folderWithContextMenu"
    />
  </div>
</template>

<script lang="ts">
// utils
import { Mixins, Component } from "@/utils/vue-imports";

// interfaces
import Folder from "@/interfaces/entities/folder";

// store modules
import { foldersModule } from "@/store";

// mixins
import isMobileMixin from "@/mixins/isMobile";

// components
import FolderListItem from "@/components/atoms/FolderListItem/FolderListItem.vue";
import FolderContextMenu from "@/components/menus/FolderContextMenu/FolderContextMenu.vue";
import NewFolderMenu from "@/components/menus/NewFolderMenu/NewFolderMenu.vue";
import UserMenu from "@/components/menus/UserMenu/UserMenu.vue";
import SearchButton from "@/components/atoms/SearchButton/SearchButton.vue";

// component
@Component({
  name: "Sidebar",
  components: {
    FolderListItem,
    FolderContextMenu,
    NewFolderMenu,
    UserMenu,
    SearchButton,
  },
})
export default class Sidebar extends Mixins(isMobileMixin) {
  // refs
  public $refs!: {
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

  // private methods
  private selectedItemChanged(selectedItem: number) {
    foldersModule.setCurrentFolderId(this.folders[selectedItem || 0].id);
    this.expandDrawer = false;
  }

  private setFolderContextMenuOpened(
    e: { x: number; y: number },
    folder: Folder
  ) {
    this.folderWithContextMenu = folder;
    this.$refs.folderContextMenu.setCoordinates(e.x, e.y);
    this.showFolderContextMenu = true;
  }

  private drawerClickOutside() {
    this.expandDrawer = false;
  }

  private sidebarSwipe(direction: string) {
    if (this.$isMobile) {
      if (!this.expandDrawer && direction == "right") {
        this.expandDrawer = true;
      } else if (this.expandDrawer && direction == "left") {
        this.expandDrawer = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./Sidebar.scss";
</style>
