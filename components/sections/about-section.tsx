'use client'

export function AboutSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Kolom Kiri: Grid Foto */}
          <div className="grid grid-cols-2 gap-4">
            {/* Kiri Atas: Proses Pembuatan */}
            <div className="rounded-2xl overflow-hidden aspect-square shadow-sm bg-muted border border-border">
              <img
                src="https://awarbffbayrijzorskgy.supabase.co/storage/v1/object/public/gallery/Proses%20Pewarnaan%202.jpeg"
                alt="Proses Pembuatan Batik Kemang"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
              />
            </div>
            
            {/* Kanan Atas: Pameran Batik */}
            <div className="rounded-2xl overflow-hidden aspect-square shadow-sm bg-muted border border-border">
              <img
                src="https://awarbffbayrijzorskgy.supabase.co/storage/v1/object/public/gallery/Pameran%20Batik%20Kemang.jpeg"
                alt="Pameran Batik Kemang di Kabogor Fest"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
              />
            </div>
            
            {/* Bawah (Lebar): Foto Bersama */}
            <div className="col-span-2 rounded-2xl overflow-hidden aspect-[16/10] shadow-md bg-muted border border-border">
              <img
                src="https://awarbffbayrijzorskgy.supabase.co/storage/v1/object/public/gallery/Foto%20Bersama%20Batik%20Kemang.jpeg"
                alt="Foto Bersama Pengrajin dan Dosen"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
              />
            </div>
          </div>

          {/* Kolom Kanan: Teks Deskripsi */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-foreground">
              Tentang Batik Kemang
            </h2>
            {/* Menambahkan class text-justify untuk rata kiri-kanan */}
            <div className="space-y-5 text-muted-foreground leading-relaxed text-lg text-justify">
              <p>
                Batik Kemang merupakan warisan budaya lokal Kabupaten Bogor yang kaya akan makna dan filosofi. Setiap motif yang diciptakan mencerminkan nilai-nilai tradisional, kekayaan alam, dan kearifan lokal yang telah diwariskan dari generasi ke generasi.
              </p>
              <p>
                Proses pembuatan Batik Kemang dilakukan dengan teknik tradisional yang penuh ketelitian. Para pengrajin dengan dedikasi tinggi menciptakan setiap pola menggunakan lilin malam dan pewarna untuk menghasilkan karya seni kain yang indah dan tahan lama. 
              </p>
              <p>
                Platform AI ini hadir sebagai bentuk digitalisasi dan pelestarian budaya, membantu masyarakat luas mengenali, mengidentifikasi, dan memahami keindahan serta keaslian motif Batik Kemang Bogor secara lebih mendalam.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}