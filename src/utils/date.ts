import moment from "moment";

const dateUtils = {
  numberToCode(date: number | null, label = false): string {
    if (date) {
      if (label) {
        return moment(date).format("YYYY-MM-DD");
      } else {
        if (moment().isSame(date, "day")) return "today";
        else if (moment().add(1, "days").isSame(date, "day")) return "tomorrow";
        else if (moment().add(-1, "days").isSame(date, "day"))
          return "yesterday";
        else return moment(date).format("YYYY-MM-DD");
      }
    } else return "";
  },
  codeToNumber(code: string): number {
    const today = new Date();
    let dueDate = 0;

    switch (code) {
      case "today":
        dueDate = Date.now();
        break;
      case "tomorrow":
        dueDate = today.setDate(today.getDate() + 1);
        break;
      case "yesterday":
        dueDate = today.setDate(today.getDate() - 1);
        break;
      default:
        dueDate = moment(code, "YYYY-MM-DD").valueOf();
    }
    return dueDate;
  },
  isOverdue(date: number | null) {
    if (date) {
      return moment(date).isBefore(moment().startOf("day"));
    } else {
      return false;
    }
  },
  toDisplay(date: number) {
    switch (this.numberToCode(date)) {
      case "today":
        return "Today";
      case "tomorrow":
        return "Tomorrow";
      case "yesterday":
        return "Yesterday";
      default:
        return moment(date).format("ddd, MMM D");
    }
  },
};

export default dateUtils;
