import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Search, Shield, Sparkles, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { StatsCounter } from '@/components/home/StatsCounter'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const API_URL = 'http://localhost:5000/api'

const DEFAULT_FEEDBACK = [
  { _id: '1', name: 'Priya Sharma', comment: 'Found 8 schemes I was eligible for. Applied to PM Scholarship within minutes!', rating: 5 },
  { _id: '2', name: 'Rajesh Kumar', comment: 'As a farmer, PM-KISAN was matched instantly. Very helpful platform.', rating: 5 },
  { _id: '3', name: 'Anita Devi', comment: 'The Hindi interface made it easy for my mother to check her pension eligibility.', rating: 5 },
]

const DEFAULT_FAQS = [
  { _id: 'f1', q: 'Is this platform free to use?', a: 'Yes, SchemeAI is completely free for all Indian citizens. No hidden charges.' },
  { _id: 'f2', q: 'How accurate are the eligibility results?', a: 'Our engine matches your profile against official scheme criteria. Always verify on government portals before applying.' },
  { _id: 'f3', q: 'Can I save schemes for later?', a: 'Yes, log in and use the Save button on any scheme to add it to your personal dashboard.' },
  { _id: 'f4', q: 'Is my personal data safe?', a: 'Your data is processed locally in your browser. We do not store personal details on our servers unless you create an account.' },
]

export function HomePage() {
  const { t } = useTranslation()
  const [feedback, setFeedback] = useState(DEFAULT_FEEDBACK)
  const [faqs, setFaqs] = useState(DEFAULT_FAQS)

  useEffect(() => {
    fetch(`${API_URL}/feedback`).then(r => r.ok ? r.json() : null).then(d => { if (d?.length) setFeedback(d) }).catch(() => {})
    fetch(`${API_URL}/faqs`).then(r => r.ok ? r.json() : null).then(d => { if (d?.length) setFaqs(d.map((f: any) => ({ ...f, q: f.question, a: f.answer }))) }).catch(() => {})
  }, [])

  return (
    <>
      <section className="relative overflow-hidden gradient-hero py-16 text-white sm:py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm backdrop-blur">
                <Sparkles className="h-4 w-4" /> {t('hero.trusted')}
              </p>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{t('hero.title')}</h1>
              <p className="mt-6 text-lg text-white/80">{t('hero.subtitle')}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/check-eligibility">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                    {t('hero.cta')} <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/schemes">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    {t('hero.secondary')}
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="glass-card rounded-2xl p-6 text-foreground">
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="space-y-3">
                  {['PM Scholarship Scheme', 'PM-KISAN Samman Nidhi', 'Ayushman Bharat'].map((name, i) => (
                    <div key={name} className="flex items-center justify-between rounded-lg bg-muted p-3">
                      <span className="text-sm font-medium">{name}</span>
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700 dark:bg-green-900 dark:text-green-200">
                        {95 - i * 3}% match
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold">{t('howItWorks.title')}</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { icon: Search, ...t('howItWorks.step1', { returnObjects: true }) as { title: string; desc: string } },
              { icon: Zap, ...t('howItWorks.step2', { returnObjects: true }) as { title: string; desc: string } },
              { icon: CheckCircle, ...t('howItWorks.step3', { returnObjects: true }) as { title: string; desc: string } },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full text-center">
                  <CardContent className="pt-8">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                      <step.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <StatsCounter />

      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Popular Schemes</h2>
            <Link to="/schemes"><Button variant="outline">{t('common.viewAll')}</Button></Link>
          </div>
          <p className="text-muted-foreground mt-2">Schemes added by the admin will appear here.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold">{t('benefits.title')}</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: CheckCircle, ...t('benefits.b1', { returnObjects: true }) as { title: string; desc: string } },
              { icon: Zap, ...t('benefits.b2', { returnObjects: true }) as { title: string; desc: string } },
              { icon: Shield, ...t('benefits.b3', { returnObjects: true }) as { title: string; desc: string } },
              { icon: Sparkles, ...t('benefits.b4', { returnObjects: true }) as { title: string; desc: string } },
            ].map((b) => (
              <Card key={b.title}>
                <CardContent className="pt-6">
                  <b.icon className="mb-3 h-8 w-8 text-primary" />
                  <h3 className="font-semibold">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold">Feedback</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {feedback.map((item: any) => (
              <Card key={item._id}>
                <CardContent className="pt-6">
                  <div className="mb-3 flex gap-1">{Array.from({ length: item.rating }).map((_, i) => (
                    <span key={i} className="text-accent">★</span>
                  ))}</div>
                  <p className="text-sm text-muted-foreground">&ldquo;{item.comment || item.text}&rdquo;</p>
                  <p className="mt-4 font-semibold">{item.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold mb-8">FAQ</h2>
          <Accordion type="single" collapsible>
            {faqs.map((faq: any, i: number) => (
              <AccordionItem key={faq._id || i} value={`faq-${i}`}>
                <AccordionTrigger>{faq.q || faq.question}</AccordionTrigger>
                <AccordionContent>{faq.a || faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  )
}
