<template>
  <div class="folders-page">
    <Sidebar :fullscreen="true" />
  </div>
</template>

<script lang="ts">
// utils
import { Vue, Component } from "@/utils/vue-imports";

// components
import Sidebar from "@/components/organisms/Sidebar/Sidebar.vue";

// component
@Component({
  name: "FoldersPage",
  components: {
    Sidebar,
  },
})
export default class FoldersPage extends Vue {}
</script>
