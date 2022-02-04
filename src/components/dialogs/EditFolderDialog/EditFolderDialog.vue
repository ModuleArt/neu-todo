<template>
  <div class="due-date-dialog">
    <v-dialog v-model="showDialog" max-width="320"> </v-dialog>
  </div>
</template>

<script lang="ts">
// utils
import { Vue, Component } from "@/utils/vue-imports";

// component
@Component({
  name: "EditFolderDialog",
})
export default class EditFolderDialog extends Vue {
  // data
  private showDialog = false;

  // public methods
  public setDialogOpened(open: boolean) {
    this.showDialog = open;
  }
}
</script>
