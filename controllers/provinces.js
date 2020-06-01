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



        let title = "SA Covid-19 | Gauteng";
    
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

 
  (async() => {

   


let confirmed_cases_string = fs.readFileSync(process.cwd() +'/covid_stats/json_stats/sa_provinces_confirmed.json').toString();



let confirmed_cases_json = JSON.parse(confirmed_cases_string);

confirmed_cases_json = confirmed_cases_json['total_cases'];
confirmed_cases_json = JSON.stringify(confirmed_cases_json)

      let time_response = await getSummary(TIME_API_URL);
      let current_time = time_response.datetime;
      var date_time = new Date(current_time);
      let time = date_time.toLocaleTimeString('it-IT');


      let year = new Date().getFullYear()
      let province_name = 'Gauteng'

      res.render('province', 
       {
        indexCSS: true,
        time,
        year,
        province_name,
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



        let title = "SA Covid-19 | Gauteng";
    
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

 
  (async() => {

   


let confirmed_cases_string = fs.readFileSync(process.cwd() +'/covid_stats/json_stats/sa_provinces_confirmed.json').toString();



let confirmed_cases_json = JSON.parse(confirmed_cases_string);

confirmed_cases_json = confirmed_cases_json['total_cases'];
confirmed_cases_json = JSON.stringify(confirmed_cases_json)

      let time_response = await getSummary(TIME_API_URL);
      let current_time = time_response.datetime;
      var date_time = new Date(current_time);
      let time = date_time.toLocaleTimeString('it-IT');


      let year = new Date().getFullYear()
      let province_name = 'KwaZulu Natal'

      res.render('province', 
       {
        indexCSS: true,
        time,
        year,
        province_name,
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
//  
  },
  getMpumalanga: async (req, res) => {
//  
  },
  getNorthWest: async (req, res) => {
//  
  },
  getNorthernCape: async (req, res) => {
//  
  },
  getWesternCape: async (req, res) => {
//  
  },
}

  