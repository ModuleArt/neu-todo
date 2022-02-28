<template>
  <v-menu
    class="folder-context-menu"
    v-model="showMenu"
    :position-x="folderContextMenuX"
    :position-y="folderContextMenuY"
    :absolute="!button"
    offset-y
    :transition="false"
  >
    <template v-if="button" v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-dots-horizontal-circle-outline</v-icon>
      </v-btn>
    </template>
    <v-list dense outlined class="rounded py-1" v-if="folder">
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
import EventBus from "@/main";
import { Vue, Component, Model, Watch, Prop } from "@/utils/vue-imports";

// interfaces
import Folder from "@/interfaces/entities/folder";

// store modules
import { foldersModule, todosModule } from "@/store";

// component
@Component({
  name: "FolderContextMenu",
})
export default class FolderListItem extends Vue {
  // model
  @Model("showChanged", { type: Boolean }) show!: boolean;

  // props
  @Prop() readonly folder!: Folder;
  @Prop() readonly button!: boolean;

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
    todosModule.removeTodosByCustomFolderId(this.folder.id);
    foldersModule.removeFolder(this.folder.id);
  }

  private editFolder() {
    EventBus.$emit("openEditFolderDialog", this.folder);
  }

  // public methods
  public setCoordinates(x: number, y: number) {
    this.folderContextMenuX = x;
    this.folderContextMenuY = y;
  }
}
</script>
