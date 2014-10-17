$('document').ready(function() {
	$('body').highcharts('Map', {
        chart: {
			spacing: [0,0,0,0]
		},
		mapNavigation: {
            enabled: true,
            enableButtons: false
        },
        title: {
            text: null
        },
        colorAxis: {
            min: 0
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        colorAxis: {
             minColor: '#fff',
             maxColor: '#fff'
        },
        series : [{           
            mapData: Highcharts.maps['custom/world-highres']
        }]
    });
});

