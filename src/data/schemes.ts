import type { Scheme } from '@/types'

export const schemes: Scheme[] = [
  {
    "id": "pm-kisan-samman-nidhi",
    "slug": "pm-kisan-samman-nidhi",
    "name": "PM-KISAN Samman Nidhi",
    "nameHi": "PM-KISAN Samman Nidhi",
    "description": "Income support for eligible landholding farmer families.",
    "descriptionHi": "Income support for eligible landholding farmer families.",
    "category": "Agriculture",
    "ministry": "Ministry of Agriculture & Farmers Welfare",
    "benefits": [
      "\u20b96,000 per year in 3 equal instalments",
      "direct bank transfer"
    ],
    "benefitsHi": [
      "\u20b96,000 per year in 3 equal instalments",
      "direct bank transfer"
    ],
    "documents": [
      "Aadhaar",
      "land ownership/land record",
      "bank account details",
      "mobile number"
    ],
    "documentsHi": [
      "Aadhaar",
      "land ownership/land record",
      "bank account details",
      "mobile number"
    ],
    "deadline": "Ongoing / no fixed annual application deadline",
    "officialUrl": "https://pmkisan.gov.in/",
    "applyUrl": "https://pmkisan.gov.in/",
    "rules": {
      "farmerOnly": true,
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "pradhan-mantri-fasal-bima-yojana-pmfby",
    "slug": "pradhan-mantri-fasal-bima-yojana-pmfby",
    "name": "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    "nameHi": "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    "description": "Crop insurance against specified crop losses and risks.",
    "descriptionHi": "Crop insurance against specified crop losses and risks.",
    "category": "Agriculture",
    "ministry": "Ministry of Agriculture & Farmers Welfare",
    "benefits": [
      "Crop insurance coverage",
      "financial support for admissible crop losses",
      "premium subsidy"
    ],
    "benefitsHi": [
      "Crop insurance coverage",
      "financial support for admissible crop losses",
      "premium subsidy"
    ],
    "documents": [
      "Aadhaar",
      "bank details",
      "land/tenancy record",
      "crop details",
      "sowing declaration as applicable"
    ],
    "documentsHi": [
      "Aadhaar",
      "bank details",
      "land/tenancy record",
      "crop details",
      "sowing declaration as applicable"
    ],
    "deadline": "Seasonal deadline; varies by crop/state",
    "officialUrl": "https://pmfby.gov.in/",
    "applyUrl": "https://pmfby.gov.in/",
    "rules": {
      "farmerOnly": true,
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "kisan-credit-card-kcc",
    "slug": "kisan-credit-card-kcc",
    "name": "Kisan Credit Card (KCC)",
    "nameHi": "Kisan Credit Card (KCC)",
    "description": "Credit facility for farmers' cultivation and allied needs.",
    "descriptionHi": "Credit facility for farmers' cultivation and allied needs.",
    "category": "Agriculture",
    "ministry": "Ministry of Finance / Department of Financial Services",
    "benefits": [
      "Short-term agricultural credit",
      "flexible credit limit",
      "interest benefits subject to rules"
    ],
    "benefitsHi": [
      "Short-term agricultural credit",
      "flexible credit limit",
      "interest benefits subject to rules"
    ],
    "documents": [
      "Aadhaar/KYC",
      "land records",
      "photographs",
      "bank application",
      "crop/allied activity details"
    ],
    "documentsHi": [
      "Aadhaar/KYC",
      "land records",
      "photographs",
      "bank application",
      "crop/allied activity details"
    ],
    "deadline": "Ongoing / subject to bank processing",
    "officialUrl": "https://www.kcc.gov.in/",
    "applyUrl": "https://www.kcc.gov.in/",
    "rules": {
      "farmerOnly": true,
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "pradhan-mantri-krishi-sinchayee-yojana-pmksy",
    "slug": "pradhan-mantri-krishi-sinchayee-yojana-pmksy",
    "name": "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
    "nameHi": "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
    "description": "Promotes irrigation access and water-use efficiency.",
    "descriptionHi": "Promotes irrigation access and water-use efficiency.",
    "category": "Agriculture",
    "ministry": "Ministry of Jal Shakti / Ministry of Agriculture & Farmers Welfare",
    "benefits": [
      "Support for irrigation infrastructure",
      "micro-irrigation and water-use efficiency"
    ],
    "benefitsHi": [
      "Support for irrigation infrastructure",
      "micro-irrigation and water-use efficiency"
    ],
    "documents": [
      "Aadhaar/KYC",
      "land record",
      "bank details",
      "farmer registration",
      "component-specific documents"
    ],
    "documentsHi": [
      "Aadhaar/KYC",
      "land record",
      "bank details",
      "farmer registration",
      "component-specific documents"
    ],
    "deadline": "Component/state-specific",
    "officialUrl": "https://pmksy.gov.in/",
    "applyUrl": "https://pmksy.gov.in/",
    "rules": {
      "farmerOnly": true,
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "soil-health-card-scheme",
    "slug": "soil-health-card-scheme",
    "name": "Soil Health Card Scheme",
    "nameHi": "Soil Health Card Scheme",
    "description": "Provides soil testing and nutrient recommendations.",
    "descriptionHi": "Provides soil testing and nutrient recommendations.",
    "category": "Agriculture",
    "ministry": "Ministry of Agriculture & Farmers Welfare",
    "benefits": [
      "Soil health report",
      "fertilizer/nutrient recommendations",
      "improved input planning"
    ],
    "benefitsHi": [
      "Soil health report",
      "fertilizer/nutrient recommendations",
      "improved input planning"
    ],
    "documents": [
      "Farmer details",
      "land/survey details",
      "sample information"
    ],
    "documentsHi": [
      "Farmer details",
      "land/survey details",
      "sample information"
    ],
    "deadline": "Ongoing / as testing cycle permits",
    "officialUrl": "https://soilhealth.dac.gov.in/",
    "applyUrl": "https://soilhealth.dac.gov.in/",
    "rules": {
      "farmerOnly": true,
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "national-agriculture-market-e-nam",
    "slug": "national-agriculture-market-e-nam",
    "name": "National Agriculture Market (e-NAM)",
    "nameHi": "National Agriculture Market (e-NAM)",
    "description": "Electronic trading platform linking agricultural markets.",
    "descriptionHi": "Electronic trading platform linking agricultural markets.",
    "category": "Agriculture",
    "ministry": "Ministry of Agriculture & Farmers Welfare",
    "benefits": [
      "Online market access",
      "transparent price discovery",
      "wider buyer access"
    ],
    "benefitsHi": [
      "Online market access",
      "transparent price discovery",
      "wider buyer access"
    ],
    "documents": [
      "Farmer registration/KYC",
      "bank details",
      "mandi/APMC details",
      "produce details"
    ],
    "documentsHi": [
      "Farmer registration/KYC",
      "bank details",
      "mandi/APMC details",
      "produce details"
    ],
    "deadline": "Ongoing / market-specific",
    "officialUrl": "https://www.enam.gov.in/",
    "applyUrl": "https://www.enam.gov.in/",
    "rules": {
      "farmerOnly": true,
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "paramparagat-krishi-vikas-yojana-pkvy",
    "slug": "paramparagat-krishi-vikas-yojana-pkvy",
    "name": "Paramparagat Krishi Vikas Yojana (PKVY)",
    "nameHi": "Paramparagat Krishi Vikas Yojana (PKVY)",
    "description": "Supports cluster-based organic farming.",
    "descriptionHi": "Supports cluster-based organic farming.",
    "category": "Agriculture",
    "ministry": "Ministry of Agriculture & Farmers Welfare",
    "benefits": [
      "Support for organic farming clusters",
      "training",
      "certification and input support"
    ],
    "benefitsHi": [
      "Support for organic farming clusters",
      "training",
      "certification and input support"
    ],
    "documents": [
      "Farmer/cluster registration",
      "land details",
      "Aadhaar/KYC",
      "bank details"
    ],
    "documentsHi": [
      "Farmer/cluster registration",
      "land details",
      "Aadhaar/KYC",
      "bank details"
    ],
    "deadline": "State/component-specific",
    "officialUrl": "https://pgsindia-ncof.gov.in/",
    "applyUrl": "https://pgsindia-ncof.gov.in/",
    "rules": {
      "farmerOnly": true,
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "rashtriya-krishi-vikas-yojana-rkvy",
    "slug": "rashtriya-krishi-vikas-yojana-rkvy",
    "name": "Rashtriya Krishi Vikas Yojana (RKVY)",
    "nameHi": "Rashtriya Krishi Vikas Yojana (RKVY)",
    "description": "Supports state agriculture development projects.",
    "descriptionHi": "Supports state agriculture development projects.",
    "category": "Agriculture",
    "ministry": "Ministry of Agriculture & Farmers Welfare",
    "benefits": [
      "Support for agriculture infrastructure, innovation and value-chain projects"
    ],
    "benefitsHi": [
      "Support for agriculture infrastructure, innovation and value-chain projects"
    ],
    "documents": [
      "Project/application form",
      "land/activity details",
      "KYC",
      "bank details",
      "component documents"
    ],
    "documentsHi": [
      "Project/application form",
      "land/activity details",
      "KYC",
      "bank details",
      "component documents"
    ],
    "deadline": "State/project-specific",
    "officialUrl": "https://rkvy.nic.in/",
    "applyUrl": "https://rkvy.nic.in/",
    "rules": {
      "farmerOnly": true,
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "national-horticulture-mission--mission-for-integrated-development-of-horticulture-midh",
    "slug": "national-horticulture-mission--mission-for-integrated-development-of-horticulture-midh",
    "name": "National Horticulture Mission / Mission for Integrated Development of Horticulture (MIDH)",
    "nameHi": "National Horticulture Mission / Mission for Integrated Development of Horticulture (MIDH)",
    "description": "Supports horticulture production, infrastructure and post-harvest activities.",
    "descriptionHi": "Supports horticulture production, infrastructure and post-harvest activities.",
    "category": "Agriculture",
    "ministry": "Ministry of Agriculture & Farmers Welfare",
    "benefits": [
      "Subsidy/support for horticulture crops, planting material, infrastructure and post-harvest facilities"
    ],
    "benefitsHi": [
      "Subsidy/support for horticulture crops, planting material, infrastructure and post-harvest facilities"
    ],
    "documents": [
      "Aadhaar/KYC",
      "land record",
      "project proposal",
      "bank details",
      "quotations as applicable"
    ],
    "documentsHi": [
      "Aadhaar/KYC",
      "land record",
      "project proposal",
      "bank details",
      "quotations as applicable"
    ],
    "deadline": "State/component-specific",
    "officialUrl": "https://midh.gov.in/",
    "applyUrl": "https://midh.gov.in/",
    "rules": {
      "farmerOnly": true,
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "agriculture-infrastructure-fund-aif",
    "slug": "agriculture-infrastructure-fund-aif",
    "name": "Agriculture Infrastructure Fund (AIF)",
    "nameHi": "Agriculture Infrastructure Fund (AIF)",
    "description": "Financing facility for post-harvest and community farm infrastructure.",
    "descriptionHi": "Financing facility for post-harvest and community farm infrastructure.",
    "category": "Agriculture",
    "ministry": "Ministry of Agriculture & Farmers Welfare",
    "benefits": [
      "Interest subvention",
      "credit guarantee support for eligible projects",
      "infrastructure financing"
    ],
    "benefitsHi": [
      "Interest subvention",
      "credit guarantee support for eligible projects",
      "infrastructure financing"
    ],
    "documents": [
      "KYC",
      "project report",
      "land/lease documents",
      "bank details",
      "entity registration documents"
    ],
    "documentsHi": [
      "KYC",
      "project report",
      "land/lease documents",
      "bank details",
      "entity registration documents"
    ],
    "deadline": "Ongoing / scheme period subject to guidelines",
    "officialUrl": "https://agriinfra.dac.gov.in/",
    "applyUrl": "https://agriinfra.dac.gov.in/",
    "rules": {
      "farmerOnly": true,
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "national-means-cum-merit-scholarship-scheme-nmmss",
    "slug": "national-means-cum-merit-scholarship-scheme-nmmss",
    "name": "National Means-cum-Merit Scholarship Scheme (NMMSS)",
    "nameHi": "National Means-cum-Merit Scholarship Scheme (NMMSS)",
    "description": "Scholarship to selected students to reduce secondary-level dropout.",
    "descriptionHi": "Scholarship to selected students to reduce secondary-level dropout.",
    "category": "Education",
    "ministry": "Ministry of Education",
    "benefits": [
      "\u20b912,000 per year for selected eligible students, subject to scheme rules"
    ],
    "benefitsHi": [
      "\u20b912,000 per year for selected eligible students, subject to scheme rules"
    ],
    "documents": [
      "Aadhaar",
      "income certificate",
      "marksheet",
      "bank account",
      "caste/category certificate if applicable",
      "school verification"
    ],
    "documentsHi": [
      "Aadhaar",
      "income certificate",
      "marksheet",
      "bank account",
      "caste/category certificate if applicable",
      "school verification"
    ],
    "deadline": "Annual scholarship cycle; deadline varies",
    "officialUrl": "https://www.education.gov.in/",
    "applyUrl": "https://scholarships.gov.in/",
    "rules": {
      "studentOnly": true,
      "incomeLimit": 300000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "central-sector-scheme-of-scholarship-for-college-and-university-students-csss",
    "slug": "central-sector-scheme-of-scholarship-for-college-and-university-students-csss",
    "name": "Central Sector Scheme of Scholarship for College and University Students (CSSS)",
    "nameHi": "Central Sector Scheme of Scholarship for College and University Students (CSSS)",
    "description": "Merit-based financial assistance for higher education students.",
    "descriptionHi": "Merit-based financial assistance for higher education students.",
    "category": "Education",
    "ministry": "Ministry of Education",
    "benefits": [
      "Annual scholarship support for eligible college/university students"
    ],
    "benefitsHi": [
      "Annual scholarship support for eligible college/university students"
    ],
    "documents": [
      "Aadhaar",
      "marksheet",
      "income certificate",
      "bank account",
      "admission/enrolment proof"
    ],
    "documentsHi": [
      "Aadhaar",
      "marksheet",
      "income certificate",
      "bank account",
      "admission/enrolment proof"
    ],
    "deadline": "Annual scholarship cycle; deadline varies",
    "officialUrl": "https://www.education.gov.in/",
    "applyUrl": "https://scholarships.gov.in/",
    "rules": {
      "studentOnly": true,
      "incomeLimit": 300000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "post-matric-scholarship-for-sc-students",
    "slug": "post-matric-scholarship-for-sc-students",
    "name": "Post Matric Scholarship for SC Students",
    "nameHi": "Post Matric Scholarship for SC Students",
    "description": "Financial support for eligible SC students after matriculation.",
    "descriptionHi": "Financial support for eligible SC students after matriculation.",
    "category": "Education",
    "ministry": "Ministry of Social Justice & Empowerment",
    "benefits": [
      "Tuition/compulsory fee support and maintenance allowance subject to rules"
    ],
    "benefitsHi": [
      "Tuition/compulsory fee support and maintenance allowance subject to rules"
    ],
    "documents": [
      "Caste certificate",
      "income certificate",
      "marksheet",
      "admission proof",
      "Aadhaar",
      "bank details"
    ],
    "documentsHi": [
      "Caste certificate",
      "income certificate",
      "marksheet",
      "admission proof",
      "Aadhaar",
      "bank details"
    ],
    "deadline": "Annual/state-specific deadline",
    "officialUrl": "https://socialjustice.gov.in/",
    "applyUrl": "https://scholarships.gov.in/",
    "rules": {
      "studentOnly": true,
      "incomeLimit": 300000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "post-matric-scholarship-for-obcebcdnt-students",
    "slug": "post-matric-scholarship-for-obcebcdnt-students",
    "name": "Post Matric Scholarship for OBC/EBC/DNT Students",
    "nameHi": "Post Matric Scholarship for OBC/EBC/DNT Students",
    "description": "Scholarship support for eligible OBC, EBC and DNT students.",
    "descriptionHi": "Scholarship support for eligible OBC, EBC and DNT students.",
    "category": "Education",
    "ministry": "Ministry of Social Justice & Empowerment",
    "benefits": [
      "Scholarship and educational expense support subject to eligibility"
    ],
    "benefitsHi": [
      "Scholarship and educational expense support subject to eligibility"
    ],
    "documents": [
      "Category certificate",
      "income certificate",
      "marksheet",
      "admission proof",
      "Aadhaar",
      "bank details"
    ],
    "documentsHi": [
      "Category certificate",
      "income certificate",
      "marksheet",
      "admission proof",
      "Aadhaar",
      "bank details"
    ],
    "deadline": "Annual/state-specific deadline",
    "officialUrl": "https://socialjustice.gov.in/",
    "applyUrl": "https://scholarships.gov.in/",
    "rules": {
      "studentOnly": true,
      "incomeLimit": 300000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "post-matric-scholarship-for-minorities",
    "slug": "post-matric-scholarship-for-minorities",
    "name": "Post Matric Scholarship for Minorities",
    "nameHi": "Post Matric Scholarship for Minorities",
    "description": "Scholarship for eligible students from notified minority communities.",
    "descriptionHi": "Scholarship for eligible students from notified minority communities.",
    "category": "Education",
    "ministry": "Ministry of Minority Affairs",
    "benefits": [
      "Course fee and maintenance support subject to scheme limits"
    ],
    "benefitsHi": [
      "Course fee and maintenance support subject to scheme limits"
    ],
    "documents": [
      "Minority/community declaration or certificate as required",
      "income certificate",
      "marksheet",
      "admission proof",
      "bank details"
    ],
    "documentsHi": [
      "Minority/community declaration or certificate as required",
      "income certificate",
      "marksheet",
      "admission proof",
      "bank details"
    ],
    "deadline": "Annual scholarship cycle; deadline varies",
    "officialUrl": "https://minorityaffairs.gov.in/",
    "applyUrl": "https://scholarships.gov.in/",
    "rules": {
      "studentOnly": true,
      "incomeLimit": 300000,
      "minorityOnly": true
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "pre-matric-scholarship-for-minorities",
    "slug": "pre-matric-scholarship-for-minorities",
    "name": "Pre-Matric Scholarship for Minorities",
    "nameHi": "Pre-Matric Scholarship for Minorities",
    "description": "Scholarship support for eligible minority students at pre-matric level.",
    "descriptionHi": "Scholarship support for eligible minority students at pre-matric level.",
    "category": "Education",
    "ministry": "Ministry of Minority Affairs",
    "benefits": [
      "Scholarship assistance for eligible school students"
    ],
    "benefitsHi": [
      "Scholarship assistance for eligible school students"
    ],
    "documents": [
      "Income certificate",
      "school/admission details",
      "marksheet",
      "bank details",
      "Aadhaar"
    ],
    "documentsHi": [
      "Income certificate",
      "school/admission details",
      "marksheet",
      "bank details",
      "Aadhaar"
    ],
    "deadline": "Annual scholarship cycle; deadline varies",
    "officialUrl": "https://minorityaffairs.gov.in/",
    "applyUrl": "https://scholarships.gov.in/",
    "rules": {
      "studentOnly": true,
      "incomeLimit": 300000,
      "minorityOnly": true
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "aicte-pragati-scholarship-for-girls",
    "slug": "aicte-pragati-scholarship-for-girls",
    "name": "AICTE Pragati Scholarship for Girls",
    "nameHi": "AICTE Pragati Scholarship for Girls",
    "description": "Scholarship for eligible girl students in technical education.",
    "descriptionHi": "Scholarship for eligible girl students in technical education.",
    "category": "Education",
    "ministry": "Ministry of Education / AICTE",
    "benefits": [
      "Financial assistance for eligible girls pursuing technical diploma/degree"
    ],
    "benefitsHi": [
      "Financial assistance for eligible girls pursuing technical diploma/degree"
    ],
    "documents": [
      "Aadhaar",
      "income certificate",
      "admission proof",
      "marksheet",
      "bank details",
      "institution verification"
    ],
    "documentsHi": [
      "Aadhaar",
      "income certificate",
      "admission proof",
      "marksheet",
      "bank details",
      "institution verification"
    ],
    "deadline": "Annual cycle; deadline varies",
    "officialUrl": "https://www.aicte-india.org/",
    "applyUrl": "https://www.aicte-india.org/schemes/students-development-schemes",
    "rules": {
      "studentOnly": true,
      "incomeLimit": 300000,
      "genders": [
        "Female"
      ]
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "aicte-saksham-scholarship-scheme",
    "slug": "aicte-saksham-scholarship-scheme",
    "name": "AICTE Saksham Scholarship Scheme",
    "nameHi": "AICTE Saksham Scholarship Scheme",
    "description": "Scholarship for specially-abled students pursuing technical education.",
    "descriptionHi": "Scholarship for specially-abled students pursuing technical education.",
    "category": "Education",
    "ministry": "Ministry of Education / AICTE",
    "benefits": [
      "Financial assistance for eligible specially-abled technical students"
    ],
    "benefitsHi": [
      "Financial assistance for eligible specially-abled technical students"
    ],
    "documents": [
      "Disability certificate",
      "income certificate",
      "admission proof",
      "marksheet",
      "Aadhaar",
      "bank details"
    ],
    "documentsHi": [
      "Disability certificate",
      "income certificate",
      "admission proof",
      "marksheet",
      "Aadhaar",
      "bank details"
    ],
    "deadline": "Annual cycle; deadline varies",
    "officialUrl": "https://www.aicte-india.org/",
    "applyUrl": "https://www.aicte-india.org/schemes/students-development-schemes",
    "rules": {
      "studentOnly": true,
      "incomeLimit": 300000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "pm-yasasvi-scholarship-scheme",
    "slug": "pm-yasasvi-scholarship-scheme",
    "name": "PM YASASVI Scholarship Scheme",
    "nameHi": "PM YASASVI Scholarship Scheme",
    "description": "Educational support for eligible OBC, EBC and DNT students.",
    "descriptionHi": "Educational support for eligible OBC, EBC and DNT students.",
    "category": "Education",
    "ministry": "Ministry of Social Justice & Empowerment",
    "benefits": [
      "Scholarship/educational support according to the applicable PM YASASVI component"
    ],
    "benefitsHi": [
      "Scholarship/educational support according to the applicable PM YASASVI component"
    ],
    "documents": [
      "Category certificate",
      "income certificate",
      "marksheet",
      "admission proof",
      "Aadhaar",
      "bank details"
    ],
    "documentsHi": [
      "Category certificate",
      "income certificate",
      "marksheet",
      "admission proof",
      "Aadhaar",
      "bank details"
    ],
    "deadline": "Annual cycle; deadline varies",
    "officialUrl": "https://socialjustice.gov.in/",
    "applyUrl": "https://scholarships.gov.in/",
    "rules": {
      "studentOnly": true,
      "incomeLimit": 300000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "national-overseas-scholarship",
    "slug": "national-overseas-scholarship",
    "name": "National Overseas Scholarship",
    "nameHi": "National Overseas Scholarship",
    "description": "Financial assistance for eligible students pursuing higher studies abroad.",
    "descriptionHi": "Financial assistance for eligible students pursuing higher studies abroad.",
    "category": "Education",
    "ministry": "Ministry of Social Justice & Empowerment",
    "benefits": [
      "Tuition/fee support",
      "maintenance allowance",
      "travel and other admissible allowances"
    ],
    "benefitsHi": [
      "Tuition/fee support",
      "maintenance allowance",
      "travel and other admissible allowances"
    ],
    "documents": [
      "Admission/offer letter",
      "academic records",
      "income certificate",
      "category certificate",
      "passport",
      "bank details"
    ],
    "documentsHi": [
      "Admission/offer letter",
      "academic records",
      "income certificate",
      "category certificate",
      "passport",
      "bank details"
    ],
    "deadline": "Application windows announced periodically",
    "officialUrl": "https://socialjustice.gov.in/",
    "applyUrl": "https://nosmsje.gov.in/",
    "rules": {
      "studentOnly": true,
      "incomeLimit": 300000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "ayushman-bharat-pm-jay",
    "slug": "ayushman-bharat-pm-jay",
    "name": "Ayushman Bharat PM-JAY",
    "nameHi": "Ayushman Bharat PM-JAY",
    "description": "Health assurance for eligible families for secondary and tertiary hospitalization.",
    "descriptionHi": "Health assurance for eligible families for secondary and tertiary hospitalization.",
    "category": "Health",
    "ministry": "Ministry of Health & Family Welfare",
    "benefits": [
      "Cashless hospitalization cover up to \u20b95 lakh per family per year, subject to scheme rules"
    ],
    "benefitsHi": [
      "Cashless hospitalization cover up to \u20b95 lakh per family per year, subject to scheme rules"
    ],
    "documents": [
      "Aadhaar/ID",
      "PM-JAY beneficiary record",
      "ration/family details as applicable"
    ],
    "documentsHi": [
      "Aadhaar/ID",
      "PM-JAY beneficiary record",
      "ration/family details as applicable"
    ],
    "deadline": "Ongoing",
    "officialUrl": "https://pmjay.gov.in/",
    "applyUrl": "https://pmjay.gov.in/",
    "rules": {
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "ayushman-arogya-mandir",
    "slug": "ayushman-arogya-mandir",
    "name": "Ayushman Arogya Mandir",
    "nameHi": "Ayushman Arogya Mandir",
    "description": "Primary healthcare delivery through upgraded health facilities.",
    "descriptionHi": "Primary healthcare delivery through upgraded health facilities.",
    "category": "Health",
    "ministry": "Ministry of Health & Family Welfare",
    "benefits": [
      "Comprehensive primary healthcare",
      "screening",
      "maternal and child services",
      "essential drugs/diagnostics"
    ],
    "benefitsHi": [
      "Comprehensive primary healthcare",
      "screening",
      "maternal and child services",
      "essential drugs/diagnostics"
    ],
    "documents": [
      "Generally no scheme application documents for routine services",
      "ID may be requested for specific services"
    ],
    "documentsHi": [
      "Generally no scheme application documents for routine services",
      "ID may be requested for specific services"
    ],
    "deadline": "Ongoing / service-based",
    "officialUrl": "https://aam.mohfw.gov.in/",
    "applyUrl": "https://aam.mohfw.gov.in/",
    "rules": {
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "pradhan-mantri-bhartiya-janaushadhi-pariyojana-pmbjp",
    "slug": "pradhan-mantri-bhartiya-janaushadhi-pariyojana-pmbjp",
    "name": "Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP)",
    "nameHi": "Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP)",
    "description": "Makes quality generic medicines available at affordable prices.",
    "descriptionHi": "Makes quality generic medicines available at affordable prices.",
    "category": "Health",
    "ministry": "Department of Pharmaceuticals, Ministry of Chemicals & Fertilizers",
    "benefits": [
      "Affordable generic medicines",
      "access through Jan Aushadhi Kendras"
    ],
    "benefitsHi": [
      "Affordable generic medicines",
      "access through Jan Aushadhi Kendras"
    ],
    "documents": [
      "For purchase: prescription where required",
      "for opening a Kendra: KYC, premises, financial and eligibility documents"
    ],
    "documentsHi": [
      "For purchase: prescription where required",
      "for opening a Kendra: KYC, premises, financial and eligibility documents"
    ],
    "deadline": "Ongoing",
    "officialUrl": "https://janaushadhi.gov.in/",
    "applyUrl": "https://janaushadhi.gov.in/",
    "rules": {
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "janani-suraksha-yojana-jsy",
    "slug": "janani-suraksha-yojana-jsy",
    "name": "Janani Suraksha Yojana (JSY)",
    "nameHi": "Janani Suraksha Yojana (JSY)",
    "description": "Promotes institutional delivery among eligible pregnant women.",
    "descriptionHi": "Promotes institutional delivery among eligible pregnant women.",
    "category": "Health",
    "ministry": "Ministry of Health & Family Welfare",
    "benefits": [
      "Cash assistance for eligible beneficiaries",
      "support for institutional delivery"
    ],
    "benefitsHi": [
      "Cash assistance for eligible beneficiaries",
      "support for institutional delivery"
    ],
    "documents": [
      "Aadhaar/ID",
      "bank details",
      "pregnancy/MCH record",
      "eligibility/category proof as applicable"
    ],
    "documentsHi": [
      "Aadhaar/ID",
      "bank details",
      "pregnancy/MCH record",
      "eligibility/category proof as applicable"
    ],
    "deadline": "Ongoing / state implementation",
    "officialUrl": "https://nhm.gov.in/",
    "applyUrl": "https://nhm.gov.in/",
    "rules": {
      "incomeLimit": 250000,
      "genders": [
        "Female"
      ]
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "janani-shishu-suraksha-karyakram-jssk",
    "slug": "janani-shishu-suraksha-karyakram-jssk",
    "name": "Janani Shishu Suraksha Karyakram (JSSK)",
    "nameHi": "Janani Shishu Suraksha Karyakram (JSSK)",
    "description": "Provides free and cashless services to pregnant women and sick newborns in public facilities.",
    "descriptionHi": "Provides free and cashless services to pregnant women and sick newborns in public facilities.",
    "category": "Health",
    "ministry": "Ministry of Health & Family Welfare",
    "benefits": [
      "Free delivery/C-section",
      "drugs",
      "diagnostics",
      "diet",
      "blood",
      "transport and newborn care as per rules"
    ],
    "benefitsHi": [
      "Free delivery/C-section",
      "drugs",
      "diagnostics",
      "diet",
      "blood",
      "transport and newborn care as per rules"
    ],
    "documents": [
      "Pregnancy/MCH record",
      "ID where required",
      "hospital records"
    ],
    "documentsHi": [
      "Pregnancy/MCH record",
      "ID where required",
      "hospital records"
    ],
    "deadline": "Ongoing",
    "officialUrl": "https://nhm.gov.in/",
    "applyUrl": "https://nhm.gov.in/",
    "rules": {
      "incomeLimit": 250000,
      "genders": [
        "Female"
      ]
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "pradhan-mantri-matru-vandana-yojana-pmmvy",
    "slug": "pradhan-mantri-matru-vandana-yojana-pmmvy",
    "name": "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    "nameHi": "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    "description": "Maternity benefit scheme for eligible pregnant and lactating women.",
    "descriptionHi": "Maternity benefit scheme for eligible pregnant and lactating women.",
    "category": "Health",
    "ministry": "Ministry of Women & Child Development",
    "benefits": [
      "Maternity cash benefit for eligible beneficiaries subject to scheme conditions"
    ],
    "benefitsHi": [
      "Maternity cash benefit for eligible beneficiaries subject to scheme conditions"
    ],
    "documents": [
      "Aadhaar",
      "bank/post-office account",
      "pregnancy/MCP card",
      "birth certificate",
      "child immunization details as applicable"
    ],
    "documentsHi": [
      "Aadhaar",
      "bank/post-office account",
      "pregnancy/MCP card",
      "birth certificate",
      "child immunization details as applicable"
    ],
    "deadline": "Ongoing / application through prescribed channel",
    "officialUrl": "https://wcd.gov.in/",
    "applyUrl": "https://pmmvy.wcd.gov.in/",
    "rules": {
      "incomeLimit": 250000,
      "genders": [
        "Female"
      ]
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "national-programme-for-health-care-of-the-elderly-nphce",
    "slug": "national-programme-for-health-care-of-the-elderly-nphce",
    "name": "National Programme for Health Care of the Elderly (NPHCE)",
    "nameHi": "National Programme for Health Care of the Elderly (NPHCE)",
    "description": "Provides geriatric healthcare services through public health facilities.",
    "descriptionHi": "Provides geriatric healthcare services through public health facilities.",
    "category": "Health",
    "ministry": "Ministry of Health & Family Welfare",
    "benefits": [
      "Geriatric OPD, diagnostics, medicines and referral services at designated facilities"
    ],
    "benefitsHi": [
      "Geriatric OPD, diagnostics, medicines and referral services at designated facilities"
    ],
    "documents": [
      "ID/age proof",
      "health records as required"
    ],
    "documentsHi": [
      "ID/age proof",
      "health records as required"
    ],
    "deadline": "Ongoing / service-based",
    "officialUrl": "https://nhm.gov.in/",
    "applyUrl": "https://nhm.gov.in/",
    "rules": {
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "national-programme-for-prevention-and-control-of-cancer-diabetes-cardiovascular-diseases-and-stroke-npcdcs",
    "slug": "national-programme-for-prevention-and-control-of-cancer-diabetes-cardiovascular-diseases-and-stroke-npcdcs",
    "name": "National Programme for Prevention and Control of Cancer, Diabetes, Cardiovascular Diseases and Stroke (NPCDCS)",
    "nameHi": "National Programme for Prevention and Control of Cancer, Diabetes, Cardiovascular Diseases and Stroke (NPCDCS)",
    "description": "Supports screening and management of major non-communicable diseases.",
    "descriptionHi": "Supports screening and management of major non-communicable diseases.",
    "category": "Health",
    "ministry": "Ministry of Health & Family Welfare",
    "benefits": [
      "Screening, diagnosis, treatment/referral and follow-up through public facilities"
    ],
    "benefitsHi": [
      "Screening, diagnosis, treatment/referral and follow-up through public facilities"
    ],
    "documents": [
      "ID",
      "health details",
      "screening records as required"
    ],
    "documentsHi": [
      "ID",
      "health details",
      "screening records as required"
    ],
    "deadline": "Ongoing / service-based",
    "officialUrl": "https://nhm.gov.in/",
    "applyUrl": "https://nhm.gov.in/",
    "rules": {
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "national-tuberculosis-elimination-programme-ntep",
    "slug": "national-tuberculosis-elimination-programme-ntep",
    "name": "National Tuberculosis Elimination Programme (NTEP)",
    "nameHi": "National Tuberculosis Elimination Programme (NTEP)",
    "description": "Provides free TB diagnosis, treatment and patient support.",
    "descriptionHi": "Provides free TB diagnosis, treatment and patient support.",
    "category": "Health",
    "ministry": "Ministry of Health & Family Welfare",
    "benefits": [
      "Free TB testing and treatment",
      "nutritional/support benefits under applicable programmes"
    ],
    "benefitsHi": [
      "Free TB testing and treatment",
      "nutritional/support benefits under applicable programmes"
    ],
    "documents": [
      "ID",
      "medical/referral records",
      "bank details where direct benefit is applicable"
    ],
    "documentsHi": [
      "ID",
      "medical/referral records",
      "bank details where direct benefit is applicable"
    ],
    "deadline": "Ongoing",
    "officialUrl": "https://tbcindia.mohfw.gov.in/",
    "applyUrl": "https://tbcindia.mohfw.gov.in/",
    "rules": {
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "mission-indradhanush",
    "slug": "mission-indradhanush",
    "name": "Mission Indradhanush",
    "nameHi": "Mission Indradhanush",
    "description": "Improves immunization coverage for children and pregnant women.",
    "descriptionHi": "Improves immunization coverage for children and pregnant women.",
    "category": "Health",
    "ministry": "Ministry of Health & Family Welfare",
    "benefits": [
      "Free vaccination for eligible children and pregnant women through public health system"
    ],
    "benefitsHi": [
      "Free vaccination for eligible children and pregnant women through public health system"
    ],
    "documents": [
      "Child/Mother health record",
      "immunization card",
      "ID where required"
    ],
    "documentsHi": [
      "Child/Mother health record",
      "immunization card",
      "ID where required"
    ],
    "deadline": "Campaign/round based",
    "officialUrl": "https://nhm.gov.in/",
    "applyUrl": "https://nhm.gov.in/",
    "rules": {
      "incomeLimit": 250000,
      "genders": [
        "Female"
      ]
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "pradhan-mantri-awas-yojana---gramin-pmay-g",
    "slug": "pradhan-mantri-awas-yojana---gramin-pmay-g",
    "name": "Pradhan Mantri Awas Yojana - Gramin (PMAY-G)",
    "nameHi": "Pradhan Mantri Awas Yojana - Gramin (PMAY-G)",
    "description": "Assistance for eligible rural households to build pucca houses.",
    "descriptionHi": "Assistance for eligible rural households to build pucca houses.",
    "category": "Housing",
    "ministry": "Ministry of Rural Development",
    "benefits": [
      "Financial assistance for construction of pucca rural house",
      "convergence with basic amenities"
    ],
    "benefitsHi": [
      "Financial assistance for construction of pucca rural house",
      "convergence with basic amenities"
    ],
    "documents": [
      "Aadhaar",
      "beneficiary/SECC/Awaas+ details",
      "land/household records",
      "bank/post-office account"
    ],
    "documentsHi": [
      "Aadhaar",
      "beneficiary/SECC/Awaas+ details",
      "land/household records",
      "bank/post-office account"
    ],
    "deadline": "Ongoing / selection and implementation cycle",
    "officialUrl": "https://pmayg.dord.gov.in/",
    "applyUrl": "https://pmayg.dord.gov.in/",
    "rules": {
      "incomeLimit": 500000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "pradhan-mantri-awas-yojana---urban-20-pmay-u-20",
    "slug": "pradhan-mantri-awas-yojana---urban-20-pmay-u-20",
    "name": "Pradhan Mantri Awas Yojana - Urban 2.0 (PMAY-U 2.0)",
    "nameHi": "Pradhan Mantri Awas Yojana - Urban 2.0 (PMAY-U 2.0)",
    "description": "Affordable housing assistance for eligible urban families.",
    "descriptionHi": "Affordable housing assistance for eligible urban families.",
    "category": "Housing",
    "ministry": "Ministry of Housing & Urban Affairs",
    "benefits": [
      "Assistance up to \u20b92.50 lakh per unit under applicable components",
      "housing/interest subsidy options"
    ],
    "benefitsHi": [
      "Assistance up to \u20b92.50 lakh per unit under applicable components",
      "housing/interest subsidy options"
    ],
    "documents": [
      "Aadhaar",
      "income proof",
      "bank details",
      "address proof",
      "land/property documents where applicable"
    ],
    "documentsHi": [
      "Aadhaar",
      "income proof",
      "bank details",
      "address proof",
      "land/property documents where applicable"
    ],
    "deadline": "Scheme period 2024-2029; application subject to local window",
    "officialUrl": "https://www.mohua.gov.in/",
    "applyUrl": "https://pmaymis.gov.in/pmaymis2_2024/",
    "rules": {
      "incomeLimit": 500000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "credit-linked-subsidy--interest-subsidy-under-pmay-u-20",
    "slug": "credit-linked-subsidy--interest-subsidy-under-pmay-u-20",
    "name": "Credit Linked Subsidy / Interest Subsidy under PMAY-U 2.0",
    "nameHi": "Credit Linked Subsidy / Interest Subsidy under PMAY-U 2.0",
    "description": "Interest subsidy for eligible EWS/LIG/MIG home-loan beneficiaries.",
    "descriptionHi": "Interest subsidy for eligible EWS/LIG/MIG home-loan beneficiaries.",
    "category": "Housing",
    "ministry": "Ministry of Housing & Urban Affairs",
    "benefits": [
      "Interest subsidy on eligible housing loans subject to scheme limits"
    ],
    "benefitsHi": [
      "Interest subsidy on eligible housing loans subject to scheme limits"
    ],
    "documents": [
      "Aadhaar",
      "income proof",
      "home-loan documents",
      "property documents",
      "bank details"
    ],
    "documentsHi": [
      "Aadhaar",
      "income proof",
      "home-loan documents",
      "property documents",
      "bank details"
    ],
    "deadline": "2024-2029 scheme period; loan/application conditions apply",
    "officialUrl": "https://pmaymis.gov.in/pmaymis2_2024/",
    "applyUrl": "https://pmaymis.gov.in/pmaymis2_2024/",
    "rules": {
      "incomeLimit": 500000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "affordable-rental-housing-arh-under-pmay-u-20",
    "slug": "affordable-rental-housing-arh-under-pmay-u-20",
    "name": "Affordable Rental Housing (ARH) under PMAY-U 2.0",
    "nameHi": "Affordable Rental Housing (ARH) under PMAY-U 2.0",
    "description": "Affordable rental housing for eligible urban groups.",
    "descriptionHi": "Affordable rental housing for eligible urban groups.",
    "category": "Housing",
    "ministry": "Ministry of Housing & Urban Affairs",
    "benefits": [
      "Affordable rental housing for migrants, workers, students and other eligible groups"
    ],
    "benefitsHi": [
      "Affordable rental housing for migrants, workers, students and other eligible groups"
    ],
    "documents": [
      "ID/address proof",
      "income/eligibility proof",
      "employment/student proof where required"
    ],
    "documentsHi": [
      "ID/address proof",
      "income/eligibility proof",
      "employment/student proof where required"
    ],
    "deadline": "2024-2029 scheme period; local availability",
    "officialUrl": "https://pmaymis.gov.in/ARH/",
    "applyUrl": "https://pmaymis.gov.in/ARH/",
    "rules": {
      "incomeLimit": 500000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "beneficiary-led-construction-blc-under-pmay-u-20",
    "slug": "beneficiary-led-construction-blc-under-pmay-u-20",
    "name": "Beneficiary Led Construction (BLC) under PMAY-U 2.0",
    "nameHi": "Beneficiary Led Construction (BLC) under PMAY-U 2.0",
    "description": "Assistance to eligible EWS families to construct a pucca house on own land.",
    "descriptionHi": "Assistance to eligible EWS families to construct a pucca house on own land.",
    "category": "Housing",
    "ministry": "Ministry of Housing & Urban Affairs",
    "benefits": [
      "Financial assistance up to \u20b92.5 lakh for eligible BLC households"
    ],
    "benefitsHi": [
      "Financial assistance up to \u20b92.5 lakh for eligible BLC households"
    ],
    "documents": [
      "Aadhaar",
      "income proof",
      "land ownership",
      "bank details",
      "no-pucca-house declaration",
      "family details"
    ],
    "documentsHi": [
      "Aadhaar",
      "income proof",
      "land ownership",
      "bank details",
      "no-pucca-house declaration",
      "family details"
    ],
    "deadline": "2024-2029; application through portal/ULB/CSC",
    "officialUrl": "https://pmaymis.gov.in/pmaymis2_2024/",
    "applyUrl": "https://pmaymis.gov.in/pmaymis2_2024/PMAY_SURVEY/EligiblityCheck.aspx",
    "rules": {
      "incomeLimit": 500000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "affordable-housing-in-partnership-ahp-under-pmay-u-20",
    "slug": "affordable-housing-in-partnership-ahp-under-pmay-u-20",
    "name": "Affordable Housing in Partnership (AHP) under PMAY-U 2.0",
    "nameHi": "Affordable Housing in Partnership (AHP) under PMAY-U 2.0",
    "description": "Supports affordable pucca housing through public/private partnerships.",
    "descriptionHi": "Supports affordable pucca housing through public/private partnerships.",
    "category": "Housing",
    "ministry": "Ministry of Housing & Urban Affairs",
    "benefits": [
      "Central assistance for eligible EWS beneficiaries in approved projects"
    ],
    "benefitsHi": [
      "Central assistance for eligible EWS beneficiaries in approved projects"
    ],
    "documents": [
      "Aadhaar",
      "income proof",
      "beneficiary registration",
      "bank details",
      "project/ULB documents"
    ],
    "documentsHi": [
      "Aadhaar",
      "income proof",
      "beneficiary registration",
      "bank details",
      "project/ULB documents"
    ],
    "deadline": "2024-2029; project/ULB specific",
    "officialUrl": "https://pmaymis.gov.in/pmaymis2_2024/",
    "applyUrl": "https://pmaymis.gov.in/pmaymis2_2024/",
    "rules": {
      "incomeLimit": 500000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "national-urban-livelihoods-mission---housingurban-shelter-component",
    "slug": "national-urban-livelihoods-mission---housingurban-shelter-component",
    "name": "National Urban Livelihoods Mission - Housing/Urban Shelter Component",
    "nameHi": "National Urban Livelihoods Mission - Housing/Urban Shelter Component",
    "description": "Supports urban homeless through shelters and livelihood-linked services.",
    "descriptionHi": "Supports urban homeless through shelters and livelihood-linked services.",
    "category": "Housing",
    "ministry": "Ministry of Housing & Urban Affairs",
    "benefits": [
      "Access to permanent shelters and basic services for urban homeless"
    ],
    "benefitsHi": [
      "Access to permanent shelters and basic services for urban homeless"
    ],
    "documents": [
      "ID/address proof where available",
      "beneficiary survey/ULB registration"
    ],
    "documentsHi": [
      "ID/address proof where available",
      "beneficiary survey/ULB registration"
    ],
    "deadline": "Ongoing / ULB-specific",
    "officialUrl": "https://mohua.gov.in/",
    "applyUrl": "https://mohua.gov.in/",
    "rules": {
      "incomeLimit": 500000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "deendayal-antyodaya-yojana---national-rural-livelihoods-mission-housing-convergence",
    "slug": "deendayal-antyodaya-yojana---national-rural-livelihoods-mission-housing-convergence",
    "name": "Deendayal Antyodaya Yojana - National Rural Livelihoods Mission (housing convergence)",
    "nameHi": "Deendayal Antyodaya Yojana - National Rural Livelihoods Mission (housing convergence)",
    "description": "Rural livelihood mission that can converge with housing and basic-amenity support.",
    "descriptionHi": "Rural livelihood mission that can converge with housing and basic-amenity support.",
    "category": "Housing",
    "ministry": "Ministry of Rural Development",
    "benefits": [
      "SHG-based livelihood support and convergence with eligible welfare/housing programmes"
    ],
    "benefitsHi": [
      "SHG-based livelihood support and convergence with eligible welfare/housing programmes"
    ],
    "documents": [
      "Aadhaar",
      "SHG membership/registration",
      "bank account",
      "household details"
    ],
    "documentsHi": [
      "Aadhaar",
      "SHG membership/registration",
      "bank account",
      "household details"
    ],
    "deadline": "Ongoing / state implementation",
    "officialUrl": "https://nrlm.gov.in/",
    "applyUrl": "https://nrlm.gov.in/",
    "rules": {
      "incomeLimit": 500000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "pm-janman-housing-component",
    "slug": "pm-janman-housing-component",
    "name": "PM-JANMAN Housing Component",
    "nameHi": "PM-JANMAN Housing Component",
    "description": "Housing support for eligible Particularly Vulnerable Tribal Group (PVTG) households.",
    "descriptionHi": "Housing support for eligible Particularly Vulnerable Tribal Group (PVTG) households.",
    "category": "Housing",
    "ministry": "Ministry of Rural Development",
    "benefits": [
      "Pucca housing assistance and convergence with basic amenities for eligible PVTG households"
    ],
    "benefitsHi": [
      "Pucca housing assistance and convergence with basic amenities for eligible PVTG households"
    ],
    "documents": [
      "Aadhaar/ID",
      "PVTG/beneficiary identification",
      "household/land details",
      "bank account"
    ],
    "documentsHi": [
      "Aadhaar/ID",
      "PVTG/beneficiary identification",
      "household/land details",
      "bank account"
    ],
    "deadline": "Mission/project period and local implementation",
    "officialUrl": "https://tribal.nic.in/",
    "applyUrl": "https://pmayg.dord.gov.in/",
    "rules": {
      "incomeLimit": 500000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "rajiv-gandhi-grameen-vidyutikaran--saubhagya-linked-household-electrification-support",
    "slug": "rajiv-gandhi-grameen-vidyutikaran--saubhagya-linked-household-electrification-support",
    "name": "Rajiv Gandhi Grameen Vidyutikaran / Saubhagya-linked household electrification support",
    "nameHi": "Rajiv Gandhi Grameen Vidyutikaran / Saubhagya-linked household electrification support",
    "description": "Supports household electrification and related rural infrastructure through government programmes.",
    "descriptionHi": "Supports household electrification and related rural infrastructure through government programmes.",
    "category": "Housing",
    "ministry": "Ministry of Power",
    "benefits": [
      "Electricity connection and infrastructure support for eligible households under applicable programmes"
    ],
    "benefitsHi": [
      "Electricity connection and infrastructure support for eligible households under applicable programmes"
    ],
    "documents": [
      "ID/address proof",
      "household details",
      "connection application documents"
    ],
    "documentsHi": [
      "ID/address proof",
      "household details",
      "connection application documents"
    ],
    "deadline": "Programme/component specific",
    "officialUrl": "https://powermin.gov.in/",
    "applyUrl": "https://saubhagya.gov.in/",
    "rules": {
      "incomeLimit": 500000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "pradhan-mantri-kaushal-vikas-yojana-pmkvy",
    "slug": "pradhan-mantri-kaushal-vikas-yojana-pmkvy",
    "name": "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
    "nameHi": "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
    "description": "Skill training and certification for eligible candidates.",
    "descriptionHi": "Skill training and certification for eligible candidates.",
    "category": "Skills & Employment",
    "ministry": "Ministry of Skill Development & Entrepreneurship",
    "benefits": [
      "Free/assisted skill training and certification in eligible courses"
    ],
    "benefitsHi": [
      "Free/assisted skill training and certification in eligible courses"
    ],
    "documents": [
      "Aadhaar",
      "education/age proof",
      "bank details",
      "photograph",
      "category/disability certificate if applicable"
    ],
    "documentsHi": [
      "Aadhaar",
      "education/age proof",
      "bank details",
      "photograph",
      "category/disability certificate if applicable"
    ],
    "deadline": "Training-centre/batch dependent",
    "officialUrl": "https://www.msde.gov.in/",
    "applyUrl": "https://www.pmkvyofficial.org/",
    "rules": {
      "minAge": 18
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "national-apprenticeship-promotion-scheme-naps",
    "slug": "national-apprenticeship-promotion-scheme-naps",
    "name": "National Apprenticeship Promotion Scheme (NAPS)",
    "nameHi": "National Apprenticeship Promotion Scheme (NAPS)",
    "description": "Promotes apprenticeship training with employer support.",
    "descriptionHi": "Promotes apprenticeship training with employer support.",
    "category": "Skills & Employment",
    "ministry": "Ministry of Skill Development & Entrepreneurship",
    "benefits": [
      "Apprenticeship opportunities",
      "stipend support as per rules",
      "industry experience"
    ],
    "benefitsHi": [
      "Apprenticeship opportunities",
      "stipend support as per rules",
      "industry experience"
    ],
    "documents": [
      "Aadhaar",
      "education certificate",
      "bank account",
      "age proof",
      "employer/apprenticeship documents"
    ],
    "documentsHi": [
      "Aadhaar",
      "education certificate",
      "bank account",
      "age proof",
      "employer/apprenticeship documents"
    ],
    "deadline": "Ongoing / vacancy dependent",
    "officialUrl": "https://www.msde.gov.in/",
    "applyUrl": "https://www.apprenticeshipindia.gov.in/",
    "rules": {
      "minAge": 18
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "deen-dayal-upadhyaya-grameen-kaushalya-yojana-ddu-gky",
    "slug": "deen-dayal-upadhyaya-grameen-kaushalya-yojana-ddu-gky",
    "name": "Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY)",
    "nameHi": "Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY)",
    "description": "Placement-linked skill training for rural youth.",
    "descriptionHi": "Placement-linked skill training for rural youth.",
    "category": "Skills & Employment",
    "ministry": "Ministry of Rural Development",
    "benefits": [
      "Skill training, placement support and post-placement assistance as applicable"
    ],
    "benefitsHi": [
      "Skill training, placement support and post-placement assistance as applicable"
    ],
    "documents": [
      "Aadhaar",
      "age proof",
      "rural residence/eligibility proof",
      "education certificate",
      "bank details"
    ],
    "documentsHi": [
      "Aadhaar",
      "age proof",
      "rural residence/eligibility proof",
      "education certificate",
      "bank details"
    ],
    "deadline": "Batch/training-centre dependent",
    "officialUrl": "https://rural.gov.in/",
    "applyUrl": "https://ddugky.info/",
    "rules": {
      "minAge": 18
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "mahatma-gandhi-national-rural-employment-guarantee-scheme-mgnregs",
    "slug": "mahatma-gandhi-national-rural-employment-guarantee-scheme-mgnregs",
    "name": "Mahatma Gandhi National Rural Employment Guarantee Scheme (MGNREGS)",
    "nameHi": "Mahatma Gandhi National Rural Employment Guarantee Scheme (MGNREGS)",
    "description": "Guarantees wage employment for rural households subject to scheme conditions.",
    "descriptionHi": "Guarantees wage employment for rural households subject to scheme conditions.",
    "category": "Skills & Employment",
    "ministry": "Ministry of Rural Development",
    "benefits": [
      "Up to 100 days of wage employment per rural household per financial year, subject to conditions"
    ],
    "benefitsHi": [
      "Up to 100 days of wage employment per rural household per financial year, subject to conditions"
    ],
    "documents": [
      "Job card",
      "Aadhaar where applicable",
      "bank/post-office account",
      "household details"
    ],
    "documentsHi": [
      "Job card",
      "Aadhaar where applicable",
      "bank/post-office account",
      "household details"
    ],
    "deadline": "Ongoing / demand-based",
    "officialUrl": "https://rural.gov.in/",
    "applyUrl": "https://nrega.nic.in/",
    "rules": {
      "minAge": 18
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "prime-ministers-employment-generation-programme-pmegp",
    "slug": "prime-ministers-employment-generation-programme-pmegp",
    "name": "Prime Minister's Employment Generation Programme (PMEGP)",
    "nameHi": "Prime Minister's Employment Generation Programme (PMEGP)",
    "description": "Credit-linked subsidy for new micro-enterprises.",
    "descriptionHi": "Credit-linked subsidy for new micro-enterprises.",
    "category": "Skills & Employment",
    "ministry": "Ministry of MSME",
    "benefits": [
      "Margin money subsidy and bank-linked finance for eligible new micro enterprises"
    ],
    "benefitsHi": [
      "Margin money subsidy and bank-linked finance for eligible new micro enterprises"
    ],
    "documents": [
      "Aadhaar",
      "PAN",
      "project report",
      "education proof where applicable",
      "bank details",
      "category certificate if applicable"
    ],
    "documentsHi": [
      "Aadhaar",
      "PAN",
      "project report",
      "education proof where applicable",
      "bank details",
      "category certificate if applicable"
    ],
    "deadline": "Ongoing / application window",
    "officialUrl": "https://msme.gov.in/",
    "applyUrl": "https://www.kviconline.gov.in/pmegpeportal/",
    "rules": {
      "minAge": 18
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "rural-self-employment-training-institutes-rsetis",
    "slug": "rural-self-employment-training-institutes-rsetis",
    "name": "Rural Self Employment Training Institutes (RSETIs)",
    "nameHi": "Rural Self Employment Training Institutes (RSETIs)",
    "description": "Provides skill and entrepreneurship training to rural youth.",
    "descriptionHi": "Provides skill and entrepreneurship training to rural youth.",
    "category": "Skills & Employment",
    "ministry": "Ministry of Rural Development",
    "benefits": [
      "Free/low-cost entrepreneurship and skill training",
      "handholding for self-employment"
    ],
    "benefitsHi": [
      "Free/low-cost entrepreneurship and skill training",
      "handholding for self-employment"
    ],
    "documents": [
      "Aadhaar",
      "age/residence proof",
      "education details",
      "photographs"
    ],
    "documentsHi": [
      "Aadhaar",
      "age/residence proof",
      "education details",
      "photographs"
    ],
    "deadline": "Training-batch dependent",
    "officialUrl": "https://rural.gov.in/",
    "applyUrl": "https://nirdpr.org.in/",
    "rules": {
      "minAge": 18
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "national-career-service-ncs",
    "slug": "national-career-service-ncs",
    "name": "National Career Service (NCS)",
    "nameHi": "National Career Service (NCS)",
    "description": "Employment services, job matching, counselling and career resources.",
    "descriptionHi": "Employment services, job matching, counselling and career resources.",
    "category": "Skills & Employment",
    "ministry": "Ministry of Labour & Employment",
    "benefits": [
      "Job search",
      "career counselling",
      "job fairs",
      "skill/training information"
    ],
    "benefitsHi": [
      "Job search",
      "career counselling",
      "job fairs",
      "skill/training information"
    ],
    "documents": [
      "Aadhaar/ID optional for basic use",
      "education/skills/resume details",
      "contact information"
    ],
    "documentsHi": [
      "Aadhaar/ID optional for basic use",
      "education/skills/resume details",
      "contact information"
    ],
    "deadline": "Ongoing",
    "officialUrl": "https://labour.gov.in/",
    "applyUrl": "https://www.ncs.gov.in/",
    "rules": {
      "minAge": 18
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "pradhan-mantri-rojgar-protsahan-yojana-legacy-employment-incentive",
    "slug": "pradhan-mantri-rojgar-protsahan-yojana-legacy-employment-incentive",
    "name": "Pradhan Mantri Rojgar Protsahan Yojana (legacy employment incentive)",
    "nameHi": "Pradhan Mantri Rojgar Protsahan Yojana (legacy employment incentive)",
    "description": "Employment incentive programme for eligible establishments/workers; closed for new enrolment after its notified period.",
    "descriptionHi": "Employment incentive programme for eligible establishments/workers; closed for new enrolment after its notified period.",
    "category": "Skills & Employment",
    "ministry": "Ministry of Labour & Employment",
    "benefits": [
      "Employer contribution support under the notified period"
    ],
    "benefitsHi": [
      "Employer contribution support under the notified period"
    ],
    "documents": [
      "EPFO/UAN and establishment records",
      "employee details"
    ],
    "documentsHi": [
      "EPFO/UAN and establishment records",
      "employee details"
    ],
    "deadline": "Closed to new registration; retain for historical dataset only",
    "officialUrl": "https://labour.gov.in/",
    "applyUrl": "https://labour.gov.in/",
    "rules": {
      "minAge": 18
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "skill-loan-scheme",
    "slug": "skill-loan-scheme",
    "name": "Skill Loan Scheme",
    "nameHi": "Skill Loan Scheme",
    "description": "Education loan support for candidates undertaking eligible skill-development courses.",
    "descriptionHi": "Education loan support for candidates undertaking eligible skill-development courses.",
    "category": "Skills & Employment",
    "ministry": "Ministry of Skill Development & Entrepreneurship",
    "benefits": [
      "Loan financing for eligible skill courses subject to lender/scheme rules"
    ],
    "benefitsHi": [
      "Loan financing for eligible skill courses subject to lender/scheme rules"
    ],
    "documents": [
      "Aadhaar/KYC",
      "admission/enrolment proof",
      "course fee details",
      "income/guarantor documents as required"
    ],
    "documentsHi": [
      "Aadhaar/KYC",
      "admission/enrolment proof",
      "course fee details",
      "income/guarantor documents as required"
    ],
    "deadline": "Ongoing / lender dependent",
    "officialUrl": "https://www.msde.gov.in/",
    "applyUrl": "https://www.jansamarth.in/",
    "rules": {
      "minAge": 18
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "pm-vishwakarma",
    "slug": "pm-vishwakarma",
    "name": "PM Vishwakarma",
    "nameHi": "PM Vishwakarma",
    "description": "Support package for eligible traditional artisans and craftspeople.",
    "descriptionHi": "Support package for eligible traditional artisans and craftspeople.",
    "category": "Skills & Employment",
    "ministry": "Ministry of Micro, Small & Medium Enterprises",
    "benefits": [
      "Certificate/ID",
      "skill training",
      "toolkit incentive",
      "concessional credit",
      "digital/marketing support subject to rules"
    ],
    "benefitsHi": [
      "Certificate/ID",
      "skill training",
      "toolkit incentive",
      "concessional credit",
      "digital/marketing support subject to rules"
    ],
    "documents": [
      "Aadhaar",
      "mobile number",
      "occupation details",
      "bank account",
      "family/eligibility details"
    ],
    "documentsHi": [
      "Aadhaar",
      "mobile number",
      "occupation details",
      "bank account",
      "family/eligibility details"
    ],
    "deadline": "Ongoing / portal and verification based",
    "officialUrl": "https://msme.gov.in/",
    "applyUrl": "https://pmvishwakarma.gov.in/",
    "rules": {
      "minAge": 18,
      "artisanOnly": true
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "national-social-assistance-programme-nsap",
    "slug": "national-social-assistance-programme-nsap",
    "name": "National Social Assistance Programme (NSAP)",
    "nameHi": "National Social Assistance Programme (NSAP)",
    "description": "Social assistance pensions and family benefit for eligible vulnerable households.",
    "descriptionHi": "Social assistance pensions and family benefit for eligible vulnerable households.",
    "category": "Social Welfare",
    "ministry": "Ministry of Rural Development",
    "benefits": [
      "Old-age, widow and disability pension support plus family benefit under components"
    ],
    "benefitsHi": [
      "Old-age, widow and disability pension support plus family benefit under components"
    ],
    "documents": [
      "Aadhaar/ID",
      "age/disability/widow proof",
      "BPL/eligibility details",
      "bank account"
    ],
    "documentsHi": [
      "Aadhaar/ID",
      "age/disability/widow proof",
      "BPL/eligibility details",
      "bank account"
    ],
    "deadline": "Ongoing / state implementation",
    "officialUrl": "https://rural.gov.in/",
    "applyUrl": "https://nsap.nic.in/",
    "rules": {
      "bplOnly": true,
      "incomeLimit": 150000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "pradhan-mantri-jan-dhan-yojana-pmjdy",
    "slug": "pradhan-mantri-jan-dhan-yojana-pmjdy",
    "name": "Pradhan Mantri Jan-Dhan Yojana (PMJDY)",
    "nameHi": "Pradhan Mantri Jan-Dhan Yojana (PMJDY)",
    "description": "Financial inclusion through basic bank accounts and related services.",
    "descriptionHi": "Financial inclusion through basic bank accounts and related services.",
    "category": "Social Welfare",
    "ministry": "Ministry of Finance",
    "benefits": [
      "Basic savings account",
      "RuPay card",
      "DBT access",
      "eligible overdraft/insurance features subject to rules"
    ],
    "benefitsHi": [
      "Basic savings account",
      "RuPay card",
      "DBT access",
      "eligible overdraft/insurance features subject to rules"
    ],
    "documents": [
      "Aadhaar or officially valid KYC document",
      "address proof",
      "photograph"
    ],
    "documentsHi": [
      "Aadhaar or officially valid KYC document",
      "address proof",
      "photograph"
    ],
    "deadline": "Ongoing",
    "officialUrl": "https://financialservices.gov.in/",
    "applyUrl": "https://www.pmjdy.gov.in/",
    "rules": {
      "bplOnly": true,
      "incomeLimit": 150000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "pradhan-mantri-jeevan-jyoti-bima-yojana-pmjjby",
    "slug": "pradhan-mantri-jeevan-jyoti-bima-yojana-pmjjby",
    "name": "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)",
    "nameHi": "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)",
    "description": "Low-cost renewable term life insurance linked to bank/post office accounts.",
    "descriptionHi": "Low-cost renewable term life insurance linked to bank/post office accounts.",
    "category": "Social Welfare",
    "ministry": "Ministry of Finance",
    "benefits": [
      "Life insurance cover of \u20b92 lakh for eligible enrolled subscribers"
    ],
    "benefitsHi": [
      "Life insurance cover of \u20b92 lakh for eligible enrolled subscribers"
    ],
    "documents": [
      "Bank/post-office account",
      "Aadhaar/KYC",
      "consent/auto-debit mandate"
    ],
    "documentsHi": [
      "Bank/post-office account",
      "Aadhaar/KYC",
      "consent/auto-debit mandate"
    ],
    "deadline": "Annual enrolment/renewal window; subject to scheme rules",
    "officialUrl": "https://financialservices.gov.in/",
    "applyUrl": "https://jansuraksha.gov.in/",
    "rules": {
      "bplOnly": true,
      "incomeLimit": 150000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "pradhan-mantri-suraksha-bima-yojana-pmsby",
    "slug": "pradhan-mantri-suraksha-bima-yojana-pmsby",
    "name": "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
    "nameHi": "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
    "description": "Low-cost personal accident insurance scheme.",
    "descriptionHi": "Low-cost personal accident insurance scheme.",
    "category": "Social Welfare",
    "ministry": "Ministry of Finance",
    "benefits": [
      "Accident insurance cover up to \u20b92 lakh, with partial disability benefit as specified"
    ],
    "benefitsHi": [
      "Accident insurance cover up to \u20b92 lakh, with partial disability benefit as specified"
    ],
    "documents": [
      "Bank/post-office account",
      "Aadhaar/KYC",
      "consent/auto-debit mandate"
    ],
    "documentsHi": [
      "Bank/post-office account",
      "Aadhaar/KYC",
      "consent/auto-debit mandate"
    ],
    "deadline": "Annual enrolment/renewal window; subject to scheme rules",
    "officialUrl": "https://financialservices.gov.in/",
    "applyUrl": "https://jansuraksha.gov.in/",
    "rules": {
      "bplOnly": true,
      "incomeLimit": 150000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "atal-pension-yojana-apy",
    "slug": "atal-pension-yojana-apy",
    "name": "Atal Pension Yojana (APY)",
    "nameHi": "Atal Pension Yojana (APY)",
    "description": "Pension scheme for eligible subscribers with government-defined pension slabs.",
    "descriptionHi": "Pension scheme for eligible subscribers with government-defined pension slabs.",
    "category": "Social Welfare",
    "ministry": "Ministry of Finance / PFRDA",
    "benefits": [
      "Guaranteed minimum pension options of \u20b91,000\u2013\u20b95,000 per month from age 60, subject to contributions/rules"
    ],
    "benefitsHi": [
      "Guaranteed minimum pension options of \u20b91,000\u2013\u20b95,000 per month from age 60, subject to contributions/rules"
    ],
    "documents": [
      "Aadhaar",
      "bank/post-office account",
      "mobile number",
      "nominee details"
    ],
    "documentsHi": [
      "Aadhaar",
      "bank/post-office account",
      "mobile number",
      "nominee details"
    ],
    "deadline": "Ongoing subject to age/eligibility",
    "officialUrl": "https://www.pfrda.org.in/",
    "applyUrl": "https://www.pfrda.org.in/",
    "rules": {
      "bplOnly": true,
      "incomeLimit": 150000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "pradhan-mantri-garib-kalyan-anna-yojana--nfsa-foodgrain-support",
    "slug": "pradhan-mantri-garib-kalyan-anna-yojana--nfsa-foodgrain-support",
    "name": "Pradhan Mantri Garib Kalyan Anna Yojana / NFSA foodgrain support",
    "nameHi": "Pradhan Mantri Garib Kalyan Anna Yojana / NFSA foodgrain support",
    "description": "Foodgrain entitlement for eligible NFSA beneficiaries.",
    "descriptionHi": "Foodgrain entitlement for eligible NFSA beneficiaries.",
    "category": "Social Welfare",
    "ministry": "Ministry of Consumer Affairs, Food & Public Distribution",
    "benefits": [
      "Foodgrain entitlement for eligible households under applicable food-security provisions"
    ],
    "benefitsHi": [
      "Foodgrain entitlement for eligible households under applicable food-security provisions"
    ],
    "documents": [
      "Ration card",
      "Aadhaar/ID",
      "household details"
    ],
    "documentsHi": [
      "Ration card",
      "Aadhaar/ID",
      "household details"
    ],
    "deadline": "Ongoing as per current government orders",
    "officialUrl": "https://dfpd.gov.in/",
    "applyUrl": "https://nfsa.gov.in/",
    "rules": {
      "bplOnly": true,
      "incomeLimit": 150000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "pm-svanidhi",
    "slug": "pm-svanidhi",
    "name": "PM SVANidhi",
    "nameHi": "PM SVANidhi",
    "description": "Working-capital support for eligible street vendors.",
    "descriptionHi": "Working-capital support for eligible street vendors.",
    "category": "Social Welfare",
    "ministry": "Ministry of Housing & Urban Affairs",
    "benefits": [
      "Collateral-free working capital loans in tranches",
      "interest subsidy and digital transaction incentives subject to rules"
    ],
    "benefitsHi": [
      "Collateral-free working capital loans in tranches",
      "interest subsidy and digital transaction incentives subject to rules"
    ],
    "documents": [
      "Street vendor certificate/ID or survey details",
      "Aadhaar",
      "bank account",
      "mobile number"
    ],
    "documentsHi": [
      "Street vendor certificate/ID or survey details",
      "Aadhaar",
      "bank account",
      "mobile number"
    ],
    "deadline": "Ongoing / lending window",
    "officialUrl": "https://mohua.gov.in/",
    "applyUrl": "https://pmsvanidhi.mohua.gov.in/",
    "rules": {
      "bplOnly": true,
      "incomeLimit": 150000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "national-family-benefit-scheme-nfbs",
    "slug": "national-family-benefit-scheme-nfbs",
    "name": "National Family Benefit Scheme (NFBS)",
    "nameHi": "National Family Benefit Scheme (NFBS)",
    "description": "Lump-sum assistance to eligible households after death of primary breadwinner.",
    "descriptionHi": "Lump-sum assistance to eligible households after death of primary breadwinner.",
    "category": "Social Welfare",
    "ministry": "Ministry of Rural Development",
    "benefits": [
      "One-time financial assistance subject to current scheme norms"
    ],
    "benefitsHi": [
      "One-time financial assistance subject to current scheme norms"
    ],
    "documents": [
      "Death certificate",
      "age proof",
      "family/BPL eligibility proof",
      "bank account",
      "ID"
    ],
    "documentsHi": [
      "Death certificate",
      "age proof",
      "family/BPL eligibility proof",
      "bank account",
      "ID"
    ],
    "deadline": "Ongoing / state implementation",
    "officialUrl": "https://rural.gov.in/",
    "applyUrl": "https://nsap.nic.in/",
    "rules": {
      "bplOnly": true,
      "incomeLimit": 150000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "disability-pension-under-nsap--state-linked-pension",
    "slug": "disability-pension-under-nsap--state-linked-pension",
    "name": "Disability Pension under NSAP / State-linked pension",
    "nameHi": "Disability Pension under NSAP / State-linked pension",
    "description": "Pension support for eligible persons with disabilities.",
    "descriptionHi": "Pension support for eligible persons with disabilities.",
    "category": "Social Welfare",
    "ministry": "Ministry of Rural Development / State Governments",
    "benefits": [
      "Monthly pension assistance according to applicable central/state contribution and rules"
    ],
    "benefitsHi": [
      "Monthly pension assistance according to applicable central/state contribution and rules"
    ],
    "documents": [
      "Disability certificate",
      "age/ID proof",
      "income/eligibility proof",
      "bank account"
    ],
    "documentsHi": [
      "Disability certificate",
      "age/ID proof",
      "income/eligibility proof",
      "bank account"
    ],
    "deadline": "Ongoing / state implementation",
    "officialUrl": "https://rural.gov.in/",
    "applyUrl": "https://nsap.nic.in/",
    "rules": {
      "bplOnly": true,
      "incomeLimit": 150000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "senior-citizen-welfare--integrated-programme-for-senior-citizens-avyay",
    "slug": "senior-citizen-welfare--integrated-programme-for-senior-citizens-avyay",
    "name": "Senior Citizen Welfare / Integrated Programme for Senior Citizens (AVYAY)",
    "nameHi": "Senior Citizen Welfare / Integrated Programme for Senior Citizens (AVYAY)",
    "description": "Support for senior citizen welfare services through assisted institutions and programmes.",
    "descriptionHi": "Support for senior citizen welfare services through assisted institutions and programmes.",
    "category": "Social Welfare",
    "ministry": "Ministry of Social Justice & Empowerment",
    "benefits": [
      "Shelter, healthcare, food, active ageing and support services through approved implementing agencies"
    ],
    "benefitsHi": [
      "Shelter, healthcare, food, active ageing and support services through approved implementing agencies"
    ],
    "documents": [
      "Age proof",
      "ID",
      "beneficiary registration/medical documents as applicable"
    ],
    "documentsHi": [
      "Age proof",
      "ID",
      "beneficiary registration/medical documents as applicable"
    ],
    "deadline": "Ongoing / service/provider specific",
    "officialUrl": "https://socialjustice.gov.in/",
    "applyUrl": "https://socialjustice.gov.in/",
    "rules": {
      "bplOnly": true,
      "incomeLimit": 150000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "beti-bachao-beti-padhao-bbbp",
    "slug": "beti-bachao-beti-padhao-bbbp",
    "name": "Beti Bachao Beti Padhao (BBBP)",
    "nameHi": "Beti Bachao Beti Padhao (BBBP)",
    "description": "Promotes survival, protection, education and empowerment of girls.",
    "descriptionHi": "Promotes survival, protection, education and empowerment of girls.",
    "category": "Women & Child",
    "ministry": "Ministry of Women & Child Development",
    "benefits": [
      "Awareness, education and community interventions",
      "convergence with girl-child schemes"
    ],
    "benefitsHi": [
      "Awareness, education and community interventions",
      "convergence with girl-child schemes"
    ],
    "documents": [
      "Generally programme/service based",
      "ID and school/beneficiary details where required"
    ],
    "documentsHi": [
      "Generally programme/service based",
      "ID and school/beneficiary details where required"
    ],
    "deadline": "Ongoing / programme-based",
    "officialUrl": "https://wcd.gov.in/",
    "applyUrl": "https://wcd.gov.in/",
    "rules": {
      "genders": [
        "Female"
      ]
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "sukanya-samriddhi-account",
    "slug": "sukanya-samriddhi-account",
    "name": "Sukanya Samriddhi Account",
    "nameHi": "Sukanya Samriddhi Account",
    "description": "Small savings account for eligible girl children.",
    "descriptionHi": "Small savings account for eligible girl children.",
    "category": "Women & Child",
    "ministry": "Ministry of Finance / Department of Economic Affairs",
    "benefits": [
      "Government-notified interest rate",
      "tax benefits subject to applicable rules",
      "long-term savings for girl child"
    ],
    "benefitsHi": [
      "Government-notified interest rate",
      "tax benefits subject to applicable rules",
      "long-term savings for girl child"
    ],
    "documents": [
      "Girl child's birth certificate",
      "guardian KYC",
      "address proof",
      "photographs"
    ],
    "documentsHi": [
      "Girl child's birth certificate",
      "guardian KYC",
      "address proof",
      "photographs"
    ],
    "deadline": "Ongoing",
    "officialUrl": "https://www.indiapost.gov.in/",
    "applyUrl": "https://www.indiapost.gov.in/",
    "rules": {
      "genders": [
        "Female"
      ]
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "one-stop-centre-osc-scheme",
    "slug": "one-stop-centre-osc-scheme",
    "name": "One Stop Centre (OSC) Scheme",
    "nameHi": "One Stop Centre (OSC) Scheme",
    "description": "Integrated support for women affected by violence.",
    "descriptionHi": "Integrated support for women affected by violence.",
    "category": "Women & Child",
    "ministry": "Ministry of Women & Child Development",
    "benefits": [
      "Medical, legal, counselling, police assistance and temporary shelter linkage"
    ],
    "benefitsHi": [
      "Medical, legal, counselling, police assistance and temporary shelter linkage"
    ],
    "documents": [
      "ID if available",
      "incident/case details",
      "medical/legal documents if available"
    ],
    "documentsHi": [
      "ID if available",
      "incident/case details",
      "medical/legal documents if available"
    ],
    "deadline": "Ongoing / service-based",
    "officialUrl": "https://wcd.gov.in/",
    "applyUrl": "https://wcd.gov.in/",
    "rules": {
      "genders": [
        "Female"
      ]
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "women-helpline-scheme",
    "slug": "women-helpline-scheme",
    "name": "Women Helpline Scheme",
    "nameHi": "Women Helpline Scheme",
    "description": "Helpline-based support and referral services for women in distress.",
    "descriptionHi": "Helpline-based support and referral services for women in distress.",
    "category": "Women & Child",
    "ministry": "Ministry of Women & Child Development",
    "benefits": [
      "Information, counselling, emergency referral and linkage to support services"
    ],
    "benefitsHi": [
      "Information, counselling, emergency referral and linkage to support services"
    ],
    "documents": [
      "Usually no advance documents",
      "case/identity details may be requested"
    ],
    "documentsHi": [
      "Usually no advance documents",
      "case/identity details may be requested"
    ],
    "deadline": "Ongoing",
    "officialUrl": "https://wcd.gov.in/",
    "applyUrl": "https://wcd.gov.in/",
    "rules": {
      "genders": [
        "Female"
      ]
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "ujjawala-scheme",
    "slug": "ujjawala-scheme",
    "name": "Ujjawala Scheme",
    "nameHi": "Ujjawala Scheme",
    "description": "Prevention of trafficking and rehabilitation/protection of trafficking survivors.",
    "descriptionHi": "Prevention of trafficking and rehabilitation/protection of trafficking survivors.",
    "category": "Women & Child",
    "ministry": "Ministry of Women & Child Development",
    "benefits": [
      "Rescue, rehabilitation, shelter, counselling and reintegration support through approved agencies"
    ],
    "benefitsHi": [
      "Rescue, rehabilitation, shelter, counselling and reintegration support through approved agencies"
    ],
    "documents": [
      "Identity/case/referral documents as available",
      "institutional intake records"
    ],
    "documentsHi": [
      "Identity/case/referral documents as available",
      "institutional intake records"
    ],
    "deadline": "Ongoing / institution-based",
    "officialUrl": "https://wcd.gov.in/",
    "applyUrl": "https://wcd.gov.in/",
    "rules": {
      "genders": [
        "Female"
      ]
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "palna-scheme",
    "slug": "palna-scheme",
    "name": "Palna Scheme",
    "nameHi": "Palna Scheme",
    "description": "Day-care/cr\u00e8che support for children of eligible working parents.",
    "descriptionHi": "Day-care/cr\u00e8che support for children of eligible working parents.",
    "category": "Women & Child",
    "ministry": "Ministry of Women & Child Development",
    "benefits": [
      "Safe childcare, nutrition, health monitoring and early stimulation through cr\u00e8che services"
    ],
    "benefitsHi": [
      "Safe childcare, nutrition, health monitoring and early stimulation through cr\u00e8che services"
    ],
    "documents": [
      "Child birth/age proof",
      "parent ID",
      "address/employment details as required by centre"
    ],
    "documentsHi": [
      "Child birth/age proof",
      "parent ID",
      "address/employment details as required by centre"
    ],
    "deadline": "Ongoing / centre availability",
    "officialUrl": "https://wcd.gov.in/",
    "applyUrl": "https://wcd.gov.in/",
    "rules": {
      "genders": [
        "Female"
      ]
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "mission-vatsalya",
    "slug": "mission-vatsalya",
    "name": "Mission Vatsalya",
    "nameHi": "Mission Vatsalya",
    "description": "Child protection and welfare services for children in need of care and protection.",
    "descriptionHi": "Child protection and welfare services for children in need of care and protection.",
    "category": "Women & Child",
    "ministry": "Ministry of Women & Child Development",
    "benefits": [
      "Child protection, institutional/non-institutional care, rehabilitation and sponsorship/foster-care services"
    ],
    "benefitsHi": [
      "Child protection, institutional/non-institutional care, rehabilitation and sponsorship/foster-care services"
    ],
    "documents": [
      "Child/guardian ID where available",
      "case/referral records",
      "birth/age proof where available"
    ],
    "documentsHi": [
      "Child/guardian ID where available",
      "case/referral records",
      "birth/age proof where available"
    ],
    "deadline": "Ongoing / district service based",
    "officialUrl": "https://wcd.gov.in/",
    "applyUrl": "https://wcd.gov.in/",
    "rules": {
      "genders": [
        "Female"
      ]
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "pradhan-mantri-adarsh-gram-yojana--girl-child-convergence",
    "slug": "pradhan-mantri-adarsh-gram-yojana--girl-child-convergence",
    "name": "Pradhan Mantri Adarsh Gram Yojana / girl-child convergence",
    "nameHi": "Pradhan Mantri Adarsh Gram Yojana / girl-child convergence",
    "description": "Village development programme with social infrastructure and service convergence.",
    "descriptionHi": "Village development programme with social infrastructure and service convergence.",
    "category": "Women & Child",
    "ministry": "Ministry of Social Justice & Empowerment",
    "benefits": [
      "Convergence of basic services and infrastructure in selected villages"
    ],
    "benefitsHi": [
      "Convergence of basic services and infrastructure in selected villages"
    ],
    "documents": [
      "Beneficiary/village survey details",
      "ID where individual benefit is involved"
    ],
    "documentsHi": [
      "Beneficiary/village survey details",
      "ID where individual benefit is involved"
    ],
    "deadline": "Project based",
    "officialUrl": "https://socialjustice.gov.in/",
    "applyUrl": "https://socialjustice.gov.in/",
    "rules": {
      "genders": [
        "Female"
      ]
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "scheme-for-adolescent-girls",
    "slug": "scheme-for-adolescent-girls",
    "name": "Scheme for Adolescent Girls",
    "nameHi": "Scheme for Adolescent Girls",
    "description": "Nutrition, health and life-skill support for adolescent girls through programme platforms.",
    "descriptionHi": "Nutrition, health and life-skill support for adolescent girls through programme platforms.",
    "category": "Women & Child",
    "ministry": "Ministry of Women & Child Development",
    "benefits": [
      "Nutrition/health education, life skills and support services as applicable"
    ],
    "benefitsHi": [
      "Nutrition/health education, life skills and support services as applicable"
    ],
    "documents": [
      "Age/beneficiary details",
      "Aadhaar/ID where required by implementing channel"
    ],
    "documentsHi": [
      "Age/beneficiary details",
      "Aadhaar/ID where required by implementing channel"
    ],
    "deadline": "Ongoing / programme-based",
    "officialUrl": "https://wcd.gov.in/",
    "applyUrl": "https://wcd.gov.in/",
    "rules": {
      "genders": [
        "Female"
      ]
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "pradhan-mantri-mudra-yojana-pmmy",
    "slug": "pradhan-mantri-mudra-yojana-pmmy",
    "name": "Pradhan Mantri Mudra Yojana (PMMY)",
    "nameHi": "Pradhan Mantri Mudra Yojana (PMMY)",
    "description": "Institutional credit for micro and small non-corporate enterprises.",
    "descriptionHi": "Institutional credit for micro and small non-corporate enterprises.",
    "category": "Business & Entrepreneurship",
    "ministry": "Ministry of Finance",
    "benefits": [
      "Business loans under Shishu, Kishor and Tarun categories subject to lender/scheme rules"
    ],
    "benefitsHi": [
      "Business loans under Shishu, Kishor and Tarun categories subject to lender/scheme rules"
    ],
    "documents": [
      "Aadhaar/KYC",
      "PAN",
      "business proof",
      "bank statements",
      "project/business details"
    ],
    "documentsHi": [
      "Aadhaar/KYC",
      "PAN",
      "business proof",
      "bank statements",
      "project/business details"
    ],
    "deadline": "Ongoing / lender dependent",
    "officialUrl": "https://www.mudra.org.in/",
    "applyUrl": "https://www.mudra.org.in/",
    "rules": {
      "startupOwnerOnly": true
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "stand-up-india",
    "slug": "stand-up-india",
    "name": "Stand-Up India",
    "nameHi": "Stand-Up India",
    "description": "Bank loans for eligible SC/ST and women entrepreneurs for greenfield enterprises.",
    "descriptionHi": "Bank loans for eligible SC/ST and women entrepreneurs for greenfield enterprises.",
    "category": "Business & Entrepreneurship",
    "ministry": "Ministry of Finance",
    "benefits": [
      "Composite bank loan support for eligible greenfield businesses"
    ],
    "benefitsHi": [
      "Composite bank loan support for eligible greenfield businesses"
    ],
    "documents": [
      "Aadhaar/KYC",
      "PAN",
      "category certificate where applicable",
      "business plan",
      "bank/project documents"
    ],
    "documentsHi": [
      "Aadhaar/KYC",
      "PAN",
      "category certificate where applicable",
      "business plan",
      "bank/project documents"
    ],
    "deadline": "Ongoing / lender dependent",
    "officialUrl": "https://www.standupmitra.in/",
    "applyUrl": "https://www.standupmitra.in/",
    "rules": {
      "startupOwnerOnly": true,
      "genders": [
        "Female"
      ]
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "startup-india-seed-fund-scheme-sisfs",
    "slug": "startup-india-seed-fund-scheme-sisfs",
    "name": "Startup India Seed Fund Scheme (SISFS)",
    "nameHi": "Startup India Seed Fund Scheme (SISFS)",
    "description": "Seed funding support for eligible startups through approved incubators.",
    "descriptionHi": "Seed funding support for eligible startups through approved incubators.",
    "category": "Business & Entrepreneurship",
    "ministry": "Department for Promotion of Industry and Internal Trade",
    "benefits": [
      "Seed funding support for proof of concept, prototype, trials and market entry subject to selection"
    ],
    "benefitsHi": [
      "Seed funding support for proof of concept, prototype, trials and market entry subject to selection"
    ],
    "documents": [
      "DPIIT recognition",
      "incorporation documents",
      "pitch/business plan",
      "founder KYC",
      "bank details"
    ],
    "documentsHi": [
      "DPIIT recognition",
      "incorporation documents",
      "pitch/business plan",
      "founder KYC",
      "bank details"
    ],
    "deadline": "Cohort/incubator application windows",
    "officialUrl": "https://www.startupindia.gov.in/",
    "applyUrl": "https://www.startupindia.gov.in/",
    "rules": {
      "startupOwnerOnly": true
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "credit-guarantee-fund-trust-for-micro-and-small-enterprises-cgtmse",
    "slug": "credit-guarantee-fund-trust-for-micro-and-small-enterprises-cgtmse",
    "name": "Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)",
    "nameHi": "Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)",
    "description": "Credit guarantee support to facilitate collateral-free MSE lending.",
    "descriptionHi": "Credit guarantee support to facilitate collateral-free MSE lending.",
    "category": "Business & Entrepreneurship",
    "ministry": "Ministry of MSME / SIDBI",
    "benefits": [
      "Credit guarantee cover for eligible MSE loans",
      "facilitates collateral-free/low-collateral lending subject to lender terms"
    ],
    "benefitsHi": [
      "Credit guarantee cover for eligible MSE loans",
      "facilitates collateral-free/low-collateral lending subject to lender terms"
    ],
    "documents": [
      "Udyam Registration",
      "KYC",
      "business/financial records",
      "loan documents"
    ],
    "documentsHi": [
      "Udyam Registration",
      "KYC",
      "business/financial records",
      "loan documents"
    ],
    "deadline": "Ongoing / lender dependent",
    "officialUrl": "https://www.cgtmse.in/",
    "applyUrl": "https://www.cgtmse.in/",
    "rules": {
      "startupOwnerOnly": true
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "pm-formalisation-of-micro-food-processing-enterprises-pmfme",
    "slug": "pm-formalisation-of-micro-food-processing-enterprises-pmfme",
    "name": "PM Formalisation of Micro Food Processing Enterprises (PMFME)",
    "nameHi": "PM Formalisation of Micro Food Processing Enterprises (PMFME)",
    "description": "Supports formalisation and upgrading of micro food-processing enterprises.",
    "descriptionHi": "Supports formalisation and upgrading of micro food-processing enterprises.",
    "category": "Business & Entrepreneurship",
    "ministry": "Ministry of Food Processing Industries",
    "benefits": [
      "Credit-linked subsidy, seed capital/SHG support, training and branding/marketing support as applicable"
    ],
    "benefitsHi": [
      "Credit-linked subsidy, seed capital/SHG support, training and branding/marketing support as applicable"
    ],
    "documents": [
      "Aadhaar/KYC",
      "Udyam/business details",
      "project report",
      "bank details",
      "food/business documents"
    ],
    "documentsHi": [
      "Aadhaar/KYC",
      "Udyam/business details",
      "project report",
      "bank details",
      "food/business documents"
    ],
    "deadline": "State/application window dependent",
    "officialUrl": "https://mofpi.gov.in/",
    "applyUrl": "https://pmfme.mofpi.gov.in/",
    "rules": {
      "startupOwnerOnly": true
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "sfurti",
    "slug": "sfurti",
    "name": "SFURTI",
    "nameHi": "SFURTI",
    "description": "Supports traditional industry clusters and artisan enterprises.",
    "descriptionHi": "Supports traditional industry clusters and artisan enterprises.",
    "category": "Business & Entrepreneurship",
    "ministry": "Ministry of MSME",
    "benefits": [
      "Common facility centres, skill development, technology, design, packaging and market support"
    ],
    "benefitsHi": [
      "Common facility centres, skill development, technology, design, packaging and market support"
    ],
    "documents": [
      "Entity/cluster documents",
      "artisan details",
      "project proposal",
      "KYC",
      "bank details"
    ],
    "documentsHi": [
      "Entity/cluster documents",
      "artisan details",
      "project proposal",
      "KYC",
      "bank details"
    ],
    "deadline": "Project/proposal based",
    "officialUrl": "https://msme.gov.in/",
    "applyUrl": "https://sfurti.msme.gov.in/",
    "rules": {
      "startupOwnerOnly": true,
      "artisanOnly": true
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "raising-and-accelerating-msme-performance-ramp",
    "slug": "raising-and-accelerating-msme-performance-ramp",
    "name": "Raising and Accelerating MSME Performance (RAMP)",
    "nameHi": "Raising and Accelerating MSME Performance (RAMP)",
    "description": "Programme to improve MSME access to markets, finance, technology and capacity.",
    "descriptionHi": "Programme to improve MSME access to markets, finance, technology and capacity.",
    "category": "Business & Entrepreneurship",
    "ministry": "Ministry of MSME",
    "benefits": [
      "MSME ecosystem support, market access, technology and institutional capacity support"
    ],
    "benefitsHi": [
      "MSME ecosystem support, market access, technology and institutional capacity support"
    ],
    "documents": [
      "Udyam Registration",
      "business/KYC details",
      "component-specific application documents"
    ],
    "documentsHi": [
      "Udyam Registration",
      "business/KYC details",
      "component-specific application documents"
    ],
    "deadline": "Programme/component specific",
    "officialUrl": "https://msme.gov.in/",
    "applyUrl": "https://ramp.msme.gov.in/",
    "rules": {
      "startupOwnerOnly": true
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "national-sc-st-hub",
    "slug": "national-sc-st-hub",
    "name": "National SC-ST Hub",
    "nameHi": "National SC-ST Hub",
    "description": "Supports SC/ST entrepreneurs in government procurement and enterprise development.",
    "descriptionHi": "Supports SC/ST entrepreneurs in government procurement and enterprise development.",
    "category": "Business & Entrepreneurship",
    "ministry": "Ministry of MSME",
    "benefits": [
      "Capacity building, tender/procurement support, mentoring, subsidy/reimbursement support under applicable programmes"
    ],
    "benefitsHi": [
      "Capacity building, tender/procurement support, mentoring, subsidy/reimbursement support under applicable programmes"
    ],
    "documents": [
      "SC/ST certificate",
      "Udyam Registration",
      "PAN/KYC",
      "business documents",
      "bank details"
    ],
    "documentsHi": [
      "SC/ST certificate",
      "Udyam Registration",
      "PAN/KYC",
      "business documents",
      "bank details"
    ],
    "deadline": "Ongoing / programme-specific",
    "officialUrl": "https://msme.gov.in/",
    "applyUrl": "https://scsthub.in/",
    "rules": {
      "startupOwnerOnly": true
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "adip-scheme",
    "slug": "adip-scheme",
    "name": "ADIP Scheme",
    "nameHi": "ADIP Scheme",
    "description": "Assistance for purchase and fitting of aids and appliances for eligible persons with disabilities.",
    "descriptionHi": "Assistance for purchase and fitting of aids and appliances for eligible persons with disabilities.",
    "category": "Disability Welfare",
    "ministry": "Department of Empowerment of Persons with Disabilities, Ministry of Social Justice & Empowerment",
    "benefits": [
      "Assistive devices",
      "mobility aids",
      "rehabilitation support"
    ],
    "benefitsHi": [
      "Assistive devices",
      "mobility aids",
      "rehabilitation support"
    ],
    "documents": [
      "Disability certificate/UDID",
      "Aadhaar/identity proof",
      "income proof",
      "bank details",
      "photograph"
    ],
    "documentsHi": [
      "Disability certificate/UDID",
      "Aadhaar/identity proof",
      "income proof",
      "bank details",
      "photograph"
    ],
    "deadline": "Ongoing",
    "officialUrl": "https://depwd.gov.in/en/scheme-of-assistance-to-disabled-persons/",
    "applyUrl": "https://adip.depwd.gov.in/",
    "rules": {
      "disabilityOnly": true
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "deendayal-divyangjan-rehabilitation-scheme-ddrs",
    "slug": "deendayal-divyangjan-rehabilitation-scheme-ddrs",
    "name": "Deendayal Divyangjan Rehabilitation Scheme (DDRS)",
    "nameHi": "Deendayal Divyangjan Rehabilitation Scheme (DDRS)",
    "description": "Grant-in-aid to eligible organizations for rehabilitation services for persons with disabilities.",
    "descriptionHi": "Grant-in-aid to eligible organizations for rehabilitation services for persons with disabilities.",
    "category": "Disability Welfare",
    "ministry": "Department of Empowerment of Persons with Disabilities, Ministry of Social Justice & Empowerment",
    "benefits": [
      "Rehabilitation services",
      "special education",
      "therapy",
      "counselling and support"
    ],
    "benefitsHi": [
      "Rehabilitation services",
      "special education",
      "therapy",
      "counselling and support"
    ],
    "documents": [
      "Organization registration",
      "project proposal",
      "audited accounts",
      "utilization certificates",
      "beneficiary details"
    ],
    "documentsHi": [
      "Organization registration",
      "project proposal",
      "audited accounts",
      "utilization certificates",
      "beneficiary details"
    ],
    "deadline": "Periodic / project-based",
    "officialUrl": "https://depwd.gov.in/en/schemes/",
    "applyUrl": "https://grants.depwd.gov.in/",
    "rules": {
      "disabilityOnly": true
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "scheme-for-implementation-of-rights-of-persons-with-disabilities-act-sipda",
    "slug": "scheme-for-implementation-of-rights-of-persons-with-disabilities-act-sipda",
    "name": "Scheme for Implementation of Rights of Persons with Disabilities Act (SIPDA)",
    "nameHi": "Scheme for Implementation of Rights of Persons with Disabilities Act (SIPDA)",
    "description": "Supports accessibility, skill development, disability certification, rehabilitation and implementation of the RPwD Act.",
    "descriptionHi": "Supports accessibility, skill development, disability certification, rehabilitation and implementation of the RPwD Act.",
    "category": "Disability Welfare",
    "ministry": "Department of Empowerment of Persons with Disabilities, Ministry of Social Justice & Empowerment",
    "benefits": [
      "Barrier-free infrastructure",
      "skill development",
      "accessibility",
      "awareness",
      "rehabilitation support"
    ],
    "benefitsHi": [
      "Barrier-free infrastructure",
      "skill development",
      "accessibility",
      "awareness",
      "rehabilitation support"
    ],
    "documents": [
      "Project proposal",
      "organization/government agency documents",
      "budget details",
      "beneficiary/project details"
    ],
    "documentsHi": [
      "Project proposal",
      "organization/government agency documents",
      "budget details",
      "beneficiary/project details"
    ],
    "deadline": "Ongoing / project-based",
    "officialUrl": "https://depwd.gov.in/en/sipda/",
    "applyUrl": "https://depwd.gov.in/en/sipda/",
    "rules": {
      "disabilityOnly": true
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "scholarship-for-students-with-disabilities--pre-matric",
    "slug": "scholarship-for-students-with-disabilities--pre-matric",
    "name": "Scholarship for Students with Disabilities \u2013 Pre-Matric",
    "nameHi": "Scholarship for Students with Disabilities \u2013 Pre-Matric",
    "description": "Scholarship support for eligible students with disabilities in Classes IX and X.",
    "descriptionHi": "Scholarship support for eligible students with disabilities in Classes IX and X.",
    "category": "Disability Welfare",
    "ministry": "Department of Empowerment of Persons with Disabilities, Ministry of Social Justice & Empowerment",
    "benefits": [
      "Scholarship",
      "maintenance support",
      "educational assistance"
    ],
    "benefitsHi": [
      "Scholarship",
      "maintenance support",
      "educational assistance"
    ],
    "documents": [
      "UDID/disability certificate",
      "Aadhaar",
      "income certificate",
      "school certificate",
      "bank account details",
      "marksheet"
    ],
    "documentsHi": [
      "UDID/disability certificate",
      "Aadhaar",
      "income certificate",
      "school certificate",
      "bank account details",
      "marksheet"
    ],
    "deadline": "Annual",
    "officialUrl": "https://depwd.gov.in/en/scholarship/",
    "applyUrl": "https://scholarships.gov.in/",
    "rules": {
      "disabilityOnly": true,
      "studentOnly": true
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "post-matric-scholarship-for-students-with-disabilities",
    "slug": "post-matric-scholarship-for-students-with-disabilities",
    "name": "Post-Matric Scholarship for Students with Disabilities",
    "nameHi": "Post-Matric Scholarship for Students with Disabilities",
    "description": "Financial support for eligible students with benchmark disabilities from Class XI through postgraduate level.",
    "descriptionHi": "Financial support for eligible students with benchmark disabilities from Class XI through postgraduate level.",
    "category": "Disability Welfare",
    "ministry": "Department of Empowerment of Persons with Disabilities, Ministry of Social Justice & Empowerment",
    "benefits": [
      "Tuition/admission fee support",
      "maintenance allowance",
      "books and disability allowance"
    ],
    "benefitsHi": [
      "Tuition/admission fee support",
      "maintenance allowance",
      "books and disability allowance"
    ],
    "documents": [
      "UDID",
      "Aadhaar",
      "income certificate",
      "admission/bonafide certificate",
      "marksheet",
      "bank details"
    ],
    "documentsHi": [
      "UDID",
      "Aadhaar",
      "income certificate",
      "admission/bonafide certificate",
      "marksheet",
      "bank details"
    ],
    "deadline": "Annual",
    "officialUrl": "https://depwd.gov.in/en/scholarship-post-matric/",
    "applyUrl": "https://scholarships.gov.in/",
    "rules": {
      "disabilityOnly": true,
      "studentOnly": true
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "top-class-education-scholarship-for-students-with-disabilities",
    "slug": "top-class-education-scholarship-for-students-with-disabilities",
    "name": "Top Class Education Scholarship for Students with Disabilities",
    "nameHi": "Top Class Education Scholarship for Students with Disabilities",
    "description": "Higher-education scholarship for students with benchmark disabilities in notified institutes.",
    "descriptionHi": "Higher-education scholarship for students with benchmark disabilities in notified institutes.",
    "category": "Disability Welfare",
    "ministry": "Department of Empowerment of Persons with Disabilities, Ministry of Social Justice & Empowerment",
    "benefits": [
      "Tuition and fees",
      "hostel/day-scholar support",
      "books",
      "computer and assistive-device support"
    ],
    "benefitsHi": [
      "Tuition and fees",
      "hostel/day-scholar support",
      "books",
      "computer and assistive-device support"
    ],
    "documents": [
      "UDID",
      "Aadhaar",
      "income certificate",
      "admission proof",
      "institute details",
      "bank details"
    ],
    "documentsHi": [
      "UDID",
      "Aadhaar",
      "income certificate",
      "admission proof",
      "institute details",
      "bank details"
    ],
    "deadline": "Annual",
    "officialUrl": "https://depwd.gov.in/en/scholarship-top-class-fellowship/",
    "applyUrl": "https://scholarships.gov.in/",
    "rules": {
      "disabilityOnly": true,
      "studentOnly": true
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "national-fellowship-for-persons-with-disabilities-nfpwd",
    "slug": "national-fellowship-for-persons-with-disabilities-nfpwd",
    "name": "National Fellowship for Persons with Disabilities (NFPwD)",
    "nameHi": "National Fellowship for Persons with Disabilities (NFPwD)",
    "description": "Fellowship support for eligible students with disabilities pursuing advanced research.",
    "descriptionHi": "Fellowship support for eligible students with disabilities pursuing advanced research.",
    "category": "Disability Welfare",
    "ministry": "Department of Empowerment of Persons with Disabilities, Ministry of Social Justice & Empowerment",
    "benefits": [
      "Monthly fellowship",
      "contingency/research support as per guidelines"
    ],
    "benefitsHi": [
      "Monthly fellowship",
      "contingency/research support as per guidelines"
    ],
    "documents": [
      "UDID",
      "Aadhaar",
      "admission/registration proof",
      "academic records",
      "research details",
      "bank details"
    ],
    "documentsHi": [
      "UDID",
      "Aadhaar",
      "admission/registration proof",
      "academic records",
      "research details",
      "bank details"
    ],
    "deadline": "Annual",
    "officialUrl": "https://depwd.gov.in/en/scholarship/",
    "applyUrl": "https://depwd.gov.in/en/scholarship/",
    "rules": {
      "disabilityOnly": true,
      "studentOnly": true
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "national-overseas-scholarship-for-pwds",
    "slug": "national-overseas-scholarship-for-pwds",
    "name": "National Overseas Scholarship for PwDs",
    "nameHi": "National Overseas Scholarship for PwDs",
    "description": "Financial assistance for eligible persons with disabilities pursuing higher studies abroad.",
    "descriptionHi": "Financial assistance for eligible persons with disabilities pursuing higher studies abroad.",
    "category": "Disability Welfare",
    "ministry": "Department of Empowerment of Persons with Disabilities, Ministry of Social Justice & Empowerment",
    "benefits": [
      "Financial assistance for overseas higher education",
      "maintenance and other admissible support"
    ],
    "benefitsHi": [
      "Financial assistance for overseas higher education",
      "maintenance and other admissible support"
    ],
    "documents": [
      "Disability certificate/UDID",
      "Aadhaar",
      "academic records",
      "admission/offer letter",
      "income documents",
      "passport",
      "bank details"
    ],
    "documentsHi": [
      "Disability certificate/UDID",
      "Aadhaar",
      "academic records",
      "admission/offer letter",
      "income documents",
      "passport",
      "bank details"
    ],
    "deadline": "Annual / as notified",
    "officialUrl": "https://depwd.gov.in/en/scholarship/",
    "applyUrl": "https://depwd.gov.in/en/scholarship/",
    "rules": {
      "disabilityOnly": true
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "free-coaching-scheme-for-students-with-disabilities",
    "slug": "free-coaching-scheme-for-students-with-disabilities",
    "name": "Free Coaching Scheme for Students with Disabilities",
    "nameHi": "Free Coaching Scheme for Students with Disabilities",
    "description": "Coaching support for eligible students with disabilities preparing for competitive and entrance examinations.",
    "descriptionHi": "Coaching support for eligible students with disabilities preparing for competitive and entrance examinations.",
    "category": "Disability Welfare",
    "ministry": "Department of Empowerment of Persons with Disabilities, Ministry of Social Justice & Empowerment",
    "benefits": [
      "Free/financially supported coaching",
      "examination preparation support"
    ],
    "benefitsHi": [
      "Free/financially supported coaching",
      "examination preparation support"
    ],
    "documents": [
      "UDID/disability certificate",
      "Aadhaar",
      "educational qualification",
      "income proof where applicable",
      "bank details"
    ],
    "documentsHi": [
      "UDID/disability certificate",
      "Aadhaar",
      "educational qualification",
      "income proof where applicable",
      "bank details"
    ],
    "deadline": "Periodic",
    "officialUrl": "https://depwd.gov.in/en/scholarship/",
    "applyUrl": "https://pmdaksh.depwd.gov.in/",
    "rules": {
      "disabilityOnly": true,
      "studentOnly": true
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "national-action-plan-for-skill-development-of-persons-with-disabilities-nap-sdp",
    "slug": "national-action-plan-for-skill-development-of-persons-with-disabilities-nap-sdp",
    "name": "National Action Plan for Skill Development of Persons with Disabilities (NAP-SDP)",
    "nameHi": "National Action Plan for Skill Development of Persons with Disabilities (NAP-SDP)",
    "description": "Supports skill training and livelihood-oriented training for persons with disabilities.",
    "descriptionHi": "Supports skill training and livelihood-oriented training for persons with disabilities.",
    "category": "Disability Welfare",
    "ministry": "Department of Empowerment of Persons with Disabilities, Ministry of Social Justice & Empowerment",
    "benefits": [
      "Skill training",
      "employability development",
      "livelihood opportunities"
    ],
    "benefitsHi": [
      "Skill training",
      "employability development",
      "livelihood opportunities"
    ],
    "documents": [
      "UDID/disability certificate",
      "Aadhaar/identity proof",
      "education details",
      "bank details",
      "training registration"
    ],
    "documentsHi": [
      "UDID/disability certificate",
      "Aadhaar/identity proof",
      "education details",
      "bank details",
      "training registration"
    ],
    "deadline": "Periodic / training-batch based",
    "officialUrl": "https://depwd.gov.in/en/document-category/guidelines-for-national-action-plan-for-skill-development-of-persons-with-disabilities-nap-sdp/",
    "applyUrl": "https://pmdaksh.depwd.gov.in/",
    "rules": {
      "disabilityOnly": true
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "rashtriya-gokul-mission-rgm",
    "slug": "rashtriya-gokul-mission-rgm",
    "name": "Rashtriya Gokul Mission (RGM)",
    "nameHi": "Rashtriya Gokul Mission (RGM)",
    "description": "Promotes development and conservation of indigenous bovine breeds and genetic improvement.",
    "descriptionHi": "Promotes development and conservation of indigenous bovine breeds and genetic improvement.",
    "category": "Animal Husbandry & Fisheries",
    "ministry": "Department of Animal Husbandry & Dairying, Ministry of Fisheries, Animal Husbandry & Dairying",
    "benefits": [
      "Breed improvement",
      "artificial insemination",
      "dairy productivity support",
      "entrepreneurship components"
    ],
    "benefitsHi": [
      "Breed improvement",
      "artificial insemination",
      "dairy productivity support",
      "entrepreneurship components"
    ],
    "documents": [
      "Aadhaar/KYC",
      "land/lease documents where required",
      "bank details",
      "animal/farm details",
      "project documents"
    ],
    "documentsHi": [
      "Aadhaar/KYC",
      "land/lease documents where required",
      "bank details",
      "animal/farm details",
      "project documents"
    ],
    "deadline": "Ongoing / project-based",
    "officialUrl": "https://dahd.gov.in/schemes-programmes",
    "applyUrl": "https://dahd.gov.in/schemes/programmes/rashtriya_gokul_mission",
    "rules": {
      "husbandryOrFisheriesOnly": true,
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "national-livestock-mission-nlm",
    "slug": "national-livestock-mission-nlm",
    "name": "National Livestock Mission (NLM)",
    "nameHi": "National Livestock Mission (NLM)",
    "description": "Supports entrepreneurship and breed development in poultry, sheep, goat, piggery, camel, horse, donkey and feed/fodder sectors.",
    "descriptionHi": "Supports entrepreneurship and breed development in poultry, sheep, goat, piggery, camel, horse, donkey and feed/fodder sectors.",
    "category": "Animal Husbandry & Fisheries",
    "ministry": "Department of Animal Husbandry & Dairying, Ministry of Fisheries, Animal Husbandry & Dairying",
    "benefits": [
      "Capital subsidy",
      "entrepreneurship support",
      "breed development",
      "feed and fodder support"
    ],
    "benefitsHi": [
      "Capital subsidy",
      "entrepreneurship support",
      "breed development",
      "feed and fodder support"
    ],
    "documents": [
      "Aadhaar/KYC",
      "DPR/project report",
      "land/lease proof",
      "bank details",
      "organization documents where applicable"
    ],
    "documentsHi": [
      "Aadhaar/KYC",
      "DPR/project report",
      "land/lease proof",
      "bank details",
      "organization documents where applicable"
    ],
    "deadline": "Ongoing / portal-based",
    "officialUrl": "https://dahd.gov.in/schemes/programmes/national_livestock_mission",
    "applyUrl": "https://nlm.udyamimitra.in/",
    "rules": {
      "husbandryOrFisheriesOnly": true,
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "livestock-health-and-disease-control-programme-lhdcp",
    "slug": "livestock-health-and-disease-control-programme-lhdcp",
    "name": "Livestock Health and Disease Control Programme (LHDCP)",
    "nameHi": "Livestock Health and Disease Control Programme (LHDCP)",
    "description": "Supports vaccination, disease surveillance, control and veterinary health services for livestock.",
    "descriptionHi": "Supports vaccination, disease surveillance, control and veterinary health services for livestock.",
    "category": "Animal Husbandry & Fisheries",
    "ministry": "Department of Animal Husbandry & Dairying, Ministry of Fisheries, Animal Husbandry & Dairying",
    "benefits": [
      "Vaccination",
      "disease control",
      "veterinary support",
      "surveillance"
    ],
    "benefitsHi": [
      "Vaccination",
      "disease control",
      "veterinary support",
      "surveillance"
    ],
    "documents": [
      "Farmer/owner identity",
      "animal details",
      "animal identification/ear-tag details where applicable"
    ],
    "documentsHi": [
      "Farmer/owner identity",
      "animal details",
      "animal identification/ear-tag details where applicable"
    ],
    "deadline": "Ongoing",
    "officialUrl": "https://dahd.gov.in/schemes-programmes",
    "applyUrl": "https://dahd.gov.in/schemes-programmes",
    "rules": {
      "husbandryOrFisheriesOnly": true,
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "national-programme-for-dairy-development-npdd",
    "slug": "national-programme-for-dairy-development-npdd",
    "name": "National Programme for Dairy Development (NPDD)",
    "nameHi": "National Programme for Dairy Development (NPDD)",
    "description": "Strengthens milk procurement, testing, chilling, processing and dairy infrastructure.",
    "descriptionHi": "Strengthens milk procurement, testing, chilling, processing and dairy infrastructure.",
    "category": "Animal Husbandry & Fisheries",
    "ministry": "Department of Animal Husbandry & Dairying, Ministry of Fisheries, Animal Husbandry & Dairying",
    "benefits": [
      "Dairy infrastructure",
      "milk testing",
      "chilling and processing support"
    ],
    "benefitsHi": [
      "Dairy infrastructure",
      "milk testing",
      "chilling and processing support"
    ],
    "documents": [
      "Project proposal/DPR",
      "organization registration",
      "financial documents",
      "land/infrastructure documents"
    ],
    "documentsHi": [
      "Project proposal/DPR",
      "organization registration",
      "financial documents",
      "land/infrastructure documents"
    ],
    "deadline": "Project-based",
    "officialUrl": "https://dahd.gov.in/schemes-programmes",
    "applyUrl": "https://dahd.gov.in/schemes/programmes/npdd",
    "rules": {
      "husbandryOrFisheriesOnly": true,
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "animal-husbandry-infrastructure-development-fund-ahidf",
    "slug": "animal-husbandry-infrastructure-development-fund-ahidf",
    "name": "Animal Husbandry Infrastructure Development Fund (AHIDF)",
    "nameHi": "Animal Husbandry Infrastructure Development Fund (AHIDF)",
    "description": "Facilitates investment in dairy, meat processing, animal feed, breed multiplication and related infrastructure.",
    "descriptionHi": "Facilitates investment in dairy, meat processing, animal feed, breed multiplication and related infrastructure.",
    "category": "Animal Husbandry & Fisheries",
    "ministry": "Department of Animal Husbandry & Dairying, Ministry of Fisheries, Animal Husbandry & Dairying",
    "benefits": [
      "Interest support",
      "credit facilitation",
      "infrastructure investment support"
    ],
    "benefitsHi": [
      "Interest support",
      "credit facilitation",
      "infrastructure investment support"
    ],
    "documents": [
      "DPR",
      "KYC",
      "land documents",
      "financial statements",
      "bank documents",
      "project/enterprise registration"
    ],
    "documentsHi": [
      "DPR",
      "KYC",
      "land documents",
      "financial statements",
      "bank documents",
      "project/enterprise registration"
    ],
    "deadline": "Ongoing / project-based",
    "officialUrl": "https://dahd.gov.in/schemes-programmes",
    "applyUrl": "https://ahidf.udyamimitra.in/",
    "rules": {
      "husbandryOrFisheriesOnly": true,
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "supporting-dairy-cooperatives--farmer-producer-organizations-sdcfpo",
    "slug": "supporting-dairy-cooperatives--farmer-producer-organizations-sdcfpo",
    "name": "Supporting Dairy Cooperatives & Farmer Producer Organizations (SDCFPO)",
    "nameHi": "Supporting Dairy Cooperatives & Farmer Producer Organizations (SDCFPO)",
    "description": "Supports dairy cooperatives and farmer producer organizations facing adverse market conditions.",
    "descriptionHi": "Supports dairy cooperatives and farmer producer organizations facing adverse market conditions.",
    "category": "Animal Husbandry & Fisheries",
    "ministry": "Department of Animal Husbandry & Dairying, Ministry of Fisheries, Animal Husbandry & Dairying",
    "benefits": [
      "Interest subvention/financial support",
      "working-capital support"
    ],
    "benefitsHi": [
      "Interest subvention/financial support",
      "working-capital support"
    ],
    "documents": [
      "Registration certificate",
      "financial statements",
      "loan details",
      "project documents",
      "bank documents"
    ],
    "documentsHi": [
      "Registration certificate",
      "financial statements",
      "loan details",
      "project documents",
      "bank documents"
    ],
    "deadline": "Project / financial-cycle based",
    "officialUrl": "https://dahd.gov.in/schemes-programmes",
    "applyUrl": "https://dahd.gov.in/schemes-programmes",
    "rules": {
      "husbandryOrFisheriesOnly": true,
      "incomeLimit": 250000,
      "farmerOnly": true
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "pradhan-mantri-matsya-sampada-yojana-pmmsy",
    "slug": "pradhan-mantri-matsya-sampada-yojana-pmmsy",
    "name": "Pradhan Mantri Matsya Sampada Yojana (PMMSY)",
    "nameHi": "Pradhan Mantri Matsya Sampada Yojana (PMMSY)",
    "description": "Flagship fisheries programme covering aquaculture, marine/inland fisheries, infrastructure and fisher welfare.",
    "descriptionHi": "Flagship fisheries programme covering aquaculture, marine/inland fisheries, infrastructure and fisher welfare.",
    "category": "Animal Husbandry & Fisheries",
    "ministry": "Department of Fisheries, Ministry of Fisheries, Animal Husbandry & Dairying",
    "benefits": [
      "Financial assistance for fisheries activities",
      "infrastructure",
      "aquaculture",
      "fisher welfare"
    ],
    "benefitsHi": [
      "Financial assistance for fisheries activities",
      "infrastructure",
      "aquaculture",
      "fisher welfare"
    ],
    "documents": [
      "Aadhaar/KYC",
      "fisheries registration",
      "land/waterbody documents",
      "DPR/project proposal",
      "bank details"
    ],
    "documentsHi": [
      "Aadhaar/KYC",
      "fisheries registration",
      "land/waterbody documents",
      "DPR/project proposal",
      "bank details"
    ],
    "deadline": "Project / state-specific",
    "officialUrl": "https://pmmsy.dof.gov.in/",
    "applyUrl": "https://pmmsy.dof.gov.in/",
    "rules": {
      "husbandryOrFisheriesOnly": true,
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "pradhan-mantri-matsya-kisan-samridhi-sah-yojana-pm-mkssy",
    "slug": "pradhan-mantri-matsya-kisan-samridhi-sah-yojana-pm-mkssy",
    "name": "Pradhan Mantri Matsya Kisan Samridhi Sah-Yojana (PM-MKSSY)",
    "nameHi": "Pradhan Mantri Matsya Kisan Samridhi Sah-Yojana (PM-MKSSY)",
    "description": "Central Sector sub-scheme under PMMSY for formalization, finance, insurance and efficiency of the fisheries sector.",
    "descriptionHi": "Central Sector sub-scheme under PMMSY for formalization, finance, insurance and efficiency of the fisheries sector.",
    "category": "Animal Husbandry & Fisheries",
    "ministry": "Department of Fisheries, Ministry of Fisheries, Animal Husbandry & Dairying",
    "benefits": [
      "Digital identity on NFDP",
      "access to institutional finance",
      "insurance incentives",
      "enterprise incentives"
    ],
    "benefitsHi": [
      "Digital identity on NFDP",
      "access to institutional finance",
      "insurance incentives",
      "enterprise incentives"
    ],
    "documents": [
      "Aadhaar/KYC",
      "NFDP registration",
      "fisheries/business documents",
      "bank details"
    ],
    "documentsHi": [
      "Aadhaar/KYC",
      "NFDP registration",
      "fisheries/business documents",
      "bank details"
    ],
    "deadline": "FY 2023-24 to FY 2026-27",
    "officialUrl": "https://www.dof.gov.in/offerings/schemes-and-services/details/pmmkssy-2-cTN5ETMtQWa",
    "applyUrl": "https://nfdb.gov.in/",
    "rules": {
      "husbandryOrFisheriesOnly": true,
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "fisheries-and-aquaculture-infrastructure-development-fund-fidf",
    "slug": "fisheries-and-aquaculture-infrastructure-development-fund-fidf",
    "name": "Fisheries and Aquaculture Infrastructure Development Fund (FIDF)",
    "nameHi": "Fisheries and Aquaculture Infrastructure Development Fund (FIDF)",
    "description": "Provides concessional finance for eligible fisheries infrastructure projects.",
    "descriptionHi": "Provides concessional finance for eligible fisheries infrastructure projects.",
    "category": "Animal Husbandry & Fisheries",
    "ministry": "Department of Fisheries, Ministry of Fisheries, Animal Husbandry & Dairying",
    "benefits": [
      "Concessional finance",
      "fisheries infrastructure development",
      "interest support as applicable"
    ],
    "benefitsHi": [
      "Concessional finance",
      "fisheries infrastructure development",
      "interest support as applicable"
    ],
    "documents": [
      "DPR",
      "KYC",
      "land/project documents",
      "financial statements",
      "bank/loan documents"
    ],
    "documentsHi": [
      "DPR",
      "KYC",
      "land/project documents",
      "financial statements",
      "bank/loan documents"
    ],
    "deadline": "Project-based",
    "officialUrl": "https://dof.gov.in/offerings/schemes-and-services",
    "applyUrl": "https://dof.gov.in/",
    "rules": {
      "husbandryOrFisheriesOnly": true,
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "kisan-credit-card-for-animal-husbandry--fisheries",
    "slug": "kisan-credit-card-for-animal-husbandry--fisheries",
    "name": "Kisan Credit Card for Animal Husbandry & Fisheries",
    "nameHi": "Kisan Credit Card for Animal Husbandry & Fisheries",
    "description": "Extends working-capital credit facilities to eligible livestock and fisheries farmers.",
    "descriptionHi": "Extends working-capital credit facilities to eligible livestock and fisheries farmers.",
    "category": "Animal Husbandry & Fisheries",
    "ministry": "Ministry of Fisheries, Animal Husbandry & Dairying / Department of Financial Services",
    "benefits": [
      "Working-capital credit for feed, livestock and fisheries operations",
      "institutional credit access"
    ],
    "benefitsHi": [
      "Working-capital credit for feed, livestock and fisheries operations",
      "institutional credit access"
    ],
    "documents": [
      "KYC/Aadhaar",
      "livestock/fisheries activity proof",
      "land/lease proof where applicable",
      "bank documents"
    ],
    "documentsHi": [
      "KYC/Aadhaar",
      "livestock/fisheries activity proof",
      "land/lease proof where applicable",
      "bank documents"
    ],
    "deadline": "Ongoing",
    "officialUrl": "https://dahd.gov.in/schemes-programmes",
    "applyUrl": "https://www.kcc.gov.in/",
    "rules": {
      "husbandryOrFisheriesOnly": true,
      "incomeLimit": 250000,
      "farmerOnly": true
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "national-handicrafts-development-programme-nhdp",
    "slug": "national-handicrafts-development-programme-nhdp",
    "name": "National Handicrafts Development Programme (NHDP)",
    "nameHi": "National Handicrafts Development Programme (NHDP)",
    "description": "Umbrella programme supporting handicraft artisans through skill, technology, design, marketing and welfare interventions.",
    "descriptionHi": "Umbrella programme supporting handicraft artisans through skill, technology, design, marketing and welfare interventions.",
    "category": "Traditional Crafts & Artisans",
    "ministry": "Ministry of Textiles \u2013 Development Commissioner (Handicrafts)",
    "benefits": [
      "Skill development",
      "technology support",
      "design development",
      "marketing support",
      "cluster assistance"
    ],
    "benefitsHi": [
      "Skill development",
      "technology support",
      "design development",
      "marketing support",
      "cluster assistance"
    ],
    "documents": [
      "Artisan registration/identity",
      "Aadhaar/KYC",
      "craft details",
      "project/application documents"
    ],
    "documentsHi": [
      "Artisan registration/identity",
      "Aadhaar/KYC",
      "craft details",
      "project/application documents"
    ],
    "deadline": "Ongoing / periodic",
    "officialUrl": "https://handicrafts.nic.in/",
    "applyUrl": "https://handicrafts.nic.in/",
    "rules": {
      "artisanOnly": true,
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "ambedkar-hastshilp-vikas-yojana-ahvy",
    "slug": "ambedkar-hastshilp-vikas-yojana-ahvy",
    "name": "Ambedkar Hastshilp Vikas Yojana (AHVY)",
    "nameHi": "Ambedkar Hastshilp Vikas Yojana (AHVY)",
    "description": "Cluster-based development and empowerment of handicraft artisans.",
    "descriptionHi": "Cluster-based development and empowerment of handicraft artisans.",
    "category": "Traditional Crafts & Artisans",
    "ministry": "Ministry of Textiles \u2013 Development Commissioner (Handicrafts)",
    "benefits": [
      "Cluster development",
      "design and technology",
      "skill",
      "infrastructure",
      "marketing support"
    ],
    "benefitsHi": [
      "Cluster development",
      "design and technology",
      "skill",
      "infrastructure",
      "marketing support"
    ],
    "documents": [
      "Artisan/cluster details",
      "KYC",
      "organization/SHG details where applicable",
      "project proposal"
    ],
    "documentsHi": [
      "Artisan/cluster details",
      "KYC",
      "organization/SHG details where applicable",
      "project proposal"
    ],
    "deadline": "Project-based",
    "officialUrl": "https://handicrafts.nic.in/",
    "applyUrl": "https://handicrafts.nic.in/",
    "rules": {
      "artisanOnly": true,
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "marketing-support--services-mss--handicrafts",
    "slug": "marketing-support--services-mss--handicrafts",
    "name": "Marketing Support & Services (MSS) \u2013 Handicrafts",
    "nameHi": "Marketing Support & Services (MSS) \u2013 Handicrafts",
    "description": "Provides domestic and international marketing opportunities for handicraft artisans and organizations.",
    "descriptionHi": "Provides domestic and international marketing opportunities for handicraft artisans and organizations.",
    "category": "Traditional Crafts & Artisans",
    "ministry": "Ministry of Textiles \u2013 Development Commissioner (Handicrafts)",
    "benefits": [
      "Exhibitions",
      "fairs",
      "buyer-seller meets",
      "market linkage",
      "promotion"
    ],
    "benefitsHi": [
      "Exhibitions",
      "fairs",
      "buyer-seller meets",
      "market linkage",
      "promotion"
    ],
    "documents": [
      "Artisan registration",
      "product details",
      "identity proof",
      "product photographs",
      "participation documents"
    ],
    "documentsHi": [
      "Artisan registration",
      "product details",
      "identity proof",
      "product photographs",
      "participation documents"
    ],
    "deadline": "Event / annual cycle",
    "officialUrl": "https://handicrafts.nic.in/",
    "applyUrl": "https://handicrafts.nic.in/",
    "rules": {
      "artisanOnly": true,
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "skill-development-in-handicrafts-sector-sdhs",
    "slug": "skill-development-in-handicrafts-sector-sdhs",
    "name": "Skill Development in Handicrafts Sector (SDHS)",
    "nameHi": "Skill Development in Handicrafts Sector (SDHS)",
    "description": "Provides skill development and training for artisans and persons entering handicraft trades.",
    "descriptionHi": "Provides skill development and training for artisans and persons entering handicraft trades.",
    "category": "Traditional Crafts & Artisans",
    "ministry": "Ministry of Textiles \u2013 Development Commissioner (Handicrafts)",
    "benefits": [
      "Skill training",
      "improved production skills",
      "employability and livelihood support"
    ],
    "benefitsHi": [
      "Skill training",
      "improved production skills",
      "employability and livelihood support"
    ],
    "documents": [
      "Identity proof",
      "artisan/training registration",
      "photographs",
      "education/basic details"
    ],
    "documentsHi": [
      "Identity proof",
      "artisan/training registration",
      "photographs",
      "education/basic details"
    ],
    "deadline": "Training-batch based",
    "officialUrl": "https://handicrafts.nic.in/",
    "applyUrl": "https://handicrafts.nic.in/",
    "rules": {
      "artisanOnly": true,
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "design--technology-development--upgradation",
    "slug": "design--technology-development--upgradation",
    "name": "Design & Technology Development / Upgradation",
    "nameHi": "Design & Technology Development / Upgradation",
    "description": "Supports design development, product diversification and technology improvement in handicrafts.",
    "descriptionHi": "Supports design development, product diversification and technology improvement in handicrafts.",
    "category": "Traditional Crafts & Artisans",
    "ministry": "Ministry of Textiles \u2013 Development Commissioner (Handicrafts)",
    "benefits": [
      "Design workshops",
      "product development",
      "technology support",
      "quality improvement"
    ],
    "benefitsHi": [
      "Design workshops",
      "product development",
      "technology support",
      "quality improvement"
    ],
    "documents": [
      "Artisan details",
      "craft/product details",
      "project/training application",
      "identity proof"
    ],
    "documentsHi": [
      "Artisan details",
      "craft/product details",
      "project/training application",
      "identity proof"
    ],
    "deadline": "Project / batch based",
    "officialUrl": "https://handicrafts.nic.in/",
    "applyUrl": "https://handicrafts.nic.in/",
    "rules": {
      "artisanOnly": true,
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "comprehensive-handicrafts-cluster-development-scheme-chcds",
    "slug": "comprehensive-handicrafts-cluster-development-scheme-chcds",
    "name": "Comprehensive Handicrafts Cluster Development Scheme (CHCDS)",
    "nameHi": "Comprehensive Handicrafts Cluster Development Scheme (CHCDS)",
    "description": "Develops large handicraft clusters with infrastructure and common facilities.",
    "descriptionHi": "Develops large handicraft clusters with infrastructure and common facilities.",
    "category": "Traditional Crafts & Artisans",
    "ministry": "Ministry of Textiles \u2013 Development Commissioner (Handicrafts)",
    "benefits": [
      "Common facilities",
      "infrastructure",
      "technology",
      "skill",
      "market access"
    ],
    "benefitsHi": [
      "Common facilities",
      "infrastructure",
      "technology",
      "skill",
      "market access"
    ],
    "documents": [
      "Cluster proposal",
      "organization registration",
      "beneficiary/artisan details",
      "DPR",
      "financial documents"
    ],
    "documentsHi": [
      "Cluster proposal",
      "organization registration",
      "beneficiary/artisan details",
      "DPR",
      "financial documents"
    ],
    "deadline": "Project-based",
    "officialUrl": "https://handicrafts.nic.in/",
    "applyUrl": "https://handicrafts.nic.in/",
    "rules": {
      "artisanOnly": true,
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "research--development--handicrafts",
    "slug": "research--development--handicrafts",
    "name": "Research & Development \u2013 Handicrafts",
    "nameHi": "Research & Development \u2013 Handicrafts",
    "description": "Supports research, surveys, documentation and development of traditional handicrafts and craft knowledge.",
    "descriptionHi": "Supports research, surveys, documentation and development of traditional handicrafts and craft knowledge.",
    "category": "Traditional Crafts & Artisans",
    "ministry": "Ministry of Textiles \u2013 Development Commissioner (Handicrafts)",
    "benefits": [
      "Craft documentation",
      "research support",
      "preservation and development of traditional crafts"
    ],
    "benefitsHi": [
      "Craft documentation",
      "research support",
      "preservation and development of traditional crafts"
    ],
    "documents": [
      "Research/project proposal",
      "organization details",
      "researcher/agency documents",
      "budget details"
    ],
    "documentsHi": [
      "Research/project proposal",
      "organization details",
      "researcher/agency documents",
      "budget details"
    ],
    "deadline": "Project-based",
    "officialUrl": "https://handicrafts.nic.in/",
    "applyUrl": "https://handicrafts.nic.in/",
    "rules": {
      "artisanOnly": true,
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "national-handicrafts-awards--shilp-guru-awards",
    "slug": "national-handicrafts-awards--shilp-guru-awards",
    "name": "National Handicrafts Awards / Shilp Guru Awards",
    "nameHi": "National Handicrafts Awards / Shilp Guru Awards",
    "description": "National recognition programme for outstanding handicraft artisans and craftspeople.",
    "descriptionHi": "National recognition programme for outstanding handicraft artisans and craftspeople.",
    "category": "Traditional Crafts & Artisans",
    "ministry": "Ministry of Textiles \u2013 Development Commissioner (Handicrafts)",
    "benefits": [
      "National recognition",
      "award",
      "publicity and promotion of craft work"
    ],
    "benefitsHi": [
      "National recognition",
      "award",
      "publicity and promotion of craft work"
    ],
    "documents": [
      "Artisan identity",
      "craft/product details",
      "photographs/work samples",
      "nomination/application documents"
    ],
    "documentsHi": [
      "Artisan identity",
      "craft/product details",
      "photographs/work samples",
      "nomination/application documents"
    ],
    "deadline": "Annual / as notified",
    "officialUrl": "https://handicrafts.nic.in/",
    "applyUrl": "https://handicrafts.nic.in/",
    "rules": {
      "artisanOnly": true,
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "handicrafts-artisan-identity--pehchan-registration",
    "slug": "handicrafts-artisan-identity--pehchan-registration",
    "name": "Handicrafts Artisan Identity / Pehchan Registration",
    "nameHi": "Handicrafts Artisan Identity / Pehchan Registration",
    "description": "Registration and identification of handicraft artisans to facilitate access to departmental schemes and services.",
    "descriptionHi": "Registration and identification of handicraft artisans to facilitate access to departmental schemes and services.",
    "category": "Traditional Crafts & Artisans",
    "ministry": "Ministry of Textiles \u2013 Development Commissioner (Handicrafts)",
    "benefits": [
      "Artisan identity",
      "access to handicraft schemes",
      "participation in fairs and support programmes"
    ],
    "benefitsHi": [
      "Artisan identity",
      "access to handicraft schemes",
      "participation in fairs and support programmes"
    ],
    "documents": [
      "Aadhaar/identity proof",
      "craft/trade details",
      "photograph",
      "address/contact details",
      "bank details where required"
    ],
    "documentsHi": [
      "Aadhaar/identity proof",
      "craft/trade details",
      "photograph",
      "address/contact details",
      "bank details where required"
    ],
    "deadline": "Ongoing / registration window",
    "officialUrl": "https://handicrafts.nic.in/",
    "applyUrl": "https://handicrafts.nic.in/",
    "rules": {
      "artisanOnly": true,
      "incomeLimit": 250000
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "atal-vayo-abhyuday-yojana-avyay",
    "slug": "atal-vayo-abhyuday-yojana-avyay",
    "name": "Atal Vayo Abhyuday Yojana (AVYAY)",
    "nameHi": "Atal Vayo Abhyuday Yojana (AVYAY)",
    "description": "Umbrella scheme for improving quality of life, care, protection and productive engagement of senior citizens.",
    "descriptionHi": "Umbrella scheme for improving quality of life, care, protection and productive engagement of senior citizens.",
    "category": "Senior Citizen Welfare",
    "ministry": "Ministry of Social Justice & Empowerment",
    "benefits": [
      "Shelter and care",
      "healthcare support",
      "active ageing",
      "welfare services"
    ],
    "benefitsHi": [
      "Shelter and care",
      "healthcare support",
      "active ageing",
      "welfare services"
    ],
    "documents": [
      "Age proof",
      "Aadhaar/identity proof",
      "income/status documents as required",
      "bank details where applicable"
    ],
    "documentsHi": [
      "Age proof",
      "Aadhaar/identity proof",
      "income/status documents as required",
      "bank details where applicable"
    ],
    "deadline": "Ongoing / component-specific",
    "officialUrl": "https://socialjustice.gov.in/schemes/43/archive",
    "applyUrl": "https://socialjustice.gov.in/schemes/43/archive",
    "rules": {
      "minAge": 60,
      "seniorCitizenOnly": true
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "integrated-programme-for-senior-citizens-ipsrc",
    "slug": "integrated-programme-for-senior-citizens-ipsrc",
    "name": "Integrated Programme for Senior Citizens (IPSrC)",
    "nameHi": "Integrated Programme for Senior Citizens (IPSrC)",
    "description": "Supports services and senior citizen homes for indigent and vulnerable elderly persons through eligible organizations.",
    "descriptionHi": "Supports services and senior citizen homes for indigent and vulnerable elderly persons through eligible organizations.",
    "category": "Senior Citizen Welfare",
    "ministry": "Ministry of Social Justice & Empowerment",
    "benefits": [
      "Shelter",
      "food",
      "medical care",
      "basic amenities",
      "recreation and active ageing"
    ],
    "benefitsHi": [
      "Shelter",
      "food",
      "medical care",
      "basic amenities",
      "recreation and active ageing"
    ],
    "documents": [
      "Age proof",
      "identity proof",
      "income/vulnerability details",
      "organization documents for implementing agencies"
    ],
    "documentsHi": [
      "Age proof",
      "identity proof",
      "income/vulnerability details",
      "organization documents for implementing agencies"
    ],
    "deadline": "Project-based",
    "officialUrl": "https://socialjustice.gov.in/schemes/43/archive",
    "applyUrl": "https://socialjustice.gov.in/schemes/43/archive",
    "rules": {
      "minAge": 60,
      "seniorCitizenOnly": true
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "state-action-plan-for-senior-citizens-sapsrc",
    "slug": "state-action-plan-for-senior-citizens-sapsrc",
    "name": "State Action Plan for Senior Citizens (SAPSrC)",
    "nameHi": "State Action Plan for Senior Citizens (SAPSrC)",
    "description": "Supports State/UT action plans for welfare and protection of senior citizens.",
    "descriptionHi": "Supports State/UT action plans for welfare and protection of senior citizens.",
    "category": "Senior Citizen Welfare",
    "ministry": "Ministry of Social Justice & Empowerment",
    "benefits": [
      "State-level welfare",
      "healthcare",
      "shelter",
      "protection and support services"
    ],
    "benefitsHi": [
      "State-level welfare",
      "healthcare",
      "shelter",
      "protection and support services"
    ],
    "documents": [
      "Age/identity proof",
      "State-specific application documents",
      "beneficiary details"
    ],
    "documentsHi": [
      "Age/identity proof",
      "State-specific application documents",
      "beneficiary details"
    ],
    "deadline": "State / project based",
    "officialUrl": "https://socialjustice.gov.in/schemes/43/archive",
    "applyUrl": "https://socialjustice.gov.in/schemes/43/archive",
    "rules": {
      "minAge": 60,
      "seniorCitizenOnly": true
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "rashtriya-vayoshri-yojana-rvy",
    "slug": "rashtriya-vayoshri-yojana-rvy",
    "name": "Rashtriya Vayoshri Yojana (RVY)",
    "nameHi": "Rashtriya Vayoshri Yojana (RVY)",
    "description": "Provides assisted-living devices to eligible senior citizens with age-related disability or infirmity.",
    "descriptionHi": "Provides assisted-living devices to eligible senior citizens with age-related disability or infirmity.",
    "category": "Senior Citizen Welfare",
    "ministry": "Ministry of Social Justice & Empowerment",
    "benefits": [
      "Walking aids",
      "hearing aids",
      "vision-related and other assistive devices as per assessment"
    ],
    "benefitsHi": [
      "Walking aids",
      "hearing aids",
      "vision-related and other assistive devices as per assessment"
    ],
    "documents": [
      "Age proof",
      "Aadhaar/identity proof",
      "income certificate",
      "disability/infirmity certification where applicable"
    ],
    "documentsHi": [
      "Age proof",
      "Aadhaar/identity proof",
      "income certificate",
      "disability/infirmity certification where applicable"
    ],
    "deadline": "Camp / periodic",
    "officialUrl": "https://socialjustice.gov.in/schemes/43/archive",
    "applyUrl": "https://socialjustice.gov.in/schemes/43/archive",
    "rules": {
      "minAge": 60,
      "seniorCitizenOnly": true,
      "disabilityOnly": true
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "senior-citizen-opportunities-for-productive-engagement-scope",
    "slug": "senior-citizen-opportunities-for-productive-engagement-scope",
    "name": "Senior Citizen Opportunities for Productive Engagement (SCOPE)",
    "nameHi": "Senior Citizen Opportunities for Productive Engagement (SCOPE)",
    "description": "Connects experienced senior citizens with enterprises seeking experienced workers through preference matching.",
    "descriptionHi": "Connects experienced senior citizens with enterprises seeking experienced workers through preference matching.",
    "category": "Senior Citizen Welfare",
    "ministry": "Ministry of Social Justice & Empowerment",
    "benefits": [
      "Employment opportunities",
      "productive engagement",
      "experience-based work opportunities"
    ],
    "benefitsHi": [
      "Employment opportunities",
      "productive engagement",
      "experience-based work opportunities"
    ],
    "documents": [
      "Age proof",
      "Aadhaar/identity proof",
      "qualification",
      "experience details",
      "contact information"
    ],
    "documentsHi": [
      "Age proof",
      "Aadhaar/identity proof",
      "qualification",
      "experience details",
      "contact information"
    ],
    "deadline": "Ongoing / portal-based",
    "officialUrl": "https://socialjustice.gov.in/schemes/43/archive",
    "applyUrl": "https://scope.sage.gov.in/",
    "rules": {
      "minAge": 60,
      "seniorCitizenOnly": true
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "seniorcare-ageing-growth-engine-sage",
    "slug": "seniorcare-ageing-growth-engine-sage",
    "name": "Seniorcare Ageing Growth Engine (SAGE)",
    "nameHi": "Seniorcare Ageing Growth Engine (SAGE)",
    "description": "Promotes products, services and solutions designed for senior citizens and the silver economy.",
    "descriptionHi": "Promotes products, services and solutions designed for senior citizens and the silver economy.",
    "category": "Senior Citizen Welfare",
    "ministry": "Ministry of Social Justice & Empowerment",
    "benefits": [
      "Access to senior-friendly products and services",
      "technology and care solutions"
    ],
    "benefitsHi": [
      "Access to senior-friendly products and services",
      "technology and care solutions"
    ],
    "documents": [
      "Depends on service/provider",
      "identity/contact details where required"
    ],
    "documentsHi": [
      "Depends on service/provider",
      "identity/contact details where required"
    ],
    "deadline": "Ongoing / programme-based",
    "officialUrl": "https://socialjustice.gov.in/schemes/43/archive",
    "applyUrl": "https://sage.gov.in/",
    "rules": {
      "minAge": 60,
      "seniorCitizenOnly": true
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "elderline--national-helpline-for-senior-citizens",
    "slug": "elderline--national-helpline-for-senior-citizens",
    "name": "Elderline \u2013 National Helpline for Senior Citizens",
    "nameHi": "Elderline \u2013 National Helpline for Senior Citizens",
    "description": "National helpline providing information, guidance, grievance and support services to senior citizens.",
    "descriptionHi": "National helpline providing information, guidance, grievance and support services to senior citizens.",
    "category": "Senior Citizen Welfare",
    "ministry": "Ministry of Social Justice & Empowerment",
    "benefits": [
      "Information",
      "guidance",
      "grievance support",
      "linkage to services"
    ],
    "benefitsHi": [
      "Information",
      "guidance",
      "grievance support",
      "linkage to services"
    ],
    "documents": [
      "Basic identity/contact information when required"
    ],
    "documentsHi": [
      "Basic identity/contact information when required"
    ],
    "deadline": "Ongoing",
    "officialUrl": "https://socialjustice.gov.in/",
    "applyUrl": "https://elderline.dosje.gov.in/",
    "rules": {
      "minAge": 60,
      "seniorCitizenOnly": true
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "indira-gandhi-national-old-age-pension-scheme-ignoaps",
    "slug": "indira-gandhi-national-old-age-pension-scheme-ignoaps",
    "name": "Indira Gandhi National Old Age Pension Scheme (IGNOAPS)",
    "nameHi": "Indira Gandhi National Old Age Pension Scheme (IGNOAPS)",
    "description": "Provides social assistance pension to eligible elderly persons under NSAP.",
    "descriptionHi": "Provides social assistance pension to eligible elderly persons under NSAP.",
    "category": "Senior Citizen Welfare",
    "ministry": "Ministry of Rural Development \u2013 National Social Assistance Programme",
    "benefits": [
      "Monthly social assistance pension",
      "State contribution/top-up where applicable"
    ],
    "benefitsHi": [
      "Monthly social assistance pension",
      "State contribution/top-up where applicable"
    ],
    "documents": [
      "Age proof",
      "Aadhaar/identity proof",
      "eligibility/BPL or State criteria documents",
      "bank/post-office account details"
    ],
    "documentsHi": [
      "Age proof",
      "Aadhaar/identity proof",
      "eligibility/BPL or State criteria documents",
      "bank/post-office account details"
    ],
    "deadline": "Ongoing / State implementation",
    "officialUrl": "https://nsap.nic.in/",
    "applyUrl": "https://nsap.nic.in/",
    "rules": {
      "minAge": 60,
      "seniorCitizenOnly": true
    },
    "featured": false,
    "popularity": 70
  },
  {
    "id": "annapurna-scheme",
    "slug": "annapurna-scheme",
    "name": "Annapurna Scheme",
    "nameHi": "Annapurna Scheme",
    "description": "Provides food-grain assistance to eligible elderly persons who meet scheme conditions and are not receiving old-age pension.",
    "descriptionHi": "Provides food-grain assistance to eligible elderly persons who meet scheme conditions and are not receiving old-age pension.",
    "category": "Senior Citizen Welfare",
    "ministry": "Ministry of Rural Development \u2013 National Social Assistance Programme",
    "benefits": [
      "Monthly food-grain assistance as per applicable rules"
    ],
    "benefitsHi": [
      "Monthly food-grain assistance as per applicable rules"
    ],
    "documents": [
      "Age proof",
      "identity proof",
      "eligibility documents",
      "local authority/State verification details"
    ],
    "documentsHi": [
      "Age proof",
      "identity proof",
      "eligibility documents",
      "local authority/State verification details"
    ],
    "deadline": "Ongoing / State implementation",
    "officialUrl": "https://nsap.nic.in/",
    "applyUrl": "https://nsap.nic.in/",
    "rules": {
      "minAge": 60,
      "seniorCitizenOnly": true
    },
    "featured": false,
    "popularity": 70
  }
]

export function getSchemeBySlug(slug: string): Scheme | undefined {
  return schemes.find((s) => s.slug === slug)
}

export function getFeaturedSchemes(): Scheme[] {
  return schemes.filter((s) => s.featured).sort((a, b) => b.popularity - a.popularity)
}
