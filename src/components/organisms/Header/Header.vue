<template>
  <div class="header mb-16">
    <v-app-bar fixed outlined class="px-1">
      <v-app-bar-nav-icon />
      <v-spacer />
      <v-text-field
        dense
        label="Search"
        hide-details
        append-icon="mdi-magnify"
        solo
        outlined
      />
      <v-spacer />
      <v-btn fab bottom right absolute color="primary" @click="addTodo">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "@/utils/vue-imports";

@Component({
  name: "Header",
})
export default class Header extends Vue {
  addTodo() {
    this.$store.dispatch("addTodo");
  }
}
</script>
