function loadData() {  
  return $.getJSON('data.php')     
}
$.when(loadData()).then(function (phpdata) {
  data = phpdata;
  plotDay(data);
});
function logData(){
  console.log(data);
}
function plotDay(data) {
//   var maday = 24*60;
//Here: try to get the date right in order to begin using and comparing it....
 console.log(Date.parse(data[1].date));
 console.log(Date.parse('November 15, 2015 at 01:16AM'));
 // ....data should be used
}
// function getLastEntry(Y,M,D,data) {
//  $.each(data, function() {
//    if() {
//       $latest = $entry;
//       break;
//     }
//  });
// }
