<template>
  <div class="search-page">
    <v-container class="search-page__content">
      <v-row justify="center" class="search-page__row">
        <v-col cols="8" class="search-page__col">
          <v-btn icon @click="goBack" class="mb-3">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-text-field
            dense
            hide-details
            solo
            flat
            placeholder="Search for tasks titles, descriptions and steps"
            prepend-inner-icon="mdi-magnify"
            color="primary"
            outlined
            @contextmenu.stop
            v-model="searchText"
            class="search-page__search-field"
            ref="searchInput"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
// utils
import { Vue, Component } from "@/utils/vue-imports";

// component
@Component({
  name: "SearchPage",
})
export default class SearchPage extends Vue {
  // refs
  public $refs!: {
    searchInput: HTMLInputElement;
  };

  // data
  private searchText = "";

  // lifecycle
  private mounted() {
    this.$refs.searchInput.focus();
  }

  // private methods
  private goBack() {
    this.$router.push({ name: "main" });
  }
}
</script>

<style lang="scss" scoped>
@import "./SearchPage.scss";
</style>
