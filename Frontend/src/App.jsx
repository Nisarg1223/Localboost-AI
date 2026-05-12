import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import Layout from "./components/Layout";
import Hero from "./components/Hero";
import TextTransition from "./components/TextTransition";
import Works from "./components/Works";
import InteractiveList from "./components/InteractiveList";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import About from "./components/About";
import PageTransition from "./components/PageTransition";

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
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  // ✅ MAIN LAYOUT (ONLY FOR HOME + ABOUT)
  function MainLayout() {
    return (
      <>
        <Navbar setTrigger={setTransition} />
        <Outlet />
        <Footer />
      </>
    );
  }

  return (
    <BrowserRouter>
      {loading && <Loader />}

      {/* PAGE TRANSITION OVERLAY */}
      <PageTransition
        trigger={transition}
        onComplete={() => setTransition(false)}
      />

      <Routes>

        {/* ✅ MAIN PAGES (WITH FOOTER) */}
        <Route element={<MainLayout />}>
          <Route
            path="/about"
            element={
              <>
                <About />
                <Footer />
              </>
            }
          />

          <Route path="/about" element={<About />} />
        </Route>

        {/* ❌ AUTH PAGES (NO FOOTER) */}
        <Route path="/signin" element={<AuthPage type="signin" />} />
        <Route path="/signup" element={<AuthPage type="signup" />} />

        {/* 🔒 PROTECTED PROFILE (NO FOOTER) */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;