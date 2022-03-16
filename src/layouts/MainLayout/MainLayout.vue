<template>
  <div class="main-layout">
    <div class="main-layout__content">
      <router-view />
    </div>
    <NavBar v-if="$isMobile" />
  </div>
</template>

<script lang="ts">
// utils
import { Mixins, Component } from "@/utils/vue-imports";

// mixins
import isMobileMixin from "@/mixins/isMobile";

// components
import NavBar from "@/components/organisms/NavBar/NavBar.vue";

// component
@Component({
  name: "MainLayout",
  components: {
    NavBar,
  },
})
export default class MainLayout extends Mixins(isMobileMixin) {}
</script>
