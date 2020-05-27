const https = require('https');
const request = require('request');
const got = require('got');
const csv = require("async-csv")
module.exports = {
 

  getHome: async (req, res) => {
    try {
      const API_URL_FALLBACK = 'https://api.covid19api.com/dayone/country/south-africa';
      const API_URL = 'https://corona.lmao.ninja/v2/countries/South%20Africa?yesterday'
      const TIME_API_URL = 'https://worldtimeapi.org/api/timezone/Africa/Johannesburg';



        let title = "Welcome to the SA Covid-19 Dashboard";
    
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


     


//let parsedObject = await csv.parse(request.get("https://raw.githubusercontent.com/dsfsi/covid19za/master/data/covid19za_provincial_cumulative_timeline_confirmed.csv"));
      

 
  (async() => {
    let csv_content;
         try {
        const response = await got('https://raw.githubusercontent.com/dsfsi/covid19za/master/data/covid19za_provincial_cumulative_timeline_confirmed.csv');
        //console.log(response.body);
        csv_content = response.body;
        //=> '<!doctype html> ...'
    } catch (error) {
        console.log(error.response.body);
        //=> 'Internal server error ...'
    }
  
  let latest_provinces_confirmed = await csv.parse(csv_content);

 latest_provinces_confirmed = latest_provinces_confirmed
[latest_provinces_confirmed.length-1];


     let latest_data = await getSummary(API_URL);

      let summary = await getSummary(API_URL_FALLBACK);
      let time_response = await getSummary(TIME_API_URL);
      let current_time = time_response.datetime;

      var date_time = new Date(current_time);

      let latest_summary = summary[summary.length-1];
      let summary_yesterday = summary[summary.length-2];
      let closed_cases = latest_summary.Recovered + latest_summary.Deaths;
      let time = date_time.toLocaleTimeString('it-IT');

// Confirmed increase
      let confirmed_up = latest_summary.Confirmed - summary_yesterday.Confirmed;
      confirmed_up = confirmed_up/summary_yesterday.Confirmed;
      confirmed_up = confirmed_up*100;
      confirmed_up = confirmed_up.toFixed(1);

      // Recoveries increase
      let recovered_up = latest_summary.Recovered - summary_yesterday.Recovered;
      recovered_up = recovered_up/summary_yesterday.Recovered;
      recovered_up = recovered_up*100;
      recovered_up = recovered_up.toFixed(1);

      // Death Increase
      let deaths_up = latest_summary.Deaths - summary_yesterday.Deaths;
      deaths_up = deaths_up/summary_yesterday.Deaths;
      deaths_up = deaths_up*100;
      deaths_up = deaths_up.toFixed(1);


      // Active increase
      let active_change = latest_summary.Active - summary_yesterday.Active;
      active_change = active_change/summary_yesterday.Active;
      active_change = active_change*100;
      active_change = active_change.toFixed(1);

      let sign;

      if (active_change < 0)
      {
        sign = "";
      }

      else 
      {
        sign = "+";
      }

      let year = new Date().getFullYear()


      res.render('index', 
       {
        indexCSS: true,
        latest_data,
        closed_cases,
        time,
        confirmed_up,
        recovered_up,
        active_change,
        deaths_up,
        sign,
        year,
        latest_provinces_confirmed,
        title
    
    
        });
      })();

    } catch (error) 
    {
      return console.log(error);
    } 
  }
}

  