import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import TodoApp from "./pages/TodoApp";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { getHealth } from "./api/health";

import "./App.scss";

function App() {
  useEffect(() => {
    getHealth()
      .then((data) => console.log("API health:", data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" replace />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/todos"
        element={
          <ProtectedRoute>
            <TodoApp />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
