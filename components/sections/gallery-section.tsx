'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface GalleryItem {
  id: string
  title: string
  category: 'batik' | 'process' | 'other'
}

export function GallerySection() {
  const [galleryItems] = useState<GalleryItem[]>([
    { id: '1', title: 'Batik Parang Tradisional', category: 'batik' },
    { id: '2', title: 'Proses Pewarnaan', category: 'process' },
    { id: '3', title: 'Batik Mega Mendung', category: 'batik' },
    { id: '4', title: 'Pengrajin Batik', category: 'process' },
    { id: '5', title: 'Batik Kawung', category: 'batik' },
    { id: '6', title: 'Detail Motif', category: 'process' },
    { id: '7', title: 'Koleksi Klasik', category: 'batik' },
    { id: '8', title: 'Workshop Batik', category: 'other' },
  ])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const itemsPerView = 4
  const totalPages = Math.ceil(galleryItems.length / itemsPerView)

  useEffect(() => {
    if (!isAutoPlay) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlay, totalPages])

  const visibleItems = galleryItems.slice(
    currentIndex * itemsPerView,
    (currentIndex + 1) * itemsPerView
  )

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
    setIsAutoPlay(false)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
    setIsAutoPlay(false)
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-2">
            Galeri Batik Kemang
          </h2>
          <p className="text-muted-foreground">
            Jelajahi keindahan batik, proses pembuatan, dan koleksi eksklusif
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {visibleItems.map((item) => (
              <div
                key={item.id}
                className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <div className="w-full h-full flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-all" />
                  <div className="text-center z-10 px-4">
                    <div className="text-xs font-semibold text-primary/60 uppercase tracking-wider mb-2">
                      {item.category === 'batik'
                        ? 'Motif'
                        : item.category === 'process'
                          ? 'Proses'
                          : 'Galeri'}
                    </div>
                    <p className="font-semibold text-foreground text-sm">
                      {item.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {/* Indicators */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx)
                    setIsAutoPlay(false)
                  }}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'bg-primary w-6'
                      : 'bg-border w-2 hover:bg-primary/50'
                  }`}
                  aria-label={`Go to page ${idx + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Auto-play indicator */}
          <div className="mt-4 text-center text-xs text-muted-foreground">
            {isAutoPlay ? 'Otomatis memutar...' : 'Klik tombol atau indikator untuk melanjutkan'}
          </div>
        </div>
      </div>
    </section>
  )
}
