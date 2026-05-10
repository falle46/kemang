'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { FileText } from 'lucide-react'

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="mb-10 flex items-center border-b border-border pb-6">
          <FileText className="w-10 h-10 text-primary mr-4" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Syarat Penggunaan</h1>
            <p className="text-muted-foreground">Berlaku efektif sejak platform ini diluncurkan</p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none text-muted-foreground space-y-6 text-justify leading-relaxed">
          <p>
            Dengan mengakses dan menggunakan sistem Identifikasi Batik Kemang, Anda menyetujui untuk terikat oleh Syarat dan Ketentuan berikut. Jika Anda tidak setuju, mohon untuk tidak menggunakan layanan ini.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8 mb-3">1. Sifat Layanan (As-Is)</h3>
          <p>
            Aplikasi identifikasi ini disediakan "sebagaimana adanya" (<em>as-is</em>) dan "sebagaimana tersedia" untuk tujuan edukasi dan penelitian akademis. Meskipun model kecerdasan buatan kami dilatih secara maksimal, kami tidak menjamin keakuratan 100% dari setiap identifikasi motif batik.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8 mb-3">2. Hak Kekayaan Intelektual</h3>
          <p>
            Semua motif Batik Kemang yang direferensikan dalam sistem ini merupakan hak kekayaan intelektual (HKI) dari penciptanya (pengrajin Batik Kemang Bogor). Anda tidak diizinkan untuk menyalin, mereproduksi, atau mengklaim kepemilikan atas motif-motif tersebut berdasarkan hasil keluaran aplikasi ini.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8 mb-3">3. Tanggung Jawab Pengguna</h3>
          <p>
            Pengguna setuju untuk tidak menggunakan sistem ini untuk tujuan yang melanggar hukum, mengirimkan <em>malware</em>, atau melakukan percobaan rekayasa balik (<em>reverse engineering</em>) terhadap arsitektur server dan model <em>Deep Learning</em> yang digunakan.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8 mb-3">4. Batasan Tanggung Jawab</h3>
          <p>
            Pengembang sistem tidak bertanggung jawab atas segala kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan menggunakan layanan identifikasi ini.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}