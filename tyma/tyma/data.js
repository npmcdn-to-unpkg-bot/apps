//------------------------------------------Initial Functions----------------------------------------------
function loadData() {
  $.post( "/data/tyma.json", function( data ) {
//     console.log(timeData);   
    $.each(data, function () {    
//       console.log(this);
      timeData.eventlist.unshift(this);
    });  
//     console.log(timeData.eventlist);     
    countDay();
    todaysEvents();
    plotDays();
  }, 'json');  
}
//------------------------------------------PlotFunctions/Data-converters----------------------------------------------
function plotDays() {
  var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  currentDate = new Date();
  var firstDate = Date.parse(timeData.eventlist[timeData.eventlist.length-1].date);
  var firstStartertime = firstDate.clone()
  firstStartertime.setHours(0,0,0,0);
  var firstDaysProgress = Math.abs((firstDate.getTime()-firstStartertime.getTime())/oneDay);
//   console.log(firstDaysProgress);
  var DaysToPlot =  1+Math.round(firstDaysProgress+Math.abs((currentDate.getTime() - firstDate.getTime())/(oneDay)));
  console.log(DaysToPlot +' Days to Plot');
  //
  // Sinn dieses Vorgehens bestimmen: Sollte man nicht einfach eine Schleife von heute in die Vergangenheit laufen lassen? 
  //
  
  todaysLabels = [];
  todaysData = [];
  todaysColors = [];
//   todaysColor = [];
  $.each(timeData.todaysevents, function () {
    todaysLabels.unshift(this.activity);
    todaysData.unshift(this.time);
     switch(this.activity) {
        case 'Sleep':
            todaysColors.unshift(timeData.colorpalette.sleep);
            break;
        case "Work":
            todaysColors.unshift(timeData.colorpalette.work);
            break;
        case "Free":
            todaysColors.unshift(timeData.colorpalette.free);
            break;
        case "Sport":
            todaysColors.unshift(timeData.colorpalette.sport);
            break;
        case "Commute":
            todaysColors.unshift(timeData.colorpalette.commute);
            break;
        case "Study":
            todaysColors.unshift(timeData.colorpalette.study);
            break;            
      } 
  });
  todaysLabels.push("Remaining Time");
  todaysData.push(timeData.todayscount.rest);
  todaysColors.push(timeData.colorpalette.rest);
  var ctx = $("#myChart01");
  var myDoughnutChart01 = new Chart(ctx, {
    type: 'doughnut',
    data:{
        labels: todaysLabels,
        datasets: [
            {
                data: todaysData,
                backgroundColor: todaysColors          
            }]
    },
    options: {
        rotation: 1 * Math.PI,
        legend: {
            display: false
        },      
        tooltips: {
            enabled: true,
            mode: 'single',
            callbacks: {
                label: function(tooltipItem, data) { 
                  var label = data.labels[tooltipItem.index];
                  var tooltipData = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                  var hour = Math.floor(tooltipData / (1000*60*60));
                  var min = Math.floor((tooltipData-(hour*1000*60*60)) / (1000*60));
                  var sec = Math.floor((tooltipData-((hour*1000*60*60)+(min*1000*60))) / (1000));
                  return label+ ' - '+hour+'h '+min+'min '+sec+'sec ';
                }
            }
        }
    }
  });
  ctx = $("#myChart02");
  var myDoughnutChart02 = new Chart(ctx, {
    type: 'doughnut',
    data:{
        labels: todaysLabels,
        datasets: [
            {
                data: todaysData,
                backgroundColor: todaysColors          
            }]
    },
    options: {
        rotation: 1 * Math.PI,
        legend: {
            display: false
        },      
        tooltips: {
            enabled: true,
            mode: 'single',
            callbacks: {
                label: function(tooltipItem, data) { 
                  var label = data.labels[tooltipItem.index];
                  var tooltipData = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                  var hour = Math.floor(tooltipData / (1000*60*60));
                  var min = Math.floor((tooltipData-(hour*1000*60*60)) / (1000*60));
                  var sec = Math.floor((tooltipData-((hour*1000*60*60)+(min*1000*60))) / (1000));
                  return label+ ' - '+hour+'h '+min+'min '+sec+'sec ';
                }
            }
        }
    }
  });
}
//------------------------------------------Foundation functions----------------------------------------------
function countDay() {
  lastcountedDate = new Date();  
  $.each(timeData.eventlist, function () {    
//     console.log(Date.parse(this.date));
    if(lastcountedDate.getDate() == Date.parse(this.date).getDate()){
//       console.log("passt");
      switch(this.activity) {
        case 'Sleep':
            timeData.todayscount.sleep += (lastcountedDate.getTime()-Date.parse(this.date).getTime());
            break;
        case "Work":
            timeData.todayscount.work += (lastcountedDate.getTime()-Date.parse(this.date).getTime());
            break;
        case "Free":
            timeData.todayscount.free += (lastcountedDate.getTime()-Date.parse(this.date).getTime());
            break;
        case "Sport":
            timeData.todayscount.sport += (lastcountedDate.getTime()-Date.parse(this.date).getTime());
            break;
        case "Commute":
            timeData.todayscount.commute += (lastcountedDate.getTime()-Date.parse(this.date).getTime());
            break;
        case "Study":
            timeData.todayscount.study += (lastcountedDate.getTime()-Date.parse(this.date).getTime());
            break;            
      } 
      lastcountedDate = Date.parse(this.date)
    } else {
      mitternachtsdate = Date.today ();
      switch(this.activity) {
        case 'Sleep':
            timeData.todayscount.sleep += (lastcountedDate.getTime()-mitternachtsdate.getTime());
            break;
        case "Work":
            timeData.todayscount.work += (lastcountedDate.getTime()-mitternachtsdate.getTime());
            break;
        case "Free":
            timeData.todayscount.free += (lastcountedDate.getTime()-mitternachtsdate.getTime());
            break;
        case "Sport":
            timeData.todayscount.sport += (lastcountedDate.getTime()-mitternachtsdate.getTime());
            break;
        case "Commute":
            timeData.todayscount.commute += (lastcountedDate.getTime()-mitternachtsdate.getTime());
            break;
        case "Study":
            timeData.todayscount.study += (lastcountedDate.getTime()-mitternachtsdate.getTime());
            break;            
      }
      return false;
    }    
  });
  timeData.todayscount.rest = (24*60*60*1000)-(timeData.todayscount.sleep+timeData.todayscount.free+timeData.todayscount.work+timeData.todayscount.study+timeData.todayscount.commute+timeData.todayscount.sport);
  
}
function todaysEvents() {
  lastcountedDate = new Date();  
  $.each(timeData.eventlist, function () {    
//     console.log(Date.parse(this.date));
    if(lastcountedDate.getDate() == Date.parse(this.date).getDate()){
//       console.log("passt");
      eventstring = '{"time":'+(lastcountedDate.getTime()-Date.parse(this.date).getTime())+',"activity":"'+this.activity+'"}';
//       console.log(eventstring);
      eventjson = JSON.parse(eventstring);
      timeData.todaysevents.push(eventjson);
      lastcountedDate = Date.parse(this.date)
    } else {
      mitternachtsdate = Date.today ();
      eventstring = '{"time":'+(lastcountedDate.getTime()-mitternachtsdate)+',"activity":"'+this.activity+'"}';
//       console.log(eventstring);
      eventjson = JSON.parse(eventstring);
      timeData.todaysevents.push(eventjson);
      return false;
    }    
  });
  console.log(timeData);
}
//------------------------------------------Plugin-Functions----------------------------------------------
function replaceSVG() {
	jQuery('img.svg').each(function(){
					var $img = jQuery(this);
					var imgID = $img.attr('id');
					var imgClass = $img.attr('class');
					var imgURL = $img.attr('src');
					var imgFUNCTION = $img.attr('onclick');
					jQuery.get(imgURL, function(data) {
						// Get the SVG tag, ignore the rest
						var $svg = jQuery(data).find('svg');
						// Add replaced image's ID to the new SVG
						if(typeof imgID !== 'undefined') {
							$svg = $svg.attr('id', imgID);
						}
						// Add replaced image's classes to the new SVG
						if(typeof imgClass !== 'undefined') {
							$svg = $svg.attr('class', imgClass+' replaced-svg');
						}
						//Add replaced image's functions tot the new SVG
						if(typeof imgFUNCTION !== 'undefined') {
							$svg = $svg.attr('onclick', imgFUNCTION);
						}
						//Add HTML5 draggable attribute
						$svg = $svg.attr('draggable', "false");
						// Remove any invalid XML tags as per http://validator.w3.org
						$svg = $svg.removeAttr('xmlns:a');
						// Replace image with new SVG
						$img.replaceWith($svg);
					});
				});
}
function closeMenu() {
  $("#my-menu").data( "mmenu" ).close();
}