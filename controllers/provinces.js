const https = require('https');
const request = require('request');
const got = require('got');
const csv = require("async-csv")
const fs = require('fs')
module.exports = {
 

  getEasternCape: async (req, res) => {
//  
  },
  getFreeState: async (req, res) => {
//  
  },
  getGauteng: async (req, res) => {
    try {
      
      const TIME_API_URL = 'https://worldtimeapi.org/api/timezone/Africa/Johannesburg';



       
    
    function getSummary(url)
      {
        return new Promise((resolve) =>
        {
          https.get(url , response =>
          {
            let data = "";
            response.on('data', chunk => {
            data += chunk;
          });
          response.on('end', () => 
            {
              let summary = JSON.parse(data);
              resolve(summary);
            })

          }).end();
        });


      }      

function amountOfKeys(obj)
{
  return Object.keys(obj).length;
}


function getDistrictLatest(district, province_cases)
{
  let all_values = province_cases[district];
  let latest_value = all_values[amountOfKeys(all_values)-1]

  return latest_value;
}


 
  (async() => {


let gauteng_district_cases_string = fs.readFileSync(process.cwd() +'/covid_stats/districts/gp/gp.json').toString();
gauteng_district_cases = JSON.parse(gauteng_district_cases_string)



let johannesburg_cases = getDistrictLatest('johannesburg', gauteng_district_cases);

let ekrhuleni_cases = getDistrictLatest('ekrhuleni', gauteng_district_cases);

let sedibeng_cases = getDistrictLatest('sedibeng', gauteng_district_cases);

let tshwane_cases = getDistrictLatest('tshwane', gauteng_district_cases);

let westrand_cases = getDistrictLatest('westrand', gauteng_district_cases);

let unallocated_cases = getDistrictLatest('unallocated', gauteng_district_cases);

let district_names = ['Johannesburg', 'Ekrhuleni', 'Sedibeng', 'Tshwane', 'Westrand', 'Unallocated']
let district_cases = [johannesburg_cases, ekrhuleni_cases, sedibeng_cases, tshwane_cases, westrand_cases, unallocated_cases];
let gauteng_district_amount = 6;

const district_data_object = district_names.map((district_names, i) => ({ name: district_names, value: district_cases[i] }));


let confirmed_cases_string = fs.readFileSync(process.cwd() +'/covid_stats/json_stats/sa_provinces_confirmed.json').toString();
let confirmed_cases_json = JSON.parse(confirmed_cases_string);



let total_cases = confirmed_cases_json['total_cases'];
total_cases = total_cases[2]


let closed_cases_string = fs.readFileSync(process.cwd() +'/covid_stats/json_stats/sa_provinces_closed.json').toString();
let closed_cases_json = JSON.parse(closed_cases_string);


let recoveries = closed_cases_json['recoveries'];


recoveries = recoveries[2]

let deaths = closed_cases_json['deaths'];
deaths = deaths[2]

let active = total_cases - recoveries - deaths

      let time_response = await getSummary(TIME_API_URL);
      let current_time = time_response.datetime;
      var date_time = new Date(current_time);
      let time = date_time.toLocaleTimeString('it-IT');


      let year = new Date().getFullYear()
      let province_name = 'Gauteng'
       let title = "SA Covid-19 | " + province_name;
      res.render('province', 
       {
        indexCSS: true,
        time,
        year,
        province_name,
        district_data_object,
        total_cases,
        recoveries,
        deaths,
        active,
        title
    
    
        });
      })();

    } catch (error) 
    {
      return console.log(error);
    } 
//  
  },
  getKwaZuluNatal: async (req, res) => {
     try {
      
      const TIME_API_URL = 'https://worldtimeapi.org/api/timezone/Africa/Johannesburg';



       
    
    function getSummary(url)
      {
        return new Promise((resolve) =>
        {
          https.get(url , response =>
          {
            let data = "";
            response.on('data', chunk => {
            data += chunk;
          });
          response.on('end', () => 
            {
              let summary = JSON.parse(data);
              resolve(summary);
            })

          }).end();
        });


      }      

function amountOfKeys(obj)
{
  return Object.keys(obj).length;
}


function getDistrictLatest(district, province_cases)
{
  let all_values = province_cases[district];
  let latest_value = all_values[amountOfKeys(all_values)-1]

  return latest_value;
}


 
  (async() => {


let gauteng_district_cases_string = fs.readFileSync(process.cwd() +'/covid_stats/districts/gp/gp.json').toString();
gauteng_district_cases = JSON.parse(gauteng_district_cases_string)



let johannesburg_cases = getDistrictLatest('johannesburg', gauteng_district_cases);

let ekrhuleni_cases = getDistrictLatest('ekrhuleni', gauteng_district_cases);

let sedibeng_cases = getDistrictLatest('sedibeng', gauteng_district_cases);

let tshwane_cases = getDistrictLatest('tshwane', gauteng_district_cases);

let westrand_cases = getDistrictLatest('westrand', gauteng_district_cases);

let unallocated_cases = getDistrictLatest('unallocated', gauteng_district_cases);

let district_names = ['Johannesburg', 'Ekrhuleni', 'Sedibeng', 'Tshwane', 'Westrand', 'Unallocated']
let district_cases = [johannesburg_cases, ekrhuleni_cases, sedibeng_cases, tshwane_cases, westrand_cases, unallocated_cases];
let gauteng_district_amount = 6;

const district_data_object = district_names.map((district_names, i) => ({ name: district_names, value: district_cases[i] }));


let confirmed_cases_string = fs.readFileSync(process.cwd() +'/covid_stats/json_stats/sa_provinces_confirmed.json').toString();
let confirmed_cases_json = JSON.parse(confirmed_cases_string);



let total_cases = confirmed_cases_json['total_cases'];
total_cases = total_cases[3]


let closed_cases_string = fs.readFileSync(process.cwd() +'/covid_stats/json_stats/sa_provinces_closed.json').toString();
let closed_cases_json = JSON.parse(closed_cases_string);


let recoveries = closed_cases_json['recoveries'];


recoveries = recoveries[3]

let deaths = closed_cases_json['deaths'];
deaths = deaths[3]

let active = total_cases - recoveries - deaths

      let time_response = await getSummary(TIME_API_URL);
      let current_time = time_response.datetime;
      var date_time = new Date(current_time);
      let time = date_time.toLocaleTimeString('it-IT');


      let year = new Date().getFullYear()
      let province_name = 'KwaZulu Natal'
       let title = "SA Covid-19 | " + province_name;
      res.render('province', 
       {
        indexCSS: true,
        time,
        year,
        province_name,
        district_data_object,
        total_cases,
        recoveries,
        deaths,
        active,
        title
    
    
        });
      })();

    } catch (error) 
    {
      return console.log(error);
    } 
//  
  },
  getLimpopo: async (req, res) => {
     try {
      
      const TIME_API_URL = 'https://worldtimeapi.org/api/timezone/Africa/Johannesburg';



       
    
    function getSummary(url)
      {
        return new Promise((resolve) =>
        {
          https.get(url , response =>
          {
            let data = "";
            response.on('data', chunk => {
            data += chunk;
          });
          response.on('end', () => 
            {
              let summary = JSON.parse(data);
              resolve(summary);
            })

          }).end();
        });


      }      

function amountOfKeys(obj)
{
  return Object.keys(obj).length;
}


function getDistrictLatest(district, province_cases)
{
  let all_values = province_cases[district];
  let latest_value = all_values[amountOfKeys(all_values)-1]

  return latest_value;
}


 
  (async() => {


let gauteng_district_cases_string = fs.readFileSync(process.cwd() +'/covid_stats/districts/gp/gp.json').toString();
gauteng_district_cases = JSON.parse(gauteng_district_cases_string)



let johannesburg_cases = getDistrictLatest('johannesburg', gauteng_district_cases);

let ekrhuleni_cases = getDistrictLatest('ekrhuleni', gauteng_district_cases);

let sedibeng_cases = getDistrictLatest('sedibeng', gauteng_district_cases);

let tshwane_cases = getDistrictLatest('tshwane', gauteng_district_cases);

let westrand_cases = getDistrictLatest('westrand', gauteng_district_cases);

let unallocated_cases = getDistrictLatest('unallocated', gauteng_district_cases);

let district_names = ['Johannesburg', 'Ekrhuleni', 'Sedibeng', 'Tshwane', 'Westrand', 'Unallocated']
let district_cases = [johannesburg_cases, ekrhuleni_cases, sedibeng_cases, tshwane_cases, westrand_cases, unallocated_cases];
let gauteng_district_amount = 6;

const district_data_object = district_names.map((district_names, i) => ({ name: district_names, value: district_cases[i] }));


let confirmed_cases_string = fs.readFileSync(process.cwd() +'/covid_stats/json_stats/sa_provinces_confirmed.json').toString();
let confirmed_cases_json = JSON.parse(confirmed_cases_string);



let total_cases = confirmed_cases_json['total_cases'];
total_cases = total_cases[4]


let closed_cases_string = fs.readFileSync(process.cwd() +'/covid_stats/json_stats/sa_provinces_closed.json').toString();
let closed_cases_json = JSON.parse(closed_cases_string);


let recoveries = closed_cases_json['recoveries'];


recoveries = recoveries[4]

let deaths = closed_cases_json['deaths'];
deaths = deaths[4]

let active = total_cases - recoveries - deaths

      let time_response = await getSummary(TIME_API_URL);
      let current_time = time_response.datetime;
      var date_time = new Date(current_time);
      let time = date_time.toLocaleTimeString('it-IT');


      let year = new Date().getFullYear()
      let province_name = 'Limpopo'
       let title = "SA Covid-19 | " + province_name;
      res.render('province', 
       {
        indexCSS: true,
        time,
        year,
        province_name,
        district_data_object,
        total_cases,
        recoveries,
        deaths,
        active,
        title
    
    
        });
      })();

    } catch (error) 
    {
      return console.log(error);
    } 
//  
  },
  getMpumalanga: async (req, res) => {
     try {
      
      const TIME_API_URL = 'https://worldtimeapi.org/api/timezone/Africa/Johannesburg';



       
    
    function getSummary(url)
      {
        return new Promise((resolve) =>
        {
          https.get(url , response =>
          {
            let data = "";
            response.on('data', chunk => {
            data += chunk;
          });
          response.on('end', () => 
            {
              let summary = JSON.parse(data);
              resolve(summary);
            })

          }).end();
        });


      }      

function amountOfKeys(obj)
{
  return Object.keys(obj).length;
}


function getDistrictLatest(district, province_cases)
{
  let all_values = province_cases[district];
  let latest_value = all_values[amountOfKeys(all_values)-1]

  return latest_value;
}


 
  (async() => {


let gauteng_district_cases_string = fs.readFileSync(process.cwd() +'/covid_stats/districts/gp/gp.json').toString();
gauteng_district_cases = JSON.parse(gauteng_district_cases_string)



let johannesburg_cases = getDistrictLatest('johannesburg', gauteng_district_cases);

let ekrhuleni_cases = getDistrictLatest('ekrhuleni', gauteng_district_cases);

let sedibeng_cases = getDistrictLatest('sedibeng', gauteng_district_cases);

let tshwane_cases = getDistrictLatest('tshwane', gauteng_district_cases);

let westrand_cases = getDistrictLatest('westrand', gauteng_district_cases);

let unallocated_cases = getDistrictLatest('unallocated', gauteng_district_cases);

let district_names = ['Johannesburg', 'Ekrhuleni', 'Sedibeng', 'Tshwane', 'Westrand', 'Unallocated']
let district_cases = [johannesburg_cases, ekrhuleni_cases, sedibeng_cases, tshwane_cases, westrand_cases, unallocated_cases];
let gauteng_district_amount = 6;

const district_data_object = district_names.map((district_names, i) => ({ name: district_names, value: district_cases[i] }));


let confirmed_cases_string = fs.readFileSync(process.cwd() +'/covid_stats/json_stats/sa_provinces_confirmed.json').toString();
let confirmed_cases_json = JSON.parse(confirmed_cases_string);



let total_cases = confirmed_cases_json['total_cases'];
total_cases = total_cases[6]


let closed_cases_string = fs.readFileSync(process.cwd() +'/covid_stats/json_stats/sa_provinces_closed.json').toString();
let closed_cases_json = JSON.parse(closed_cases_string);


let recoveries = closed_cases_json['recoveries'];


recoveries = recoveries[5]

let deaths = closed_cases_json['deaths'];
deaths = deaths[5]

let active = total_cases - recoveries - deaths

      let time_response = await getSummary(TIME_API_URL);
      let current_time = time_response.datetime;
      var date_time = new Date(current_time);
      let time = date_time.toLocaleTimeString('it-IT');


      let year = new Date().getFullYear()
      let province_name = 'Mpumalanga'
       let title = "SA Covid-19 | " + province_name;
      res.render('province', 
       {
        indexCSS: true,
        time,
        year,
        province_name,
        district_data_object,
        total_cases,
        recoveries,
        deaths,
        active,
        title
    
    
        });
      })();

    } catch (error) 
    {
      return console.log(error);
    } 
//  
  },
  getNorthWest: async (req, res) => {
     try {
      
      const TIME_API_URL = 'https://worldtimeapi.org/api/timezone/Africa/Johannesburg';



       
    
    function getSummary(url)
      {
        return new Promise((resolve) =>
        {
          https.get(url , response =>
          {
            let data = "";
            response.on('data', chunk => {
            data += chunk;
          });
          response.on('end', () => 
            {
              let summary = JSON.parse(data);
              resolve(summary);
            })

          }).end();
        });


      }      

function amountOfKeys(obj)
{
  return Object.keys(obj).length;
}


function getDistrictLatest(district, province_cases)
{
  let all_values = province_cases[district];
  let latest_value = all_values[amountOfKeys(all_values)-1]

  return latest_value;
}


 
  (async() => {


let gauteng_district_cases_string = fs.readFileSync(process.cwd() +'/covid_stats/districts/gp/gp.json').toString();
gauteng_district_cases = JSON.parse(gauteng_district_cases_string)



let johannesburg_cases = getDistrictLatest('johannesburg', gauteng_district_cases);

let ekrhuleni_cases = getDistrictLatest('ekrhuleni', gauteng_district_cases);

let sedibeng_cases = getDistrictLatest('sedibeng', gauteng_district_cases);

let tshwane_cases = getDistrictLatest('tshwane', gauteng_district_cases);

let westrand_cases = getDistrictLatest('westrand', gauteng_district_cases);

let unallocated_cases = getDistrictLatest('unallocated', gauteng_district_cases);

let district_names = ['Johannesburg', 'Ekrhuleni', 'Sedibeng', 'Tshwane', 'Westrand', 'Unallocated']
let district_cases = [johannesburg_cases, ekrhuleni_cases, sedibeng_cases, tshwane_cases, westrand_cases, unallocated_cases];
let gauteng_district_amount = 6;

const district_data_object = district_names.map((district_names, i) => ({ name: district_names, value: district_cases[i] }));


let confirmed_cases_string = fs.readFileSync(process.cwd() +'/covid_stats/json_stats/sa_provinces_confirmed.json').toString();
let confirmed_cases_json = JSON.parse(confirmed_cases_string);



let total_cases = confirmed_cases_json['total_cases'];
total_cases = total_cases[6]


let closed_cases_string = fs.readFileSync(process.cwd() +'/covid_stats/json_stats/sa_provinces_closed.json').toString();
let closed_cases_json = JSON.parse(closed_cases_string);


let recoveries = closed_cases_json['recoveries'];


recoveries = recoveries[6]

let deaths = closed_cases_json['deaths'];
deaths = deaths[6]

let active = total_cases - recoveries - deaths

      let time_response = await getSummary(TIME_API_URL);
      let current_time = time_response.datetime;
      var date_time = new Date(current_time);
      let time = date_time.toLocaleTimeString('it-IT');


      let year = new Date().getFullYear()
      let province_name = 'North West'
       let title = "SA Covid-19 | " + province_name;
      res.render('province', 
       {
        indexCSS: true,
        time,
        year,
        province_name,
        district_data_object,
        total_cases,
        recoveries,
        deaths,
        active,
        title
    
    
        });
      })();

    } catch (error) 
    {
      return console.log(error);
    } 
//  
  },
  getNorthernCape: async (req, res) => {
     try {
      
      const TIME_API_URL = 'https://worldtimeapi.org/api/timezone/Africa/Johannesburg';



       
    
    function getSummary(url)
      {
        return new Promise((resolve) =>
        {
          https.get(url , response =>
          {
            let data = "";
            response.on('data', chunk => {
            data += chunk;
          });
          response.on('end', () => 
            {
              let summary = JSON.parse(data);
              resolve(summary);
            })

          }).end();
        });


      }      

function amountOfKeys(obj)
{
  return Object.keys(obj).length;
}


function getDistrictLatest(district, province_cases)
{
  let all_values = province_cases[district];
  let latest_value = all_values[amountOfKeys(all_values)-1]

  return latest_value;
}


 
  (async() => {


let gauteng_district_cases_string = fs.readFileSync(process.cwd() +'/covid_stats/districts/gp/gp.json').toString();
gauteng_district_cases = JSON.parse(gauteng_district_cases_string)



let johannesburg_cases = getDistrictLatest('johannesburg', gauteng_district_cases);

let ekrhuleni_cases = getDistrictLatest('ekrhuleni', gauteng_district_cases);

let sedibeng_cases = getDistrictLatest('sedibeng', gauteng_district_cases);

let tshwane_cases = getDistrictLatest('tshwane', gauteng_district_cases);

let westrand_cases = getDistrictLatest('westrand', gauteng_district_cases);

let unallocated_cases = getDistrictLatest('unallocated', gauteng_district_cases);

let district_names = ['Johannesburg', 'Ekrhuleni', 'Sedibeng', 'Tshwane', 'Westrand', 'Unallocated']
let district_cases = [johannesburg_cases, ekrhuleni_cases, sedibeng_cases, tshwane_cases, westrand_cases, unallocated_cases];
let gauteng_district_amount = 6;

const district_data_object = district_names.map((district_names, i) => ({ name: district_names, value: district_cases[i] }));


let confirmed_cases_string = fs.readFileSync(process.cwd() +'/covid_stats/json_stats/sa_provinces_confirmed.json').toString();
let confirmed_cases_json = JSON.parse(confirmed_cases_string);



let total_cases = confirmed_cases_json['total_cases'];
total_cases = total_cases[7]


let closed_cases_string = fs.readFileSync(process.cwd() +'/covid_stats/json_stats/sa_provinces_closed.json').toString();
let closed_cases_json = JSON.parse(closed_cases_string);


let recoveries = closed_cases_json['recoveries'];


recoveries = recoveries[7]

let deaths = closed_cases_json['deaths'];
deaths = deaths[7]

let active = total_cases - recoveries - deaths

      let time_response = await getSummary(TIME_API_URL);
      let current_time = time_response.datetime;
      var date_time = new Date(current_time);
      let time = date_time.toLocaleTimeString('it-IT');


      let year = new Date().getFullYear()
      let province_name = 'Northern Cape'
       let title = "SA Covid-19 | " + province_name;
      res.render('province', 
       {
        indexCSS: true,
        time,
        year,
        province_name,
        district_data_object,
        total_cases,
        recoveries,
        deaths,
        active,
        title
    
    
        });
      })();

    } catch (error) 
    {
      return console.log(error);
    } 
//  
  },
  getWesternCape: async (req, res) => {
     try {
      
      const TIME_API_URL = 'https://worldtimeapi.org/api/timezone/Africa/Johannesburg';



       
    
    function getSummary(url)
      {
        return new Promise((resolve) =>
        {
          https.get(url , response =>
          {
            let data = "";
            response.on('data', chunk => {
            data += chunk;
          });
          response.on('end', () => 
            {
              let summary = JSON.parse(data);
              resolve(summary);
            })

          }).end();
        });


      }      

function amountOfKeys(obj)
{
  return Object.keys(obj).length;
}


function getDistrictLatest(district, province_cases)
{
  let all_values = province_cases[district];
  let latest_value = all_values[amountOfKeys(all_values)-1]

  return latest_value;
}


 
  (async() => {


let gauteng_district_cases_string = fs.readFileSync(process.cwd() +'/covid_stats/districts/gp/gp.json').toString();
gauteng_district_cases = JSON.parse(gauteng_district_cases_string)



let johannesburg_cases = getDistrictLatest('johannesburg', gauteng_district_cases);

let ekrhuleni_cases = getDistrictLatest('ekrhuleni', gauteng_district_cases);

let sedibeng_cases = getDistrictLatest('sedibeng', gauteng_district_cases);

let tshwane_cases = getDistrictLatest('tshwane', gauteng_district_cases);

let westrand_cases = getDistrictLatest('westrand', gauteng_district_cases);

let unallocated_cases = getDistrictLatest('unallocated', gauteng_district_cases);

let district_names = ['Johannesburg', 'Ekrhuleni', 'Sedibeng', 'Tshwane', 'Westrand', 'Unallocated']
let district_cases = [johannesburg_cases, ekrhuleni_cases, sedibeng_cases, tshwane_cases, westrand_cases, unallocated_cases];
let gauteng_district_amount = 6;

const district_data_object = district_names.map((district_names, i) => ({ name: district_names, value: district_cases[i] }));


let confirmed_cases_string = fs.readFileSync(process.cwd() +'/covid_stats/json_stats/sa_provinces_confirmed.json').toString();
let confirmed_cases_json = JSON.parse(confirmed_cases_string);



let total_cases = confirmed_cases_json['total_cases'];
total_cases = total_cases[8]


let closed_cases_string = fs.readFileSync(process.cwd() +'/covid_stats/json_stats/sa_provinces_closed.json').toString();
let closed_cases_json = JSON.parse(closed_cases_string);


let recoveries = closed_cases_json['recoveries'];


recoveries = recoveries[8]

let deaths = closed_cases_json['deaths'];
deaths = deaths[8]

let active = total_cases - recoveries - deaths

      let time_response = await getSummary(TIME_API_URL);
      let current_time = time_response.datetime;
      var date_time = new Date(current_time);
      let time = date_time.toLocaleTimeString('it-IT');


      let year = new Date().getFullYear()
      let province_name = 'Western Cape'
       let title = "SA Covid-19 | " + province_name;
      res.render('province', 
       {
        indexCSS: true,
        time,
        year,
        province_name,
        district_data_object,
        total_cases,
        recoveries,
        deaths,
        active,
        title
    
    
        });
      })();

    } catch (error) 
    {
      return console.log(error);
    } 
//  
  },
}

  