'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { LoginPromptModal } from '@/components/modals/login-prompt-modal'
import { supabase } from '@/lib/supabase'

export function HeroSection() {
  const router = useRouter()
  const { user } = useAuth()
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pendingFile, setPendingFile] = useState<File | null>(null) 

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const processImage = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Silakan pilih file gambar yang valid')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran file maksimal 5MB')
      return
    }
    setError(null)

    if (!user) {
      setPendingFile(file)
      setShowLoginPrompt(true)
      return
    }
    await executeIdentification(file)
  }

  const executeIdentification = async (fileToUpload: File) => {
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('image', fileToUpload)

      const apiUrl = 'http://localhost:5000'
      const response = await fetch(`${apiUrl}/api/identify`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Gagal mengidentifikasi batik. Pastikan server Flask menyala.')
      }

      const responseData = await response.json()
      
      let historyId = responseData.data.class_id; 
      let finalImageUrl = URL.createObjectURL(fileToUpload); // Fallback jika belum login

      if (user) {
        // 1. Upload Gambar ke Supabase Storage (Bucket: history_images)
        const cleanFileName = fileToUpload.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        
        // PERBAIKAN DI SINI: Tambahkan user.id dan garis miring (/) agar masuk ke folder
        const filePath = `${user.id}/${Date.now()}-${cleanFileName}`; 
        
        const { error: uploadError } = await supabase.storage
          .from('history_images')
          .upload(filePath, fileToUpload) // Gunakan filePath, bukan fileName

        if (uploadError) {
          console.error("Gagal upload gambar ke storage:", uploadError)
          throw new Error('Gagal mengunggah gambar ke server penyimpanan.')
        }

        // 2. Dapatkan URL Public dari gambar yang baru diupload
        const { data: { publicUrl } } = supabase.storage
          .from('history_images')
          .getPublicUrl(filePath) // Gunakan filePath di sini juga
          
        finalImageUrl = publicUrl;

        // 3. Simpan seluruh data ke Tabel History
        const { data: insertData, error: insertError } = await supabase
          .from('history')
          .insert([
            {
              user_id: user.id,
              batik_type: responseData.data.batik_type,
              confidence: responseData.data.confidence,
              description: responseData.data.description,
              image_url: finalImageUrl 
            }
          ])
          .select()
          .single()

        if (insertError) {
          console.error("Gagal menyimpan riwayat ke database:", insertError)
        } else if (insertData) {
          historyId = insertData.id; 
        }
      }

      // Kirim data via Query Parameters
      const params = new URLSearchParams({
        img: finalImageUrl,
        type: responseData.data.batik_type,
        conf: responseData.data.confidence.toString(),
        desc: responseData.data.description
      }).toString()

      // Pindah ke halaman hasil
      router.push(`/result/${historyId}?${params}`)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat memproses gambar')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) processImage(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processImage(file)
  }

  const handleContinueAsGuest = () => {
    setShowLoginPrompt(false)
    if (pendingFile) {
      executeIdentification(pendingFile)
      setPendingFile(null)
    }
  }

  return (
    <>
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-4">
              Identifikasi Batik Kemang
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              Gunakan AI untuk mengidentifikasi motif Batik Kemang Bogor dengan arsitektur ResNet-50
            </p>
          </div>

          <div className="mb-8">
            <label
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`block border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${
                isDragging ? 'border-primary bg-primary/5 scale-105' : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex flex-col items-center space-y-3">
                <Upload className="w-12 h-12 text-primary" />
                <p className="font-semibold text-foreground">Seret atau klik untuk pilih gambar</p>
                <p className="text-sm text-muted-foreground">Mendukung file .jpg, .png, .jpeg (Maks 5MB)</p>
              </div>
              <input type="file" accept="image/*" onChange={handleFileInput} disabled={isLoading} className="hidden" />
            </label>
          </div>

          {error && (
            <div className="flex items-center space-x-3 bg-destructive/10 text-destructive p-4 rounded-lg mb-6 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center space-y-3 bg-primary/5 border border-primary/20 p-6 rounded-lg">
              <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              <p className="text-sm font-semibold text-primary">Model ResNet-50 sedang menganalisis gambar...</p>
            </div>
          )}
        </div>
      </section>

      <LoginPromptModal
        isOpen={showLoginPrompt}
        onClose={() => { setShowLoginPrompt(false); setPendingFile(null); }}
        onContinueAsGuest={handleContinueAsGuest} 
      />
    </>
  )
}