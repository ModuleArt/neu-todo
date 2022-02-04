<template>
  <div class="due-date-dialog">
    <v-dialog v-model="showDialog" max-width="320">
      <v-card>
        <v-card-title>Edit folder</v-card-title>
        <v-divider />
        <div class="pa-6">
          <v-text-field
            v-model="folderTitle"
            label="Folder title"
            hide-details
            class="ma-0"
            :color="folder.color"
          />
        </div>
        <v-divider />
        <v-card-actions class="pa-2">
          <v-spacer />
          <v-btn text @click="apply()" :color="folder.color">
            Apply
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
// utils
import { Vue, Component } from "@/utils/vue-imports";

// interfaces
import Folder from "@/interfaces/entities/folder";

// store modules
import { foldersModule } from "@/store";

// component
@Component({
  name: "EditFolderDialog",
})
export default class EditFolderDialog extends Vue {
  // data
  private showDialog = false;
  private folder: Folder | null = null;
  private folderTitle = "";

  // public methods
  public setDialogOpened(open: boolean, folder: Folder | null) {
    this.showDialog = open;
    this.folder = folder;
    this.folderTitle = folder?.title || "";
  }

  // private methods
  private apply() {
    this.showDialog = false;

    if (this.folder) {
      foldersModule.setFolderTitle({
        folderId: this.folder.id,
        title: this.folderTitle,
      });
    }
  }
}
</script>
