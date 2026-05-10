'use client'

import { useState, useEffect, use } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle2, AlertTriangle, Globe, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function ResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const searchParams = useSearchParams()
  
  // State untuk menampung data hasil
  const [data, setData] = useState({
    imageUrl: searchParams.get('img') || '',
    batikType: searchParams.get('type') || '',
    confidence: searchParams.get('conf') || '0',
    description: searchParams.get('desc') || '',
  })
  
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Jika data di URL kosong (artinya dibuka dari Riwayat), tarik dari Supabase
    if (!data.batikType && id) {
      const fetchHistoryDetail = async () => {
        setIsLoading(true)
        try {
          const { data: historyData, error } = await supabase
            .from('history')
            .select('*')
            .eq('id', id)
            .single()

          if (error) throw error
          if (historyData) {
            setData({
              imageUrl: historyData.image_url || '',
              batikType: historyData.batik_type,
              confidence: historyData.confidence.toString(),
              description: historyData.description || 'Deskripsi tidak tersedia untuk riwayat ini.',
            })
          }
        } catch (err) {
          console.error("Gagal memuat detail riwayat:", err)
        } finally {
          setIsLoading(false)
        }
      }
      fetchHistoryDetail()
    }
  }, [id, data.batikType])

  // Cek apakah hasilnya Batik Kemang asli
  const isKemang = data.batikType === "Batik Kemang"
  
  const indonesianBatikText = `Batik Indonesia adalah warisan kemanusiaan untuk budaya lisan dan nonbendawi yang telah diakui oleh UNESCO. Setiap motif batik di nusantara memiliki filosofi dan identitas unik yang mencerminkan kekayaan alam serta kebudayaan masyarakatnya.`

  const kemangBatikText = `Batik Kemang Bogor merupakan bentuk pelestarian budaya lokal yang mengintegrasikan motif flora khas Bogor seperti Pohon Kemang dan buah-buahan lokal ke dalam seni kain.`

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground font-medium">Memuat Hasil Analisis...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
        <Link href="/" className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Identifikasi</span>
        </Link>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* SISI KIRI: Foto */}
          <div className="space-y-4">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Gambar yang Diuji</p>
            <div className="aspect-square relative rounded-2xl overflow-hidden border-4 border-card shadow-2xl bg-muted">
              {data.imageUrl ? (
                <img 
                  src={data.imageUrl} 
                  alt="Batik Terdeteksi" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
                  <AlertTriangle className="w-10 h-10 mb-2 opacity-20" />
                  <p className="text-sm">Gambar tidak tersedia di riwayat ini</p>
                </div>
              )}
            </div>
          </div>

          {/* SISI KANAN: Hasil AI */}
          <div className="space-y-8">
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Analisis ResNet-50</p>
              
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {isKemang ? (
                  <div className="flex items-center text-green-700 bg-green-100 px-4 py-1.5 rounded-full text-xs font-bold border border-green-200">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    IDENTITAS LOKAL: KEMANG
                  </div>
                ) : (
                  <div className="flex items-center text-amber-700 bg-amber-100 px-4 py-1.5 rounded-full text-xs font-bold border border-amber-200">
                    <Globe className="w-4 h-4 mr-2" />
                    MOTIF BATIK UMUM
                  </div>
                )}
                <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold border border-primary/20">
                  Akurasi: {parseFloat(data.confidence).toFixed(2)}%
                </div>
              </div>

              <h1 className="text-4xl font-black text-foreground leading-tight tracking-tight uppercase">
                {data.batikType || "Tidak Diketahui"}
              </h1>
            </div>

            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm leading-relaxed">
              <h3 className="font-bold text-foreground mb-3 flex items-center">
                {isKemang ? "Detail Batik Kemang" : "Wawasan Batik Indonesia"}
              </h3>
              
              <div className="space-y-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground italic">
                   &quot;{data.description}&quot;
                </p>
                
                <p className="pt-4 border-t border-border/50 text-justify">
                  {isKemang ? kemangBatikText : indonesianBatikText}
                </p>
              </div>
            </div>

            <Button className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform" asChild>
              <Link href="/">Identifikasi Gambar Lain</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}