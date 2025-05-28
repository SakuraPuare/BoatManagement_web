import React from "react";
import { Advantages } from "@/components/Advantages";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";



export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Advantages />
      </main>
      <Footer />
    </div>
  );
}
