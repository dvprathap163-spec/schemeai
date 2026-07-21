import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { MobileCTA } from './MobileCTA'
import { SchemeChatWidget } from '../chat/SchemeChatWidget'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileCTA />
      <SchemeChatWidget />
    </div>
  )
}
