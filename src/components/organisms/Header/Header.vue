<template>
  <div class="header mb-16">
    <v-app-bar fixed class="pl-14">
      <v-spacer />
      <v-text-field
        dense
        label="Search"
        hide-details
        append-icon="mdi-magnify"
        solo
        placeholder="Search for task titles and descriptions"
      />
      <v-spacer />
      <v-btn fab bottom right absolute color="primary" @click="addTodo">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
// utils
import { Vue, Component } from "@/utils/vue-imports";

// store modules
import todosModule from "@/store/modules/todos";

// component
@Component({
  name: "Header",
})
export default class Header extends Vue {
  addTodo() {
    todosModule.addTodo();
  }
}
</script>
