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
        <div className="absolute inset-0 z-50 flex items-center justify-center ">
          <video
            autoPlay
            muted
            loop // Ajout pour boucler la vidéo
            playsInline
            className="w-full h-full object-cover cursor-pointer"
            onClick={handleVideoClick}
            preload="auto" // Précharge la vidéo pour une meilleure qualité initiale
          >
            <source src="/maktoub.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo.
          </video>
          {/* Cadre avec texte */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-50">
            <div className="text-center text-white p-6 bg-black/70 rounded-lg max-w-md">
              <h2 className="text-3xl font-serif font-bold mb-4">Bienvenue chez Maktoub</h2>
              <p className="text-lg mb-4">Découvrez notre collection exclusive</p>
              <p className="text-xl font-medium mb-6">Cliquer pour commencer</p>
              <button
                onClick={handleVideoClick}
                className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200"
              >
                Entrer
              </button>
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