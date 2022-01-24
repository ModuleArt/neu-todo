<template>
  <div class="header mb-16">
    <v-app-bar fixed class="pl-14">
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
      <v-tooltip left :open-delay="tooltipOpenDelay">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            bottom
            right
            absolute
            color="primary"
            @click="addTodo()"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Add a task</span>
      </v-tooltip>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
// utils
import { Vue, Component } from "@/utils/vue-imports";

// interfaces
import Folder from "@/interfaces/entities/folder";

// store modules
import todosModule from "@/store/modules/todos";
import foldersModule from "@/store/modules/folders";

// component
@Component({
  name: "Header",
})
export default class Header extends Vue {
  // data
  tooltipOpenDelay = 500;

  // computed
  get currentFolder(): Folder | undefined {
    return foldersModule.folders.find(
      (folder: Folder) => folder.id === foldersModule.currentFolderId
    );
  }

  // methods
  addTodo() {
    todosModule.addTodo({ transform: this.currentFolder?.transform });
  }
}
</script>
