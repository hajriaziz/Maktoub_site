"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { CollectionsSection } from "@/components/collections-section"
import { AboutSection } from "@/components/about-section"
import { LookbookSection } from "@/components/lookbook-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  const [showVideo, setShowVideo] = useState(true)

  // Éviter le flash de contenu en attendant que l'état soit prêt
  useEffect(() => {
    const timer = setTimeout(() => setShowVideo(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleVideoClick = () => {
    setShowVideo(false)
  }

  return (
    <main className="min-h-screen relative">
      {showVideo ? (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center"
          onClick={handleVideoClick} // Appliqué à la div principale pour détecter tout clic
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover cursor-pointer"
            preload="auto"
          >
            <source src="/maktoub.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo.
          </video>
          {/* Cadre avec texte centré et fond semi-transparent */}
          <div className="absolute top-1/10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20 text-center">
            <div className="bg-accent/20 p-6 rounded-lg">
              {/* Logo */}
              <img
                src="/Maktoub Logo Type - White.png"
                alt="Logo Maktoub"
                className="max-w-[120px] h-auto opacity-100 mx-auto"
              />
              {/* Localisation et heure */}
              <div className="mt-4 text-white text-base">
                Tunis, TN | Tuesday, October 21, 2025 at 02:24 PM GMT+1
              </div>
              {/* Texte principal */}
              <div className="mt-4 text-white text-lg font-bold leading-snug">
                Click to enter<br />
                إنزل بش تدخل<br />
                Cliquez pour entrer
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Navigation />
          <HeroSection />
          <CollectionsSection />
          <AboutSection />
          <LookbookSection />
          <ContactSection />
          <Footer />
        </>
      )}
    </main>
  )
}