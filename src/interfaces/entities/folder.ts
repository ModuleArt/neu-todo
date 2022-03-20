// interfaces
import Todo from "@/interfaces/entities/todo";

interface Folder {
  id: string;
  title: string;
  icon: string;
  custom: boolean;
  color: string;
  filter?(todo: Todo): boolean;
  transform?(todo: Todo): Todo;
  board: string | null;
  date?: string;
}

export default Folder;
