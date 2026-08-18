import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, Save } from 'lucide-react'
import { useEffect, useState } from 'react'
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
import { useEligibility } from '@/contexts/EligibilityContext'
import { useNotifications } from '@/contexts/NotificationContext'
import { INDIAN_STATES } from '@/data/states'
import { getAllSchemes } from '@/lib/scheme-service'

import {
  DRAFT_STORAGE_KEY,
  eligibilityFormSchema,
  FORM_STEPS,
  PREFERRED_SCHEME_CATEGORIES,
  type EligibilityFormData,
} from '@/lib/form-schema'
import { evaluateAllSchemes } from '@/lib/eligibility-engine'
import type { UserProfile, Scheme, SchemeCategory } from '@/types'

const PREFERRED_CATEGORY_MAP: Record<(typeof PREFERRED_SCHEME_CATEGORIES)[number], SchemeCategory[]> = {
  Education: ['Education'],
  Health: ['Health'],
  Agriculture: ['Agriculture'],
  Employment: ['Employment', 'Skills & Employment'],
  Housing: ['Housing'],
  Women: ['Women', 'Women & Child'],
  'Senior Citizen': ['Senior Citizen', 'Senior Citizen Welfare'],
  Startup: ['Startup', 'Business & Entrepreneurship'],
  'Skill Development': ['Skill Development', 'Skills & Employment'],
  'Social Welfare': ['Social Welfare', 'Disability Welfare', 'Animal Husbandry & Fisheries', 'Traditional Crafts & Artisans'],
}

const UNKNOWN_INCOME = 100_000_001

function matchesPreferredCategory(scheme: Scheme, categories: EligibilityFormData['preferredCategories']): boolean {
  return categories.some((category) => PREFERRED_CATEGORY_MAP[category].includes(scheme.category))
}

const defaultValues: EligibilityFormData = {
  // Page 1 – Personal
  fullName: '',
  age: 25,
  gender: 'Male',
  maritalStatus: 'Single',
  disabilityStatus: false,
  disabilityPercentage: '',
  // Page 2 – Social
  casteCategory: 'General',
  // Page 3 – Economic
  occupation: '',
  familyIncome: 0,
  parentGuardianIncome: 0,
  employmentStatus: 'Employed',
  bplStatus: false,
  isInHardship: false,
  isGovernmentEmployee: false,
  // Page 4 – Education
  isStudent: false,
  qualification: 'Graduate',
  collegeType: 'NA',
  // Page 5 – Location
  state: '',
  district: '',
  areaType: 'Urban',
  // Page 6 – Preferences
  isFarmer: false,
  isWidow: false,
  isSeniorCitizen: false,
  isMinority: false,
  isStartupOwner: false,
  skillDevelopmentInterest: false,
  isArtisan: false,
  isAnimalHusbandryOrFisheries: false,
  preferredCategories: [],
}

