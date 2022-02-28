<template>
  <div class="due-date-dialog">
    <v-dialog v-model="showDialog" max-width="320">
      <v-card v-if="folder">
        <v-card-title class="pa-4">Edit folder</v-card-title>
        <v-divider />
        <div class="px-4 pt-6">
          <v-text-field
            v-model="folderTitle"
            label="Folder title"
            class="ma-0"
            counter="64"
            :error-messages="titleErrors"
            :color="folderColor"
            ref="folderTitleInput"
            @keypress.enter="apply()"
            @contextmenu.stop
          />
          <v-subheader class="pa-0 mt-2">Color</v-subheader>
          <v-card class="d-flex justify-center flex-wrap px-2 py-3" outlined>
            <v-btn
              icon
              large
              v-for="color in colors"
              :key="`color--${color.code}`"
              @click="folderColor = color.code"
            >
              <v-avatar :color="color.code" size="32">
                <v-icon
                  v-if="folderColor == color.code"
                  size="24"
                  :color="`${color.code} darken-4`"
                >
                  mdi-check
                </v-icon>
                <span :class="`${color.code}--text text--darken-4`" v-else>
                  {{ color.name }}
                </span>
              </v-avatar>
            </v-btn>
          </v-card>
          <v-subheader class="pa-0 mt-2">Icon</v-subheader>
          <v-card class="d-flex justify-center flex-wrap px-2 py-3" outlined>
            <v-btn
              icon
              large
              v-for="icon in icons"
              :key="`icon--${icon}`"
              :color="folderIcon == icon ? folderColor : ''"
              @click="folderIcon = icon"
            >
              <v-icon size="24">{{ icon }}</v-icon>
            </v-btn>
          </v-card>
        </div>
        <v-card-actions class="pa-2">
          <v-spacer />
          <v-btn text @click="apply()" :color="folderColor">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
// utils
import EventBus from "@/main";
import { Vue, Component, Watch } from "@/utils/vue-imports";

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
  private titleErrors: string[] = [];
  private colors = [
    { code: "pink", name: "PI" },
    { code: "purple", name: "PU" },
    { code: "deep-purple", name: "DP" },
    { code: "indigo", name: "IN" },
    { code: "primary", name: "BL" },
    { code: "light-blue", name: "LB" },
    { code: "cyan", name: "CY" },
    { code: "teal", name: "TE" },
    { code: "green", name: "GR" },
    { code: "light-green", name: "LG" },
    { code: "lime", name: "LI" },
    { code: "blue-grey", name: "BG" },
  ];
  private icons = [
    "mdi-folder-outline",
    "mdi-book-open-page-variant-outline",
    "mdi-music",
    "mdi-checkbox-marked-circle-outline",
    "mdi-printer-outline",
    "mdi-television-classic",
    "mdi-credit-card-outline",
    "mdi-xml",
    "mdi-hammer-wrench",
    "mdi-comment-text-outline",
    "mdi-heart-outline",
    "mdi-robot-outline",
    "mdi-airplane",
    "mdi-package-variant-closed",
    "mdi-earth",
    "mdi-camera-outline",
    "mdi-cart-outline",
    "mdi-fire",
    "mdi-car",
    "mdi-account-outline",
    "mdi-alien-outline",
    "mdi-briefcase-outline",
    "mdi-cookie-outline",
    "mdi-calendar-star",
    "mdi-movie-open-outline",
    "mdi-timer-outline",
    "mdi-chart-timeline-variant",
    "mdi-map-marker-outline",
    "mdi-sitemap-outline",
    "mdi-alert-octagon-outline",
  ];
  private folder: Folder | null = null;
  private folderTitle = "";
  private folderColor = "";
  private folderIcon = "";

  // watchers
  @Watch("folderTitle")
  onFolderTitleChanged(value: string) {
    if (value.length <= 64) {
      this.titleErrors = [];
    }
  }

  // lifecycle
  private created() {
    setTimeout(() => {
      EventBus.$on("openEditFolderDialog", (folder: Folder) => {
        this.setDialogOpened(true, folder);
      });
    }, 0);
  }

  // public methods
  public setDialogOpened(open: boolean, folder: Folder | null) {
    this.showDialog = open;
    if (folder) {
      this.folder = folder;
      this.folderTitle = folder.title;
      this.folderColor = folder.color || "primary";
      this.folderIcon = folder.icon || "mdi-folder-outline";
    }
    setTimeout(() => {
      this.$refs.folderTitleInput.focus();
    }, 0);
  }

  // private methods
  private apply() {
    if (this.folder) {
      if (this.folderTitle.length > 64) {
        this.titleErrors.push("Maximum number of characters has been reached");
      } else {
        foldersModule.editFolder({
          folderId: this.folder.id,
          title: this.folderTitle,
          color: this.folderColor,
          icon: this.folderIcon,
        });
        this.titleErrors = [];
        this.showDialog = false;
      }
    }
  }
}
</script>
