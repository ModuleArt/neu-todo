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
            placeholder="Search for tasks titles, descriptions, etc."
            prepend-inner-icon="mdi-magnify"
            color="primary"
            outlined
            @contextmenu.stop
            v-model="searchText"
            class="search-page__search-field"
            ref="searchInput"
            @input="search"
          />
          <v-card
            outlined
            class="search-page__card mt-2"
            v-for="todo in todos"
            :key="todo.id"
          >
            <v-card-title class="py-2">{{ todo.title }}</v-card-title>
            <v-divider v-if="todo.body" />
            <v-card-text v-if="todo.body" class="py-2">
              {{ todo.body }}
            </v-card-text>
          </v-card>
          <div v-if="!todos.length">
            <v-subheader class="pa-0">
              Nothing to show.
            </v-subheader>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
// utils
import { Vue, Component } from "@/utils/vue-imports";
import FuzzySearch from "fuzzy-search";

// store modules
import { todosModule } from "@/store";

// interfaces
import Todo from "@/interfaces/entities/todo";

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
  private searcher = new FuzzySearch(todosModule.todos, ["title", "body"], {
    caseSensitive: false,
  });
  private todos: Todo[] = [];

  // lifecycle
  private mounted() {
    this.$refs.searchInput.focus();
  }

  // private methods
  private goBack() {
    this.$router.push({ name: "main" });
  }

  private search(input: string) {
    if (input.length) {
      const results = this.searcher.search(input);
      this.todos = results;
    } else {
      this.todos = [];
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./SearchPage.scss";
</style>
