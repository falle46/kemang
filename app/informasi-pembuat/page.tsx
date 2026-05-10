'use client'

import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Github, Linkedin, Mail, Instagram, GraduationCap, BookOpen, HeartHandshake } from 'lucide-react'

export default function DeveloperPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Header Title */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Informasi Pembuat</h1>
          <p className="text-muted-foreground text-lg">
            Pengembang sistem identifikasi kecerdasan buatan untuk pelestarian Batik Kemang Bogor.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-sm mb-12 flex flex-col md:flex-row gap-10 items-center md:items-start hover:shadow-md transition-shadow">
          {/* Foto Profil */}
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary/20 flex-shrink-0 relative bg-muted shadow-inner">
            <img 
              src="/images/falleryan.jpg" 
              alt="Muhammad Falleryan" 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Gambar darurat kalau nama file/foldernya ada yang typo
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=Muhammad+Falleryan&background=random&size=250`
              }}
            />
          </div>

          {/* Info Pembuat */}
          <div className="flex-col flex justify-center text-center md:text-left pt-2">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Muhammad Falleryan</h2>
            <div className="flex items-center justify-center md:justify-start text-primary mb-2 gap-2 bg-primary/10 w-max mx-auto md:mx-0 px-4 py-1.5 rounded-full">
              <GraduationCap className="w-5 h-5" />
              <span className="font-bold tracking-wide">NPM. 065122185</span>
            </div>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              Program Studi Ilmu Komputer<br />
              Fakultas Matematika dan Ilmu Pengetahuan Alam (FMIPA)<br />
              Universitas Pakuan
            </p>

            {/* Social Links */}
            <div className="flex gap-4 justify-center md:justify-start">
              <a href="mailto:falleryan46@gmail.com" className="bg-muted p-3.5 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all hover:scale-110" aria-label="Email">
                <Mail className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/in/falleryan46" target="_blank" rel="noopener noreferrer" className="bg-muted p-3.5 rounded-full text-muted-foreground hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all hover:scale-110" aria-label="LinkedIn">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://github.com/falle46" target="_blank" rel="noopener noreferrer" className="bg-muted p-3.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-all hover:scale-110" aria-label="GitHub">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://instagram.com/fllryan_" target="_blank" rel="noopener noreferrer" className="bg-muted p-3.5 rounded-full text-muted-foreground hover:text-[#E4405F] hover:bg-[#E4405F]/10 transition-all hover:scale-110" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Dosen Pembimbing */}
          <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
            <div className="flex items-center space-x-3 mb-6 border-b border-border pb-4">
              <BookOpen className="w-7 h-7 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">Dosen Pembimbing</h3>
            </div>
            <div className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-xl">
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Pembimbing Utama</p>
                <p className="font-bold text-foreground text-lg">Arie Qur'ania, M.Kom.</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-xl">
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Pembimbing Pendamping</p>
                <p className="font-bold text-foreground text-lg">Dian Kartika Utami, S.Kom., M.Kom.</p>
              </div>
            </div>
          </div>

          {/* Tentang Proyek Skripsi */}
          <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 shadow-sm">
             <div className="flex items-center space-x-3 mb-6 border-b border-primary/20 pb-4">
              <GraduationCap className="w-7 h-7 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">Tentang Penelitian</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-justify text-lg">
              Sistem ini dibangun sebagai bagian dari tugas akhir (skripsi) untuk mengimplementasikan algoritma <strong>Deep Learning</strong> menggunakan arsitektur <strong>ResNet-50</strong>. Tujuan utama penelitian ini adalah mendigitalisasi, melestarikan, dan mengenalkan motif Batik Kemang Bogor melalui teknologi identifikasi gambar yang akurat, modern, dan mudah diakses.
            </p>
          </div>
        </div>

        {/* Ucapan Terima Kasih (Acknowledgments) */}
        <div className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-sm mb-12">
           <div className="flex items-center space-x-3 mb-8 border-b border-border pb-4">
            <HeartHandshake className="w-7 h-7 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">Ucapan Terima Kasih & Penghargaan</h3>
          </div>
          
          <div className="space-y-8">
             {/* Penasihat */}
             <div>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 bg-muted inline-block px-3 py-1 rounded-md">Penasihat & Narasumber Utama</p>
                <ul className="space-y-4">
                   <li className="flex items-start bg-muted/30 p-4 rounded-xl">
                     <span className="text-primary mr-3 text-xl leading-none">•</span>
                     <span className="text-foreground leading-relaxed">
                       <strong>Dr. Eneng Tita Tosida, S.Tp., M.Si.</strong> <br/>
                       <span className="text-muted-foreground text-sm">Atas bimbingan program kegiatan Edu-Wisata Desa Parakanjaya Kemang, khususnya untuk pengembangan kelompok pengrajin batik.</span>
                     </span>
                   </li>
                   <li className="flex items-start bg-muted/30 p-4 rounded-xl">
                     <span className="text-primary mr-3 text-xl leading-none">•</span>
                     <span className="text-foreground leading-relaxed">
                       <strong>Ibu Hj. Ely Yuliana, S.Pd., M.M.</strong> <br/>
                       <span className="text-muted-foreground text-sm">Selaku Ketua Produksi Batik Kemang yang telah memberikan izin, waktu, serta informasi berharga mengenai sejarah dan detail motif batik lokal.</span>
                     </span>
                   </li>
                </ul>
             </div>

             {/* Tim Lapangan */}
             <div>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 bg-muted inline-block px-3 py-1 rounded-md">Tim Riset Lapangan</p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Penghargaan dan apresiasi yang sangat besar kepada rekan-rekan yang telah banyak membantu dalam proses pengambilan data primer, wawancara narasumber, dan pengumpulan dataset gambar di lokasi pengerjaan:
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                   {['Rafii Putra Razzaq', 'Bagus Trilelono', 'Axel Juanito P.S', 'Cedric Mitchell Yehaziel', 'Dimas Nurcahya'].map((name, idx) => (
                      <span key={idx} className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold border border-primary/20">
                         {name}
                      </span>
                   ))}
                </div>
             </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}