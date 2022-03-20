<template>
  <div class="search-page">
    <div class="search-page__scroll d-flex justify-center">
      <v-container>
        <v-row justify="center" class="search-page__row">
          <v-col cols="8" class="search-page__col">
            <div class="search-page__body">
              <div class="d-flex align-center mb-4">
                <v-btn icon @click="goBack" v-if="!$isPhone" class="mr-2">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <h1 class="search-page__heading">Search</h1>
              </div>
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
                class="search-page__search-field"
                ref="searchInput"
                @input="search"
                @keypress.enter="unfocus"
                type="text"
              />
              <v-subheader v-if="folders.length" class="pa-0">
                Folders
              </v-subheader>
              <SearchFolderCard
                v-for="(folder, folderIndex) in folders"
                :key="folder.id"
                :folder="folder"
                :class="folderIndex != folders.length - 1 ? 'mb-2' : ''"
              />
              <v-subheader v-if="todos.length" class="pa-0">Tasks</v-subheader>
              <SearchTodoCard
                v-for="(todo, todoIndex) in todos"
                :key="todo.id"
                :todo="todo"
                :class="todoIndex != todos.length - 1 ? 'mb-2' : ''"
              />
              <div v-if="!todos.length && !folders.length">
                <v-subheader class="pa-0">
                  Nothing to show.
                </v-subheader>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
// utils
import { Mixins, Component } from "@/utils/vue-imports";
import FuzzySearch from "fuzzy-search";

// store modules
import { todosModule, foldersModule } from "@/store";

// mixins
import responsiveMixin from "@/mixins/responsive";

// interfaces
import Todo from "@/interfaces/entities/todo";
import Folder from "@/interfaces/entities/folder";

// components
import SearchTodoCard from "@/components/atoms/SearchTodoCard/SearchTodoCard.vue";
import SearchFolderCard from "@/components/atoms/SearchFolderCard/SearchFolderCard.vue";

// component
@Component({
  name: "SearchPage",
  components: {
    SearchTodoCard,
    SearchFolderCard,
  },
})
export default class SearchPage extends Mixins(responsiveMixin) {
  // refs
  public $refs!: {
    searchInput: HTMLInputElement;
  };

  // data
  private todoSearcher = new FuzzySearch(
    todosModule.todos,
    ["title", "body", "steps.title"],
    {
      caseSensitive: false,
      sort: true,
    }
  );
  private folderSearcher = new FuzzySearch(foldersModule.folders, ["title"], {
    caseSensitive: false,
    sort: true,
  });
  private todos: Todo[] = [];
  private folders: Folder[] = [];

  // lifecycle
  private mounted() {
    this.$refs.searchInput.focus();
  }

  // private methods
  private goBack() {
    this.$router.push({ name: "tasks" });
  }

  private search(input: string) {
    if (input) {
      const todos = this.todoSearcher.search(input);
      const folders = this.folderSearcher.search(input);
      this.todos = todos;
      this.folders = folders;
    } else {
      this.todos = [];
      this.folders = [];
    }
  }

  private unfocus() {
    (document.activeElement as HTMLElement).blur();
  }
}
</script>

<style lang="scss" scoped>
@import "./SearchPage.scss";
</style>
