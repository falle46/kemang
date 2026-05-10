'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { ChevronRight, FileText, MapPin, Award } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface HAKIItem {
  id: string
  name: string
  region: string
  year_registered: number
  certificate_number: string
}

export default function HAKICollectionPage() {
  const [hakiItems, setHakiItems] = useState<HAKIItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchHaki = async () => {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('haki_batik')
        .select('*')
        .order('year_registered', { ascending: false }) // Urutkan dari tahun terbaru

      if (error) {
        console.error('Error fetching HAKI data:', error)
      } else if (data) {
        setHakiItems(data)
      }
      setIsLoading(false)
    }

    fetchHaki()
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-card border-b border-border py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <Award className="w-10 h-10 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">
                Koleksi HAKI Batik Kemang
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-3xl">
              Jelajahi seluruh daftar koleksi motif Batik Kemang yang telah terdaftar dan dilindungi secara sah oleh Hak Atas Kekayaan Intelektual (HAKI) Republik Indonesia.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-6xl mx-auto">
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-muted rounded-xl h-72 animate-pulse border border-border" />
                ))}
              </div>
            ) : hakiItems.length === 0 ? (
              <div className="text-center py-20 bg-card rounded-xl border border-dashed shadow-sm">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-lg">Belum ada data sertifikat HAKI di database.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {hakiItems.map((item) => (
                  <Link key={item.id} href={`/haki/${item.id}`}>
                    <div className="group cursor-pointer h-full">
                      {/* Card Background */}
                      <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                        
                        {/* Visual Placeholder (Sertifikat Icon) */}
                        <div className="flex-1 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all flex flex-col items-center justify-center p-6 text-center min-h-[160px]">
                          <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                            <FileText className="w-8 h-8 text-primary/70" />
                          </div>
                          <p className="text-xs font-semibold text-primary/70 uppercase tracking-widest">
                            Sertifikat HAKI
                          </p>
                          <p className="text-[10px] text-muted-foreground mt-1 font-mono break-all px-2">
                            NO: {item.certificate_number}
                          </p>
                        </div>

                        {/* Info Text */}
                        <div className="p-5 border-t border-border bg-background flex flex-col justify-between flex-grow">
                          <div>
                            <h3 className="font-bold text-foreground text-base mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                              {item.name}
                            </h3>
                            <div className="flex items-center text-xs text-muted-foreground mb-1">
                               <MapPin className="w-3 h-3 mr-1 flex-shrink-0 text-primary/70" />
                               <span className="truncate">{item.region}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                            <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded-md">
                              Tahun {item.year_registered}
                            </span>
                            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            
            {/* Results count */}
            {!isLoading && hakiItems.length > 0 && (
              <p className="text-center text-sm font-medium text-muted-foreground mt-10">
                Menampilkan {hakiItems.length} koleksi HAKI Batik Kemang
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}