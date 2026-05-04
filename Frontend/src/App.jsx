import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import Hero from "./components/Hero";
import TextTransition from "./components/TextTransition";
import Works from "./components/Works";
import InteractiveList from "./components/InteractiveList";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import About from "./components/About";
import AuthPage from "./components/AuthPage";
import ProfilePage from "./components/ProfilePage";
import DashboardPage from "./components/DashboardPage"; // ✅ USE THIS ONLY

/* 🔒 PROTECTED ROUTE */
function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

/* 🏠 HOME */
function HomePage() {
  return (
    <>
      <Hero />
      <TextTransition />
      <Works />
      <InteractiveList />
      <Footer />
    </>
  );
}

/* 🚀 APP */
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {loading && <Loader />}

      <Layout>
        <Navbar />

        <Routes>
          {/* HOME */}
          <Route path="/" element={<HomePage />} />

          {/* ABOUT */}
          <Route
            path="/about"
            element={
              <>
                <About />
                <Footer />
              </>
            }
          />

          {/* AUTH */}
          <Route path="/signin" element={<AuthPage type="signin" />} />
          <Route path="/signup" element={<AuthPage type="signup" />} />

          {/* PROFILE */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;