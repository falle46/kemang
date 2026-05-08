'use client'

import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/sections/hero-section'
import { AboutSection } from '@/components/sections/about-section'
import { HAKIGridSection } from '@/components/sections/haki-grid-section'
import { GallerySection } from '@/components/sections/gallery-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <HAKIGridSection />
      <GallerySection />
      <Footer />
    </main>
  )
}
