import { motion } from 'framer-motion'
import { Download, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/layout/PageHeader'
import { SchemeCard } from '@/components/schemes/SchemeCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useEligibility } from '@/contexts/EligibilityContext'
import { getAIRecommendations, type AIRecommendation } from '@/lib/ai-recommendations'
import { generateEligibilityReport } from '@/lib/pdf-report'

export function ResultsPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { profile, results } = useEligibility()
  const [aiRecs, setAiRecs] = useState<AIRecommendation[]>([])
  const [loadingAI, setLoadingAI] = useState(true)

  useEffect(() => {
    if (!profile || results.length === 0) {
      const stored = sessionStorage.getItem('schemeai-results')
      if (!stored) navigate('/check-eligibility')
      return
    }
    setLoadingAI(true)
    getAIRecommendations(profile, results)
      .then(setAiRecs)
      .finally(() => setLoadingAI(false))
  }, [profile, results, navigate])

  if (!profile) return null

  const eligible = results.filter((r) => r.status === 'eligible')
  const partial = results.filter((r) => r.status === 'partial')

  return (
    <>
      <PageHeader title={t('results.title')}>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
            onClick={() => generateEligibilityReport(profile, results)}
          >
            <Download className="h-4 w-4" /> {t('results.download')}
          </Button>
        </div>
      </PageHeader>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex flex-wrap gap-4">
            <Card className="flex-1 min-w-[140px]">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-primary">{results.length}</p>
                <p className="text-sm text-muted-foreground">Total Matches</p>
              </CardContent>
            </Card>
            <Card className="flex-1 min-w-[140px]">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-green-600">{eligible.length}</p>
                <p className="text-sm text-muted-foreground">{t('results.eligible')}</p>
              </CardContent>
            </Card>
            <Card className="flex-1 min-w-[140px]">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-amber-600">{partial.length}</p>
                <p className="text-sm text-muted-foreground">{t('results.partial')}</p>
              </CardContent>
            </Card>
          </div>

          {loadingAI ? (
            <div className="mb-8 space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : aiRecs.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <h3 className="flex items-center gap-2 font-semibold">
                    <Sparkles className="h-5 w-5 text-primary" /> {t('results.aiRecommend')}
                  </h3>
                  <div className="mt-4 space-y-3">
                    {aiRecs.map((rec) => {
                      const scheme = results.find((r) => r.scheme.id === rec.schemeId)?.scheme
                      return (
                        <div key={rec.schemeId} className="rounded-lg bg-background p-3">
                          <p className="font-medium">{scheme?.name ?? rec.schemeId}</p>
                          <p className="text-sm text-muted-foreground">{rec.reason}</p>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {results.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">{t('results.noResults')}</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((result, i) => (
                <SchemeCard key={result.scheme.id} scheme={result.scheme} result={result} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
