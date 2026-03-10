import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Insurance from "./components/Insurance";
import Faq from "./components/Faq";
import Cta from "./components/Cta";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Insurance />
        <Faq />
        <Cta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
