/*
 * Author: Abdullah A Almsaeed
 * Date: 4 Jan 2014
 * Description:
 *      This is a demo file used only for the main dashboard (index.html)
 **/
  let deaths = document.currentScript.getAttribute('deaths');
  let recoveries = document.currentScript.getAttribute('recoveries');
  let latest_provinces_confirmed = document.currentScript.getAttribute('provinces_confirmed');
 
let total_confirmed = document.currentScript.getAttribute('total_confirmed');

let total_active = document.currentScript.getAttribute('total_active');

let total_recovered = document.currentScript.getAttribute('total_recovered');

let total_death = document.currentScript.getAttribute('total_death');

let yesterday_date = new Date();
yesterday_date.setDate(yesterday_date.getDate() - 1);

let dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' }) 

let [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat .formatToParts(yesterday_date) 

yesterday_day = `${day}`;

yesterday_day = parseInt(yesterday_day);

yesterday_month = `${month}`;

yesterday_month = parseInt(yesterday_month);

yesterday_month = yesterday_month - 1;


yesterday_year = `${year}`;

yesterday_year = parseInt(yesterday_year);


var getDates = function(startDate, endDate) {
  var dates = [],
      currentDate = startDate,
      addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
};

// Usage
var dates = getDates(new Date(2020,2,5), new Date(yesterday_year,yesterday_month,yesterday_day));                                                                                                           



let clean_dates = [];


for (let index = 0; index < dates.length; index++) {
  let [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat .formatToParts(dates[index] ) 

clean_dates.push(`${day}-${month}-${year }`)
 
}

let total_recovered_array = total_recovered.split(',');


for (let index = 0; index < total_recovered_array.length; index++) {
  total_recovered_array[index] = parseInt(total_recovered_array[index]);
  
}

let total_death_array = total_death.split(',');


for (let index = 0; index < total_death_array.length; index++) {
  total_death_array[index] = parseInt(total_death_array[index]);
  
}


$(function () {

  'use strict'

  // Make the dashboard widgets sortable Using jquery UI
  $('.connectedSortable').sortable({
    placeholder         : 'sort-highlight',
    connectWith         : '.connectedSortable',
    handle              : '.card-header, .nav-tabs',
    forcePlaceholderSize: true,
    zIndex              : 999999
  })
  $('.connectedSortable .card-header, .connectedSortable .nav-tabs-custom').css('cursor', 'move')

  // jQuery UI sortable for the todo list
  $('.todo-list').sortable({
    placeholder         : 'sort-highlight',
    handle              : '.handle',
    forcePlaceholderSize: true,
    zIndex              : 999999
  })

  // bootstrap WYSIHTML5 - text editor
  $('.textarea').summernote()

  $('.daterange').daterangepicker({
    ranges   : {
      'Today'       : [moment(), moment()],
      'Yesterday'   : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days' : [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month'  : [moment().startOf('month'), moment().endOf('month')],
      'Last Month'  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    startDate: moment().subtract(29, 'days'),
    endDate  : moment()
  }, function (start, end) {
    window.alert('You chose: ' + start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
  })

  /* jQueryKnob */
  $('.knob').knob()

  
  // World map by jvectormap
latest_provinces_confirmed = JSON.parse(latest_provinces_confirmed)

  var provData = {
  "ZA-WC": latest_provinces_confirmed['8'],
  "ZA-FS": latest_provinces_confirmed['1'],
  "ZA-EC": latest_provinces_confirmed['0'],
  "ZA-NC": latest_provinces_confirmed['7'],
  "ZA-LP": latest_provinces_confirmed['4'],
  "ZA-MP": latest_provinces_confirmed['5'],
  "ZA-NL": latest_provinces_confirmed['3'],
  "ZA-NW": latest_provinces_confirmed['6'],
  "ZA-GT": latest_provinces_confirmed['2'],
};
  $('#map').vectorMap({
    map              : 'za_mill',
    backgroundColor  : 'transparent',
     focusOn: {
       x: 0.9,
       y: 0.2,
       scale: 2
     },
      series: {
    regions: [{
      values: provData,
      scale: ['#ffc8c8', '#a40000'],
      normalizeFunction: 'polynomial'
    }]
  },
    regionStyle      : {
      initial: {
        fill            : 'rgba(255, 255, 255, 0.7)',
        'fill-opacity'  : 1,
        stroke          : 'rgba(0,0,0,.2)',
        'stroke-width'  : 1,
        'stroke-opacity': 1
      }
    },
  
 onRegionTipShow: function(e, el, code){
    el.html(el.html()+' (Total cases - '+provData[code]+')');
  }
  });



// Active Cases Chart
  

  var salesGraphChartCanvas = $('#active-chart').get(0).getContext('2d');
  
let total_active_array = total_active.split(',');





for (let index = 0; index < total_active_array.length; index++) {
  total_active_array[index] = parseInt(total_active_array[index]);
  
}

  var salesGraphChartData = {
    labels  : clean_dates,
    datasets: [
      {
        label               : 'Active Cases',
        fill                : false,
        borderWidth         : 2,
        lineTension         : 0,
        spanGaps : true,
        borderColor         : '#efefef',
        pointRadius         : 3,
        pointHoverRadius    : 7,
        pointColor          : '#efefef',
        pointBackgroundColor: '#efefef',
        data                : total_active_array
      }
    ]
  }

  var salesGraphChartOptions = {
    maintainAspectRatio : false,
    responsive : true,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
        ticks : {
          fontColor: '#efefef',
        },
        gridLines : {
          display : false,
          color: '#efefef',
          drawBorder: false,
        }
      }],
      yAxes: [{
        ticks : {
          stepSize: 5000,
          fontColor: '#efefef',
        },
        gridLines : {
          display : true,
          color: '#efefef',
          drawBorder: false,
        }
      }]
    },
        legend: {
      display: true
    }
  }

  // This will get the first returned node in the jQuery collection.
  var salesGraphChart = new Chart(salesGraphChartCanvas, { 
      type: 'line', 
      data: salesGraphChartData, 
      options: salesGraphChartOptions
    }
  )




  /* Chart.js Charts */
  // Sales chart
  var salesChartCanvas = document.getElementById('revenue-chart-canvas').getContext('2d');
  //$('#revenue-chart').get(0).getContext('2d');

  var closed_cases_chart_data = {
    labels  : clean_dates,
    datasets: [
      {
        label               : 'Recoveries',
        fill                : false,
        borderWidth         : 2,
        lineTension         : 0,
         spanGaps : true,
        borderColor         : '#5cb85c',
         pointRadius         : 3,
        pointHoverRadius    : 7,
        pointColor          : '#5cb85c',
        pointBackgroundColor: '#5cb85c',

        data                : total_recovered_array
      },
      {
        label               : 'Deaths',
        fill                : false,
        borderWidth         : 2,
        lineTension         : 0,
         spanGaps : true,
        borderColor         : '#d9534f',
         pointRadius         : 3,
        pointHoverRadius    : 7,
        pointColor          : '#d9534f',
        pointBackgroundColor: '#d9534f',
        data                : total_death_array
      },
    ]
  }

  var closed_cases_chart_options = {
    maintainAspectRatio : false,
    responsive : true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        gridLines : {
          display : false,
        }
      }],
      yAxes: [{
        gridLines : {
          display : false,
        }
      }]
    },
    legend: {
      display: true
    }
  }

  // This will get the first returned node in the jQuery collection.
  var salesChart = new Chart(salesChartCanvas, { 
      type: 'line', 
      data: closed_cases_chart_data, 
      options: closed_cases_chart_options
    }
  )

  // Donut Chart
  let total_closed_cases = parseInt(recoveries) + parseInt(deaths);
  let deaths_percentage = deaths/total_closed_cases;
  deaths_percentage = deaths_percentage * 100;
  deaths_percentage = deaths_percentage.toFixed(1);
  let recoveries_percentage = recoveries/total_closed_cases;
  recoveries_percentage = recoveries_percentage * 100;
  recoveries_percentage = recoveries_percentage.toFixed(1);

  let recoveries_label = 'Recoveries (' + recoveries_percentage + '%)';
  let deaths_label = 'Deaths (' + deaths_percentage + '%)';

  var pieChartCanvas = $('#sales-chart-canvas').get(0).getContext('2d')
  var pieData        = {
    labels: [
        deaths_label, 
        recoveries_label, 
    ],
    datasets: [
      {
        data: [deaths,recoveries],
        backgroundColor : ['#f56954', '#00a65a'],
      }
    ]
  }
  var pieOptions = {
    legend: {
      display: true
    },
    maintainAspectRatio : false,
    responsive : true,
  }
  //Create pie or douhnut chart
  // You can switch between pie and douhnut using the method below.
  var pieChart = new Chart(pieChartCanvas, {
    type: 'doughnut',
    data: pieData,
    options: pieOptions      
  });

  // Sales graph chart
  var salesGraphChartCanvas = $('#line-chart').get(0).getContext('2d');
  //$('#revenue-chart').get(0).getContext('2d');

