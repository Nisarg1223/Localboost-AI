import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.scss";

export default function AuthPage({ type }) {
  const navigate = useNavigate();
  const isSignup = type === "signup";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔥 simulate login/signup
    const mockUser = {
      name: form.name || "Nisarg",
      email: form.email,
      businessName: "LocalBoost AI",
      category: "Digital Marketing",
      location: "New York, US",
      website: "https://example.com",
      keywords: "local SEO, Google ranking, business growth",
    };

    localStorage.setItem("user", JSON.stringify(mockUser));

    alert(isSignup ? "Signup successful!" : "Login successful!");

    // redirect after login
    navigate("/profile");
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="auth-brand">LOCALBOOST AI</p>

        <h1>{isSignup ? "Create Account" : "Welcome Back"}</h1>

        <p className="auth-subtitle">
          {isSignup
            ? "Start boosting your local business presence."
            : "Sign in to continue your workspace."}
        </p>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="input-group">
              <label>Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="input-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          <button type="submit">
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p className="auth-switch">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span onClick={() => navigate(isSignup ? "/signin" : "/signup")}>
            {isSignup ? "Sign In" : "Sign Up"}
          </span>
        </p>

        <p className="auth-note">Frontend demo (mock login)</p>
      </div>
    </section>
  );
}