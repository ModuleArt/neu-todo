<template>
  <v-app-bar class="header" dark>
    <v-app-bar-nav-icon />
    <v-spacer />
    <v-text-field
      dense
      label="Search"
      hide-details
      append-icon="mdi-magnify"
      solo
    />
    <v-spacer />
    <v-btn icon color="primary">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from "@/utils/vue-imports";

@Component({
  name: "Header",
})
export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
@import "./Header.scss";
</style>
