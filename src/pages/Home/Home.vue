<template>
  <div class="home-page">
    <Header />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "@/utils/vue-imports";
import Header from "@/components/organisms/Header/Header.vue";

@Component({
  name: "HomePage",
  components: {
    Header,
  },
})
export default class HomePage extends Vue {}
</script>

<style lang="scss" scoped>
@import url("./Home.scss");
</style>
