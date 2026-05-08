'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HAKIItem {
  id: string
  name: string
  region: string
  year_registered: number
}

export function HAKIGridSection() {
  const [hakiItems, setHakiItems] = useState<HAKIItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch from API when backend is ready
    // For now, using mock data
    setHakiItems([
      { id: '1', name: 'Batik Parang', region: 'Yogyakarta', year_registered: 2020 },
      { id: '2', name: 'Batik Kawung', region: 'Solo', year_registered: 2019 },
      { id: '3', name: 'Batik Semen', region: 'Jakarta', year_registered: 2021 },
      { id: '4', name: 'Batik Grompol', region: 'Surakarta', year_registered: 2020 },
      { id: '5', name: 'Batik Megamendung', region: 'Cirebon', year_registered: 2019 },
      { id: '6', name: 'Batik Nitik', region: 'Yogyakarta', year_registered: 2022 },
      { id: '7', name: 'Batik Lasem', region: 'Jawa Timur', year_registered: 2021 },
      { id: '8', name: 'Batik Truntum', region: 'Solo', year_registered: 2020 },
    ])
    setIsLoading(false)
  }, [])

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-2">
            Koleksi HAKI Batik Kemang
          </h2>
          <p className="text-muted-foreground">
            Jelajahi koleksi batik yang telah terdaftar dan dilindungi HAKI
          </p>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-muted rounded-lg h-64 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hakiItems.map((item) => (
              <Link key={item.id} href={`/haki/${item.id}`}>
                <div className="group cursor-pointer">
                  {/* Card Background */}
                  <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 h-64 flex flex-col">
                    {/* Image Placeholder */}
                    <div className="flex-1 bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary/20 mb-2">
                          {item.name.substring(0, 2)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Motif {item.name}
                        </p>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4 border-t border-border">
                      <h3 className="font-semibold text-foreground text-sm mb-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        {item.region}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {item.year_registered}
                        </span>
                        <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <Link href="/haki">
            <Button className="bg-primary hover:bg-primary/90 px-8">
              Lihat Semua Koleksi HAKI
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
