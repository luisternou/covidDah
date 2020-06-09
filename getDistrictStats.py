import pandas as pd
import sys
import os
province = sys.argv[1];
print(province)
source_total_cases = 'covid_stats/districts/'+ province + '/' + province + '.csv'
cleaned_total_cases = 'covid_stats/districts/'+ province + '/' + province  +'_clean.csv'
destination_total_cases = 'covid_stats/districts/'+ province + '/' + province +  '.json'


if province == 'gp':
    os.system('curl https://raw.githubusercontent.com/dsfsi/covid19za/master/data/district_data/provincial_gp_cumulative.csv > ' + source_total_cases)
    csv_content = pd.read_csv(source_total_cases)
    csv_content.columns = ['date','yyyymmdd','ekrhuleni', 'johannesburg', 'sedibeng', 
    'tshwane', 'westrand', 'unallocated', 'total_cases', 'recoveries', 'hospitalisation',
    'source']

elif province == 'ec':
    os.system('curl https://raw.githubusercontent.com/dsfsi/covid19za/master/data/district_data/provincial_ec_cumulative.csv > ' + source_total_cases)
    csv_content = pd.read_csv(source_total_cases)
    csv_content.columns = ['date','yyyymmdd','alfred_nzo', 'amathole', 'buffalo_city', 
    'chris_hani', 'joe_gqabi', 'nelson_mandela', 'or_tambo', 'sarah_baartman', 'unallocated', 'total_cases',
    'source']

elif province == 'wc':
    os.system('curl https://raw.githubusercontent.com/dsfsi/covid19za/master/data/district_data/provincial_wc_cumulative.csv > ' + source_total_cases)
    csv_content = pd.read_csv(source_total_cases)
    csv_content.columns = ['date','yyyymmdd','city_of_cape_town', 'western', 'southern', 
    'northern', 'tygerberg', 'eastern', 'klipfontein', 'mitchells_plain', 'khayelitsha', 'cape_winelands',
     'breede_valley','drakenstein', 'langenberg', 'stellenbosh', 'witzenberg', 'central_karoo', 'beaufort_west', 'laingsburg',
     'prince_albert', 'eden', 'bitou', 'george', 'hessequa', 'kannaland', 'knysna',
     'mossels_bay', 'oudtshoorn', 'overberg', 'cape_agulhas', 'overstrand', 'swellendam', 'threewaterkloof',
     'west_coast', 'bergrivier', 'cederberg', 'matzikama', 'saldanha_bay', 'swartland','unallocated']
    

elif province == 'lp':
    os.system('curl https://raw.githubusercontent.com/dsfsi/covid19za/master/data/district_data/provincial_lp_cumulative.csv > ' + source_total_cases)
    csv_content = pd.read_csv(source_total_cases)
    csv_content.columns = ['date','yyyymmdd','capricorn', 'polokwane', 'blouberg', 
    'molemole', 'lepele-nkumpi', 'vhembe', 'musina', 'makhado', 'thulamela', 'collins_cabane', 'mopani', 
    'ba-phalaborwa', 'greater_giyani', 'greater_letaba', 'greater_tzaneen', 'maruleng','sekhukhune', 'elias _motsoaledi', 'ephraim mogale', 
    'greater_tubatse_fetakgomo', 'makhuduthamaga', 'waterberg', 'bella_bella', 'lephalale','modimolle_mookgophong', 'mogalakwena', 'thabazimbi', 
    'chris_hani','total', 'recoveries',
    'active', 'tests','source']
    

elif province == 'mp':
    os.system('curl https://raw.githubusercontent.com/dsfsi/covid19za/master/data/district_data/provincial_mp_cumulative.csv > ' + source_total_cases)
    csv_content = pd.read_csv(source_total_cases)
    csv_content.columns = ['date','yyyymmdd','bushbuckridge', 'mbombela', 'nkomazi', 
    'thaba_chweu', 'albert_luthuli', 'dipaliseng', 'pixley_ka_seme', 'govan_mbeki','lekwa',
    'mkhondo', 'msukaligwa', 'js_moroka', 'emakhazeni', 'emalahleni', 'steve_tshwete', 
    'thembisile_hani', 'victor_khanye',  'unallocated', 'total_cases', 'recoveries', 'deaths',
    'source']
    

elif province == 'nc':
    os.system('curl https://raw.githubusercontent.com/dsfsi/covid19za/master/data/district_data/Provincial_NC_cumulative > ' + source_total_cases)
    csv_content = pd.read_csv(source_total_cases)
    csv_content.columns = ['date','francis_baard', 'namakwa', 'pixley_ka_seme', 'zf_mgcawu',
    'john_taolo_gaetswe', 'francis_baard_deaths', 'namakwa_deaths', 'pixley_ka_seme_deaths', 'zf_mgcawu_deaths',
    'john_taolo_gaetswe_deaths', 'francis_baard_recoveries', 'namakwa_recoveries', 'pixley_ka_seme_recoveries', 'zf_mgcawu_recoveries',
    'john_taolo_gaetswe_recoveries',
    'source']
    
elif province == 'nw':
    os.system('curl https://raw.githubusercontent.com/dsfsi/covid19za/master/data/district_data/provincial_nw_cumulative.csv > ' + source_total_cases)
    csv_content = pd.read_csv(source_total_cases)
    csv_content.columns = ['date','yyyymmdd','dr_ruth_segomotsi_mompati', 'ngaka_modiri_molema', 'bojanala_platinum', 
    'dr_kenneth_kaunda', 'unallocated', 'total_cases', 'recoverded', 'deaths', 'tested',
    'source']
    
csv_content.to_csv(cleaned_total_cases)
pd.read_csv(cleaned_total_cases).to_json(destination_total_cases)

