<template>
  <v-list-item
    link
    :title="folder.title"
    @contextmenu.prevent="rightClick"
    v-touch:touchhold="touchHold"
    class="folder-list-item"
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

// interfaces
import Folder from "@/interfaces/entities/folder";

// store modules
import { todosModule } from "@/store";

// mixins
import isMobileMixin from "@/mixins/isMobile";

// component
@Component({
  name: "FolderListItem",
})
export default class FolderListItem extends Mixins(isMobileMixin) {
  // props
  @Prop() readonly folder!: Folder;

  // computed
  get folderTodosCount(): number | string {
    return (
      todosModule.todos.filter((todo) => {
        if (todo.checked) {
          return false;
        } else {
          if (this.folder.filter) {
            return this.folder.filter(todo);
          } else {
            return this.folder.id === todo.customFolderId;
          }
        }
      }).length || ""
    );
  }

  // private methods
  private rightClick(e: MouseEvent) {
    this.$emit("contextmenu", { x: e.clientX, y: e.clientY });
  }

  private touchHold(e: MouseEvent) {
    if (this.$isMobile) {
      const p = (e.target as HTMLElement).getBoundingClientRect();
      this.$emit("contextmenu", { x: p.x, y: p.y + p.height - 8 });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./FolderListItem.scss";
</style>
