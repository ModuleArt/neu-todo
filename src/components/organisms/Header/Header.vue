<template>
  <v-app-bar class="header" dark>
    <v-app-bar-nav-icon />
    <v-toolbar-title>Vue Boilerplate</v-toolbar-title>
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
