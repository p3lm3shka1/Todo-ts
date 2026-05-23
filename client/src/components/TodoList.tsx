import type { Todo } from "../types/todo";

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

import ICON_CHECK from "../assets/images/icon-check.svg";
import ICON_CROSS from "../assets/images/icon-cross.svg";

const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
  return (
    <ul className="todo-list todo__list">
      {todos.map((todo) => (
        <li
          key={todo._id}
          className={`todo-item todo__item ${todo.completed ? "completed todo__item--completed" : ""}`}
        >
          <button
            type="button"
            className="check-btn todo__check"
            onClick={() => onToggle(todo._id)}
            aria-label={todo.completed ? "Mark as active" : "Mark as completed"}
          >
            {todo.completed && <img src={ICON_CHECK} alt="Checked" />}
          </button>

          <span className="todo-text todo__text">{todo.text}</span>

          <button
            type="button"
            className="delete-btn todo__delete"
            onClick={() => onDelete(todo._id)}
            aria-label="Delete todo"
          >
            <img src={ICON_CROSS} alt="Delete" />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
