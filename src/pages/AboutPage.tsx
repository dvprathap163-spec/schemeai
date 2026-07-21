import { motion } from 'framer-motion'
import { Heart, Target, Users } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent } from '@/components/ui/card'

export function AboutPage() {
  return (
    <>
      <PageHeader
        title="About SchemeAI"
        subtitle="Bridging the gap between Indian citizens and government welfare programs"
      />
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              SchemeAI is a citizen-centric platform designed to help every Indian discover government schemes,
              scholarships, subsidies, and welfare programs they are eligible for. We believe that access to government
              benefits should be simple, transparent, and available to everyone — regardless of language, location, or
              digital literacy.
            </p>
            <p>
              Our smart eligibility engine analyzes your personal, social, economic, and educational profile against
              official scheme criteria to provide instant, accurate matches. We source all scheme data from verified
              government portals and update regularly.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Target, title: 'Our Mission', desc: 'Ensure every eligible citizen can access government benefits without barriers.' },
              { icon: Users, title: 'Who We Serve', desc: 'Students, farmers, entrepreneurs, senior citizens, women, and families across India.' },
              { icon: Heart, title: 'Our Values', desc: 'Transparency, accessibility, privacy, and citizen empowerment drive everything we do.' },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <item.icon className="mb-3 h-8 w-8 text-primary" />
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
