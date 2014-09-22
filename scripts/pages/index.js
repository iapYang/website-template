define(['jquery', 
		'chartjs',
		'domReady!'], 
	function($){
		Chart.defaults.global.responsive = true;

		var data = [
			    {
			        value: 300,
			        color:"#F7464A",
			        highlight: "#FF5A5E",
			        label: "label 1"
			    },
			    {
			        value: 50,
			        color: "#46BFBD",
			        highlight: "#5AD3D1",
			        label: "label 2"
			    },
			    {
			        value: 100,
			        color: "#FDB45C",
			        highlight: "#FFC870",
			        label: "label 3"
			    },
			    {
			        value: 180,
			        color: "#333",
			        highlight: "#666",
			        label: "label 3"
			    }
			];

		var ctx = $('#myChart')[0].getContext("2d");
		var myLineChart = new Chart(ctx).Doughnut(data);
});