import { useState } from "react";
import Layout from './components/Layout';
import Hero from './components/Hero';
import TextTransition from './components/TextTransition';
import Works from './components/Works';
import InteractiveList from './components/InteractiveList';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Loader from './components/Loader'; // 👈 add this

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
     

     
        <Layout>
          <Navbar/>
          <Hero />
          <TextTransition />
          <Works />
          <InteractiveList />
          <Footer />
        </Layout>
   
    </>
  );
}

export default App;
