import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { CollectionsSection } from "@/components/collections-section"
import { AboutSection } from "@/components/about-section"
import { LookbookSection } from "@/components/lookbook-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <CollectionsSection />
      <AboutSection />
      <LookbookSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
