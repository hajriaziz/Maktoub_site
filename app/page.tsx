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
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      }
      const formattedTime = now.toLocaleString("en-GB", options)
      setCurrentTime(formattedTime)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleVideoClick = () => {
    setShowVideo(false)
  }

  return (
    <main className="min-h-screen relative">
      {showVideo ? (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center"
          onClick={handleVideoClick}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover cursor-pointer"
          >
            <source src="/IMG_6765.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo.
          </video>

          {/* Cadre texte et logo */}
<div className="absolute top-1/10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20 text-center">
            <div className="bg-accent/20 p-6 rounded-lg">
              <img
                src="/Maktoub Logo Type - White.png"
                alt="Logo Maktoub"
                className="max-w-[120px] h-auto opacity-100 mx-auto"
              />
              <div className="mt-4 text-white text-base">
                Tunis, TN | {currentTime}
              </div>
              <div className="mt-4 text-white text-lg font-bold leading-snug">
                Cliquez pour entrer<br />
                إنزل بش تدخل<br />
                Click to enter
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
