import TodoApp from "./pages/TodoApp";

import { useEffect } from "react";
import { getHealth } from "./api/health";

import "./App.scss";

function App() {
  useEffect(() => {
    getHealth()
      .then((data) => console.log("API health:", data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section>
      <TodoApp />
    </section>
  );
}

export default App;
