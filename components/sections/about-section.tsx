'use client'

import Image from 'next/image'

export function AboutSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card border-y border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Batik Kemang</span>
              </div>
            </div>
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Proses Pembuatan</span>
              </div>
            </div>
            <div className="aspect-square md:col-span-2 bg-muted rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Galeri Batik</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Tentang Batik Kemang
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Batik Kemang merupakan warisan budaya Indonesia yang kaya akan makna dan filosofi. 
                Setiap motif yang dibuat mencerminkan nilai-nilai tradisional, alam, dan budaya lokal 
                yang telah diwariskan turun-temurun dari generasi ke generasi.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Proses pembuatan batik Kemang dilakukan dengan teknik tradisional yang telah terbukti 
                selama berabad-abad. Pengrajin dengan penuh dedikasi menciptakan setiap pattern dengan 
                ketelitian tinggi, menggunakan lilin (wax) dan pewarna alami untuk menghasilkan karya 
                seni yang indah dan tahan lama. Platform ini hadir untuk membantu Anda mengenali dan 
                memahami keindahan batik Indonesia lebih dalam.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-xs text-muted-foreground mt-1">Jenis Motif</div>
              </div>
              <div className="bg-secondary/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-secondary">95%</div>
                <div className="text-xs text-muted-foreground mt-1">Akurasi AI</div>
              </div>
              <div className="bg-accent/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-accent">1000+</div>
                <div className="text-xs text-muted-foreground mt-1">Database Batik</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
