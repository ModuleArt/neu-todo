<template>
  <div
    :class="{
      sidebar: true,
      'sidebar--fullscreen': fullscreen,
    }"
  >
    <v-navigation-drawer
      :floating="fullscreen"
      permanent
      stateless
      touchless
      class="sidebar__drawer"
    >
      <div class="d-flex flex-column sidebar__content" v-if="currentFolder">
        <div class="sidebar__top">
          <v-list nav dense>
            <UserMenu />
            <SearchButton v-if="!$isPhone" />
          </v-list>
        </div>
        <v-divider />
        <div class="sidebar__scroll">
          <v-list nav dense>
            <v-list-item-group
              :value="selectedItem"
              :color="currentFolder.color"
              @change="selectedItemChanged($event)"
              @input="clickOnFolder"
              mandatory
            >
              <FolderListItem
                v-for="folder in systemFolders"
                :key="`folder--${folder.id}`"
                :folder="folder"
                @click="clickOnFolder"
              />
              <v-divider v-if="customFolders.length" class="ma-2" />
              <FolderListItem
                v-for="folder in customFolders"
                :key="`folder--${folder.id}`"
                :folder="folder"
                @contextmenu="setFolderContextMenuOpened($event, folder)"
                @click="clickOnFolder"
              />
            </v-list-item-group>
          </v-list>
        </div>
        <v-divider v-if="!fullscreen" />
        <div class="sidebar__bottom">
          <NewFolderButton :fab="fullscreen" :color="currentFolder.color" />
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
import { Mixins, Component, Prop } from "@/utils/vue-imports";

// interfaces
import Folder from "@/interfaces/entities/folder";

// store modules
import { foldersModule } from "@/store";

// mixins
import responsiveMixin from "@/mixins/responsive";

// components
import FolderListItem from "@/components/atoms/FolderListItem/FolderListItem.vue";
import FolderContextMenu from "@/components/menus/FolderContextMenu/FolderContextMenu.vue";
import NewFolderButton from "@/components/molecules/NewFolderButton/NewFolderButton.vue";
import UserMenu from "@/components/menus/UserMenu/UserMenu.vue";
import SearchButton from "@/components/atoms/SearchButton/SearchButton.vue";

// component
@Component({
  name: "Sidebar",
  components: {
    FolderListItem,
    FolderContextMenu,
    NewFolderButton,
    UserMenu,
    SearchButton,
  },
})
export default class Sidebar extends Mixins(responsiveMixin) {
  // refs
  public $refs!: {
    folderContextMenu: FolderContextMenu;
  };

  // props
  @Prop() readonly fullscreen!: boolean;

  // data
  private showFolderContextMenu = false;
  private folderWithContextMenu: Folder | null = null;

  // computed
  private get folders(): Folder[] {
    return foldersModule.folders;
  }

  private get systemFolders(): Folder[] {
    return foldersModule.getSystemFolders || [];
  }

  private get customFolders(): Folder[] {
    return foldersModule.getCustomFolders || [];
  }

  private get currentFolder(): Folder | null {
    return foldersModule.getCurrentFolder;
  }

  private get selectedItem(): number {
    return this.folders.findIndex(
      (folder: Folder) => folder.id === foldersModule.currentFolderId
    );
  }

  // private methods
  private selectedItemChanged(selectedItem: number) {
    foldersModule.setCurrentFolderId(this.folders[selectedItem || 0].id);
  }

  private clickOnFolder() {
    if (this.fullscreen) {
      this.$router.push({ name: "tasks" });
    }
  }

  private setFolderContextMenuOpened(
    e: { x: number; y: number },
    folder: Folder
  ) {
    this.folderWithContextMenu = folder;
    this.$refs.folderContextMenu.setCoordinates(e.x, e.y);
    this.showFolderContextMenu = true;
  }
}
</script>

<style lang="scss" scoped>
@import "./Sidebar.scss";
</style>
