//------------------------------------------Global variables----------------------------------------------
var data;
timeData = {};
timeData.eventlist = [];
timeData.todaysevents = [];
timeData.todayscount = {};
timeData.todayscount.sleep = 0;
timeData.todayscount.free = 0;
timeData.todayscount.work = 0;
timeData.todayscount.study = 0;
timeData.todayscount.commute = 0;
timeData.todayscount.sport = 0;
timeData.todayscount.rest = 0;
timeData.colorpalette = {};
timeData.colorpalette.sleep = "#1d365f";
timeData.colorpalette.free = "#66cef5";
timeData.colorpalette.work = "#959595";
timeData.colorpalette.study = "#f99346";
timeData.colorpalette.commute = "#d7d7d7";
timeData.colorpalette.sport = "#ca3333";
timeData.colorpalette.rest = "rgba(255, 255, 255, 1)"
//other matching colors: #ffcf03,#70a140, #00adee  
$('document').ready(function() {
//------------------------------------------Mmenu----------------------------------------------
	$("#my-menu").mmenu({
    // options
    navbar: {			
      title: "Tyma"
     },
    onClick: {
      close: true
    },
    footer: {
            add: true,
            content: "(c) 2016"
        },
    "header": {           
            "add": true,
            "update": true
        }
//     dragOpen: {
//             open: true
//         }
  }, {
      // configuration

  });
  //------------------------------------------document.ready()----------------------------------------------
	replaceSVG();
  loadData();
});