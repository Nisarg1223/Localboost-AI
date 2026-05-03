import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
        </Routes>

        <Footer />
      </Layout>

    </BrowserRouter>
  );
}

export default App;