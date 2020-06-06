import urllib.request, urllib.error
import os
import sys
import datetime
import calendar
import pandas as pd

source_total_cases = 'covid_stats/sa_covid_stats.0.csv'
cleaned_total_cases = 'covid_stats/cleaned_up_stats/sa_provinces_confirmed.csv'
destination_total_cases = 'covid_stats/json_stats/sa_provinces_confirmed.json'

source_closed_cases = 'covid_stats/sa_covid_stats.4.csv'
cleaned_closed_cases = 'covid_stats/cleaned_up_stats/sa_provinces_closed.csv'
destination_closed_cases = 'covid_stats/json_stats/sa_provinces_closed.json'

source_deaths_cases = 'covid_stats/sa_covid_stats.6.csv'
cleaned_deaths_cases = 'covid_stats/cleaned_up_stats/sa_provinces_deaths.csv'
destination_deaths_cases = 'covid_stats/json_stats/sa_provinces_deaths.json'

current_date = str(datetime.datetime.today()).split()[0]

current_year = current_date[:-6]

current_month = current_date[5:-3]

current_day = current_date[8:]

day_last_digit = current_day[1:]

day_ordinal_type = ''

if day_last_digit == 1:
    day_ordinal_type = 'st'
elif day_last_digit == 2:
    day_ordinal_type = 'nd'
elif day_last_digit == 3:
    day_ordinal_type = 'rd'
else:
    day_ordinal_type = 'th'

current_month_name = calendar.month_name[int(current_month)]
current_month_name = current_month_name.lower()

url_part_one = 'https://sacoronavirus.co.za/' + current_year + '/' + current_month + '/' + current_day



url_part_two = '/update-on-covid-19-'

url_part_three = current_day + day_ordinal_type + '-' + current_month_name + '-' + current_year + '/'

url = url_part_one + url_part_two + url_part_three

get_command = 'curl ' + url + ' > covid_stats/latest_stats.html'
os.system(get_command)

cwd = os.getcwd()

with open(cwd + '/covid_stats/latest_stats.html') as f:
    if '404' not in f.read():
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
    else:
        f.close()
        print('File was a 404')
        sys.exit()



        


