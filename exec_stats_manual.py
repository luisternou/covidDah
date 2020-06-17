import urllib.request, urllib.error
import os
import sys
import datetime
import calendar
import pandas as pd
url = sys.argv[1];
source_total_cases = 'covid_stats/sa_covid_stats.0.csv'
cleaned_total_cases = 'covid_stats/cleaned_up_stats/sa_provinces_confirmed.csv'
destination_total_cases = 'covid_stats/json_stats/sa_provinces_confirmed.json'

source_closed_cases = 'covid_stats/sa_covid_stats.1.csv'
cleaned_closed_cases = 'covid_stats/cleaned_up_stats/sa_provinces_closed.csv'
destination_closed_cases = 'covid_stats/json_stats/sa_provinces_closed.json'

source_deaths_cases = 'covid_stats/sa_covid_stats.2.csv'
cleaned_deaths_cases = 'covid_stats/cleaned_up_stats/sa_provinces_deaths.csv'
destination_deaths_cases = 'covid_stats/json_stats/sa_provinces_deaths.json'


get_command = 'curl ' + url + ' > covid_stats/latest_stats.html'
os.system(get_command)

cwd = os.getcwd()

with open(cwd + '/covid_stats/latest_stats.html') as f:
    local_url = 'file://' + cwd + '/covid_stats/latest_stats.html'
    command = './html_table_converter -u ' + local_url + ' -o covid_stats/sa_covid_stats'

    os.system(command)
    csv_content = pd.read_csv(source_total_cases)
    csv_content.columns = ['province','total_cases','percentage']
    csv_content.to_csv(cleaned_total_cases)
    pd.read_csv(cleaned_total_cases).to_json(destination_total_cases)
  
    csv_content = pd.read_csv(source_closed_cases)
    csv_content.columns = ['province','deaths','recoveries']
    csv_content.to_csv(cleaned_closed_cases)
    pd.read_csv(cleaned_closed_cases).to_json(destination_closed_cases)

    csv_content = pd.read_csv(source_deaths_cases)
    csv_content.columns = ['age','deaths','percentage']
    csv_content.to_csv(cleaned_deaths_cases)
    pd.read_csv(cleaned_deaths_cases).to_json(destination_deaths_cases)

    print('Got new stats')
    f.close()
    



        


