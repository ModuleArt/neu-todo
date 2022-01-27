<template>
  <div class="sidebar pl-14">
    <v-navigation-drawer permanent fixed expand-on-hover>
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar class="my-0">
            <v-img src="https://randomuser.me/api/portraits/women/85.jpg" />
          </v-list-item-avatar>
          <v-list-item-content class="py-0">
            <v-list-item-title>
              Sandra Adams
            </v-list-item-title>
            <v-list-item-subtitle>
              module.art.team@gmail.com
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider class="mb-1" />
      <v-list nav dense>
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
          <v-divider v-if="customFolders.length" class="my-3" />
          <FolderListItem
            v-for="folder in customFolders"
            :key="`folder--${folder.id}`"
            :folder="folder"
          />
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
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

// component
@Component({
  name: "Sidebar",
  components: { FolderListItem },
})
export default class Sidebar extends Vue {
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

  // methods
  selectedItemChanged(selectedItem: number) {
    foldersModule.setCurrentFolderId(this.folders[selectedItem].id);
  }
}
</script>
