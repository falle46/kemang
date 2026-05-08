'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { ChevronRight, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HAKIItem {
  id: string
  name: string
  region: string
  year_registered: number
}

export default function HAKICollectionPage() {
  const [hakiItems, setHakiItems] = useState<HAKIItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRegion, setFilterRegion] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const allRegions = ['Yogyakarta', 'Solo', 'Jakarta', 'Surakarta', 'Cirebon', 'Jawa Timur']

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
      { id: '9', name: 'Batik Tambal', region: 'Yogyakarta', year_registered: 2022 },
      { id: '10', name: 'Batik Barong', region: 'Jakarta', year_registered: 2023 },
    ])
    setIsLoading(false)
  }, [])

  const filteredItems = hakiItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRegion = !filterRegion || item.region === filterRegion
    return matchesSearch && matchesRegion
  })

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-card border-b border-border py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Koleksi HAKI Batik Kemang
            </h1>
            <p className="text-muted-foreground mb-8">
              Jelajahi semua batik yang telah terdaftar dan dilindungi oleh Hak Atas Kekayaan
              Intelektual Indonesia.
            </p>

            {/* Search and Filter */}
            <div className="space-y-4 md:space-y-0 md:flex gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Cari nama batik..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Filter by Region */}
              <select
                value={filterRegion}
                onChange={(e) => setFilterRegion(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
              >
                <option value="">Semua Daerah</option>
                {allRegions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-6xl mx-auto">
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-muted rounded-lg h-72 animate-pulse" />
                ))}
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-6">
                  Tidak ada batik yang cocok dengan kriteria pencarian.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('')
                    setFilterRegion('')
                  }}
                >
                  Reset Filter
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <Link key={item.id} href={`/haki/${item.id}`}>
                    <div className="group cursor-pointer h-full">
                      <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all h-full flex flex-col">
                        {/* Image Placeholder */}
                        <div className="flex-1 bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-5xl font-bold text-primary/20 mb-2">
                              {item.name.substring(0, 2)}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Motif {item.name}
                            </p>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="p-6 border-t border-border">
                          <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{item.region}</p>

                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              Terdaftar {item.year_registered}
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

            {/* Results count */}
            {!isLoading && filteredItems.length > 0 && (
              <p className="text-center text-sm text-muted-foreground mt-8">
                Menampilkan {filteredItems.length} dari {hakiItems.length} koleksi HAKI
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
