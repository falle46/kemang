'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Mail, MapPin, Github, Send } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Hubungi Kami</h1>
          <p className="text-muted-foreground text-lg">
            Memiliki pertanyaan terkait penelitian ini? Jangan ragu untuk menghubungi pengembang.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Info Kontak Akademis */}
          <div className="bg-card border border-border p-8 rounded-3xl shadow-sm space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Informasi Kontak</h3>
              
              <div className="flex items-start mb-6">
                <div className="bg-primary/10 p-3 rounded-full mr-4 flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Lokasi Penelitian</h4>
                  <p className="text-muted-foreground mt-1">
                    Program Studi Ilmu Komputer<br />
                    Fakultas Matematika dan Ilmu Pengetahuan Alam (FMIPA)<br />
                    Universitas Pakuan, Bogor
                  </p>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <div className="bg-primary/10 p-3 rounded-full mr-4 flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Email</h4>
                  <a href="mailto:falleryan46@gmail.com" className="text-muted-foreground hover:text-primary transition-colors mt-1 block">
                    falleryan46@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-primary/10 p-3 rounded-full mr-4 flex-shrink-0">
                  <Github className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">GitHub Repository</h4>
                  <a href="https://github.com/falle46" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors mt-1 block">
                    github.com/falle46
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Pesan Singkat UI */}
          <div className="bg-primary/5 border border-primary/20 p-8 rounded-3xl shadow-sm flex flex-col justify-center">
            <Send className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-xl font-bold text-foreground mb-3">Kritik & Saran</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Sistem identifikasi Batik Kemang ini akan terus dievaluasi. Jika Anda menemukan *bug* (*Bug Hunter*) atau memiliki saran pengembangan model Deep Learning ini ke depannya, umpan balik Anda akan sangat berarti bagi penyempurnaan tugas akhir ini.
            </p>
            <a 
              href="mailto:falleryan46@gmail.com?subject=Feedback%20Sistem%20Batik%20Kemang" 
              className="inline-flex items-center justify-center bg-primary text-primary-foreground font-semibold h-12 px-6 rounded-lg hover:bg-primary/90 transition-colors w-max"
            >
              Kirim Email
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}