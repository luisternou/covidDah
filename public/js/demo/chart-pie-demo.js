// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

let hiraAmount = document.currentScript.getAttribute('hira');

let incidentAmount = document.currentScript.getAttribute('incidents');

let totalSubmissions = +hiraAmount + +incidentAmount;
let hiraPercentage = (hiraAmount/totalSubmissions) * 100;
let incidentPercentage = (incidentAmount/totalSubmissions) * 100;

hiraPercentage = Math.round( hiraPercentage * 10 ) / 10;
incidentPercentage = Math.round( incidentPercentage * 10 ) / 10;
// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["Hira Submissions: (" + hiraPercentage + "%) " , "Incidents: (" + incidentPercentage + "%)"],
    datasets: [{
      data: [hiraAmount, incidentAmount],
      backgroundColor: ['#4e73df', '#e74a3b'],
      hoverBackgroundColor: ['#2e59d9', '#e94a3b', '#2c9faf', '#e74a3b'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});
