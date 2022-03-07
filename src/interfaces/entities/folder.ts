// interfaces
import Todo from "@/interfaces/entities/todo";

interface Folder {
  id: string;
  title: string;
  icon: string;
  custom: boolean;
  color: string;
  board: string | null;
  filter?(todo: Todo): boolean;
  transform?(todo: Todo): Todo;
}

export default Folder;
