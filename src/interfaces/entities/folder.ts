// interfaces
import Todo from "@/interfaces/entities/todo";

interface Folder {
  id: string;
  title: string;
  icon: string;
  filter?(todo: Todo): boolean;
}

export default Folder;
