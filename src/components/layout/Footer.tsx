import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const govLinks = [
  { name: 'India.gov.in', url: 'https://www.india.gov.in' },
  { name: 'MyGov.in', url: 'https://www.mygov.in' },
  { name: 'Digital India', url: 'https://www.digitalindia.gov.in' },
  { name: 'UMANG App', url: 'https://web.umang.gov.in' },
]

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-hero text-white font-bold text-sm">
                SG
              </div>
              <span className="font-bold text-lg">Scheme<span className="text-primary">AI</span></span>
            </div>
            <p className="text-sm text-muted-foreground">{t('footer.tagline')}</p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/check-eligibility" className="hover:text-primary transition-colors">{t('nav.check')}</Link></li>
              <li><Link to="/schemes" className="hover:text-primary transition-colors">{t('nav.schemes')}</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">{t('nav.faq')}</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">{t('footer.government')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {govLinks.map((link) => (
                <li key={link.url}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">{t('footer.legal')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-primary transition-colors">{t('footer.privacy')}</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">{t('footer.terms')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SchemeAI. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-1">
            <div className="h-1 w-8 bg-primary rounded" />
            <div className="h-1 w-8 bg-white border rounded" />
            <div className="h-1 w-8 bg-secondary rounded" />
          </div>
        </div>
      </div>
    </footer>
  )
}
