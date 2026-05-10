'use client'

// 1. Tambahkan impor 'use' dari react
import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download, Share2, Award, User, MapPin, Calendar, FileText } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface HAKIDetail {
  id: string
  name: string
  region: string
  year_registered: number
  certificate_number: string
  artisan: string
  description: string
  historical_background: string
  certificate_image_url: string
}

// 2. Ubah tipe params menjadi Promise
export default function HAKIDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // 3. Buka (unwrap) params menggunakan hook use() dari React
  const { id } = use(params)

  const [haki, setHaki] = useState<HAKIDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHAKI = async () => {
      try {
        setIsLoading(true)
        const { data, error } = await supabase
          .from('haki_batik')
          .select('*')
          .eq('id', id) // 4. Gunakan variabel id yang sudah dibongkar
          .single()

        if (error) throw error
        
        if (data) {
          setHaki(data)
        } else {
          setError('Data HAKI tidak ditemukan')
        }
      } catch (err) {
        console.error('Error fetching HAKI detail:', err)
        setError('Terjadi kesalahan saat memuat detail HAKI.')
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchHAKI()
    }
  }, [id]) // 5. Ubah dependency menjadi id

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-12 flex-grow w-full">
          <div className="space-y-4">
            <div className="h-64 md:h-96 bg-muted rounded-xl animate-pulse" />
            <div className="h-20 bg-muted rounded-xl animate-pulse" />
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !haki) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-12 flex-grow w-full flex items-center justify-center">
          <div className="text-center py-20 bg-card rounded-xl border border-border w-full shadow-sm">
            <p className="text-destructive font-semibold mb-6 text-lg">{error || 'Data tidak ditemukan'}</p>
            <Link href="/#haki">
              <Button className="bg-primary hover:bg-primary/90 rounded-full px-8">Kembali ke Beranda</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-12 flex-grow w-full">
        {/* Back Button */}
        <Link href="/#haki" className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 mb-8 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <Award className="w-6 h-6 text-primary" />
                <span className="text-sm font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
                  Dokumen HAKI Resmi
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 leading-tight">{haki.name}</h1>
              <div className="flex items-center text-lg text-muted-foreground font-medium">
                 <MapPin className="w-5 h-5 mr-2 text-primary" />
                 {haki.region}
              </div>
            </div>
          </div>

          {/* Certificate Visual */}
          <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 border border-primary/20 rounded-2xl p-8 md:p-12 text-center mb-8 shadow-sm flex justify-center">
            <div className="bg-card border-2 border-primary/40 rounded-xl p-8 inline-block shadow-md hover:shadow-lg transition-shadow max-w-sm w-full relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
              
              <FileText className="w-16 h-16 text-primary/80 mx-auto mb-4" />
              <div className="text-primary text-xl md:text-2xl font-black tracking-widest mb-2">SERTIFIKAT HAKI</div>
              <div className="text-foreground font-bold mb-6 text-base md:text-lg border-b border-border pb-4">{haki.name}</div>
              
              <div className="text-left bg-muted/50 p-4 rounded-lg space-y-3">
                <div>
                   <p className="text-xs text-muted-foreground uppercase font-semibold">Nomor Registrasi</p>
                   <p className="font-mono font-bold text-foreground break-all">{haki.certificate_number}</p>
                </div>
                <div>
                   <p className="text-xs text-muted-foreground uppercase font-semibold">Tahun Terdaftar</p>
                   <p className="font-semibold text-foreground">{haki.year_registered}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 flex-wrap justify-center md:justify-start">
            <a href={haki.certificate_image_url} target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary hover:bg-primary/90 flex items-center space-x-2 h-11 px-6 shadow-md hover:shadow-lg transition-all rounded-full">
                <Download className="w-5 h-5" />
                <span className="font-semibold">Unduh Dokumen Asli (PDF)</span>
              </Button>
            </a>
            
            <Button 
              variant="outline" 
              className="flex items-center space-x-2 h-11 px-6 rounded-full border-2"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `HAKI ${haki.name}`,
                    text: `Lihat detail sertifikat HAKI Motif ${haki.name}`,
                    url: window.location.href,
                  }).catch(console.error);
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Tautan disalin ke clipboard!');
                }
              }}
            >
              <Share2 className="w-5 h-5" />
              <span className="font-semibold">Bagikan URL</span>
            </Button>
          </div>
        </div>

        {/* Grid Content */}
        <div className="grid md:grid-cols-3 gap-8 pb-12">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-6">
            {/* Info Card */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-5 shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                    Nomor Sertifikat
                  </p>
                  <p className="font-bold text-foreground font-mono break-all">{haki.certificate_number}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                    Tahun Terdaftar
                  </p>
                  <p className="font-bold text-foreground">{haki.year_registered}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                    Pemegang Hak
                  </p>
                  <p className="font-bold text-foreground text-sm">{haki.artisan}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Description */}
            <section className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-4 border-b border-border pb-2">Deskripsi</h2>
              <p className="text-muted-foreground leading-relaxed">{haki.description}</p>
            </section>

            {/* Historical Background */}
            <section className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-4 border-b border-border pb-2">Latar Belakang / Sejarah</h2>
              <p className="text-muted-foreground leading-relaxed">{haki.historical_background}</p>
            </section>

            {/* Protection Notice */}
            <div className="bg-primary/10 border-l-4 border-primary rounded-r-lg p-6">
              <h3 className="font-bold text-foreground mb-2 flex items-center">
                <Award className="w-5 h-5 mr-2 text-primary" />
                Perlindungan Kekayaan Intelektual
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Motif batik ini telah diakui dan dilindungi secara sah oleh hukum Hak Atas Kekayaan Intelektual (HAKI) Republik Indonesia. Penggunaan, reproduksi komersial, atau modifikasi tanpa izin tertulis dari pemegang hak cipta merupakan pelanggaran hukum.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}