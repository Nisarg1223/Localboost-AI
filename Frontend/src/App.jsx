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
          {/*  HOME PAGE */}
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
        </Routes>

        <Footer />
      </Layout>

    </BrowserRouter>
  );
}

export default App;