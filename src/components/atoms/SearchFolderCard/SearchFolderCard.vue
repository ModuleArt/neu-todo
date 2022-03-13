<template>
  <div class="search-folder-card">
    <v-card outlined class="search-folder-card__card">
      <div class="d-flex align-center justify-space-between">
        <v-card-title class="pl-3 py-2 pr-0 search-folder-card__title">
          <v-icon left>{{ folder.icon }}</v-icon>
          <span class="ml-1">{{ folder.title }}</span>
        </v-card-title>
        <v-btn icon @click="goToFolder" class="mx-1" title="Go to folder">
          <v-icon>mdi-arrow-top-right</v-icon>
        </v-btn>
      </div>
      <v-divider />
      <FolderCaption :folder="folder" />
    </v-card>
  </div>
</template>

<script lang="ts">
// utils
import { Vue, Component, Prop } from "@/utils/vue-imports";

// store modules
import { foldersModule } from "@/store";

// interfaces
import Folder from "@/interfaces/entities/folder";

// components
import FolderCaption from "@/components/atoms/FolderCaption/FolderCaption.vue";

// component
@Component({
  name: "SearchFolderCard",
  components: {
    FolderCaption,
  },
})
export default class SearchFolderCard extends Vue {
  // props
  @Prop() readonly folder!: Folder;

  // private methods
  private goToFolder() {
    foldersModule.setCurrentFolderId(this.folder.id);
    this.$router.push({ name: "main" });
  }
}
</script>

<style lang="scss" scoped>
@import "./SearchFolderCard.scss";
</style>
