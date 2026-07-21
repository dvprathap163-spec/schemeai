import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Skeleton } from '@/components/ui/skeleton'

const API_URL = 'http://localhost:5000/api'

const DEFAULT_FAQS = [
  { _id: '1', question: 'What is SchemeAI?', answer: 'SchemeAI is a free platform that helps Indian citizens discover government schemes, scholarships, and welfare programs they are eligible for based on their personal profile.' },
  { _id: '2', question: 'How does the eligibility checker work?', answer: 'You fill a multi-step form with your personal, social, economic, and educational details. Our engine matches your profile against scheme criteria and returns eligible and partially eligible schemes ranked by relevance.' },
  { _id: '3', question: 'Do I need to create an account?', answer: 'No account is required to check eligibility. Optional accounts enable saving schemes to your dashboard.' },
  { _id: '4', question: 'Are the scheme details up to date?', answer: 'We source data from official government portals. However, deadlines and criteria may change. Always verify on the official website before applying.' },
]

export function FAQPage() {
  const [faqs, setFaqs] = useState(DEFAULT_FAQS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch(`${API_URL}/faqs`)
        if (res.ok) {
          const data = await res.json()
          if (data.length > 0) setFaqs(data)
        }
      } catch {}
      setLoading(false)
    }
    fetchFaqs()
  }, [])

  return (
    <>
      <PageHeader title="Frequently Asked Questions" subtitle="Everything you need to know about SchemeAI" />
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-14 w-full" />)}
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={faq._id} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </section>
    </>
  )
}
