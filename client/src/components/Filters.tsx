import type { Filter } from "../types/todo";

type FiltersProps = {
  current: Filter;
  onChange: (next: Filter) => void;
};

const options: Filter[] = ["all", "active", "completed"];

const Filters = ({ current, onChange }: FiltersProps) => {
  return (
    <div className="filters todo__filters">
      {options.map((opt) => (
        <button
          type="button"
          key={opt}
          className={`${current === opt ? "active" : ""} todo__filter-btn ${current === opt ? "todo__filter-btn--active" : ""}`}
          onClick={() => onChange(opt)}
        >
          {opt[0].toUpperCase() + opt.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default Filters;
