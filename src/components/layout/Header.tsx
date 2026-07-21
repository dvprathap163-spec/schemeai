import { AnimatePresence, motion } from 'framer-motion'
import { Bell, Globe, Menu, Moon, Sun, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useNotifications } from '@/contexts/NotificationContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

const navLinks = [
  { to: '/', labelKey: 'nav.home' },
  { to: '/check-eligibility', labelKey: 'nav.check' },
  { to: '/schemes', labelKey: 'nav.schemes' },
  { to: '/about', labelKey: 'nav.about' },
  { to: '/faq', labelKey: 'nav.faq' },
  { to: '/contact', labelKey: 'nav.contact' },
]

export function Header() {
  const { t, i18n } = useTranslation()
  const { isDark, toggleTheme } = useTheme()
  const { user, isAdmin } = useAuth()
  const { unreadCount, notifications, markAsRead } = useNotifications()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'ml', label: 'മലയാളം' },
    { code: 'ta', label: 'தமிழ்' },
  ]

  const currentLanguage = i18n.language.split('-')[0] || 'en'

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('schemeai-lang', lang)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2" aria-label="SchemeAI home">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-hero text-white font-bold text-sm">
            SG
          </div>
          <div className="hidden sm:block">
            <span className="font-bold text-foreground">Scheme</span>
            <span className="font-bold text-primary">AI</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted',
                location.pathname === link.to ? 'text-primary bg-primary/10' : 'text-muted-foreground',
              )}
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Select value={currentLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="h-10 w-40">
              <span className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <SelectValue placeholder={t('common.language')} />
              </span>
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={t('common.darkMode')}>
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <div className="relative">
            <Button variant="ghost" size="icon" onClick={() => setNotifOpen(!notifOpen)} aria-label="Notifications">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-white">
                  {unreadCount}
                </span>
              )}
            </Button>
            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 mt-2 w-72 rounded-xl border bg-background p-2 shadow-lg"
                >
                  {notifications.length === 0 ? (
                    <p className="p-3 text-sm text-muted-foreground">No notifications</p>
                  ) : (
                    notifications.slice(0, 5).map((n) => (
                      <button
                        key={n.id}
                        type="button"
                        className={cn('w-full rounded-lg p-3 text-left text-sm hover:bg-muted', !n.read && 'bg-primary/5')}
                        onClick={() => markAsRead(n.id)}
                      >
                        <p className="font-medium">{n.title}</p>
                        <p className="text-muted-foreground">{n.message}</p>
                      </button>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/check-eligibility" className="hidden sm:block">
            <Button size="sm" variant="secondary">{t('hero.cta')}</Button>
          </Link>

          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="hidden sm:block">
                  <Button size="sm" variant="outline">Admin Panel</Button>
                </Link>
              )}
              <Link to="/dashboard" className="hidden sm:block">
                <Button size="sm">Dashboard</Button>
              </Link>
            </>
          ) : (
            <Link to="/login" className="hidden sm:block">
              <Button size="sm">Log In</Button>
            </Link>
          )}

          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'rounded-lg px-4 py-3 text-sm font-medium',
                    location.pathname === link.to ? 'bg-primary/10 text-primary' : 'text-muted-foreground',
                  )}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
              <Link to="/check-eligibility" onClick={() => setMobileOpen(false)} className="mt-2">
                <Button variant="secondary" className="w-full">{t('hero.cta')}</Button>
              </Link>
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setMobileOpen(false)} className="mt-2">
                      <Button variant="outline" className="w-full">Admin Panel</Button>
                    </Link>
                  )}
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="mt-2">
                    <Button className="w-full">Dashboard</Button>
                  </Link>
                </>
              ) : (
                <Link to="/login" onClick={() => setMobileOpen(false)} className="mt-2">
                  <Button className="w-full">Log In</Button>
                </Link>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
