function loadData() {
  $.post( "/data/httpmessages.json", function( data ) {
//     console.log(timeData);   
    $.each(data, function () {    
//       console.log(this);
      timeData.eventlist.unshift(this);
    });  
    console.log(timeData.eventlist);     
//     aggregateData();
    plotDay();
  }, 'json');  
}

// function plotDay() {  
//   var pieLabels = [];
//   var pieData = [];
//   var pieColor = [];
//   lastcountedDate = new Date();  
//   $.each(timeData.eventlist, function () {     
//     if(lastcountedDate.getDate() == Date.parse(this.date).getDate()){
//       console.log("passt");
//       switch(this.activity) {
//         case 'sleep':
//             pieLabels.push("sleep");
//             pieData.push(lastcountedDate.getTime()-Date.parse(this.date).getTime());
//             pieColor.push("#FF6384");
//             break;
//         case "work":
//             pieLabels.push("work");
//             pieData.push(lastcountedDate.getTime()-Date.parse(this.date).getTime());
//             pieColor.push("#FFCE56");           
//             break;
//         case "free":
//             pieLabels.push("free");
//             pieData.push(lastcountedDate.getTime()-Date.parse(this.date).getTime());
//             pieColor.push("#36A2EB");            break;
//         case "sport":
//             pieLabels.push("sport");
//             pieData.push(lastcountedDate.getTime()-Date.parse(this.date).getTime());
//             pieColor.push("orange");            break;
//         case "commute":
//             pieLabels.push("commute");
//             pieData.push(lastcountedDate.getTime()-Date.parse(this.date).getTime());
//             pieColor.push("gray");            break;
//         case "study":
//             pieLabels.push("study");
//             pieData.push(lastcountedDate.getTime()-Date.parse(this.date).getTime());
//             pieColor.push("green");            break;            
//       } 
//       lastcountedDate = Date.parse(this.date)
//     } else {
//       mitternachtsdate = Date.today ();
//       switch(this.activity) {
//         case 'sleep':
//             pieLabels.push("sleep");
//             pieData.push(lastcountedDate.getTime()-mitternachtsdate.getTime());
//             pieColor.push("#FF6384");
//             break;
//         case "work":
//             pieData.push(lastcountedDate.getTime()-mitternachtsdate.getTime());
//             break;
//         case "free":
//             pieData.push(lastcountedDate.getTime()-mitternachtsdate.getTime());
//             break;
//         case "sport":
//             pieData.push(lastcountedDate.getTime()-mitternachtsdate.getTime());
//             break;
//         case "commute":
//             pieData.push(lastcountedDate.getTime()-mitternachtsdate.getTime());
//             break;
//         case "study":
//             pieData.push(lastcountedDate.getTime()-mitternachtsdate.getTime());
//             break;            
//       }
//       return false;
//     }    
//   });
//   var data = {
//     labels: [
//         "Sleep",
//         "Free",
//         "Work",
//         "Study",
//         "Commute",
//         "Sport",
//         ""
//     ],
//     datasets: [
//         {
//             data: [timeData.counter.sleep, timeData.counter.free, timeData.counter.work, timeData.counter.study, timeData.counter.commute, timeData.counter.sport, tagesrestzeit],
//             backgroundColor: [
//                 "#FF6384",
//                 "#36A2EB",
//                 "#FFCE56",
//                 "green",
//                 "gray",
//                 "orange",
//                 "rgba(255, 255, 255, 1)"
//             ]          
//         }]
//   };
//   var ctx = $("#myChart");
//   var myDoughnutChart = new Chart(ctx, {
//     type: 'doughnut',
//     data: data    
//   });
// }

