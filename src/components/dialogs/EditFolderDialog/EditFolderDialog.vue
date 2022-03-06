<template>
  <BaseDialog
    class="edit-folder-dialog"
    v-model="showDialog"
    title="Edit folder"
    :actions="dialogButtons"
    v-if="folder"
  >
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
    <v-card outlined>
      <v-carousel
        :continuous="false"
        :show-arrows="false"
        height="250"
        mandatory
        v-model="iconsPage"
      >
        <v-carousel-item
          v-for="(page, pageIndex) in icons"
          :key="`icon-page--${pageIndex}`"
        >
          <div class="d-flex justify-center flex-wrap px-2 py-3">
            <div
              class="edit-folder-dialog__icon"
              v-for="icon in page"
              :key="`icon--${icon}`"
            >
              <v-btn
                icon
                large
                :color="folderIcon == icon ? folderColor : ''"
                @click="folderIcon = icon"
              >
                <v-icon size="24">{{ icon }}</v-icon>
              </v-btn>
            </div>
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-card>
  </BaseDialog>
</template>

<script lang="ts">
// utils
import EventBus from "@/main";
import { Vue, Component, Watch } from "@/utils/vue-imports";

// interfaces
import Folder from "@/interfaces/entities/folder";
import DialogAction from "@/interfaces/logic/dialogAction";

// store modules
import { foldersModule } from "@/store";

// components
import BaseDialog from "@/components/bases/BaseDialog.vue";

// component
@Component({
  name: "EditFolderDialog",
  components: {
    BaseDialog,
  },
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
  private iconsPage = 0;
  private icons = [
    [
      "mdi-folder-outline",
      "mdi-white-balance-sunny",
      "mdi-weather-night",
      "mdi-at",
      "mdi-attachment",
      "mdi-bell-outline",
      "mdi-cake-variant-outline",
      "mdi-crown-outline",
      "mdi-gift-outline",
      "mdi-calendar-month-outline",
      "mdi-monitor",
      "mdi-phone",
      "mdi-sitemap-outline",
      "mdi-map-marker-outline",
      "mdi-piano",
      "mdi-power-standby",
    ],
    [
      "mdi-cloud-outline",
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
    ],
    [
      "mdi-puzzle-outline",
      "mdi-pyramid",
      "mdi-rocket-outline",
      "mdi-run",
      "mdi-shield-outline",
      "mdi-shopping-outline",
      "mdi-star-outline",
      "mdi-sticker-text-outline",
      "mdi-cart-outline",
      "mdi-car",
      "mdi-account-outline",
      "mdi-briefcase-outline",
      "mdi-movie-open-outline",
      "mdi-timer-outline",
      "mdi-chart-timeline-variant",
      "mdi-alert-octagon-outline",
    ],
  ];
  private folder: Folder | null = null;
  private folderTitle = "";
  private folderColor = "";
  private folderIcon = "";
  private dialogButtons: DialogAction[] = [
    {
      text: "Save",
      onClick: () => {
        this.apply();
      },
    },
  ];

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

      this.icons.forEach((page, pageIndex) => {
        if (page.includes(folder.icon)) {
          this.iconsPage = pageIndex;
        }
      });
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

<style lang="scss" scoped>
@import "./EditFolderDialog.scss";
</style>
