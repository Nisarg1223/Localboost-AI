import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

<<<<<<< HEAD
import Layout from './components/Layout';
import Hero from './components/Hero';
import TextTransition from './components/TextTransition';
import Works from './components/Works';
import InteractiveList from './components/InteractiveList';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import About from './components/About';
import PageTransition from './components/PageTransition'; // 🔥 ADD THIS
=======
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
>>>>>>> eb1f30b0caa773f5cb8a2715791e5402168c3bb1

function App() {
  const [loading, setLoading] = useState(true);
  const [transition, setTransition] = useState(false); // 🔥 ADD THIS

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {loading && <Loader />}

      {/* 🔥 TRANSITION OVERLAY */}
      <PageTransition
        trigger={transition}
        onComplete={() => setTransition(false)}
      />

      <Layout>
        <Navbar setTrigger={setTransition} /> {/* 🔥 PASS PROP */}

        <Routes>
<<<<<<< HEAD
=======
          {/* HOME PAGE */}
>>>>>>> eb1f30b0caa773f5cb8a2715791e5402168c3bb1
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