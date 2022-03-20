<template>
  <div class="nav-bar">
    <v-bottom-navigation
      mandatory
      class="nav-bar__bar elevation-0"
      :value="getRouteName"
      :color="currentFolder ? currentFolder.color : 'primary'"
      grow
      :horizontal="!$isPhoneExtra"
    >
      <v-btn
        v-for="button in buttons"
        :key="button.to"
        :value="button.to"
        :to="`/${button.to}`"
      >
        <span
          :class="{
            'mt-1': $isPhoneExtra,
          }"
        >
          {{ button.title }}
        </span>
        <v-icon>{{ button.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script lang="ts">
// utils
import { Mixins, Component } from "@/utils/vue-imports";

// interfaces
import Folder from "@/interfaces/entities/folder";

// store modules
import { foldersModule } from "@/store";

// mixins
import responsiveMixin from "@/mixins/responsive";

// component
@Component({
  name: "NavBar",
})
export default class NavBar extends Mixins(responsiveMixin) {
  // data
  private buttons = [
    {
      icon: "mdi-folder-outline",
      title: "Folders",
      to: "folders",
    },
    {
      icon: "mdi-sticker-check-outline",
      title: "Tasks",
      to: "tasks",
    },
    {
      icon: "mdi-magnify",
      title: "Search",
      to: "search",
    },
  ];

  // computed
  private get getRouteName() {
    return this.$route.name;
  }

  private get currentFolder(): Folder | null {
    return foldersModule.getCurrentFolder;
  }
}
</script>

<style lang="scss" scoped>
@import "./NavBar.scss";
</style>
