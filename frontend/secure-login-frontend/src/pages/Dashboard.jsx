
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboard, logoutUser } from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let active = true;

    getDashboard()
      .then((response) => {
        if (active) setData(response.data);
      })
      .catch(() => {
        if (active) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login", { replace: true });
        }
      });

    return () => {
      active = false;
    };
  }, [navigate]);

  async function handleLogout() {
    setLoggingOut(true);
    setError("");

    try {
      await logoutUser();
    } catch {
      setError("Server logout request failed. Local session was cleared.");
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login", { replace: true });
    }
  }

  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <main className="dashboard-page">
      <header className="topbar">
        <div className="brand">
          <span className="brand-icon small">S</span>
          SecureLogin
        </div>
        <button
          className="logout-button"
          onClick={handleLogout}
          disabled={loggingOut}
        >
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </header>

      <section className="dashboard-content">
        <p className="eyebrow">YOUR PERSONAL SPACE</p>
        <h1>Welcome, {user?.name || "User"}!</h1>
        <p className="subtitle">
          You have successfully signed in to SecureLogin.
        </p>

        {error && <div className="error-message">{error}</div>}

        <div className="dashboard-grid">
          <article className="info-card">
            <span className="card-symbol">✓</span>
            <h2>Authentication</h2>
            <p>Your dashboard request is verified by the backend.</p>
          </article>

          <article className="info-card">
            <span className="card-symbol">◈</span>
            <h2>Account details</h2>
            <p>{data?.email || user?.email || "Loading account..."}</p>
          </article>

          <article className="info-card">
            <span className="card-symbol">⌁</span>
            <h2>API status</h2>
            <p>{data?.message || "Checking your session..."}</p>
          </article>
        </div>
      </section>
    </main>
  );
}
