from __future__ import annotations
import argparse, json
from pathlib import Path
import joblib, pandas as pd
from xgboost import XGBClassifier
from sklearn.compose import ColumnTransformer
from sklearn.metrics import accuracy_score, precision_recall_fscore_support
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
ROOT=Path(__file__).resolve().parents[1]
DROP={'profile_id','fullName','scheme_name','eligible','partial','eligibility_score','status','matched_criteria','missed_criteria'}
def main():
 p=argparse.ArgumentParser(description='Train the XGBoost eligibility classifier.'); p.add_argument('--trees',type=int,default=300); a=p.parse_args()
 d=pd.read_csv(ROOT/'data/dataset.csv'); f=[c for c in d if c not in DROP]; n=['age','familyIncome','parentGuardianIncome']; c=[x for x in f if x not in n]
 xtr,xte,ytr,yte=train_test_split(d[f],d.eligible.astype(int),test_size=.2,random_state=42,stratify=d.eligible)
 ratio=(ytr==0).sum()/(ytr==1).sum()
 model=XGBClassifier(n_estimators=a.trees,max_depth=8,learning_rate=.08,subsample=.9,colsample_bytree=.9,scale_pos_weight=ratio,objective='binary:logistic',eval_metric='logloss',tree_method='hist',n_jobs=1,random_state=42)
 pipe=Pipeline([('pre',ColumnTransformer([('num','passthrough',n),('cat',OneHotEncoder(handle_unknown='ignore'),c)])),('xgb',model)])
 pipe.fit(xtr,ytr); y=pipe.predict(xte); precision,recall,f1,_=precision_recall_fscore_support(yte,y,average='binary',zero_division=0)
 out=ROOT/'models'; out.mkdir(exist_ok=True); joblib.dump({'pipeline':pipe,'feature_columns':f,'model_type':'xgboost'},out/'eligibility_model.joblib')
 m={'model_type':'XGBoost','rows':len(d),'accuracy':round(accuracy_score(yte,y),4),'precision':round(precision,4),'recall':round(recall,4),'f1':round(f1,4)}; (out/'metrics.json').write_text(json.dumps(m,indent=2)); print(json.dumps(m,indent=2))
if __name__=='__main__': main()
