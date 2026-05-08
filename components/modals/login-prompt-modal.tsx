'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

// 1. TAMBAHAN: Tambahkan onContinueAsGuest di interface
interface LoginPromptModalProps {
  isOpen: boolean
  onClose: () => void
  onContinueAsGuest?: () => void 
}

// 2. TAMBAHAN: Masukkan onContinueAsGuest ke dalam parameter
export function LoginPromptModal({ isOpen, onClose, onContinueAsGuest }: LoginPromptModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-card border border-border rounded-lg max-w-md w-full p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
              <CheckCircle className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Identifikasi Batik Berhasil!
            </h2>
            <p className="text-muted-foreground text-sm">
              Untuk menyimpan riwayat identifikasi dan mengakses hasil di masa mendatang,
              silakan masuk atau buat akun baru.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">
                  Simpan Riwayat
                </p>
                <p className="text-xs text-muted-foreground">
                  Akses semua identifikasi batik Anda kapan saja
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">
                  Analisis Mendalam
                </p>
                <p className="text-xs text-muted-foreground">
                  Dapatkan laporan detil tentang batik yang Anda identifikasi
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">
                  Preferensi Pribadi
                </p>
                <p className="text-xs text-muted-foreground">
                  Kelola pengaturan dan preferensi batik favorit Anda
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-4">
            <Link href="/login" className="block">
              <Button className="w-full bg-primary hover:bg-primary/90">
                Masuk ke Akun
              </Button>
            </Link>
            <Link href="/signup" className="block">
              <Button variant="outline" className="w-full">
                Buat Akun Baru
              </Button>
            </Link>
            
            {/* 3. PERBAIKAN: Ubah onClick di tombol Lewati */}
            <Button
              variant="ghost"
              className="w-full"
              onClick={onContinueAsGuest || onClose} 
            >
              Lewati untuk Sekarang
            </Button>
            
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Identifikasi tanpa akun dapat dilakukan, namun riwayat tidak akan tersimpan.
          </p>
        </div>
      </div>
    </div>
  )
}