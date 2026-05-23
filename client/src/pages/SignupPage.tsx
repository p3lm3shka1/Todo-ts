import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signupRequest } from "../api/auth";
import ThemeToggle from "../components/ThemeToggle";
import Attribution from "../components/Attribution";
import useLocalStorage from "../hooks/useLocalStorage";

import type { Theme } from "../types/ui";

import "../App.scss";

function SignupPage() {
  const navigate = useNavigate();

  const [theme, setTheme] = useLocalStorage<Theme>("theme", "dark");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signupRequest({ email, password });
      navigate("/login");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={`app ${theme}`}>
      <section className="hero" />

      <section className="todo-wrapper auth-wrapper">
        <header className="todo-header">
          <h1>TODO</h1>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </header>

        <div className="todo-card auth-card">
          <div className="auth-card__inner">
            <h2 className="auth-title">Create account</h2>

            <form className="auth-form" onSubmit={handleSubmit}>
              <label className="auth-field">
                <span className="auth-field__label">Email</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              <label className="auth-field">
                <span className="auth-field__label">Password</span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>

              {error && <p className="auth-error">{error}</p>}

              <button className="auth-submit" type="submit" disabled={loading}>
                {loading ? "Creating..." : "Sign up"}
              </button>
            </form>

            <p className="auth-switch">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </div>
      </section>

      <Attribution />
    </main>
  );
}

export default SignupPage;
