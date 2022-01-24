import User from "@/interfaces/entities/user";
import Todo from "@/interfaces/entities/todo";

export default interface GlobalState {
  user: User | null;
  todos: Todo[];
}
