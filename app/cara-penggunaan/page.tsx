'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Upload, ScanSearch, FileText, BrainCircuit, Network, ShieldCheck } from 'lucide-react'

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Judul Halaman */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Cara Penggunaan & Cara Kerja AI</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Panduan menggunakan sistem identifikasi dan penjelasan di balik teknologi kecerdasan buatan yang memproses gambar Batik Kemang Anda.
          </p>
        </div>

        {/* Bagian 1: Cara Penggunaan */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 border-b border-border pb-3 flex items-center">
            <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
            Langkah Penggunaan
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute -right-4 -top-4 bg-primary/5 w-24 h-24 rounded-full blur-2xl z-0" />
              <Upload className="w-10 h-10 text-primary mb-4 relative z-10" />
              <h3 className="text-lg font-bold text-foreground mb-2 relative z-10">1. Unggah Gambar</h3>
              <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                Pilih foto batik melalui tombol unggah atau seret file ke area yang disediakan di halaman beranda. Pastikan gambar memiliki pencahayaan yang baik dan motif terlihat jelas dengan format JPG atau PNG.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute -right-4 -top-4 bg-primary/5 w-24 h-24 rounded-full blur-2xl z-0" />
              <ScanSearch className="w-10 h-10 text-primary mb-4 relative z-10" />
              <h3 className="text-lg font-bold text-foreground mb-2 relative z-10">2. Proses AI</h3>
              <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                Sistem akan memproses gambar Anda secara otomatis menggunakan model Deep Learning. Tunggu beberapa detik sementara AI mengekstraksi fitur motif untuk dicocokkan dengan basis data.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute -right-4 -top-4 bg-primary/5 w-24 h-24 rounded-full blur-2xl z-0" />
              <FileText className="w-10 h-10 text-primary mb-4 relative z-10" />
              <h3 className="text-lg font-bold text-foreground mb-2 relative z-10">3. Lihat Hasil</h3>
              <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                Layar akan menampilkan persentase akurasi, jenis batik, dan deskripsi detail. Jika Anda masuk ke dalam akun, gambar dan hasil analisis ini akan otomatis tersimpan di menu Riwayat.
              </p>
            </div>
          </div>
        </div>

        {/* Bagian 2: Cara Kerja AI */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-8 border-b border-border pb-3 flex items-center">
            <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
            Bagaimana AI Bekerja?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 shadow-sm">
              <BrainCircuit className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-xl font-bold text-foreground mb-3">Arsitektur ResNet-50</h3>
              <p className="text-muted-foreground leading-relaxed text-justify mb-4">
                Sistem ini ditenagai oleh <strong>ResNet-50 (Residual Network)</strong>, sebuah arsitektur <em>Deep Learning</em> canggih berupa <em>Convolutional Neural Network (CNN)</em> yang memiliki ketebalan 50 lapisan. ResNet-50 menggunakan konsep <em>skip connections</em> (jalan pintas) untuk mengatasi masalah <em>vanishing gradient</em> pada jaringan yang dalam.
              </p>
              <p className="text-muted-foreground leading-relaxed text-justify">
                Hal ini memungkinkan AI untuk belajar mengenali pola terkecil dari sebuah gambar, mulai dari garis tepi (<em>edges</em>), tekstur, hingga pola geometris kompleks yang menyusun sebuah karya batik.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start bg-card border border-border p-5 rounded-2xl shadow-sm">
                <ShieldCheck className="w-8 h-8 text-primary mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-foreground mb-1">Dataset Primer Terverifikasi</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                    Model ini tidak sekadar menebak, melainkan telah dilatih menggunakan ratusan dataset citra primer berkualitas tinggi yang didokumentasikan dan dikumpulkan langsung dari lokasi produksi para pengrajin di Desa Parakanjaya, Kemang.
                  </p>
                </div>
              </div>

              <div className="flex items-start bg-card border border-border p-5 rounded-2xl shadow-sm">
                <Network className="w-8 h-8 text-primary mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-foreground mb-1">Klasifikasi Motif</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                    Alih-alih memberikan jawaban biner ("Ya" atau "Tidak dikenali"), AI dilatih untuk mengklasifikasikan gambar secara spesifik. Jika gambar yang diunggah tidak memiliki ciri Batik Kemang, model akan mendeteksinya sebagai motif luar (seperti Buketan, Dayak, dll.) beserta skor kepercayaannya.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}