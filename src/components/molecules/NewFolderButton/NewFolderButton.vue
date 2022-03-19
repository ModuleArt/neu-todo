<template>
  <div class="new-folder-button">
    <v-menu
      top
      offset-y
      min-width="0"
      transition="scroll-y-transition"
      nudge-top="9"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-if="fab"
          fab
          :color="color"
          fixed
          right
          bottom
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-list nav dense v-else>
          <v-list-item link v-bind="attrs" v-on="on" class="ma-0">
            <v-list-item-icon class="mr-4">
              <v-icon>mdi-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Create new</v-list-item-title>
          </v-list-item>
        </v-list>
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
  </div>
</template>

<script lang="ts">
// utils
import { Vue, Component, Prop } from "@/utils/vue-imports";

// store modules
import { foldersModule } from "@/store";

// component
@Component({
  name: "NewFolderButton",
})
export default class NewFolderButton extends Vue {
  // props
  @Prop() readonly fab!: boolean;
  @Prop() readonly color!: string;

  // private methods
  private addNewFolder() {
    foldersModule.addNewFolder();
  }
}
</script>
