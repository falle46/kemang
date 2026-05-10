'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Shield } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="mb-10 flex items-center border-b border-border pb-6">
          <Shield className="w-10 h-10 text-primary mr-4" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Kebijakan Privasi</h1>
            <p className="text-muted-foreground">Terakhir diperbarui: Mei 2026</p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none text-muted-foreground space-y-6 text-justify leading-relaxed">
          <p>
            Sistem Identifikasi Batik Kemang Bogor menghargai privasi Anda. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda saat menggunakan aplikasi web ini.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8 mb-3">1. Informasi yang Kami Kumpulkan</h3>
          <p>
            Kami mengumpulkan informasi berupa data kredensial akun (alamat email) saat Anda mendaftar, serta data gambar foto batik yang Anda unggah secara sukarela ke dalam sistem kami untuk keperluan identifikasi kecerdasan buatan.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8 mb-3">2. Penggunaan Informasi & Penyimpanan Gambar</h3>
          <p>
            Gambar yang Anda unggah digunakan murni untuk diekstraksi fiturnya oleh model ResNet-50. Untuk menjaga efisiensi ruang penyimpanan <em>server</em>, semua gambar yang masuk ke dalam Riwayat pengguna akan tunduk pada kebijakan retensi, di mana sistem dirancang untuk menghapus data gambar secara otomatis setelah jangka waktu 30 hari.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8 mb-3">3. Tujuan Akademis</h3>
          <p>
            Aplikasi ini dibangun sebagai bagian dari penelitian tugas akhir (skripsi) Program Studi Ilmu Komputer Universitas Pakuan. Kami tidak menjual, menyewakan, atau memperdagangkan data atau gambar pengguna kepada pihak ketiga untuk kepentingan komersial apa pun.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8 mb-3">4. Keamanan Data</h3>
          <p>
            Kami menggunakan layanan pihak ketiga yang terpercaya (Supabase) untuk melindungi proses autentikasi dan penyimpanan data menggunakan teknologi enkripsi terkini dan penerapan <em>Row Level Security</em> (RLS). Namun, tidak ada metode transmisi di internet yang 100% aman, sehingga kami tidak dapat menjamin keamanan absolut.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}