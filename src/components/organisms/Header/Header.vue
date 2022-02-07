<template>
  <div class="header">
    <v-app-bar fixed class="pl-14" short>
      <v-spacer />
      <v-text-field
        dense
        label="Search"
        hide-details
        append-icon="mdi-magnify"
        solo
        placeholder="Search for task titles and descriptions"
      />
      <v-spacer />
      <v-btn
        fab
        bottom
        right
        absolute
        :color="(currentFolder && currentFolder.color) || 'primary'"
        @click="addTodo()"
        class="header__create-button"
        title="Add a task"
      >
        <v-icon
          :color="`${
            (currentFolder && currentFolder.color) || 'primary'
          } darken-4`"
        >
          mdi-plus
        </v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
// utils
import { Vue, Component } from "@/utils/vue-imports";

// interfaces
import Folder from "@/interfaces/entities/folder";

// store modules
import { todosModule, foldersModule } from "@/store";

// component
@Component({
  name: "Header",
})
export default class Header extends Vue {
  // computed
  get currentFolder(): Folder | null {
    return foldersModule.getCurrentFolder;
  }

  // methods
  private addTodo() {
    if (this.currentFolder) {
      todosModule.addTodo({
        transform: this.currentFolder.transform,
        customFolderId: this.currentFolder.id,
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./Header.scss";
</style>
