<template>
  <v-list-item
    link
    :title="folder.title"
    class="folder-list-item"
    @contextmenu.prevent="rightClick"
    v-touch:touchhold.self="touchHold"
  >
    <v-list-item-icon class="mr-4">
      <v-icon>{{ folder.icon }}</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>{{ folder.title }}</v-list-item-title>
    </v-list-item-content>
    <v-list-item-action class="my-0 mr-1 justify-end">
      <v-list-item-action-text>
        {{ getFolderTodosCount(folder) }}
      </v-list-item-action-text>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
// utils
import { Vue, Component, Prop } from "@/utils/vue-imports";
import isMobile from "is-mobile";

// interfaces
import Folder from "@/interfaces/entities/folder";

// store modules
import { todosModule } from "@/store";

// component
@Component({
  name: "FolderListItem",
})
export default class FolderListItem extends Vue {
  // props
  @Prop() readonly folder!: Folder;

  // private methods
  private getFolderTodosCount(folder: Folder): number | string {
    return (
      todosModule.todos.filter((todo) => {
        if (todo.checked) {
          return false;
        } else {
          if (folder.filter) {
            return folder.filter(todo);
          } else {
            return folder.id === todo.customFolderId;
          }
        }
      }).length || ""
    );
  }

  private rightClick(e: MouseEvent) {
    this.$emit("contextmenu", e);
  }

  private touchHold(e: MouseEvent) {
    if (isMobile()) {
      this.$emit("contextmenu", e);
    }
  }
}
</script>
