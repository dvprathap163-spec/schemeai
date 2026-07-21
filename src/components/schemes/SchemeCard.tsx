import { motion } from 'framer-motion'
import { Bookmark, ExternalLink, FileText } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useBookmarks } from '@/contexts/BookmarkContext'
import type { EligibilityResult, Scheme } from '@/types'
import { cn } from '@/lib/utils'

interface SchemeCardProps {
  scheme: Scheme
  result?: EligibilityResult
  index?: number
}

export function SchemeCard({ scheme, result, index = 0 }: SchemeCardProps) {
  const { t, i18n } = useTranslation()
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const isHi = i18n.language === 'hi'
  const bookmarked = isBookmarked(scheme.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <Badge variant="secondary" className="mb-2">{scheme.category}</Badge>
              <CardTitle className="text-base leading-snug">
                <Link to={`/schemes/${scheme.slug}`} className="hover:text-primary transition-colors">
                  {isHi ? scheme.nameHi : scheme.name}
                </Link>
              </CardTitle>
              <CardDescription className="mt-1 line-clamp-2">
                {isHi ? scheme.descriptionHi : scheme.description}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleBookmark(scheme.id)}
              aria-label={t('schemes.bookmark')}
            >
              <Bookmark className={cn('h-4 w-4', bookmarked && 'fill-primary text-primary')} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {result && (
            <div className="flex items-center gap-2">
              <Badge variant={result.status === 'eligible' ? 'success' : 'warning'}>
                {result.status === 'eligible' ? t('results.eligible') : t('results.partial')}
              </Badge>
              <span className="text-sm text-muted-foreground">{Math.round(result.score)}% match</span>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {(isHi ? scheme.benefitsHi : scheme.benefits).slice(0, 2).map((b) => (
              <span key={b} className="rounded-md bg-muted px-2 py-1 text-xs">{b}</span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <a href={scheme.applyUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm">{t('schemes.apply')}</Button>
            </a>
            <a href={scheme.officialUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline">
                <ExternalLink className="h-3 w-3" />
                {t('schemes.official')}
              </Button>
            </a>
            <Link to={`/schemes/${scheme.slug}`}>
              <Button size="sm" variant="ghost">
                <FileText className="h-3 w-3" />
                {t('common.learnMore')}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
