///////////////////////////////////////
//Movies Javascript App
///////////////////////////////////////
$('document').ready(function() {
	$( "#search" ).autocomplete({
			source: "autosearch.php",
			minLength: 2		
	});
	
});

///////////////////////////////////////////////////////////
//if IE
///////////////////////////////////////////////////////////
//neuschreiben der document.getElementById nur für den IE
document.getElementById=function(str){
str=new String(str);
var allEls=document.getElementsByTagName("*"),l=allEls.length;
for(var i=0;i<l;i++)if(allEls[i].id==str || allEls[i].getAttribute("id")==str)return allEls[i];
return null;
}
//neuschreiben der document.getElementsByName nur für den IE
document.getElementsByName=function(str){
str=new String(str);
var myMatches=new Array();
var allEls=document.getElementsByTagName("*"),l=allEls.length;
for(var i=0;i<l;i++)if(allEls[i].name==str || allEls[i].getAttribute("name")==str)myMatches[myMatches.length]=allEls[i];
return myMatches;
}

///////////////////////////////////////////////////////////
//layout functions
///////////////////////////////////////////////////////////
function align () {
	newMargin = (window.innerWidth - 150) / 2;
	$('#checkin').css('left', newMargin);	
}