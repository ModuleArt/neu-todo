<template>
  <div class="header pb-16">
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
            :color="(currentFolder && currentFolder.color) || 'primary'"
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
import config from "@/config";

// interfaces
import Folder from "@/interfaces/entities/folder";

// store modules
import { todosModule, foldersModule } from "@/store";

// component
@Component({
  name: "Header",
})
export default class Header extends Vue {
  // data
  private tooltipOpenDelay = config.delays.tooltipOpenDelay;

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
