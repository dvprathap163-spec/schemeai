import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function MobileCTA() {
  const { t } = useTranslation()
  const location = useLocation()

  if (location.pathname === '/check-eligibility') return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 p-3 backdrop-blur-lg sm:hidden">
      <Link to="/check-eligibility">
        <Button className="w-full" size="lg">{t('hero.cta')}</Button>
      </Link>
    </div>
  )
}
