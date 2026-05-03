import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import Hero from "./components/Hero";
import TextTransition from "./components/TextTransition";
import Works from "./components/Works";
import InteractiveList from "./components/InteractiveList";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AuthPage from "./components/AuthPage";
import ProfilePage from "./components/ProfilePage";

/* 🔹 HOME PAGE */
function HomePage() {
  return (
    <Layout>
      <Navbar />
      <Hero />
      <TextTransition />
      <Works />
      <InteractiveList />
      <Footer />
    </Layout>
  );
}

/* 🔹 PROTECTED ROUTE */
function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return children;
}

/* 🔹 APP */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME */}
        <Route path="/" element={<HomePage />} />

        {/* AUTH */}
        <Route path="/signin" element={<AuthPage type="signin" />} />
        <Route path="/signup" element={<AuthPage type="signup" />} />

        {/* PROFILE (PROTECTED) */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <Navbar />
                <ProfilePage />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;