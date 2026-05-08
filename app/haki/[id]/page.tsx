'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download, Share2, Award } from 'lucide-react'

interface HAKIDetail {
  id: string
  name: string
  region: string
  year_registered: number
  certificate_number: string
  artisan: string
  description: string
  historical_background: string
  cultural_significance: string
  techniques: string[]
}

export default function HAKIDetailPage({ params }: { params: { id: string } }) {
  const [haki, setHaki] = useState<HAKIDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHAKI = async () => {
      try {
        // TODO: Fetch from API when backend is ready
        // For now, using mock data
        setHaki({
          id: params.id,
          name: 'Batik Parang',
          region: 'Yogyakarta',
          year_registered: 2020,
          certificate_number: 'HAKI/2020/001',
          artisan: 'Pengrajin Batik Tradisional Yogyakarta',
          description:
            'Batik Parang adalah motif batik paling ikonik dan terkenal di Indonesia yang berasal dari tradisi Jawa.',
          historical_background:
            'Batik Parang telah digunakan sejak era Mataram kuno sebagai simbol kekuatan dan perlindungan. Motif ini terus diturunkan dari generasi ke generasi sebagai warisan budaya yang berharga.',
          cultural_significance:
            'Setiap garis dalam motif Parang memiliki makna filosofis mendalam yang mencerminkan nilai-nilai kebijaksanaan, keberanian, dan keseimbangan hidup dalam budaya Jawa.',
          techniques: [
            'Teknik Canting Tulis',
            'Pewarnaan Natural',
            'Proses Pembatik Tradisional',
            'Teknik Cap Batik',
          ],
        })
      } catch (err) {
        setError('Gagal memuat detail HAKI')
      } finally {
        setIsLoading(false)
      }
    }

    fetchHAKI()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="space-y-4">
            <div className="h-96 bg-muted rounded-lg animate-pulse" />
            <div className="h-20 bg-muted rounded-lg animate-pulse" />
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !haki) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-destructive mb-4">{error || 'Data tidak ditemukan'}</p>
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90">Kembali ke Beranda</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Back Button */}
        <Link href="/" className="flex items-center space-x-2 text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Award className="w-6 h-6 text-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                  Dilindungi HAKI
                </span>
              </div>
              <h1 className="text-5xl font-bold text-foreground mb-2">{haki.name}</h1>
              <p className="text-xl text-muted-foreground">{haki.region}</p>
            </div>
          </div>

          {/* Certificate Visual */}
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-12 text-center mb-8">
            <div className="bg-card border-2 border-primary rounded-lg p-8 inline-block">
              <div className="text-primary text-2xl font-bold mb-2">SERTIFIKAT HAKI</div>
              <div className="text-foreground font-semibold mb-4">{haki.name}</div>
              <div className="text-muted-foreground text-sm space-y-1">
                <p>No. Sertifikat: {haki.certificate_number}</p>
                <p>Tahun Terdaftar: {haki.year_registered}</p>
                <p>Asal: {haki.region}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap">
            <Button className="bg-primary hover:bg-primary/90 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Unduh Sertifikat</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Share2 className="w-4 h-4" />
              <span>Bagikan</span>
            </Button>
          </div>
        </div>

        {/* Grid Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-6">
            {/* Info Card */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  Nomor Sertifikat
                </p>
                <p className="font-semibold text-foreground text-sm">{haki.certificate_number}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  Tahun Terdaftar
                </p>
                <p className="font-semibold text-foreground text-lg">{haki.year_registered}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  Asal Daerah
                </p>
                <p className="font-semibold text-foreground">{haki.region}</p>
              </div>
            </div>

            {/* Techniques */}
            {haki.techniques.length > 0 && (
              <div className="bg-primary/5 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Teknik Pembuatan</h3>
                <ul className="space-y-2">
                  {haki.techniques.map((technique, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-foreground">{technique}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Deskripsi</h2>
              <p className="text-muted-foreground leading-relaxed">{haki.description}</p>
            </section>

            {/* Historical Background */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Sejarah</h2>
              <p className="text-muted-foreground leading-relaxed">{haki.historical_background}</p>
            </section>

            {/* Cultural Significance */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Makna Budaya</h2>
              <p className="text-muted-foreground leading-relaxed">{haki.cultural_significance}</p>
            </section>

            {/* Protection Notice */}
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-2">Perlindungan HAKI</h3>
              <p className="text-sm text-muted-foreground">
                Batik ini dilindungi oleh Hak Atas Kekayaan Intelektual (HAKI) Indonesia. Penggunaan,
                reproduksi, atau distribusi tanpa izin adalah pelanggaran hukum.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
