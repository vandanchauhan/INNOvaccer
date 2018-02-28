$(document).ready(function() {

   // $.get('http://localhost:8000/bla', {}, function(data){
   //      console.log(data)
   // });
// var data ;

// if(this.data){
//             return Promise.resolve(this.data);
//         }

//         return new Promise(resolve => {
//     // assets/data/questions.json
//             this.http.get('http://localhost:8000/bla').map(res => res.json()).subscribe(data => {
//                 this.data = data.questions;
//                 resolve(this.data);
//             });


// load();


    $('.num').click(function () {
        var num = $(this);
        var text = $.trim(num.find('.txt').clone().children().remove().end().text());
        var telNumber = $('#telNumber');
        $("#telNumber").attr("value", telNumber.val() + text);
     });

    $("#date").hide();
    // $("#date-chng").click(function(){
    // 	$("#date").show();
    // });

    // Set date to today
var dateObj = new Date();
var month = dateObj.getUTCMonth(); //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

newdate = monthNames[month] + " " + day  ; 
      console.log(newdate);
    $("#date").attr("value", newdate);
    console.log($("#date").val());

	var amt = [];
	var catg = [];
	var g = 0,e = 0,v = 0,f = 0,m = 0
    var data = [	{
						category: "Grocery",
						amount: 68,
						date: "bla"
					},
					{
						category: "Food",
						amount: 348,
						date: "bla"
					},
					{
						category: "Entertainment",
						amount: 238,
						date: "bla"
					},
					{
						category: "Vehicle",
						amount: 68,
						date: "bla"
					},
					{
						category: "Miscellaneous",
						amount: 67,
						date: "bla"
					},
					{
						category: "Grocery",
						amount: 224,
						date: "bla"
					},
					{
						category: "Food",
						amount: 678,
						date: "bla"
					},
					{
						category: "Entertainment",
						amount: 908,
						date: "bla"
					},
					{
						category: "Vehicle",
						amount: 78,
						date: "bla"
					},
					{
						category: "Miscellaneous",
						amount: 73,
						date: "bla"
					}
				];
var color = null ; 
for (var i = data.length - 1; i >= 0; i--) {

	if (data[i].category == "Grocery") {g = g + data[i].amount; color = "#d0e384" }
	else if (data[i].category == "Entertainment") {e = e + data[i].amount; color = "#a4db95"}
	else if (data[i].category == "Vehicle") {v = v + data[i].amount; color = "#c5bfa0"}
	else if (data[i].category == "Food") {f = f + data[i].amount; color = "#7ebf6c"}
	else {m = m + data[i].amount; color = "#8e8e8e" }; 

	amt.push(data[i].amount);
	catg.push(data[i].category);
	// $("#expense-data").append('<div class="row expense-div"><div style="background-color:'+color+';" class="col-sm-4 category">'+data[i].category+'</div><div class="col-sm-3 align-vert"><img class="expense-rlogo" src="http://i.imgur.com/Fd7NROx.png">'+data[i].amount+'</div><div class="col-sm-3 align-vert">'+data[i].date+'</div><div class="col-sm-2"><img class="close-img" style="text-align:right;" data-toggle="tooltip" data-placement="right" title="Remove" src="Images/close.png"></div></div>');
 //    color == '';
};

var total = [g, e, v, f, m];
console.log(total);


$(document).on('click', '.expense-div .close-img', function( event ) {
    $(this).closest('.expense-div').fadeOut();
} )

// PieDiagram
var myChart = document.getElementById("myChart");
var ctx = myChart.getContext('2d');
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ["Grocery", "Entertainment", "Vehicle", "Food", "Miscellaneous"],
        datasets: [{
            label: '# of Votes',
            data: total,
            backgroundColor: [
                'rgba(198, 236, 74, 0.6)',
                'rgba(132, 221, 98, 0.6)',
                'rgba(179, 170, 116, 0.6)',
                'rgba(106, 114, 124, 0.6)',
                'rgba(84, 84, 84, 0.6)'
            ],
            borderColor: [
                'whitesmoke',
                'whitesmoke',
                'whitesmoke',
                'whitesmoke',
                'whitesmoke'
            ],
            borderWidth: 1
        }]
    },
    options: {
        
    }
});

});

// Graphical Plot

var chartData = generateChartData();
var chart = AmCharts.makeChart("chartdiv", {
    "type": "serial",
    "theme": "light",
    "marginRight": 80,
    "autoMarginOffset": 20,
    "marginTop": 7,
    "dataProvider": chartData,
    "valueAxes": [{
        "axisAlpha": 0.2,
        "dashLength": 1,
        "position": "left"
    }],
    "mouseWheelZoomEnabled": true,
    "graphs": [{
        "id": "g1",
        "balloonText": "[[value]]",
        "bullet": "round",
        "bulletBorderAlpha": 1,
        "bulletColor": "#FFFFFF",
        "hideBulletsCount": 50,
        "title": "red line",
        "valueField": "visits",
        "useLineColorForBulletBorder": true,
        "balloon":{
            "drop":true
        }
    }],
    "chartScrollbar": {
        "autoGridCount": true,
        "graph": "g1",
        "scrollbarHeight": 40
    },
    "chartCursor": {
       "limitToGraph":"g1"
    },
    "categoryField": "date",
    "categoryAxis": {
        "parseDates": true,
        "axisColor": "#DADADA",
        "dashLength": 1,
        "minorGridEnabled": true
    },
    "export": {
        "enabled": true
    }
});

chart.addListener("rendered", zoomChart);
zoomChart();

// this method is called when chart is first inited as we listen for "rendered" event
function zoomChart() {
    // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
    chart.zoomToIndexes(chartData.length - 40, chartData.length - 1);
}


// generate some random data, quite different range

// generate some random data, quite different range
function generateChartData() {
    var chartData = [];
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 5);
    var visits = 30;
    for (var i = 0; i < 1000; i++) {
        // we create date objects here. In your data, you can have date strings
        // and then set format of your dates using chart.dataDateFormat property,
        // however when possible, use date objects, as this will speed up chart rendering.
        var newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);
        
        visits += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);

        chartData.push({
            date: newDate,
            visits: visits
        });
    }
    return chartData;
}