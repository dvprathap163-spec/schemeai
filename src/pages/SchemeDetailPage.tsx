import { motion } from 'framer-motion'
import { ArrowLeft, Bookmark, Calendar, ExternalLink, FileText } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { getLocalizedSchemeValue } from '@/lib/scheme-translation'
import { useTranslation } from 'react-i18next'

const API_URL = 'http://localhost:5000/api'

export function SchemeDetailPage() {
  const { i18n } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const [scheme, setScheme] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const fetchScheme = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${API_URL}/schemes`)
        if (res.ok) {
          const all = await res.json()
          const found = all.find((s: any) => s.slug === slug)
          setScheme(found || null)
        }
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }
    fetchScheme()
  }, [slug])

  const handleSave = async () => {
    const token = localStorage.getItem('token')
    if (!token || !scheme) return
    try {
      const res = await fetch(`${API_URL}/schemes/saved/${scheme._id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) setSaved(true)
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 space-y-6">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-24 w-full" />
        <div className="grid md:grid-cols-2 gap-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    )
  }

  if (!scheme) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Scheme not found</h1>
        <p className="text-muted-foreground mt-2">This scheme may not have been added by the admin yet.</p>
        <Link to="/schemes" className="mt-4 inline-block text-primary hover:underline">Back to schemes</Link>
      </div>
    )
  }

  return (
    <section className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Link to="/schemes" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to schemes
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              {scheme.category && <Badge className="mb-3">{getLocalizedSchemeValue(scheme, 'category', i18n.language)}</Badge>}
              <h1 className="text-3xl font-bold">{getLocalizedSchemeValue(scheme, 'name', i18n.language)}</h1>
              <p className="mt-2 text-muted-foreground">{getLocalizedSchemeValue(scheme, 'ministry', i18n.language)}</p>
            </div>
            <Button variant="outline" onClick={handleSave} disabled={saved}>
              <Bookmark className={cn('h-4 w-4', saved && 'fill-primary text-primary')} />
              {saved ? 'Saved' : 'Save'}
            </Button>
          </div>

          <p className="mt-6 text-lg leading-relaxed">{getLocalizedSchemeValue(scheme, 'description', i18n.language)}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {scheme.applyUrl && (
              <a href={scheme.applyUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg">Apply Now</Button>
              </a>
            )}
            {scheme.officialUrl && (
              <a href={scheme.officialUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline">
                  <ExternalLink className="h-4 w-4" /> Official Website
                </Button>
              </a>
            )}
          </div>

          {scheme.deadline && (
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Deadline: {new Date(scheme.deadline).toLocaleDateString('en-IN', { dateStyle: 'long' })}
            </div>
          )}

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {scheme.benefits?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5 text-primary" /> Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(getLocalizedSchemeValue(scheme, 'benefits', i18n.language) as string[]).map((b: string) => (
                      <li key={b} className="flex items-start gap-2 text-sm">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {scheme.documents?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5 text-accent" /> Required Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(getLocalizedSchemeValue(scheme, 'documents', i18n.language) as string[]).map((d: string) => (
                      <li key={d} className="flex items-start gap-2 text-sm">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
