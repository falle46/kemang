'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Award, FileText, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

interface HAKIItem {
  id: string
  name: string
  region: string
  year_registered: number
  certificate_number: string
  artisan: string
}

export function HAKIGridSection() {
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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-4xl font-bold text-foreground mb-3 flex items-center justify-center md:justify-start gap-3">
            <Award className="w-10 h-10 text-primary" />
            Koleksi HAKI Batik Kemang
          </h2>
          <p className="text-muted-foreground text-lg">
            Dokumen resmi Hak Kekayaan Intelektual yang melindungi keaslian motif pengrajin lokal.
          </p>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-muted rounded-xl h-72 animate-pulse border border-border" />
            ))}
          </div>
        ) : hakiItems.length === 0 ? (
           <div className="text-center py-20 bg-card rounded-xl border border-dashed">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Belum ada data HAKI di database.</p>
           </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hakiItems.map((item) => (
              <Link key={item.id} href={`/haki/${item.id}`}>
                <div className="group cursor-pointer h-full">
                  {/* Card Background */}
                  <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                    
                    {/* Visual Placeholder (Sertifikat Icon) */}
                    <div className="flex-1 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                        <FileText className="w-8 h-8 text-primary/70" />
                      </div>
                      <p className="text-xs font-semibold text-primary/70 uppercase tracking-widest">
                        Sertifikat HAKI
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-1 font-mono">
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
                           <MapPin className="w-3 h-3 mr-1" />
                           {item.region}
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

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <Link href="/haki">
            <Button className="bg-primary hover:bg-primary/90 px-8 h-12 text-md font-semibold shadow-md hover:shadow-lg transition-all rounded-full">
              Lihat Semua Detail HAKI
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}