'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { LoginPromptModal } from '@/components/modals/login-prompt-modal'

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
      
      // Buat URL sementara untuk file gambar agar bisa tampil di halaman sebelah
      const tempImageUrl = URL.createObjectURL(fileToUpload)

      // Kirim data via Query Parameters
      const params = new URLSearchParams({
        img: tempImageUrl,
        type: responseData.data.batik_type,
        conf: responseData.data.confidence.toString(),
        desc: responseData.data.description
      }).toString()

      router.push(`/result/${responseData.data.class_id}?${params}`)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
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
              Gunakan AI untuk mengidentifikasi motif batik tradisional Indonesia
            </p>
          </div>

          <div className="mb-8">
            <label
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`block border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${
                isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex flex-col items-center space-y-3">
                <Upload className="w-12 h-12 text-primary" />
                <p className="font-semibold text-foreground">Seret atau klik untuk pilih gambar</p>
              </div>
              <input type="file" accept="image/*" onChange={handleFileInput} disabled={isLoading} className="hidden" />
            </label>
          </div>

          {error && (
            <div className="flex items-center space-x-3 bg-destructive/10 text-destructive p-4 rounded-lg mb-6 text-sm">
              <AlertCircle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          )}

          {isLoading && (
            <div className="flex items-center justify-center space-x-3 bg-primary/10 p-4 rounded-lg">
              <div className="w-4 h-4 rounded-full bg-primary animate-bounce" />
              <p className="text-sm font-medium text-primary">Model ResNet-50 sedang bekerja...</p>
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