'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle2, AlertTriangle, Globe } from 'lucide-react'

export default function ResultPage() {
  const searchParams = useSearchParams()
  
  const imageUrl = searchParams.get('img')
  const batikType = searchParams.get('type') || 'Memproses...'
  const confidence = searchParams.get('conf') || '0'
  const description = searchParams.get('desc') || ''

  // Cek apakah hasilnya Batik Kemang asli
  const isKemang = batikType === "Batik Kemang"
  
  // Teks deskripsi umum Batik Indonesia (Yappingan untuk motif luar Kemang)
  const indonesianBatikText = `Batik Indonesia adalah warisan kemanusiaan untuk budaya lisan dan nonbendawi yang telah diakui oleh UNESCO. Setiap motif batik di nusantara, mulai dari Jawa hingga luar Jawa, memiliki filosofi dan identitas unik yang mencerminkan kekayaan alam serta kebudayaan masyarakatnya. Keanekaragaman motif ini membuktikan bahwa batik bukan sekadar kain hias, melainkan medium komunikasi visual yang membawa pesan harapan, strata sosial, dan nilai-nilai luhur bangsa Indonesia yang telah diwariskan turun-temurun selama berabad-abad.`

  // Teks deskripsi khusus Batik Kemang
  const kemangBatikText = `Batik Kemang Bogor merupakan bentuk pelestarian budaya lokal yang mengintegrasikan motif flora khas Bogor seperti Pohon Kemang dan buah-buahan lokal ke dalam seni kain. Pengembangan motif ini bertujuan untuk memperkuat identitas wilayah Kemang serta memberdayakan komunitas pengrajin batik di daerah Bogor guna menjaga ekosistem kreatif lokal tetap tumbuh.`

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
        {/* Tombol Kembali */}
        <Link href="/" className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Identifikasi</span>
        </Link>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* SISI KIRI: Foto yang Diinput User */}
          <div className="space-y-4">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Gambar yang Diuji</p>
            <div className="aspect-square relative rounded-2xl overflow-hidden border-4 border-card shadow-2xl bg-muted">
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt="User Uploaded Batik" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Gambar tidak ditemukan
                </div>
              )}
            </div>
          </div>

          {/* SISI KANAN: Hasil AI & Deskripsi */}
          <div className="space-y-8">
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Analisis ResNet-50</p>
              
              {/* Badge Status */}
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
                  Akurasi: {parseFloat(confidence).toFixed(2)}%
                </div>
              </div>

              <h1 className="text-4xl font-black text-foreground leading-tight tracking-tight uppercase">
                {batikType}
              </h1>
            </div>

            {/* Kontainer Deskripsi */}
            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm leading-relaxed">
              <h3 className="font-bold text-foreground mb-3 flex items-center">
                {isKemang ? "Detail Batik Kemang" : "Wawasan Batik Indonesia"}
              </h3>
              
              <div className="space-y-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground italic">
                   &quot;{description}&quot;
                </p>
                
                <p className="pt-4 border-t border-border/50">
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