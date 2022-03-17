<template>
  <div class="main-layout d-flex flex-column">
    <PwaBar />
    <div class="main-layout__content">
      <v-scroll-x-transition mode="out-in">
        <router-view />
      </v-scroll-x-transition>
    </div>
    <NavBar v-if="$isMobile" />
    <EditFolderDialog />
    <Snackbar />
  </div>
</template>

<script lang="ts">
// utils
import { Mixins, Component } from "@/utils/vue-imports";

// mixins
import isMobileMixin from "@/mixins/isMobile";

// components
import NavBar from "@/components/organisms/NavBar/NavBar.vue";
import PwaBar from "@/components/organisms/PwaBar/PwaBar.vue";
import EditFolderDialog from "@/components/dialogs/EditFolderDialog/EditFolderDialog.vue";
import Snackbar from "@/components/organisms/Snackbar/Snackbar.vue";

// component
@Component({
  name: "MainLayout",
  components: {
    NavBar,
    PwaBar,
    EditFolderDialog,
    Snackbar,
  },
})
export default class MainLayout extends Mixins(isMobileMixin) {}
</script>
