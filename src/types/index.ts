export type CasteCategory = 'General' | 'OBC' | 'PVTG' | 'SC' | 'ST' | 'DNT' | 'EWS'
export type Gender = 'Male' | 'Female' | 'Other'
export type MaritalStatus = 'Single' | 'Married' | 'Widowed' | 'Divorced'
export type EmploymentStatus = 'Employed' | 'Unemployed' | 'Self-Employed' | 'Student' | 'Retired' | 'Farmer' | 'Startup Owner'
export type Qualification = 'Below 10th' | '10th' | '12th' | 'Graduate' | 'Post Graduate' | 'PhD'
export type CollegeType = 'Government' | 'Private' | 'NA'
export type AreaType = 'Rural' | 'Urban'
export type SchemeCategory = 
  | 'Education' | 'Health' | 'Agriculture' | 'Employment' | 'Housing' | 'Women' 
  | 'Senior Citizen' | 'Startup' | 'Skill Development' | 'Social Welfare'
  | 'Disability Welfare' | 'Animal Husbandry & Fisheries' | 'Traditional Crafts & Artisans' | 'Senior Citizen Welfare'
  | 'Skills & Employment' | 'Women & Child' | 'Business & Entrepreneurship'
export type EligibilityStatus = 'eligible' | 'partial' | 'not_eligible'

export interface UserProfile {
  fullName?: string
  age: number
  gender: Gender
  maritalStatus: MaritalStatus
  disabilityStatus: boolean
  casteCategory: CasteCategory
  familyIncome: number
  employmentStatus: EmploymentStatus
  bplStatus: boolean
  isStudent: boolean
  qualification: Qualification
  collegeType: CollegeType
  state: string
  district: string
  areaType: AreaType
  isFarmer: boolean
  isWidow: boolean
  isSeniorCitizen: boolean
  isMinority: boolean
  isStartupOwner: boolean
  skillDevelopmentInterest: boolean
  isArtisan: boolean
  isAnimalHusbandryOrFisheries: boolean
}

export interface SchemeRules {
  minAge?: number
  maxAge?: number
  incomeLimit?: number
  categories?: CasteCategory[]
  studentOnly?: boolean
  bplOnly?: boolean
  farmerOnly?: boolean
  widowOnly?: boolean
  seniorCitizenOnly?: boolean
  minorityOnly?: boolean
  startupOwnerOnly?: boolean
  skillDevelopmentOnly?: boolean
  disabilityOnly?: boolean
  artisanOnly?: boolean
  husbandryOrFisheriesOnly?: boolean
  genders?: Gender[]
  states?: string[]
  areaTypes?: AreaType[]
  qualifications?: Qualification[]
  employmentStatuses?: EmploymentStatus[]
}

export interface Scheme {
  id: string
  slug: string
  name: string
  nameHi: string
  nameTe?: string
  nameKn?: string
  nameMl?: string
  nameTa?: string
  description: string
  descriptionHi: string
  descriptionTe?: string
  descriptionKn?: string
  descriptionMl?: string
  descriptionTa?: string
  category: SchemeCategory
  ministry: string
  benefits: string[]
  benefitsHi: string[]
  benefitsTe?: string[]
  benefitsKn?: string[]
  benefitsMl?: string[]
  benefitsTa?: string[]
  documents: string[]
  documentsHi: string[]
  documentsTe?: string[]
  documentsKn?: string[]
  documentsMl?: string[]
  documentsTa?: string[]
  deadline?: string
  officialUrl: string
  applyUrl: string
  rules: SchemeRules
  featured: boolean
  popularity: number
  imageUrl?: string
}

export interface EligibilityResult {
  scheme: Scheme
  status: EligibilityStatus
  score: number
  matchedCriteria: string[]
  missedCriteria: string[]
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: string
}

export type ChatRole = 'user' | 'assistant'

export interface ChatMessage {
  id: string
  role: ChatRole
  content: string
  createdAt: number
}

export interface SchemeModel {
  id: string
  scheme_name: string
  category: SchemeCategory
  beneficiaries: string[]
  state: string
  income_limit: number | null
  age_limit: {
    min: number | null
    max: number | null
  }
  eligibility: string[]
  benefits: string[]
  documents: string[]
  application_process: string[]
  apply_link: string
  official_link: string
  source: string
  last_date?: string | null
  filters: {
    caste?: CasteCategory[]
    state?: string[]
    age?: { min?: number; max?: number }
    gender?: Gender[]
    occupation?: EmploymentStatus[]
    income?: number
    disabilityStatus?: boolean
    studentOnly?: boolean
    farmerOnly?: boolean
    bplOnly?: boolean
    minorityOnly?: boolean
    widowOnly?: boolean
    seniorCitizenOnly?: boolean
    startupOwnerOnly?: boolean
    skillDevelopmentOnly?: boolean
  }
}

export interface ExtractedUserProfile {
  caste?: CasteCategory
  state?: string
  age?: number
  gender?: Gender
  occupation?: EmploymentStatus
  education?: string
  income?: number
  disabilityStatus?: boolean
  isStudent?: boolean
  isFarmer?: boolean
  isWidow?: boolean
  isMinority?: boolean
  isSeniorCitizen?: boolean
  isStartupOwner?: boolean
  skillDevelopmentInterest?: boolean
  bplStatus?: boolean
}

export interface RankedScheme {
  scheme: SchemeModel
  rank: number
  semanticScore: number
  eligibilityScore: number
  confidenceScore: number
  matchStrength: 'strong' | 'possible' | 'low'
  eligible: boolean
  matchedCriteria: string[]
  missingInformation: string[]
  disqualifyingCriteria: string[]
}

export interface Feedback {
  id: string
  name: string
  email: string
  subject: string
  comment: string
  rating: number
  createdAt: string
}
