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
      <v-divider />
      <v-list nav dense>
        <v-list-item-group
          :value="selectedItem"
          color="primary"
          @change="selectedItemChanged($event)"
          mandatory
        >
          <v-list-item
            v-for="folder in folders"
            :key="`folder--${folder.id}`"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ folder.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ folder.title }}</v-list-item-title>
          </v-list-item>
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
import foldersModule from "@/store/modules/folders";

// component
@Component({
  name: "Sidebar",
})
export default class Sidebar extends Vue {
  // computed
  get folders(): Folder[] {
    return foldersModule.folders;
  }

  get currentFolderId(): string {
    return foldersModule.currentFolderId;
  }

  get selectedItem(): number {
    return this.folders.findIndex(
      (folder: Folder) => folder.id === this.currentFolderId
    );
  }

  // methods
  selectedItemChanged(selectedItem: number) {
    foldersModule.setCurrentFolderId(this.folders[selectedItem].id);
  }
}
</script>
