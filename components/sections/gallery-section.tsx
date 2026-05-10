'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

// 1. Sesuaikan tipe data dengan struktur tabel di Supabase
interface GalleryItem {
  id: string
  title: string
  category: string
  image_url: string
  description: string
}

export function GallerySection() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const itemsPerView = 4

  // 2. Mengambil data dari Supabase saat halaman dimuat
  useEffect(() => {
    const fetchGallery = async () => {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: true }) // Urutkan sesuai input kita tadi

      if (error) {
        console.error('Error fetching gallery:', error)
      } else if (data) {
        setGalleryItems(data)
      }
      setIsLoading(false)
    }

    fetchGallery()
  }, [])

  const totalPages = Math.ceil(galleryItems.length / itemsPerView)

  // 3. Logika Slider Otomatis
  useEffect(() => {
    if (!isAutoPlay || totalPages <= 1) return

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

  // Tampilan saat data masih loading
  if (isLoading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse">Menarik data galeri dari database...</p>
      </div>
    )
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
            Dokumentasi kegiatan, pameran, dan proses pembuatan Batik Kemang Bogor.
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {visibleItems.map((item) => (
              <div
                key={item.id}
                className="aspect-square relative rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 group bg-muted border border-border"
              >
                {/* Gambar diambil dari image_url Supabase */}
                <img 
                  src={item.image_url} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay Hitam Transparan */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                   <span className="text-[10px] font-bold text-primary-foreground/80 uppercase tracking-widest mb-1">
                      {item.category}
                   </span>
                   <p className="font-bold text-white text-base leading-tight mb-1">
                      {item.title}
                   </p>
                   {/* Deskripsi Muncul Saat di Hover */}
                   <p className="text-white/80 text-xs line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.description}
                   </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handlePrev} 
              className="rounded-full shadow-sm hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
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
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? 'bg-primary w-8' 
                      : 'bg-border w-2.5 hover:bg-primary/50'
                  }`}
                  aria-label={`Buka halaman ${idx + 1}`}
                />
              ))}
            </div>

            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleNext} 
              className="rounded-full shadow-sm hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}