export function EligibilityForm() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { setEligibilityData } = useEligibility()
  const { addNotification } = useNotifications()
  const [step, setStep] = useState(0)
  const [draftSaved, setDraftSaved] = useState(false)
  const [activeInfo, setActiveInfo] = useState<string | null>(null)

  const form = useForm<EligibilityFormData>({
    resolver: zodResolver(eligibilityFormSchema) as any,
    defaultValues,
    mode: 'onChange',
  })

  const { register, watch, setValue, trigger, formState: { errors }, handleSubmit } = form

  // Watch fields for rendering & effect dependencies
  const age = watch('age')
  const gender = watch('gender')
  const maritalStatus = watch('maritalStatus')
  const disabilityStatus = watch('disabilityStatus')
  const disabilityPercentage = watch('disabilityPercentage')
  const casteCategory = watch('casteCategory')
  const employmentStatus = watch('employmentStatus')
  const isGovernmentEmployee = watch('isGovernmentEmployee')
  const occupation = watch('occupation')
  const bplStatus = watch('bplStatus')
  const isInHardship = watch('isInHardship')
  const isStudent = watch('isStudent')
  const watchedState = watch('state')
  const areaType = watch('areaType')
  const isFarmer = watch('isFarmer')
  const isWidow = watch('isWidow')
  const isSeniorCitizen = watch('isSeniorCitizen')
  const isMinority = watch('isMinority')
  const isStartupOwner = watch('isStartupOwner')
  const skillDevelopmentInterest = watch('skillDevelopmentInterest')
  const isArtisan = watch('isArtisan')
  const isAnimalHusbandryOrFisheries = watch('isAnimalHusbandryOrFisheries')
  const preferredCategories = Array.isArray(watch('preferredCategories')) ? watch('preferredCategories') : []


  // Load saved draft on mount
  useEffect(() => {
    try {
      const draft = localStorage.getItem(DRAFT_STORAGE_KEY)
      if (draft) {
        const parsed = JSON.parse(draft) as EligibilityFormData
        Object.entries(parsed).forEach(([key, value]) => {
          setValue(key as any, value)
        })
      }
    } catch { /* ignore */ }
  }, [setValue])

  // Auto-save draft
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

  // Some answers imply an eligibility flag. Only turn a flag on here: a user
  // can still be a student, farmer, or entrepreneur alongside another job.
  useEffect(() => {
    if (age >= 60 && !isSeniorCitizen) setValue('isSeniorCitizen', true)

    if (maritalStatus === 'Widowed' && !isWidow) setValue('isWidow', true)

    if (employmentStatus === 'Student' && !isStudent) setValue('isStudent', true)

    if (employmentStatus === 'Farmer' && !isFarmer) setValue('isFarmer', true)

    if (employmentStatus === 'Startup Owner' && !isStartupOwner) setValue('isStartupOwner', true)
  }, [age, maritalStatus, employmentStatus, isSeniorCitizen, isWidow, isStudent, isFarmer, isStartupOwner, setValue])



  // Dynamically calculate active steps. If the user is a student, we skip Page 6 (Economic Details, index 5).
  const activeStepIndices = [0, 1, 2, 3, 4]
  if (!isStudent) {
    activeStepIndices.push(5)
  }
  activeStepIndices.push(6)

  const activeStepIndex = activeStepIndices.indexOf(step)
  const totalActiveSteps = activeStepIndices.length

  const progress = ((activeStepIndex + 1) / totalActiveSteps) * 100

  const nextStep = async () => {
    const currentSchema = FORM_STEPS[step].schema as any
    const fields = Object.keys(currentSchema.shape) as any
    const valid = await trigger(fields)
    if (!valid) {
      const errs = form.formState.errors
      const messages = Object.entries(errs)
        .map(([k, v]) => `${k}: ${(v as any).message || 'Invalid value'}`)
        .join('\n')
      alert("Please fix the following validation errors to continue:\n" + messages)
    }
    if (valid) {
      const currentIndex = activeStepIndices.indexOf(step)
      if (currentIndex < totalActiveSteps - 1) {
        setStep(activeStepIndices[currentIndex + 1])
      }
    }
  }

  const prevStep = () => {
    const currentIndex = activeStepIndices.indexOf(step)
    if (currentIndex > 0) {
      setStep(activeStepIndices[currentIndex - 1])
    }
  }

  const onSubmit = handleSubmit((data: EligibilityFormData) => {
    // Occupation is the form's primary source for these scheme-specific flags.
    // This also clears a stale flag left over from a previously saved draft.
    const occupationFlags = {
      isFarmer: data.occupation === 'Farmer / Agricultural Worker',
      isArtisan: data.occupation === 'Artisan / Craftsman / Weaver',
      isAnimalHusbandryOrFisheries: data.occupation === 'Involved in Animal Husbandry / Fisheries',
      isStartupOwner: data.occupation === 'Startup Owner / Entrepreneur',
    }
    const mappedEmploymentStatus = data.isStudent
      ? 'Student'
      : occupationFlags.isFarmer
        ? 'Farmer'
        : occupationFlags.isStartupOwner
          ? 'Startup Owner'
          : data.employmentStatus

    // A blank income means it was not supplied; it is never interpreted as
    // zero income. Parent/guardian income is used for student applicants.
    const verifiedIncome = data.familyIncome ?? data.parentGuardianIncome ?? UNKNOWN_INCOME
    const profile: UserProfile = {
      ...data,
      familyIncome: verifiedIncome,
      employmentStatus: mappedEmploymentStatus,
      ...occupationFlags,
    } as UserProfile

    // The scheme rules are the source of truth. An ML score is useful for
    // analysis, but must never replace programme requirements.
    const allResults = evaluateAllSchemes(getAllSchemes(), profile)
    const results = data.preferredCategories.length > 0
      ? allResults.filter((result) => matchesPreferredCategory(result.scheme, data.preferredCategories))
      : allResults

    setEligibilityData(profile, results)
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
            {t('form.step')} {activeStepIndex + 1} {t('form.of')} {totalActiveSteps}
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
        <form onSubmit={onSubmit} onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault() }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              {/* ── PAGE 1: Personal Details ────────────────────────────── */}
              {step === 0 && (
                <>


                  {/* Age + Gender */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="age" className="text-base font-semibold"><span className="text-destructive">*</span> Age</Label>
                      <Input id="age" type="number" min={1} max={120} {...register('age', { valueAsNumber: true })} className="h-11" />
                      {errors.age && <p className="text-sm text-destructive">{errors.age.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-semibold"><span className="text-destructive">*</span> Gender</Label>
                      <Select value={gender} onValueChange={(v) => setValue('gender', v as EligibilityFormData['gender'], { shouldDirty: true, shouldValidate: true })}>
                        <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {['Male', 'Female', 'Other'].map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>


                </>
              )}

              {/* ── PAGE 2: Location Details ─────────────────────────────── */}
              {step === 1 && (
                <>
                  {/* State */}
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">Please select your state</Label>
                    <Select value={watchedState} onValueChange={(v) => { setValue('state', v, { shouldDirty: true, shouldValidate: true }); setValue('district', '') }}>
                      <SelectTrigger className="h-11"><SelectValue placeholder="Select your state" /></SelectTrigger>
                      <SelectContent>
                        {INDIAN_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    {errors.state && <p className="text-sm text-destructive">{errors.state.message}</p>}
                  </div>

                  {/* Area Type */}
                  <div className="space-y-2">
                    <Label className="text-base font-semibold"><span className="text-destructive">*</span>Please select your area of residence</Label>
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      {(['Urban', 'Rural'] as const).map((area) => {
                        const selected = areaType === area
                        return (
                          <button key={area} type="button"
                            onClick={() => setValue('areaType', area, { shouldDirty: true, shouldValidate: true })}
                            className={`h-12 rounded-md border-2 px-4 text-left text-base font-medium transition-colors ${selected ? 'border-secondary bg-secondary/5 text-secondary' : 'border-border bg-card hover:border-muted-foreground'}`}
                            aria-pressed={selected}
                          >
                            {area}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </>
              )}

              {/* ── PAGE 3: Social / Caste Details ──────────────────────── */}
              {step === 2 && (
                <div className="space-y-4">
                  <Label className="text-base font-semibold">
                    <span className="text-destructive">*</span>You belong to...
                  </Label>
                  <div className="space-y-3">
                    {[
                      { value: 'General', label: 'General', info: '' },
                      { value: 'OBC', label: 'Other Backward Class (OBC)', info: 'Other Backward Classes are socially and educationally disadvantaged groups.' },
                      { value: 'PVTG', label: 'Particularly Vulnerable Tribal Group (PVTG)', info: 'PVTGs are particularly vulnerable groups among Scheduled Tribes characterized by declining/stagnant population, pre-agricultural technology, and low literacy.' },
                      { value: 'SC', label: 'Scheduled Caste (SC)', info: 'Scheduled Castes are historically disadvantaged communities identified for socio-economic development and reservation benefits.' },
                      { value: 'ST', label: 'Scheduled Tribe (ST)', info: 'Scheduled Tribes are indigenous communities identified for socio-economic upliftment and cultural protection.' },
                      { value: 'DNT', label: 'De-Notified, Nomadic, and Semi-Nomadic (DNT) communities', info: '' },
                      { value: 'EWS', label: 'Economically Weaker Section (EWS)', info: 'Economically Weaker Section is a category of citizens whose family income is below ₹8 Lakhs annually and who do not belong to SC/ST/OBC.' },
                    ].map((opt) => {
                      const isSelected = casteCategory === opt.value
                      return (
                        <div key={opt.value} className="relative">
                          <button
                            type="button"
                            onClick={() => setValue('casteCategory', opt.value as any, { shouldDirty: true, shouldValidate: true })}
                            className={`flex w-full items-center justify-between rounded-lg border-2 p-4 text-left text-base font-medium transition-all ${isSelected
                                ? 'border-primary bg-primary/5 text-primary shadow-sm'
                                : 'border-border bg-card text-foreground hover:border-muted-foreground'
                              }`}
                          >
                            <span className="pr-4 leading-normal">{opt.label}</span>
                            {opt.info && (
                              <div
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setActiveInfo(activeInfo === opt.value ? null : opt.value)
                                }}
                                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-serif font-semibold text-sm transition-all hover:bg-emerald-200 cursor-help"
                                title="Click for information"
                              >
                                i
                              </div>
                            )}
                          </button>
                          <AnimatePresence>
                            {activeInfo === opt.value && (
                              <motion.div
                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                animate={{ height: 'auto', opacity: 1, marginTop: 6 }}
                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                className="overflow-hidden rounded-md bg-muted/50 p-3 text-sm text-muted-foreground border-l-4 border-emerald-500"
                              >
                                {opt.info}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* ── PAGE 4: Disability & Minority Details ───────────────── */}
              {step === 3 && (
                <div className="space-y-6">
                  {/* Disability Status */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">
                      <span className="text-destructive">*</span>Do you identify as a person with a disability?
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      {[{ label: 'Yes', value: true }, { label: 'No', value: false }].map((opt) => {
                        const selected = disabilityStatus === opt.value
                        return (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() => {
                              setValue('disabilityStatus', opt.value, { shouldDirty: true, shouldValidate: true })
                              if (!opt.value) {
                                setValue('disabilityPercentage', '', { shouldDirty: true })
                              }
                            }}
                            className={`h-11 rounded-md border-2 px-4 text-center text-base font-medium transition-colors ${selected
                                ? 'border-green-600 bg-green-50/10 text-green-600 font-semibold'
                                : 'border-border bg-card hover:border-muted-foreground'
                              }`}
                            aria-pressed={selected}
                          >
                            {opt.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Conditional Render based on disabilityStatus */}
                  {disabilityStatus === true ? (
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">
                        <span className="text-destructive">*</span>What is your differently abled percentage?
                      </Label>
                      <Select
                        value={disabilityPercentage}
                        onValueChange={(v) => setValue('disabilityPercentage', v, { shouldDirty: true, shouldValidate: true })}
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="-- Select One --" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="-- Select One --">-- Select One --</SelectItem>
                          {['Below 40%', '40% - 59%', '60% - 79%', '80% and above'].map((p) => (
                            <SelectItem key={p} value={p}>
                              {p}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">
                        <span className="text-destructive">*</span>Do you belong to minority?
                      </Label>
                      <div className="grid grid-cols-2 gap-3">
                        {[{ label: 'Yes', value: true }, { label: 'No', value: false }].map((opt) => {
                          const selected = isMinority === opt.value
                          return (
                            <button
                              key={opt.label}
                              type="button"
                              onClick={() => setValue('isMinority', opt.value, { shouldDirty: true, shouldValidate: true })}
                              className={`h-11 rounded-md border-2 px-4 text-center text-base font-medium transition-colors ${selected
                                  ? 'border-green-600 bg-green-50/10 text-green-600 font-semibold'
                                  : 'border-border bg-card hover:border-muted-foreground'
                                }`}
                              aria-pressed={selected}
                            >
                              {opt.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── PAGE 5: Student & Employment Details ───────────────── */}
              {step === 4 && (
                <div className="space-y-6">
                  {/* Are you a student? */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">
                      <span className="text-destructive">*</span>Are you a student?
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      {[{ label: 'Yes', value: true }, { label: 'No', value: false }].map((opt) => {
                        const selected = isStudent === opt.value
                        return (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() => {
                              setValue('isStudent', opt.value, { shouldDirty: true, shouldValidate: true })
                              if (opt.value) {
                                setValue('employmentStatus', 'Student', { shouldDirty: true, shouldValidate: true })
                                setValue('isGovernmentEmployee', false, { shouldDirty: true })
                                setValue('occupation', 'Student', { shouldDirty: true, shouldValidate: true })
                              } else {
                                setValue('employmentStatus', '' as any, { shouldDirty: true })
                                setValue('occupation', '', { shouldDirty: true })
                              }
                            }}
                            className={`h-11 rounded-md border-2 px-4 text-center text-base font-medium transition-colors ${selected
                                ? 'border-green-600 bg-green-50/10 text-green-600 font-semibold'
                                : 'border-border bg-card hover:border-muted-foreground'
                              }`}
                            aria-pressed={selected}
                          >
                            {opt.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* If not a student, show employment status buttons */}
                  {isStudent === false && (
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">
                        <span className="text-destructive">*</span>What is your current employment status?
                      </Label>
                      <div className="space-y-2">
                        {[
                          { label: 'Employed', value: 'Employed' },
                          { label: 'Unemployed', value: 'Unemployed' },
                          { label: 'Self-Employed/ Entrepreneur', value: 'Self-Employed' },
                        ].map((opt) => {
                          const selected = employmentStatus === opt.value
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setValue('employmentStatus', opt.value as any, { shouldDirty: true, shouldValidate: true })
                                if (opt.value !== 'Employed') {
                                  setValue('isGovernmentEmployee', false, { shouldDirty: true })
                                }
                                if (opt.value === 'Unemployed') {
                                  setValue('occupation', 'Unemployed', { shouldDirty: true, shouldValidate: true })
                                } else {
                                  setValue('occupation', '', { shouldDirty: true })
                                }
                              }}
                              className={`flex w-full items-center justify-between rounded-lg border-2 p-4 text-left text-base font-medium transition-all ${selected
                                  ? 'border-green-600 bg-green-50/10 text-green-600 font-semibold shadow-sm'
                                  : 'border-border bg-card text-foreground hover:border-muted-foreground'
                                }`}
                            >
                              {opt.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Govt Employee (only if Employed) */}
                  {isStudent === false && employmentStatus === 'Employed' && (
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">
                        <span className="text-destructive">*</span>Are you currently working as a government employee?
                      </Label>
                      <div className="grid grid-cols-2 gap-3">
                        {[{ label: 'Yes', value: true }, { label: 'No', value: false }].map((opt) => {
                          const selected = isGovernmentEmployee === opt.value
                          return (
                            <button
                              key={opt.label}
                              type="button"
                              onClick={() => {
                                setValue('isGovernmentEmployee', opt.value, { shouldDirty: true, shouldValidate: true })
                                if (opt.value) {
                                  setValue('occupation', 'Government Employee', { shouldDirty: true, shouldValidate: true })
                                } else {
                                  setValue('occupation', '', { shouldDirty: true })
                                }
                              }}
                              className={`h-11 rounded-md border-2 px-4 text-center text-base font-medium transition-colors ${
                                selected
                                  ? 'border-green-600 bg-green-50/10 text-green-600 font-semibold'
                                  : 'border-border bg-card hover:border-muted-foreground'
                              }`}
                              aria-pressed={selected}
                            >
                              {opt.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* ── PAGE 6: Economic Details ─────────────────────────────── */}
              {step === 5 && (
                <div className="space-y-6">
                  {isStudent === false && employmentStatus === 'Employed' && isGovernmentEmployee === true ? (
                    <>
                      {/* Disability Status */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Label className="text-base font-semibold">
                            <span className="text-destructive">*</span>Do you identify as a person with a disability?
                          </Label>
                          <button
                            type="button"
                            onClick={() => setActiveInfo(activeInfo === 'gov_disability' ? null : 'gov_disability')}
                            className="rounded-full p-0.5 text-emerald-600 hover:bg-emerald-50 transition-colors inline-flex items-center justify-center"
                          >
                            <Info className="h-5 w-5 fill-emerald-500/10" />
                          </button>
                        </div>

                        <AnimatePresence>
                          {activeInfo === 'gov_disability' && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden rounded-md bg-muted/50 p-3 text-sm text-muted-foreground border-l-4 border-emerald-500"
                            >
                              Persons with 40% or more disability are eligible for special reservation and concessions in government schemes.
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="grid grid-cols-2 gap-3">
                          {[{ label: 'Yes', value: true }, { label: 'No', value: false }].map((opt) => {
                            const selected = disabilityStatus === opt.value
                            return (
                              <button
                                key={opt.label}
                                type="button"
                                onClick={() => {
                                  setValue('disabilityStatus', opt.value, { shouldDirty: true, shouldValidate: true })
                                  if (!opt.value) {
                                    setValue('disabilityPercentage', '', { shouldDirty: true })
                                  }
                                }}
                                className={`h-11 rounded-md border-2 px-4 text-center text-base font-medium transition-colors ${
                                  selected
                                    ? 'border-green-600 bg-green-50/10 text-green-600 font-semibold'
                                    : 'border-border bg-card hover:border-muted-foreground'
                                }`}
                                aria-pressed={selected}
                              >
                                {opt.label}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Conditional Render based on disabilityStatus */}
                      {disabilityStatus === true ? (
                        <div className="space-y-2">
                          <Label className="text-base font-semibold">
                            <span className="text-destructive">*</span>What is your differently abled percentage?
                          </Label>
                          <Select
                            value={disabilityPercentage}
                            onValueChange={(v) => setValue('disabilityPercentage', v, { shouldDirty: true, shouldValidate: true })}
                          >
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="-- Select One --" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="-- Select One --">-- Select One --</SelectItem>
                              {['Below 40%', '40% - 59%', '60% - 79%', '80% and above'].map((p) => (
                                <SelectItem key={p} value={p}>
                                  {p}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Label className="text-base font-semibold">
                              <span className="text-destructive">*</span>Do you belong to minority?
                            </Label>
                            <button
                              type="button"
                              onClick={() => setActiveInfo(activeInfo === 'gov_minority' ? null : 'gov_minority')}
                              className="rounded-full p-0.5 text-emerald-600 hover:bg-emerald-50 transition-colors inline-flex items-center justify-center"
                            >
                              <Info className="h-5 w-5 fill-emerald-500/10" />
                            </button>
                          </div>

                          <AnimatePresence>
                            {activeInfo === 'gov_minority' && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden rounded-md bg-muted/50 p-3 text-sm text-muted-foreground border-l-4 border-emerald-500"
                              >
                                Minority communities include Muslims, Christians, Sikhs, Buddhists, Zoroastrians (Parsis), and Jains.
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <div className="grid grid-cols-2 gap-3">
                            {[{ label: 'Yes', value: true }, { label: 'No', value: false }].map((opt) => {
                              const selected = isMinority === opt.value
                              return (
                                <button
                                  key={opt.label}
                                  type="button"
                                  onClick={() => setValue('isMinority', opt.value, { shouldDirty: true, shouldValidate: true })}
                                  className={`h-11 rounded-md border-2 px-4 text-center text-base font-medium transition-colors ${
                                    selected
                                      ? 'border-green-600 bg-green-50/10 text-green-600 font-semibold'
                                      : 'border-border bg-card hover:border-muted-foreground'
                                  }`}
                                  aria-pressed={selected}
                                >
                                  {opt.label}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {/* Occupation Select */}
                      {employmentStatus !== 'Unemployed' && (
                        <div className="space-y-2">
                          <Label htmlFor="occupation" className="text-base font-semibold">
                            <span className="text-destructive">*</span>Is your occupation one of the following?
                          </Label>
                          <p className="text-xs text-muted-foreground mt-[-4px] mb-1">*Select One</p>
                          <Select
                            value={occupation}
                            onValueChange={(v) => {
                              setValue('occupation', v, { shouldDirty: true, shouldValidate: true })
                              setValue('isFarmer', v === 'Farmer / Agricultural Worker', { shouldDirty: true })
                              setValue('isArtisan', v === 'Artisan / Craftsman / Weaver', { shouldDirty: true })
                              setValue('isAnimalHusbandryOrFisheries', v === 'Involved in Animal Husbandry / Fisheries', { shouldDirty: true })
                              setValue('isStartupOwner', v === 'Startup Owner / Entrepreneur', { shouldDirty: true })
                            }}
                          >
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="-- Occupation --" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="-- Occupation --" disabled>-- Occupation --</SelectItem>
                              {[
                                'Farmer / Agricultural Worker',
                                'Artisan / Craftsman / Weaver',
                                'Involved in Animal Husbandry / Fisheries',
                                'Startup Owner / Entrepreneur',
                                'Self-Employed / Other Business',
                                'Private Sector Employee',
                                'Unemployed',
                                'Other',
                              ].map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                  {opt}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.occupation && <p className="text-sm text-destructive">{errors.occupation.message}</p>}
                        </div>
                      )}

                      {/* BPL Category Selection */}
                      <div className="space-y-3">
                        <Label className="text-base font-semibold">
                          <span className="text-destructive">*</span>Do you belong to BPL category?
                        </Label>
                        <div className="grid grid-cols-2 gap-3">
                          {[{ label: 'Yes', value: true }, { label: 'No', value: false }].map((opt) => {
                            const selected = bplStatus === opt.value
                            return (
                              <button
                                key={opt.label}
                                type="button"
                                onClick={() => {
                                  setValue('bplStatus', opt.value, { shouldDirty: true, shouldValidate: true })
                                  if (opt.value) {
                                    setValue('familyIncome', undefined, { shouldDirty: true })
                                    setValue('parentGuardianIncome', undefined, { shouldDirty: true })
                                  } else {
                                    setValue('isInHardship', false, { shouldDirty: true })
                                  }
                                }}
                                className={`h-11 rounded-md border-2 px-4 text-center text-base font-medium transition-colors ${
                                  selected
                                    ? 'border-green-600 bg-green-50/10 text-green-600 font-semibold'
                                    : 'border-border bg-card hover:border-muted-foreground'
                                }`}
                                aria-pressed={selected}
                              >
                                {opt.label}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Conditionally render based on BPL status */}
                      {bplStatus === true ? (
                        <div className="space-y-3">
                          <Label className="text-base font-semibold">
                            <span className="text-destructive">*</span>Are you in any of the following condition - Destitute /Penury /Extreme Hardship /Distress
                          </Label>
                          <div className="grid grid-cols-2 gap-3">
                            {[{ label: 'Yes', value: true }, { label: 'No', value: false }].map((opt) => {
                              const selected = isInHardship === opt.value
                              return (
                                <button
                                  key={opt.label}
                                  type="button"
                                  onClick={() => setValue('isInHardship', opt.value, { shouldDirty: true, shouldValidate: true })}
                                  className={`h-11 rounded-md border-2 px-4 text-center text-base font-medium transition-colors ${
                                    selected
                                      ? 'border-green-600 bg-green-50/10 text-green-600 font-semibold'
                                      : 'border-border bg-card hover:border-muted-foreground'
                                  }`}
                                  aria-pressed={selected}
                                >
                                  {opt.label}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      ) : bplStatus === false ? (
                        <div className="space-y-2">
                          <Label htmlFor="familyIncome" className="text-base font-semibold">
                            What is your family's annual income?
                          </Label>
                          <Input
                            id="familyIncome"
                            type="number"
                            min={0}
                            {...register('familyIncome', { valueAsNumber: true })}
                            placeholder="Enter here"
                            className="h-11"
                          />
                          {errors.familyIncome && <p className="text-sm text-destructive">{errors.familyIncome.message}</p>}
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
              )}

              {/* ── PAGE 7: Preferences & Additional Filters ─────────────── */}
              {step === 6 && (
                <div className="space-y-6">
                  {/* Scheme Categories */}
                  <div className="space-y-3">
                    <div>
                      <Label className="text-base font-semibold">Scheme Categories</Label>
                      <p className="text-sm text-muted-foreground">Select categories you want to explore. Leave all unchecked to see all.</p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {PREFERRED_SCHEME_CATEGORIES.map((category) => {
                        const selected = preferredCategories.includes(category)
                        return (
                          <div key={category} className="flex items-center gap-3">
                            <Checkbox
                              id={`category-${category}`}
                              checked={selected}
                              onCheckedChange={(checked) => {
                                setValue(
                                  'preferredCategories',
                                  checked ? [...preferredCategories, category] : preferredCategories.filter((item) => item !== category),
                                  { shouldDirty: true, shouldValidate: true },
                                )
                              }}
                            />
                            <Label htmlFor={`category-${category}`} className="cursor-pointer">{category}</Label>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Additional Filters */}
                  <div className="border-t pt-5">
                    <Label className="text-base font-semibold">Additional Filters</Label>
                    <p className="text-sm text-muted-foreground mb-3">Check all that apply to you</p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {([
                        ['isFarmer', 'Farmer / Agricultural Worker'],
                        ['isWidow', 'Widow'],
                        ['isSeniorCitizen', 'Senior Citizen (60+)'],
                        ['isStartupOwner', 'Startup Owner'],
                        ['skillDevelopmentInterest', 'Interested in Skill Development'],
                        ['isArtisan', 'Artisan / Craftsman / Weaver'],
                        ['isAnimalHusbandryOrFisheries', 'Involved in Animal Husbandry / Fisheries'],
                      ] as const).map(([field, label]) => {
                        const watchedFields = {
                          isFarmer,
                          isWidow,
                          isSeniorCitizen,
                          isStartupOwner,
                          skillDevelopmentInterest,
                          isArtisan,
                          isAnimalHusbandryOrFisheries,
                        }
                        return (
                          <div key={field} className="flex items-center gap-3">
                            <Checkbox
                              id={field}
                              checked={watchedFields[field]}
                              onCheckedChange={(v) => setValue(field as any, !!v, { shouldDirty: true })}
                            />
                            <Label htmlFor={field} className="cursor-pointer">{label}</Label>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-between gap-4">
            <Button type="button" variant="outline" onClick={prevStep} disabled={step === 0}>
              {t('form.prev')}
            </Button>
            {activeStepIndex < totalActiveSteps - 1 ? (
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
