<template>
  <v-list-item
    link
    :title="folder.title"
    @contextmenu.prevent="rightClick"
    v-touch:touchhold="touchHold"
    class="folder-list-item"
    @click="emitClick"
  >
    <v-list-item-icon class="mr-4">
      <v-icon>{{ folder.icon }}</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>{{ folder.title }}</v-list-item-title>
    </v-list-item-content>
    <v-list-item-action class="my-0 mr-1 justify-end">
      <v-list-item-action-text>
        {{ folderTodosCount }}
      </v-list-item-action-text>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
// utils
import { Mixins, Component, Prop } from "@/utils/vue-imports";
import todoUtils from "@/utils/todo";

// interfaces
import Folder from "@/interfaces/entities/folder";

// mixins
import responsiveMixin from "@/mixins/responsive";

// component
@Component({
  name: "FolderListItem",
})
export default class FolderListItem extends Mixins(responsiveMixin) {
  // props
  @Prop() readonly folder!: Folder;

  // computed
  private get folderTodosCount(): number | string {
    return todoUtils.getUncheckedTodosByFolder(this.folder).length || "";
  }

  // private methods
  private emitClick() {
    this.$emit("click");
  }
}
</script>

<style lang="scss" scoped>
@import "./FolderListItem.scss";
</style>
