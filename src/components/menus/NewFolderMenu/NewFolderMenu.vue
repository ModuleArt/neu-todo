<template>
  <v-menu class="new-folder-menu" top offset-y min-width="0">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item link v-bind="attrs" v-on="on" class="ma-0">
        <v-list-item-icon class="mr-4">
          <v-icon>mdi-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Create new</v-list-item-title>
      </v-list-item>
    </template>
    <v-list dense outlined class="rounded py-1">
      <v-list-item link @click="addNewFolder()">
        <v-list-item-icon class="mr-4">
          <v-icon>mdi-folder-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>New folder</v-list-item-title>
      </v-list-item>
      <v-list-item link disabled>
        <v-list-item-icon class="mr-4">
          <v-icon disabled>mdi-table</v-icon>
        </v-list-item-icon>
        <v-list-item-title>New board</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
// utils
import { Vue, Component } from "@/utils/vue-imports";

// store modules
import { foldersModule } from "@/store";

// component
@Component({
  name: "NewFolderMenu",
})
export default class NewFolderMenu extends Vue {
  // private methods
  private addNewFolder() {
    foldersModule.addNewFolder();
  }
}
</script>
