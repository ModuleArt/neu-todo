<template>
  <v-list-item link>
    <v-list-item-icon>
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

  // methods
  getFolderTodosCount(folder: Folder): number | string{
    return todosModule.todos.filter((todo) => folder.filter(todo)).length || "";
  }
}
</script>
