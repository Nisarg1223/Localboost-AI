import Layout from './components/Layout';
import Hero from './components/Hero';
import TextTransition from './components/TextTransition';
import Works from './components/Works';
import InteractiveList from './components/InteractiveList';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  return (
  
    <Layout>
      <Navbar/>
      <Hero />
      <TextTransition />
      <Works />
      <InteractiveList />
      <Footer />
    </Layout>
  );
}

export default App;
