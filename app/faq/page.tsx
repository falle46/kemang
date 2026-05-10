'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { HelpCircle, ChevronDown } from 'lucide-react'

export default function FAQPage() {
  const faqs = [
    {
      q: "Apa itu sistem Identifikasi Batik Kemang?",
      a: "Ini adalah aplikasi berbasis web yang menggunakan kecerdasan buatan (Deep Learning) dengan arsitektur ResNet-50 untuk mengidentifikasi dan mengklasifikasikan motif Batik Kemang Bogor dari foto yang diunggah pengguna."
    },
    {
      q: "Seberapa akurat hasil deteksi AI ini?",
      a: "Sistem ini telah dilatih dengan dataset primer spesifik dari pengrajin Batik Kemang. Walaupun dirancang untuk memberikan akurasi tinggi, hasil deteksi tetap bergantung pada kualitas pencahayaan, ketajaman, dan kejelasan motif pada gambar yang Anda unggah."
    },
    {
      q: "Apakah foto yang saya unggah akan disimpan?",
      a: "Ya, jika Anda masuk (login) ke dalam akun, gambar akan disimpan ke dalam penyimpanan server kami selama maksimal 30 hari untuk keperluan riwayat deteksi Anda. Jika Anda menggunakan mode tamu (guest), gambar hanya diproses secara sementara dan tidak disimpan secara permanen."
    },
    {
      q: "Apakah aplikasi ini berbayar?",
      a: "Tidak. Aplikasi ini dikembangkan murni untuk tujuan akademis (penelitian skripsi) dan pelestarian budaya, sehingga dapat diakses sepenuhnya secara gratis."
    },
    {
      q: "Bisakah sistem ini mendeteksi batik dari daerah lain?",
      a: "Fokus utama dari model AI kami adalah mengenali Batik Kemang Bogor. Jika Anda mengunggah motif batik dari luar wilayah tersebut, sistem akan berusaha mengklasifikasikannya sebagai 'Motif Batik Umum' atau varian lain yang memiliki kemiripan fitur."
    }
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="text-center mb-12">
          <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-4">FAQ</h1>
          <p className="text-muted-foreground text-lg">Pertanyaan yang sering diajukan seputar sistem AI Batik Kemang.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-card border border-border p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-2 flex items-start">
                <span className="text-primary mr-2">Q:</span> {faq.q}
              </h3>
              <p className="text-muted-foreground leading-relaxed pl-6">
                <span className="font-semibold text-foreground/70 mr-1">A:</span> {faq.a}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}