// function aggregateData() {
//   lastcountedDate = new Date();  
//   $.each(timeData.eventlist, function () {    
//     console.log(Date.parse(this.date));
//     if(lastcountedDate.getDate() == Date.parse(this.date).getDate()){
//       console.log("passt");
//       switch(this.activity) {
//         case 'sleep':
//             timeData.counter.sleep = (lastcountedDate.getTime()-Date.parse(this.date).getTime());
//             break;
//         case "work":
//             timeData.counter.work = (lastcountedDate.getTime()-Date.parse(this.date).getTime());
//             break;
//         case "free":
//             timeData.counter.free = (lastcountedDate.getTime()-Date.parse(this.date).getTime());
//             break;
//         case "sport":
//             timeData.counter.sport = (lastcountedDate.getTime()-Date.parse(this.date).getTime());
//             break;
//         case "commute":
//             timeData.counter.commute = (lastcountedDate.getTime()-Date.parse(this.date).getTime());
//             break;
//         case "study":
//             timeData.counter.study = (lastcountedDate.getTime()-Date.parse(this.date).getTime());
//             break;            
//       } 
//       lastcountedDate = Date.parse(this.date)
//     } else {
//       mitternachtsdate = Date.today ();
//       switch(this.activity) {
//         case 'sleep':
//             timeData.counter.sleep = (lastcountedDate.getTime()-mitternachtsdate.getTime());
//             break;
//         case "work":
//             timeData.counter.work = (lastcountedDate.getTime()-mitternachtsdate.getTime());
//             break;
//         case "free":
//             timeData.counter.free = (lastcountedDate.getTime()-mitternachtsdate.getTime());
//             break;
//         case "sport":
//             timeData.counter.sport = (lastcountedDate.getTime()-mitternachtsdate.getTime());
//             break;
//         case "commute":
//             timeData.counter.commute = (lastcountedDate.getTime()-mitternachtsdate.getTime());
//             break;
//         case "study":
//             timeData.counter.study = (lastcountedDate.getTime()-mitternachtsdate.getTime());
//             break;            
//       }
//       return false;
//     }    
//   });
//   var tagesrestzeit = (24*60*60*1000)-(timeData.counter.sleep+timeData.counter.free+timeData.counter.work+timeData.counter.study+timeData.counter.commute+timeData.counter.sport)
//   console.log(timeData);
// } 
function plotDay() {
  lastcountedDate = new Date();  
  $.each(timeData.eventlist, function () {    
    console.log(Date.parse(this.date));
    if(lastcountedDate.getDate() == Date.parse(this.date).getDate()){
      console.log("passt");
      switch(this.activity) {
        case 'sleep':
            timeData.counter.sleep = (lastcountedDate.getTime()-Date.parse(this.date).getTime());
            break;
        case "work":
            timeData.counter.work = (lastcountedDate.getTime()-Date.parse(this.date).getTime());
            break;
        case "free":
            timeData.counter.free = (lastcountedDate.getTime()-Date.parse(this.date).getTime());
            break;
        case "sport":
            timeData.counter.sport = (lastcountedDate.getTime()-Date.parse(this.date).getTime());
            break;
        case "commute":
            timeData.counter.commute = (lastcountedDate.getTime()-Date.parse(this.date).getTime());
            break;
        case "study":
            timeData.counter.study = (lastcountedDate.getTime()-Date.parse(this.date).getTime());
            break;            
      } 
      lastcountedDate = Date.parse(this.date)
    } else {
      mitternachtsdate = Date.today ();      
      switch(this.activity) {
        case 'sleep':
            timeData.counter.sleep = (lastcountedDate.getTime()-mitternachtsdate.getTime());
            break;
        case "work":
            timeData.counter.work = (lastcountedDate.getTime()-mitternachtsdate.getTime());
            break;
        case "free":
            timeData.counter.free = (lastcountedDate.getTime()-mitternachtsdate.getTime());
            break;
        case "sport":
            timeData.counter.sport = (lastcountedDate.getTime()-mitternachtsdate.getTime());
            break;
        case "commute":
            timeData.counter.commute = (lastcountedDate.getTime()-mitternachtsdate.getTime());
            break;
        case "study":
            timeData.counter.study = (lastcountedDate.getTime()-mitternachtsdate.getTime());
            break;            
      }
      return false;
    }    
  });
  var tagesrestzeit = (24*60*60*1000)-(timeData.counter.sleep+timeData.counter.free+timeData.counter.work+timeData.counter.study+timeData.counter.commute+timeData.counter.sport)
  console.log(timeData);
  var data = {
    labels: [
        "Sleep",
        "Free",
        "Work",
        "Study",
        "Commute",
        "Sport",
        ""
    ],
    datasets: [
        {
            data: [timeData.counter.sleep, timeData.counter.free, timeData.counter.work, timeData.counter.study, timeData.counter.commute, timeData.counter.sport, tagesrestzeit],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "green",
                "gray",
                "orange",
                "rgba(255, 255, 255, 1)"
            ]          
        }]
  };
  var ctx = $("#myChart");
  var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: data    
  });
}


