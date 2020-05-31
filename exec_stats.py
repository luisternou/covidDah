import urllib.request, urllib.error
import os
from datetime import datetime
import pandas as pd

day_offset = 80
day_of_year = datetime.now().timetuple().tm_yday

update_number = day_of_year - day_offset
update_number = str(update_number)

url = 'https://www.nicd.ac.za/covid-19-update-' +update_number
try:
    conn = urllib.request.urlopen(url)
except urllib.error.HTTPError as e:
    # Return code error (e.g. 404, 501, ...)
    # ...
    print('HTTPError: {}'.format(e.code))
except urllib.error.URLError as e:

    print('URLError: {}'.format(e.reason))
else:
  command = './html_table_converter -u ' + url + '/' + ' -o covid_stats/sa_covid_stats'
  print(command)
  os.system(command)


# Total cases by province

source_total_cases = 'covid_stats/sa_covid_stats.0.csv'
cleaned_total_cases = 'covid_stats/cleaned_up_stats/sa_provinces_confirmed.csv'
destination_total_cases = 'covid_stats/json_stats/sa_provinces_confirmed.json'
csv_content = pd.read_csv(source_total_cases)
csv_content.columns = ['province','total_cases','percentage']
csv_content.to_csv(cleaned_total_cases)

pd.read_csv(cleaned_total_cases).to_json(destination_total_cases)

# closed cases by province

source_closed_cases = 'covid_stats/sa_covid_stats.4.csv'
cleaned_closed_cases = 'covid_stats/cleaned_up_stats/sa_provinces_closed.csv'
destination_closed_cases = 'covid_stats/json_stats/sa_provinces_closed.json'
csv_content = pd.read_csv(source_closed_cases)
csv_content.columns = ['province','deaths','recoveries']
csv_content.to_csv(cleaned_closed_cases)

pd.read_csv(cleaned_closed_cases).to_json(destination_closed_cases)

# deaths by age group

source_deaths_cases = 'covid_stats/sa_covid_stats.6.csv'
cleaned_deaths_cases = 'covid_stats/cleaned_up_stats/sa_provinces_deaths.csv'
destination_closed_cases = 'covid_stats/json_stats/sa_provinces_deaths.json'
csv_content = pd.read_csv(source_deaths_cases)
csv_content.columns = ['age','deaths','percentage']
csv_content.to_csv(cleaned_deaths_cases)

pd.read_csv(cleaned_deaths_cases).to_json(destination_closed_cases)