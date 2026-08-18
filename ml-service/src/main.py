from pathlib import Path
from typing import Literal
import joblib, pandas as pd
from fastapi import FastAPI,HTTPException
from pydantic import BaseModel,Field
try:
    from .rule_engine import evaluate_scheme
    from .schemes import SCHEMES
except ImportError:
    from rule_engine import evaluate_scheme
    from schemes import SCHEMES
ROOT=Path(__file__).resolve().parents[1]; PATH=ROOT/'models/eligibility_model.joblib'; app=FastAPI(title='SchemeAI ML Service'); model=None
class Profile(BaseModel):
 age:int=Field(ge=1,le=120); gender:Literal['Male','Female','Other']; maritalStatus:Literal['Single','Married','Widowed','Divorced']; disabilityStatus:bool; casteCategory:Literal['General','OBC','PVTG','SC','ST','DNT','EWS']; familyIncome:float|None=None; parentGuardianIncome:float|None=None; employmentStatus:str; occupation:str=''; bplStatus:bool; isInHardship:bool=False; isStudent:bool; isGovernmentEmployee:bool=False; qualification:str; collegeType:str; state:str; district:str; areaType:Literal['Rural','Urban']; isFarmer:bool; isWidow:bool; isSeniorCitizen:bool; isMinority:bool; isStartupOwner:bool; skillDevelopmentInterest:bool; isArtisan:bool; isAnimalHusbandryOrFisheries:bool
def load():
 global model
 if model is None:
  if not PATH.exists(): raise HTTPException(503,'Model is not trained yet. Run scripts/train_model.py first.')
  model=joblib.load(PATH)
 return model

def is_profile_specific_scheme(scheme, profile):
 rules=scheme['rules']
 return ((profile['isStudent'] and rules.get('studentOnly')) or (profile['isFarmer'] and rules.get('farmerOnly')) or (profile['isWidow'] and rules.get('widowOnly')) or (profile['isSeniorCitizen'] and rules.get('seniorCitizenOnly')) or (profile['isMinority'] and rules.get('minorityOnly')) or (profile['isStartupOwner'] and rules.get('startupOwnerOnly')) or (profile['skillDevelopmentInterest'] and rules.get('skillDevelopmentOnly')) or (profile['disabilityStatus'] and rules.get('disabilityOnly')) or (profile['isArtisan'] and rules.get('artisanOnly')) or (profile['isAnimalHusbandryOrFisheries'] and rules.get('husbandryOrFisheriesOnly')))
@app.get('/health')
def health(): return {'ok':True,'model_ready':PATH.exists()}
@app.post('/predict')
def predict(profile:Profile):
 ui_schemes = [s for s in SCHEMES]
 if len(ui_schemes) == 0:
  return {'predictions': []}
 b=load(); data={k:int(v) if isinstance(v,bool) else v for k,v in profile.model_dump().items()}; data['familyIncome']=data['familyIncome'] or data['parentGuardianIncome'] or 100_000_001; data['parentGuardianIncome']=data['parentGuardianIncome'] or 0; frame=pd.DataFrame([{**data,'scheme_id':s['id']} for s in ui_schemes])[b['feature_columns']]; probs=b['pipeline'].predict_proba(frame)[:,1]; rows=[]
 for s,p in zip(ui_schemes,probs,strict=True):
  # The classifier ranks candidates; the rule engine decides eligibility.
  # This prevents an approximate probability from approving an ineligible user.
  e=evaluate_scheme(s,data)
  rows.append({'scheme_id':s['id'],'probability':round(float(p),4),'score':e.score,'status':e.status,'matched_criteria':e.matched_criteria,'missed_criteria':e.missed_criteria})
 eligible=[row for row in rows if row['status']=='eligible']
 specific_ids={s['id'] for s in ui_schemes if is_profile_specific_scheme(s,data)}
 specific=[row for row in eligible if row['scheme_id'] in specific_ids]
 return {'predictions':sorted(specific or eligible,key=lambda x:(len(x['matched_criteria']),x['probability']),reverse=True)}
