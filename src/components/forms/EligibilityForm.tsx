import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Save } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useEligibility } from '@/contexts/EligibilityContext'
import { useNotifications } from '@/contexts/NotificationContext'
import { schemes } from '@/data/schemes'
import { getDistrictsForState, INDIAN_STATES } from '@/data/states'
import { useVoiceInput } from '@/hooks/useVoiceInput'
import {
  DRAFT_STORAGE_KEY,
  eligibilityFormSchema,
  FORM_STEPS,
  type EligibilityFormData,
} from '@/lib/form-schema'
import { evaluateAllSchemes } from '@/lib/eligibility-engine'

const defaultValues: EligibilityFormData = {
  fullName: '',
  age: 25,
  gender: 'Male',
  maritalStatus: 'Single',
  disabilityStatus: false,
  casteCategory: 'General',
  familyIncome: 0,
  employmentStatus: 'Employed',
  bplStatus: false,
  isStudent: false,
  qualification: 'Graduate',
  collegeType: 'NA',
  state: '',
  district: '',
  areaType: 'Urban',
  isFarmer: false,
  isWidow: false,
  isSeniorCitizen: false,
  isMinority: false,
  isStartupOwner: false,
  skillDevelopmentInterest: false,
}

export function EligibilityForm() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { setEligibilityData } = useEligibility()
  const { addNotification } = useNotifications()
  const [step, setStep] = useState(0)
  const [draftSaved, setDraftSaved] = useState(false)

  const form = useForm<EligibilityFormData>({
    resolver: zodResolver(eligibilityFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  const { register, watch, setValue, trigger, formState: { errors }, handleSubmit } = form
  const watchedState = watch('state')
  const districts = watchedState ? getDistrictsForState(watchedState) : []

  useEffect(() => {
    try {
      const draft = localStorage.getItem(DRAFT_STORAGE_KEY)
      if (draft) {
        const parsed = JSON.parse(draft) as EligibilityFormData
        Object.entries(parsed).forEach(([key, value]) => {
          setValue(key as keyof EligibilityFormData, value)
        })
      }
    } catch { /* ignore */ }
  }, [setValue])

  useEffect(() => {
    const subscription = watch((data) => {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(data))
      setDraftSaved(true)
    })
    return () => subscription.unsubscribe()
  }, [watch])

  useEffect(() => {
    if (!draftSaved) return
    const timer = setTimeout(() => setDraftSaved(false), 2000)
    return () => clearTimeout(timer)
  }, [draftSaved])

  useEffect(() => {
    const age = watch('age')
    if (age >= 60) setValue('isSeniorCitizen', true)
    const marital = watch('maritalStatus')
    if (marital === 'Widowed') setValue('isWidow', true)
    const employment = watch('employmentStatus')
    if (employment === 'Student') setValue('isStudent', true)
  }, [watch, setValue])

  const handleVoiceResult = useCallback((text: string) => {
    if (step === 0) setValue('fullName', text)
  }, [step, setValue])

  const { isListening, isSupported, startListening, stopListening } = useVoiceInput(
    handleVoiceResult,
    i18n.language === 'hi' ? 'hi-IN' : 'en-IN',
  )

  const progress = ((step + 1) / FORM_STEPS.length) * 100

  const nextStep = async () => {
    const currentSchema = FORM_STEPS[step].schema
    const fields = Object.keys(currentSchema.shape) as (keyof EligibilityFormData)[]
    const valid = await trigger(fields)
    if (valid && step < FORM_STEPS.length - 1) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 0) setStep(step - 1)
  }

  const onSubmit = handleSubmit((data: EligibilityFormData) => {
    const results = evaluateAllSchemes(schemes, data)
    setEligibilityData(data, results)
    localStorage.removeItem(DRAFT_STORAGE_KEY)
    addNotification(
      'Eligibility Check Complete',
      `Found ${results.length} matching schemes for your profile.`,
      'success',
    )
    navigate('/results')
  })

  const currentStep = FORM_STEPS[step]
  const stepTitle = i18n.language === 'hi' ? currentStep.titleHi : currentStep.title

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{stepTitle}</CardTitle>
          <span className="text-sm text-muted-foreground">
            {t('form.step')} {step + 1} {t('form.of')} {FORM_STEPS.length}
          </span>
        </div>
        <Progress value={progress} className="mt-4" />
        {draftSaved && (
          <p className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
            <Save className="h-3 w-3" /> {t('form.saveDraft')}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {step === 0 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="flex gap-2">
                      <Input id="fullName" {...register('fullName')} placeholder="Enter your full name" />
                      {isSupported && (
                        <Button type="button" variant="outline" size="icon" onClick={isListening ? stopListening : startListening}>
                          {isListening ? <MicOff className="h-4 w-4 text-destructive" /> : <Mic className="h-4 w-4" />}
                        </Button>
                      )}
                    </div>
                    {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input id="age" type="number" {...register('age', { valueAsNumber: true })} />
                      {errors.age && <p className="text-sm text-destructive">{errors.age.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <Select value={watch('gender')} onValueChange={(v) => setValue('gender', v as EligibilityFormData['gender'])}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {['Male', 'Female', 'Other'].map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Marital Status</Label>
                      <Select value={watch('maritalStatus')} onValueChange={(v) => setValue('maritalStatus', v as EligibilityFormData['maritalStatus'])}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {['Single', 'Married', 'Widowed', 'Divorced'].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-3 pt-6">
                      <Switch checked={watch('disabilityStatus')} onCheckedChange={(v) => setValue('disabilityStatus', v)} id="disability" />
                      <Label htmlFor="disability">Person with Disability</Label>
                    </div>
                  </div>
                </>
              )}

              {step === 1 && (
                <div className="space-y-2">
                  <Label>Caste Category</Label>
                  <Select value={watch('casteCategory')} onValueChange={(v) => setValue('casteCategory', v as EligibilityFormData['casteCategory'])}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['General', 'OBC', 'SC', 'ST', 'EWS'].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {step === 2 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="income">Annual Family Income (₹)</Label>
                    <Input id="income" type="number" {...register('familyIncome', { valueAsNumber: true })} placeholder="e.g. 250000" />
                    {errors.familyIncome && <p className="text-sm text-destructive">{errors.familyIncome.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Employment Status</Label>
                    <Select value={watch('employmentStatus')} onValueChange={(v) => setValue('employmentStatus', v as EligibilityFormData['employmentStatus'])}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {['Employed', 'Unemployed', 'Self-Employed', 'Student', 'Retired'].map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch checked={watch('bplStatus')} onCheckedChange={(v) => setValue('bplStatus', v)} id="bpl" />
                    <Label htmlFor="bpl">Below Poverty Line (BPL)</Label>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="flex items-center gap-3">
                    <Switch checked={watch('isStudent')} onCheckedChange={(v) => setValue('isStudent', v)} id="student" />
                    <Label htmlFor="student">Currently a Student</Label>
                  </div>
                  <div className="space-y-2">
                    <Label>Highest Qualification</Label>
                    <Select value={watch('qualification')} onValueChange={(v) => setValue('qualification', v as EligibilityFormData['qualification'])}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {['Below 10th', '10th', '12th', 'Graduate', 'Post Graduate', 'PhD'].map((q) => <SelectItem key={q} value={q}>{q}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>College Type</Label>
                    <Select value={watch('collegeType')} onValueChange={(v) => setValue('collegeType', v as EligibilityFormData['collegeType'])}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {['Government', 'Private', 'NA'].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <div className="space-y-2">
                    <Label>State</Label>
                    <Select value={watch('state')} onValueChange={(v) => { setValue('state', v); setValue('district', '') }}>
                      <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                      <SelectContent>
                        {INDIAN_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    {errors.state && <p className="text-sm text-destructive">{errors.state.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>District</Label>
                    <Select value={watch('district')} onValueChange={(v) => setValue('district', v)} disabled={!watchedState}>
                      <SelectTrigger><SelectValue placeholder="Select district" /></SelectTrigger>
                      <SelectContent>
                        {districts.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    {errors.district && <p className="text-sm text-destructive">{errors.district.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Area Type</Label>
                    <Select value={watch('areaType')} onValueChange={(v) => setValue('areaType', v as EligibilityFormData['areaType'])}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {['Rural', 'Urban'].map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {step === 5 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {([
                    ['isFarmer', 'Farmer'],
                    ['isWidow', 'Widow'],
                    ['isSeniorCitizen', 'Senior Citizen (60+)'],
                    ['isMinority', 'Minority Community'],
                    ['isStartupOwner', 'Startup Owner'],
                    ['skillDevelopmentInterest', 'Skill Development Interest'],
                  ] as const).map(([field, label]) => (
                    <div key={field} className="flex items-center gap-3">
                      <Checkbox
                        id={field}
                        checked={watch(field)}
                        onCheckedChange={(v) => setValue(field, !!v)}
                      />
                      <Label htmlFor={field}>{label}</Label>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-between gap-4">
            <Button type="button" variant="outline" onClick={prevStep} disabled={step === 0}>
              {t('form.prev')}
            </Button>
            {step < FORM_STEPS.length - 1 ? (
              <Button type="button" onClick={nextStep}>{t('form.next')}</Button>
            ) : (
              <Button type="submit">{t('form.submit')}</Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
