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

function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return children;
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {loading && <Loader />}

      <Layout>
        <Navbar />

        <Routes>
          {/* HOME PAGE */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <TextTransition />
                <Works />
                <InteractiveList />
              </>
            }
          />

          {/* ABOUT PAGE */}
          <Route path="/about" element={<About />} />

          {/* AUTH PAGES */}
          <Route path="/signin" element={<AuthPage type="signin" />} />
          <Route path="/signup" element={<AuthPage type="signup" />} />

          {/* PROFILE PAGE */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />
      </Layout>
    </BrowserRouter>
  );
}

export default App;