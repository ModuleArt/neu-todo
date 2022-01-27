// interfaces
import Todo from "@/interfaces/entities/todo";

interface Folder {
  id: string;
  title: string;
  icon: string;
  filter(todo: Todo): boolean;
  transform(todo: Todo): Todo;
  custom: boolean;
  color?: string;
}

export default Folder;