let total_confirmed_array = total_confirmed.split(',');





for (let index = 0; index < total_confirmed_array.length; index++) {
  total_confirmed_array[index] = parseInt(total_confirmed_array[index]);
  
}







  var salesGraphChartData = {
    labels  : clean_dates,
    datasets: [
      {
        label               : 'Cases',
        fill                : false,
        borderWidth         : 2,
        lineTension         : 0,
        spanGaps : true,
        borderColor         : '#efefef',
        pointRadius         : 3,
        pointHoverRadius    : 7,
        pointColor          : '#efefef',
        pointBackgroundColor: '#efefef',
        data                : total_confirmed_array
      }
    ]
  }

  var salesGraphChartOptions = {
    maintainAspectRatio : false,
    responsive : true,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
        ticks : {
          fontColor: '#efefef',
        },
        gridLines : {
          display : false,
          color: '#efefef',
          drawBorder: false,
        }
      }],
      yAxes: [{
        ticks : {
          stepSize: 5000,
          fontColor: '#efefef',
        },
        gridLines : {
          display : true,
          color: '#efefef',
          drawBorder: false,
        }
      }]
    },
        legend: {
      display: true
    }
  }

  // This will get the first returned node in the jQuery collection.
  var salesGraphChart = new Chart(salesGraphChartCanvas, { 
      type: 'line', 
      data: salesGraphChartData, 
      options: salesGraphChartOptions
    }
  )

})
