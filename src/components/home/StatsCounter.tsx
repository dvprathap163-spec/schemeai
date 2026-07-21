import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

const API_URL = 'http://localhost:5000/api'

interface CounterProps {
  value: number
  suffix?: string
}

function Counter({ value, suffix = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 2000 })
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) motionValue.set(value)
  }, [isInView, motionValue, value])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (v) => {
      if (ref.current) ref.current.textContent = Math.round(v).toLocaleString('en-IN') + suffix
    })
    return unsubscribe
  }, [springValue, suffix])

  return <span ref={ref}>0{suffix}</span>
}

interface LiveStat {
  value: number
  suffix: string
  labelKey: string
}

export function StatsCounter() {
  const { t } = useTranslation()
  const [stats, setStats] = useState<LiveStat[]>([
    { value: 150, suffix: '+', labelKey: 'stats.schemes' },
    { value: 2000000, suffix: '+', labelKey: 'stats.users' },
    { value: 36, suffix: '', labelKey: 'stats.states' },
    { value: 95, suffix: '%', labelKey: 'stats.accuracy' },
  ])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/stats`)
        if (res.ok) {
          const data = await res.json()
          setStats([
            { value: data.schemesCount, suffix: '+', labelKey: 'stats.schemes' },
            { value: data.usersCount, suffix: '+', labelKey: 'stats.users' },
            { value: data.statesCount, suffix: '', labelKey: 'stats.states' },
            { value: data.accuracy, suffix: '%', labelKey: 'stats.accuracy' },
          ])
        }
      } catch {
        // silently fall back to defaults
      }
    }
    fetchStats()
  }, [])

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl font-bold text-primary sm:text-4xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{t(stat.labelKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
