import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, refreshTokens } from "../utils/auth";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [status, setStatus] = useState<"loading" | "ok" | "redirect">("loading");

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      const authed = await isAuthenticated();
      if (cancelled) return;

      if (authed) {
        setStatus("ok");
        return;
      }

      const refreshed = await refreshTokens();
      if (cancelled) return;

      setStatus(refreshed ? "ok" : "redirect");
    };

    check();
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "loading") return <main className="app dark" />;
  if (status === "redirect") return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
