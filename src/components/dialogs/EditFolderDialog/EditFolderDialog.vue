<template>
  <div class="due-date-dialog">
    <v-dialog v-model="showDialog" max-width="320">
      <v-card v-if="folder">
        <v-card-title>Edit folder</v-card-title>
        <v-divider />
        <div class="pa-6">
          <v-text-field
            v-model="folderTitle"
            label="Folder title"
            hide-details
            class="ma-0"
            :color="folderColor"
            ref="folderTitleInput"
          />
          <div class="mt-6 d-flex justify-center flex-wrap">
            <v-btn
              icon
              x-large
              @click="folderColor = color.code"
              v-for="color in colors"
              :key="`color--${color.code}`"
            >
              <v-avatar :color="color.code" size="40">
                <v-icon v-if="folderColor == color.code" size="24">
                  mdi-check-circle
                </v-icon>
                <span v-else>{{ color.name }}</span>
              </v-avatar>
            </v-btn>
          </div>
        </div>
        <v-divider />
        <v-card-actions class="pa-2">
          <v-spacer />
          <v-btn text @click="apply()" :color="folderColor">
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
  // refs
  public $refs!: {
    folderTitleInput: HTMLInputElement;
  };

  // data
  private showDialog = false;
  private folder: Folder | null = null;
  private folderTitle = "";
  private folderColor = "";
  private colors = [
    { code: "primary", name: "BL" },
    { code: "green", name: "GR" },
    { code: "yellow", name: "YE" },
    { code: "pink", name: "PI" },
    { code: "purple", name: "PU" },
    { code: "teal", name: "TE" },
    { code: "indigo", name: "IN" },
    { code: "cyan", name: "CY" },
    { code: "lime", name: "LI" },
    { code: "brown", name: "BR" },
  ];

  // public methods
  public setDialogOpened(open: boolean, folder: Folder | null) {
    this.showDialog = open;
    if (folder) {
      this.folder = folder;
      this.folderTitle = folder.title;
      this.folderColor = folder.color || "primary";
    }

    setTimeout(() => {
      this.$refs.folderTitleInput.focus();
    }, 0);
  }

  // private methods
  private apply() {
    this.showDialog = false;

    if (this.folder) {
      foldersModule.editFolder({
        folderId: this.folder.id,
        title: this.folderTitle,
        color: this.folderColor,
      });
    }
  }
}
</script>
