'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { ArrowRight, Trash2, Calendar } from 'lucide-react'

interface HistoryItem {
  id: string
  batik_type: string
  confidence: number
  created_at: string
}

export default function HistoryPage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (authLoading) return

    if (!user) {
      router.push('/login')
      return
    }

    const fetchHistory = async () => {
      try {
        // TODO: Fetch from API when backend is ready
        // For now, using mock data
        setHistory([
          {
            id: '1',
            batik_type: 'Batik Parang',
            confidence: 92.5,
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: '2',
            batik_type: 'Batik Kawung',
            confidence: 88.3,
            created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: '3',
            batik_type: 'Batik Megamendung',
            confidence: 95.1,
            created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ])
      } catch (err) {
        setError('Gagal memuat riwayat')
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistory()
  }, [user, authLoading, router])

  const handleDelete = async (id: string) => {
    try {
      // TODO: Delete from API when backend is ready
      setHistory(history.filter((item) => item.id !== id))
    } catch (err) {
      setError('Gagal menghapus item')
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Riwayat Identifikasi</h1>
          <p className="text-muted-foreground">
            Semua identifikasi batik Anda disimpan di sini. Klik untuk melihat detail lebih lanjut.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Empty State */}
        {history.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Belum ada riwayat identifikasi
            </h2>
            <p className="text-muted-foreground mb-6">
              Mulai identifikasi batik untuk menyimpan hasil di riwayat Anda.
            </p>
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90">
                Identifikasi Batik Sekarang
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="group bg-card border border-border rounded-lg p-6 hover:border-primary/50 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between">
                  <Link href={`/result/${item.id}`} className="flex-1">
                    <div className="mb-3">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {item.batik_type}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center space-x-2 mt-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(item.created_at)}</span>
                      </p>
                    </div>
                  </Link>

                  <div className="flex items-center gap-4 ml-4">
                    {/* Confidence Score */}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {item.confidence.toFixed(1)}%
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Keyakinan AI
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <Link href={`/result/${item.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center space-x-2"
                        >
                          <span>Lihat Detail</span>
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
