import pandas as pd
import sys
province = sys.argv[1];
print(province)
source_total_cases = 'covid_stats/districts/'+ province + '/' + province + '.csv'
cleaned_total_cases = 'covid_stats/districts/'+ province + '/' + province  +'_clean.csv'
destination_total_cases = 'covid_stats/districts/'+ province + '/' + province +  '.json'
csv_content = pd.read_csv(source_total_cases)


if province == 'gp':
    csv_content.columns = ['date','yyyymmdd','ekrhuleni', 'johannesburg', 'sedibeng', 
    'tshwane', 'westrand', 'unallocated', 'total_cases', 'recoveries', 'hospitalisation',
    'source']
elif province == 'ec':
    csv_content.columns = ['date','yyyymmdd','alfred_nzo', 'amathole', 'buffalo_city', 
    'chris_hani', 'joe_gqabi', 'nelson_mandela', 'or_tambo', 'sarah_baartman' 'unallocated', 'total_cases',
    'source']
    




csv_content.to_csv(cleaned_total_cases)
pd.read_csv(cleaned_total_cases).to_json(destination_total_cases)

