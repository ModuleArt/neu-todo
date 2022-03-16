<template>
  <div class="nav-bar">
    <v-bottom-navigation
      mandatory
      shift
      grow
      class="nav-bar__bar"
      :value="getRouteName"
      color="primary"
    >
      <v-btn value="folders" to="/folders">
        <span class="mt-1">Folders</span>
        <v-icon>mdi-folder-outline</v-icon>
      </v-btn>
      <v-btn value="tasks" to="/">
        <span class="mt-1">Tasks</span>
        <v-icon>mdi-sticker-check-outline</v-icon>
      </v-btn>
      <v-btn value="search" to="/search">
        <span class="mt-1">Search</span>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script lang="ts">
// utils
import { Vue, Component } from "@/utils/vue-imports";

// component
@Component({
  name: "NavBar",
})
export default class NavBar extends Vue {
  // computed
  private get getRouteName() {
    return this.$route.name;
  }
}
</script>

<style lang="scss" scoped>
@import "./NavBar.scss";
</style>
