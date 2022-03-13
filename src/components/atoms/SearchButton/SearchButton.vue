<template>
  <v-list-item link class="ma-0 mt-1" @click="goToSearchPage" title="Search">
    <v-list-item-icon class="mr-4">
      <v-icon>mdi-magnify</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>Search</v-list-item-title>
    </v-list-item-content>
    <!-- <v-list-item-action class="my-0 mr-1 justify-end" v-if="!$isMobile">
      <v-list-item-action-text>⌘ + F</v-list-item-action-text>
    </v-list-item-action> -->
  </v-list-item>
</template>

<script lang="ts">
// utils
import { Mixins, Component } from "@/utils/vue-imports";

// mixins
import isMobileMixin from "@/mixins/isMobile";

// component
@Component({
  name: "SearchButton",
})
export default class SearchButton extends Mixins(isMobileMixin) {
  // private methods
  private goToSearchPage() {
    this.$router.push({ name: "search" });
  }
}
</script>
