import { useState } from "react";

type TodoInputProps = {
  onAdd: (text: string) => void;
};

const TodoInput = ({ onAdd }: TodoInputProps) => {
  const [value, setValue] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd(value);
    setValue("");
  };

  const inputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <form className="todo-input todo__input" onSubmit={onSubmit}>
      <span className="circle todo__input-circle" />
      <input
        value={value}
        onChange={inputTextChange}
        placeholder="Create a new todo..."
        className="todo__input-field"
      />
    </form>
  );
};

export default TodoInput;
