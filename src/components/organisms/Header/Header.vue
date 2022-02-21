<template>
  <div class="header">
    <v-app-bar fixed class="pl-14" short>
      <v-container>
        <v-text-field
          dense
          label="Search"
          hide-details
          append-icon="mdi-magnify"
          solo
          placeholder="Search for task titles and descriptions"
          outlined
        />
      </v-container>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
// utils
import { Vue, Component } from "@/utils/vue-imports";

// component
@Component({
  name: "Header",
})
export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
@import "./Header.scss";
</style>
