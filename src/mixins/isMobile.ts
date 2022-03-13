// utils
import { Vue, Component } from "@/utils/vue-imports";

@Component
export default class IsMobileMixin extends Vue {
  // computed
  get $isMobile(): boolean {
    return !this.$screen.mobile;
  }

  get $isMobileExtra(): boolean {
    return !this.$screen.mobileExtra;
  }
}
