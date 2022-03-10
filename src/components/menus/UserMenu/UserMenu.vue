<template>
  <v-menu class="user-menu" bottom offset-y min-width="0">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item link v-bind="attrs" v-on="on" class="ma-0">
        <v-list-item-avatar class="mr-4" size="24">
          <v-img src="https://avatars.githubusercontent.com/u/40366303?s=64" />
        </v-list-item-avatar>
        <v-list-item-content class="py-0">
          <v-list-item-title class="ma-0">
            Eugene Volynko
          </v-list-item-title>
          <v-list-item-subtitle>
            volynko.ua@gmail.com
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-list dense outlined class="rounded py-1">
      <v-list-item link disabled>
        <v-list-item-icon class="mr-4">
          <v-icon disabled>mdi-cog-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Preferences</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
// utils
import { Vue, Component } from "@/utils/vue-imports";

// component
@Component({
  name: "UserMenu",
})
export default class UserMenu extends Vue {}
</script>
