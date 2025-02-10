"use client";

import React from "react";
import {Navbar} from "@/components/Navbar";
import {Hero} from "@/components/Hero";
import {Features} from "@/components/Features";
import {Advantages} from "@/components/Advantages";
import {Footer} from "@/components/Footer";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <Navbar/>
            <main>
                <Hero/>
                <Features/>
                <Advantages/>
            </main>
            <Footer/>
        </div>
    );
}
