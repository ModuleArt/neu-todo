// utils
import { Vue, Component } from "@/utils/vue-imports";

@Component
export default class ResponsiveMixin extends Vue {
  // computed
  get $isPhone(): boolean {
    return !this.$screen.phone;
  }

  get $isPhoneExtra(): boolean {
    return !this.$screen.phoneExtra;
  }

  get $isTouchscreen(): boolean {
    return this.$screen.touch;
  }

  // private methods
  private rightClick(e: PointerEvent) {
    if (!this.$isTouchscreen) {
      this.$emit("contextmenu", { x: e.clientX, y: e.clientY });
    }
  }

  private touchHold(e: TouchEvent) {
    if (this.$isTouchscreen) {
      this.$emit("contextmenu", {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      });
    }
  }
}
