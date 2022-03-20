<template>
  <div class="main-layout">
    <div class="main-layout__wrapper d-flex flex-column">
      <PwaBar />
      <div class="main-layout__content">
        <v-scroll-x-transition mode="out-in">
          <router-view />
        </v-scroll-x-transition>
      </div>
      <NavBar v-if="$isPhone || $route.name == 'folders'" />
    </div>
    <EditFolderDialog />
    <Snackbar />
  </div>
</template>

<script lang="ts">
// utils
import { Mixins, Component } from "@/utils/vue-imports";

// mixins
import responsiveMixin from "@/mixins/responsive";

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
export default class MainLayout extends Mixins(responsiveMixin) {}
</script>

<style lang="scss" scoped>
@import "./MainLayout.scss";
</style>
