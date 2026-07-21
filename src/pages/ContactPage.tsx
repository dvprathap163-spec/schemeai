import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, MapPin, Phone } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNotifications } from '@/contexts/NotificationContext'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
})

const feedbackSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  comment: z.string().min(10),
  rating: z.number().min(1).max(5),
})

type ContactForm = z.infer<typeof contactSchema>
type FeedbackForm = z.infer<typeof feedbackSchema>

const API_URL = 'http://localhost:5000/api'

export function ContactPage() {
  const { addNotification } = useNotifications()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) })

  const {
    register: registerFeedback,
    handleSubmit: handleFeedbackSubmit,
    reset: resetFeedback,
    formState: { errors: feedbackErrors, isSubmitting: isFeedbackSubmitting },
  } = useForm<FeedbackForm>({ resolver: zodResolver(feedbackSchema) })

  const [contactInfo, setContactInfo] = useState({
    email: 'support@schemeai.com',
    phone: '1800-XXX-XXXX',
    address: 'New Delhi, India',
  })
  const [feedback, setFeedback] = useState<any[]>([])

  useEffect(() => {
    fetch(`${API_URL}/contact`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => { if (data) setContactInfo(data) })
      .catch(() => {})

    fetch(`${API_URL}/feedback`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => { if (data) setFeedback(data) })
      .catch(() => {})
  }, [])

  const onContactSubmit = handleSubmit(() => {
    addNotification('Message Sent', 'We will get back to you within 48 hours.', 'success')
    reset()
  })

  const onFeedbackSubmit = handleFeedbackSubmit(async (data) => {
    try {
      const res = await fetch(`${API_URL}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: 'User feedback',
          message: data.comment,
          rating: data.rating,
        }),
      })
      if (!res.ok) throw new Error('Failed to submit feedback')
      const saved = await res.json()
      setFeedback((prev) => [saved, ...prev])
      resetFeedback()
      addNotification('Feedback submitted', 'Thank you for sharing your feedback.', 'success')
    } catch (error: any) {
      addNotification('Error', error.message || 'Could not submit feedback.', 'error')
    }
  })

  return (
    <>
      <PageHeader title="Contact Us" subtitle="Have questions? We'd love to hear from you." />
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Email', value: contactInfo.email },
                { icon: Phone, label: 'Helpline', value: contactInfo.phone },
                { icon: MapPin, label: 'Address', value: contactInfo.address },
              ].map((item) => (
                <Card key={item.label}>
                  <CardContent className="flex items-center gap-4 pt-6">
                    <item.icon className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Recent Feedback</h2>
                  {feedback.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No feedback has been submitted yet.</p>
                  ) : (
                    <div className="grid gap-4">
                      {feedback.slice(0, 3).map((item: any) => (
                        <div key={item._id} className="rounded-2xl border border-border bg-muted p-4">
                          <div className="flex items-center gap-2 mb-2">
                            {Array.from({ length: item.rating || 5 }).map((_, idx) => (
                              <span key={idx} className="text-amber-400">★</span>
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">{item.comment}</p>
                          <p className="mt-3 text-sm font-semibold">{item.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={onFeedbackSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="feedback-name">Name</Label>
                        <Input id="feedback-name" {...registerFeedback('name')} />
                        {feedbackErrors.name && <p className="text-sm text-destructive">{feedbackErrors.name.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="feedback-email">Email</Label>
                        <Input id="feedback-email" type="email" {...registerFeedback('email')} />
                        {feedbackErrors.email && <p className="text-sm text-destructive">{feedbackErrors.email.message}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="feedback-rating">Rating</Label>
                      <Input id="feedback-rating" type="number" min={1} max={5} {...registerFeedback('rating', { valueAsNumber: true })} />
                      {feedbackErrors.rating && <p className="text-sm text-destructive">{feedbackErrors.rating.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="feedback-comment">Feedback</Label>
                      <textarea
                        id="feedback-comment"
                        {...registerFeedback('comment')}
                        rows={4}
                        className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                      {feedbackErrors.comment && <p className="text-sm text-destructive">{feedbackErrors.comment.message}</p>}
                    </div>
                    <Button type="submit" disabled={isFeedbackSubmitting}>Submit Feedback</Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Send a Message</h2>
                  <form onSubmit={onContactSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" {...register('name')} />
                        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" {...register('email')} />
                        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" {...register('subject')} />
                      {errors.subject && <p className="text-sm text-destructive">{errors.subject.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <textarea
                        id="message"
                        {...register('message')}
                        rows={5}
                        className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                      {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
                    </div>

                    <Button type="submit" disabled={isSubmitting}>Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
