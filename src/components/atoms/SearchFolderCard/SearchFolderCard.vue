<template>
  <div class="search-folder-card">
    <v-card outlined>
      <v-card-title class="py-2">
        <v-icon left>{{ folder.icon }}</v-icon>
        <span>{{ folder.title }}</span>
      </v-card-title>
    </v-card>
  </div>
</template>

<script lang="ts">
// utils
import { Vue, Component, Prop } from "@/utils/vue-imports";

// interfaces
import Folder from "@/interfaces/entities/folder";

// component
@Component({
  name: "SearchFolderCard",
})
export default class SearchFolderCard extends Vue {
  // props
  @Prop() readonly folder!: Folder;
}
</script>
