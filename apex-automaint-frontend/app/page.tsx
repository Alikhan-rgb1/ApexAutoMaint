"use client";
import React, { useState } from 'react';
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Insurance from "./components/Insurance";
import Faq from "./components/Faq";
import Cta from "./components/Cta";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Header onBookClick={openModal} />
      <main>
        <Hero onBookClick={openModal} />
        <Services />
        <About onBookClick={openModal} />
        <Insurance />
        <Faq />
        <Cta onBookClick={openModal} />
        <Contact />
      </main>
      <Footer />
      <BookingModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
