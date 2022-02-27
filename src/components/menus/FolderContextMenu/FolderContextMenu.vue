<template>
  <v-menu
    class="folder-context-menu"
    v-model="showMenu"
    :position-x="folderContextMenuX"
    :position-y="folderContextMenuY"
    absolute
    offset-y
    :transition="false"
  >
    <v-list dense outlined class="rounded py-1">
      <v-list-item link @click="editFolder()">
        <v-list-item-icon class="mr-4">
          <v-icon>mdi-pencil-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Edit folder ...</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="removeFolder()">
        <v-list-item-icon class="mr-4">
          <v-icon color="red">mdi-delete-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="red--text">Delete folder</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
// utils
import { Vue, Component, Model, Watch } from "@/utils/vue-imports";

// component
@Component({
  name: "FolderContextMenu",
})
export default class FolderListItem extends Vue {
  // model
  @Model("showChanged", { type: Boolean }) show!: boolean;

  // data
  private showMenu = false;
  private folderContextMenuX = 0;
  private folderContextMenuY = 0;

  // watchers
  @Watch("show")
  onShowChanged(value: boolean) {
    this.showMenu = value;
  }

  @Watch("showMenu")
  onShowMenuChanged(value: boolean) {
    this.$emit("showChanged", value);
  }

  // private methods
  private removeFolder() {
    this.$emit("removeFolder");
  }

  private editFolder() {
    this.$emit("editFolder");
  }

  // public methods
  public setCoordinates(x: number, y: number) {
    this.folderContextMenuX = x;
    this.folderContextMenuY = y;
  }
}
</script>
