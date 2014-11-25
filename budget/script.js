$('document').ready(function() {
	authStatus = localStorage.getItem('Blunified');
			
	if (authStatus !== 'true') {				
		alert("permission denied.");
		return;
	}
	//Global variables
	monthStrings = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
	itemcount = 1;
	transactionDay = "";
	type = "spend";
	deposit = "Wallet";
	//budget initialisation
	budget = new Budget([],[],[]);
	loadData(displayData);		
	//Plugin Config
	$("#my-menu").mmenu({
        // options		
		footer: {
            add: true,
            content: "(c) 2014"
        },
		"header": {
            "title": '<img id="Menulogo" src="/apps/budget/resources/budget.svg"/>',
            "add": true,
            "update": true
        },
		dragOpen: {
            open: true
        }
    }, {
        // configuration
		
    });	
	//keyBindings	
	$("div.itemrow:nth-child("+itemcount+") input.qty").bind('keydown', 'space', function() {
		$("div.itemrow:nth-child("+itemcount+") input.name").focus();
		return false;
	});
	$("div.itemrow:nth-child("+itemcount+") input.price").bind('keydown', 'tab', function() {
		addrow();
		return false;
	});
	$("#itemlist").keyup(function() {
		count();
	});	
});
function Item(qty,name,price){
	this.qty = qty;
	this.name = name;
	this.price = price;
}
function messen() {
	$("#messwert").remove();
	$("body").prepend("<div id='messwert'>height: "+window.innerHeight+"px width: "+window.innerWidth+"px</div>");
}
function modal(mode,id) {
	switch (mode) {
    case 'close':	
		$("#modal").css('display','none');
        $("#overlay").css('display','none');
		$("#trans").css('display','none');	
		$('#trans #transtitle').val('');
		$('#itemlist').html('<div class="itemrow"><input type="number" required="" autocomplete="off" placeholder="#" class="qty"><input type="text" required="" autocomplete="off" placeholder="Itemname" class="name"><div class="trash">&nbsp;</div><input type="text" required="" autocomplete="off" placeholder="0,00" class="price"><div style="clear: both"></div></div><div class="addrow" onclick="addrow()">add row</div>');
		itemcount = 1;
		break;
    case 'newtrans':					
		buttonsString = '<div id="cancel" onclick="modal(&quot;close&quot;)" class="buttonsbutton">Cancel</div><div id="receive" onclick="send(&quot;receive&quot;)" class="buttonsbutton">Receive</div><div id="spend" onclick="send(&quot;spend&quot;)" class="buttonsbutton">Spend</div>';			
		$('#buttons').html(buttonsString);	
		$("#overlay").css('display','block');
		$("#trans").css('display','block');
		$("#modal").css('display','block');		
        break;
    case 'oldtrans':		
		/* <div id="delete" onclick="delete()" class="buttonsbutton">Delete</div>	*/		
		buttonsString = '<div id="cancel" onclick="modal(&quot;close&quot;)" class="buttonsbutton">Cancel</div><div id="delete" onclick=" deleteTransaction('+id+')" class="buttonsbutton">Delete</div><div id="update" onclick="update('+id+')" class="buttonsbutton">Update</div>';				
		$('#buttons').html(buttonsString);			
		var transactionList = budget.getTransactions();
		var title = transactionList[id].getName();		
		$('#trans #transtitle').val(title);
		
		var date = transactionList[id].getDate();
		inTime(date);
		
		var itemlist = transactionList[id].getItemlist();		
		var listLength = itemlist.length;		
		for(i = 1; i<listLength; i++) {			
			addrow();
		}
		for(i = 0; i<listLength; i++) {
		
			var qty = itemlist[i].quantity;			
			$('.itemrow:eq('+i+') > .qty').val(qty);
			
			var name = itemlist[i].name;
			$('.itemrow:eq('+i+') > .name').val(name);
			
			var number = itemlist[i].number;			
			if(String(number).indexOf(".") >= 0) {
				number = String(number).replace(".", ",");	
				if(number.length < 4) {
					number = number+'0';
				}	
			} else {
				number = number+',00';
			}
			$('.itemrow:eq('+i+') > .price').val(number);
		}
		count();		
		$("#overlay").css('display','block');
        $("#trans").css('display','block');
		$("#modal").css('display','block');		
        break;   
    default:
       return;
}	
}
function count() {
	var sum = 0;
	var number;
	var quantity;
	for(i=0;i<itemcount;i++){
		number = $(".price").eq(i).val();
		quantity = $(".qty").eq(i).val();
		
		number = number.replace(",", ".");	
		number = parseFloat(number);		
		number = number.toFixed(2);
		number = parseFloat(number);		
		if(!$.isNumeric(number)){		
			continue;
		}
		quantity = parseFloat(quantity);
		if(!$.isNumeric(quantity)){		
			quantity = 1;
		}
		sum += number*quantity;
	}	
	displaySum = sum;
	displaySum = displaySum.toFixed(2);	
	displaySum = displaySum.replace(".",",");	
	$("#right").text(displaySum);
}
function addrow() {
	console.log("added");
	console.log(itemcount);	
	$("div.itemrow:nth-child("+itemcount+") input.price").unbind('keydown');	
	itemcount++;
	$(".addrow").remove();
	$("#itemlist").append('<div class="itemrow"><input class="qty" type="number" placeholder="#" autocomplete="off" required><input class="name" type="text" placeholder="Itemname" required><div class="trash"><img class="deleterow" src="resources/trash.svg" onclick="deleterow('+itemcount+')" /></div><input class="price" type="text" placeholder="0,00" required><div style="clear: both"></div></div><div class="addrow" onclick="addrow()">add row</div>');
	$("div.itemrow:nth-child("+itemcount+") input.price").bind('keydown', 'tab', function() {
		addrow();
		return false;
	});
	$("div.itemrow:nth-child("+itemcount+") input.qty").bind('keydown', 'space', function() {
		$("div.itemrow:nth-child("+itemcount+") input.name").focus();
		return false;
	});
	$("div.itemrow:nth-child("+itemcount+") input.qty").focus()
	console.log("newbound");
}
function deleterow(number) {
	console.log("remove "+number+". item");
	$(".itemrow").eq(number-1).remove();
	var counter = 2;
	$("img.deleterow").each(function( index ) {
		$(this).attr("onclick","deleterow("+counter+")");
		counter++;
	});
	itemcount--;
	$("div.itemrow:nth-child("+itemcount+") input.price").bind('keydown', 'tab', function() {
		addrow();
		return false;
	});
	count();
}
function send(type) {
	var dateString = $("input.time").val();
	var date = validateDateString(dateString);
	if(!date){
		console.log('returning');
		console.log(date);
		return
	}		
	var store = $("#transtitle").val();
	store = firstLetterUp(store);
	if(store == '') {
		console.log('store undefined');
		return;
	}
	var sum = $("#right").text();
	sum = sum.replace(",", ".");
	sum = parseFloat(sum);		
	if(!$.isNumeric(sum)){		
		console.log("variable sum is not a number");
		return;
	}
	if(sum == '') {
		console.log('sum undefined');
		return;
	}	
	var itemlist = [];
	for(i=0;i<itemcount;i++){
		number = $(".price").eq(i).val();
		quantity = $(".qty").eq(i).val();
		name = $(".name").eq(i).val();
		
		number = number.replace(",", ".");	
		number = parseFloat(number);		
		number = number.toFixed(2);
		number = parseFloat(number);		
		if(!$.isNumeric(number)){		
			continue;
		}
		quantity = parseFloat(quantity);
		if(!$.isNumeric(quantity)){		
			quantity = 1;
		}
		itemlist[i]= new Item(quantity,name,number);
	}
	console.log(type+" "+sum+"€ at "+store+" for "+itemlist+" die länge der Liste ist "+itemlist.length);
	//insert deposit functio here...
	budget.addTransaction(store,type,"Wallet",sum,itemlist,date);
	console.log('repositioning');
	repositionTransactions();
	modal('close');
	saveData(displayData);
}
function update(id){
	var dateString = $("input.time").val();
	var date = validateDateString(dateString);
	if(!date){
		console.log('returning');
		console.log(date);
		return
	}	
	var store = $("#transtitle").val();
	store = firstLetterUp(store);
	if(store == '') {
		console.log('store undefined');
		return;
	}
	var sum = $("#right").text();
	sum = sum.replace(",", ".");
	sum = parseFloat(sum);		
	if(!$.isNumeric(sum)){		
		console.log("variable sum is not a number");
		return;
	}
	if(sum == '') {
		console.log('sum undefined');
		return;
	}	
	var itemlist = [];
	for(i=0;i<itemcount;i++){
		number = $(".price").eq(i).val();
		quantity = $(".qty").eq(i).val();
		name = $(".name").eq(i).val();
		
		number = number.replace(",", ".");	
		number = parseFloat(number);		
		number = number.toFixed(2);
		number = parseFloat(number);		
		if(!$.isNumeric(number)){		
			continue;
		}
		quantity = parseFloat(quantity);
		if(!$.isNumeric(quantity)){		
			quantity = 1;
		}
		itemlist[i]= new Item(quantity,name,number);
	}
	budget.editTransaction(id,store,sum,itemlist,date);
	modal('close');
	saveData(displayData);
}
function deleteTransaction(id) {
	if ( confirm("Are you sure you want to delete this Transaction?") ) {
		var transactionList = budget.getTransactions();
		console.log(transactionList);
		transactionList.splice(id, 1);
		console.log(transactionList);
		budget.transactions = transactionList;
		modal('close');
		saveData(displayData);
	}	
}
function inTime(time){	
	console.log(time);	
	var hour = time.getHours();
	if(hour < 10) {
		hour = '0'+hour;
	}
	var minute = time.getMinutes();
		if(minute < 10) {
		minute = '0'+minute;
	}
	var second = time.getSeconds();
		if(second < 10) {
		second = '0'+second;
	}
	var day = time.getDate();	
	if((''+day).length<2){
		day = '0'+day;
	}	
	var month = time.getMonth()+1;
	if((''+month).length<2){
		month = '0'+month;
	}	
	var year = time.getFullYear()
	var timestring = day+"."+month+"."+year+" "+hour+':'+minute+':'+second;
	$("input.time").val(timestring);
	$("input.time").attr('class','time '+time);
}
function validateDateString(dateString) {	
	var split1 =  dateString.split(".");
	var day = parseInt(split1[0]);
	var month = parseInt(split1[1]);
	month = month-1;
	var split2 = split1[2].split(" ");
	var year = parseInt(split2[0]);
	var split3 = split2[1].split(':');
	var hour = parseInt(split3[0]);
	var minute = parseInt(split3[1]);
	var second = parseInt(split3[2]);	
	if(Date.validateDay(day, year, month) && Date.validateHour(hour) && Date.validateMinute(minute) && Date.validateMonth(month) && Date.validateSecond(second) && Date.validateYear(year)){
		var date = Date.parseExact(dateString, "dd.MM.yyyy HH:mm:ss");		
	}
	return date;
}
////////////////////////////////////////////////////
//Old functionality Stuff
///////////////////////////////////////////////////
function displayDate(d) {
	var d_names = new Array("Sunday", "Monday", "Tuesday",
	"Wednesday", "Thursday", "Friday", "Saturday");

	var m_names = new Array("January", "February", "March", 
	"April", "May", "June", "July", "August", "September", 
	"October", "November", "December");
			
	var curr_day = d.getDay();
	var curr_date = d.getDate();	
	var curr_month = d.getMonth();
	var curr_year = d.getFullYear();
	
	if(curr_date.toString().length<2) {		
		curr_date = '0'+ curr_date;
	};
	
	return('<div class="number">'+curr_date+ '</div><div class="rest"><span>' +d_names[curr_day]  +'</span><span>'+ m_names[curr_month] + " " + curr_year+'</span><div style="clear: both"></div></div><div style="clear: both"></div>');
}
function displayDate2(d) {
	var d_names = new Array("Sunday", "Monday", "Tuesday",
	"Wednesday", "Thursday", "Friday", "Saturday");

	var m_names = new Array("January", "February", "March", 
	"April", "May", "June", "July", "August", "September", 
	"October", "November", "December");
			
	var curr_day = d.getDay();
	var curr_date = d.getDate();
	var sup = "";
	if (curr_date == 1 || curr_date == 21 || curr_date ==31)
	   {
		sup = "st";
		}
	else if (curr_date == 2 || curr_date == 22)
		{
		sup = "nd";
	    }
	else if (curr_date == 3 || curr_date == 23)
		{
		sup = "rd";
		}
	else
		{
		sup = "th";
		}
	var curr_month = d.getMonth();
	var curr_year = d.getFullYear();

	return(/*d_names[curr_day] + " " */+ curr_date + "<sup>"
	+ sup + "</sup> " + m_names[curr_month] + " " + curr_year);
}
function displayDate3(d) {
	var d_names = new Array("Sunday", "Monday", "Tuesday",
	"Wednesday", "Thursday", "Friday", "Saturday");
	var curr_day = d.getDay();
	var curr_date = d.getDate();
	var sup = "";
	if (curr_date == 1 || curr_date == 21 || curr_date ==31)
	   {
		sup = "st";
		}
	else if (curr_date == 2 || curr_date == 22)
		{
		sup = "nd";
	    }
	else if (curr_date == 3 || curr_date == 23)
		{
		sup = "rd";
		}
	else
		{
		sup = "th";
		}
	return(d_names[curr_day]+' the '+curr_date+ "<sup>"
	+ sup + "</sup> ");
}
function displayTime(d) {
	var hour = d.getHours();
	if(hour < 10) {
		hour = '0'+hour;
	}
	var minute = d.getMinutes();
		if(minute < 10) {
		minute = '0'+minute;
	}
	var second = d.getSeconds();
		if(second < 10) {
		second = '0'+second;
	}
	
	var resultstring = hour+':'+minute+':'+second;
	return resultstring;
}
function displayRealTimeClock(id) {
        date = new Date;
        year = date.getFullYear();
        month = date.getMonth();
		d = date.getDate();
        day = date.getDay();
         h = date.getHours();
        if(h<10)
        {
                h = "0"+h;
        }
        m = date.getMinutes();
        if(m<10)
        {
                m = "0"+m;
        }
        s = date.getSeconds();
        if(s<10)
        {
                s = "0"+s;
        }
        result = monthStrings[month]+' '+d+' '+year+' '+h+':'+m+':'+s;
        $('#'+id).html(result);
        setTimeout('displayRealTimeClock("'+id+'");','1000');
       
}
function displayDateInMonth(d) {	
	var curr_date = d.getDate();
	var sup = "";
	if (curr_date == 1 || curr_date == 21 || curr_date ==31)
	   {
		sup = "st";
		}
	else if (curr_date == 2 || curr_date == 22)
		{
		sup = "nd";
	    }
	else if (curr_date == 3 || curr_date == 23)
		{
		sup = "rd";
		}
	else
		{
		sup = "th";
		}	

	return(curr_date + "<sup>"
	+ sup + "</sup> ");
}
function refreshChart(change,increment) {	
	//function works only in leaps of one!
	var currentDate= new Date();
	//change option
	if( change == 1 && status == 'Expenses') {	
			
			status = 'Revenues';
			type = 'receive';			
	} else if(change == 1 && status == 'Revenues'){
			console.log('ToSpend');
			status = 'Expenses';
			type = 'spend';			
	}	
	//console.log('status is: '+status+'increment is: '+increment);	
	//increment option
	if(increment == 1 || increment == -1) {
			if(year ==  currentDate.getFullYear() && month == currentDate.getMonth() && increment == 1){
				return;
			}
			//console.log('type is: '+type+' status is: '+status);
			month = month+increment;				
			if(month == -1) {
				year = year-1;
				month = 11;				
			} else if(month == 12) {
				year = year+1;
				month = 0;				
			}		
			
			specificDate = new Date();	
			specificDate.setFullYear(year);
			specificDate.setMonth(month);
			console.log(specificDate);			
			if(month == currentDate.getMonth()) {
				days = currentDate.getDate();
			} else {
				days = Date.getDaysInMonth(year, month);
			}		
			var expenseArray = [];
			for(i = 1; i <= days; i++) {				
				specificDate.setDate(i);				
				expenseArray.push(DailySum(type,specificDate));	
			}
		} else if(increment == 0) {	
			// Works like a reset --> displays current Month
			status = 'Expenses';
			type = 'spend';
			month = currentDate.getMonth();	
			year = currentDate.getFullYear();	
			var expenseArray = [];		
			for(i = 1; i <= currentDate.getDate(); i++) {
				specificDate = new Date(currentDate);		
				specificDate.setDate(i);				
				expenseArray.push(DailySum(type,specificDate));	
				
			}			
		} else {
			// Works like a trigger changing display state --> see spanString
			specificDate = new Date();	
			specificDate.setFullYear(year);
			specificDate.setMonth(month);
			console.log(specificDate);
			if(month == currentDate.getMonth()) {
				days = currentDate.getDate();
			} else {
				days = Date.getDaysInMonth(year, month);
			}
			var expenseArray = [];
			for(i = 1; i <= days; i++) {				
				specificDate.setDate(i);				
				expenseArray.push(DailySum(type,specificDate));	
			}
		}
		//
		spanString = '<span id="display" onclick="refreshChart(1)">';
		monthback = '<img id="monthback" onclick="refreshChart(0,-1)" src="/apps/budget/resources/triangle.svg">';
		if(month == currentDate.getMonth()) {
			monthforward = '';
		} else {
			monthforward = '<img id="monthforward" onclick="refreshChart(0,+1)" src="/apps/budget/resources/triangle.svg">';
		}
		
		$('#chart').highcharts({
            chart: {
				backgroundColor: 'rgba(255, 255, 255, 0.1)',
				events: {
					click: function (event) {
						if(transactionDay !== "") {
							showTransactions();
							transactionDay = "";
						}
					}
				}
			},
			title: {
                text: '<div id="month">'+monthback+monthStrings[month]+' '+year+monthforward+'</div>'+spanString+status+'</span>',
				align: 'left',				
                x: 0, //centering	
				useHTML: true,
				enabled: false
            },
            subtitle: {
                text: '',
                x: 0,
				enabled: false
            },
            xAxis: {                            
                tickColor: '#FFF',
				gridLineColor: '#FFF',
				lineColor: 'rgba(255, 255, 255, 0.1)',
				type: 'datetime',
				dateTimeLabelFormats: {
					day: '%e of %b'
				},
				labels: {
					enabled: false
				}				
            },
            yAxis: {
                title: {
                    text: ''
                },
                gridLineColor: 'rgba(255, 255, 255, 0.1)',
                tickColor: 'rgba(255, 255, 255, 0.1)',
				lineColor: 'rgba(255, 255, 255, 0.1)',
				labels: {
					enabled: false
				}
            },			
			plotOptions: {
				series: {
					color: '#000',
					shadow: false,
					events: {
						click: function (event) {													
							var currentDate = new Date(event.point.x);							
							var type = event.point.series.name;
							showTransactions(currentDate,type);							
							transactionDay = currentDate;							 						
						}
					},
					point: {
						events: {
							mouseOver : function(event) {  								
								var currentDate = new Date(event.target.x);							
								var type = event.target.series.name;
								showTransactions(currentDate,type);							
							},
							mouseOut : function(event) {
								if(transactionDay == "") {
									showTransactions();									
								}
							}
						}
					}
				}
			},
            tooltip: {
                valueDecimals: 2,
				valueSuffix: '€',
				formatter: function () {				
					var currentDate = new Date(this.x);					
					return '<span style="font-size: 12px;">'+displayDate2(currentDate)+'</span><br>Amount: <span style="font-size: 14px; font-weight: bold">'+this.y.toFixed(2)+'€</span>';
				}
            },
            legend: {
                enabled: false
            },
			credits: {
				enabled: false
			},
            series: [{				
				name: type,
				data: expenseArray,
				pointStart: Date.UTC(currentDate.getFullYear(),month, 1),				
				pointInterval: 24 * 3600 * 1000 // one day
			}]
	});
}
function showTransactions(d,type) {	
	if(d) {
		//insert datespecific Transactions
		$("#transactions").empty();
		$("#transactions").append('<h1>'+displayDate3(d)+'</h1>');
		//switch variable for modal
		var i = 0;				
		$.each(budget.getTransactions(), function() {		
			currentDate = new Date();
			givenDate = new Date(this.getDate());			
			transactionInhalt = $("#transactions").html();
			if(Date.compare(d.clearTime(), givenDate.clearTime()) == 0){
				if(this.getType() == type) {
					$("#transactions").append('<li class="daily" onclick="modal(&#34;oldtrans&#34;,'+i+')"></li>');
					console.log('passt');
					if(this.getType() == 'receive'){
						$("#transactions li").last().append('<div class="amount"><img class="revenue svg" src="/apps/budget/resources/triangle.svg"><span>'+this.getAmountstring()+'€</span><div style="clear: both"></div></div><div class="store">'+this.getName()+'</div><div style="clear: both"></div></li>');
					} else {
						$("#transactions li").last().append('<div class="amount"><img class="expense svg" src="/apps/budget/resources/triangle.svg"><span>'+this.getAmountstring()+'€</span><div style="clear: both"></div></div><div class="store">'+this.getName()+'</div><div style="clear: both"></div></li>');
					}
				}
			}
			i++;
		});		
		if($('#transactions').children().length < 2){
			$("#transactions").append('<span style="opacity: 0.25; font-style: italic; font-size: 16px; margin: 0 0 0 27px;">No Transactions to display...</span>');
		}
		replaceSVG();
	} else {		
		//insert all Transactions		
		//console.log('all shown');
		$("#transactions").empty();
		$("#transactions").append('<img class="peak" src="/apps/budget/resources/triangle.svg"/><b></b><h1>All Transactions</h1>');
		var i = 0;
		$.each(budget.getTransactions(), function() {		
			currentDate = new Date();
			givenDate = new Date(this.getDate());			
			transactionInhalt = $("#transactions").html();
			$("#transactions").append('<li onclick="modal(&#34;oldtrans&#34;,'+i+')"></li>');
			if(givenDate.getDate()-currentDate.getDate() == 0 && givenDate.getMonth()-currentDate.getMonth() == 0 && givenDate.getFullYear()-currentDate.getFullYear() == 0 ) {			
				if(transactionInhalt.indexOf('<div id="today" class="date">Today</div>') > -1){			
					// console.log("Displaying date of today not necessary"+this.getName());
					$("#transactions li").last().append('<div class="date"><div class="borderdiv">&nbsp;</div></div>');
					if(this.getType() == 'receive'){
							$("#transactions li").last().append('<div class="amount"><img class="revenue svg" src="/apps/budget/resources/triangle.svg"><span>'+this.getAmountstring()+'€</span><div style="clear: both"></div></div><div class="store">'+this.getName()+'</div><div style="clear: both"></div></li>');
					} else {
						$("#transactions li").last().append('<div class="amount"><img class="expense svg" src="/apps/budget/resources/triangle.svg"><span>'+this.getAmountstring()+'€</span><div style="clear: both"></div></div><div class="store">'+this.getName()+'</div><div style="clear: both"></div></li>');
					}
				} else {
					$("#transactions li").last().append('<div id="today" class="date">Today</div>');
					if(this.getType() == 'receive'){
						$("#transactions li").last().append('<div class="amount"><img class="revenue svg" src="/apps/budget/resources/triangle.svg"><span>'+this.getAmountstring()+'€</span><div style="clear: both"></div></div><div class="store">'+this.getName()+'</div><div style="clear: both"></div></li>');
					} else {
						$("#transactions li").last().append('<div class="amount"><img class="expense svg" src="/apps/budget/resources/triangle.svg"><span>'+this.getAmountstring()+'€</span><div style="clear: both"></div></div><div class="store">'+this.getName()+'</div><div style="clear: both"></div></li>');
					}
				}
			} else {	
				if(transactionInhalt.indexOf('<div class="date">'+displayDate(givenDate)+'</div>') > -1){				
					// console.log(" displaying date not necessary");
					$("#transactions li").last().append('<div class="date"><div class="borderdiv">&nbsp;</div></div>');
					if(this.getType() == 'receive'){
						$("#transactions li").last().append('<div class="amount"><img class="revenue svg" src="/apps/budget/resources/triangle.svg"><span>'+this.getAmountstring()+'€</span><div style="clear: both"></div></div><div class="store">'+this.getName()+'</div><div style="clear: both"></div></li>');
					} else {
						$("#transactions li").last().append('<div class="amount"><img class="expense svg" src="/apps/budget/resources/triangle.svg"><span>'+this.getAmountstring()+'€</span><div style="clear: both"></div></div><div class="store">'+this.getName()+'</div><div style="clear: both"></div></li>');
					}
				} else {				
					$("#transactions li").last().append('<div class="date">'+displayDate(givenDate)+'</div>');
					if(this.getType() == 'receive'){
						$("#transactions li").last().append('<div class="amount"><img class="revenue svg" src="/apps/budget/resources/triangle.svg"><span>'+this.getAmountstring()+'€</span><div style="clear: both"></div></div><div class="store">'+this.getName()+'</div><div style="clear: both"></div></li>');
					} else {
						$("#transactions li").last().append('<div class="amount"><img class="expense svg" src="/apps/budget/resources/triangle.svg"><span>'+this.getAmountstring()+'€</span><div style="clear: both"></div></div><div class="store">'+this.getName()+'</div><div style="clear: both"></div></li>');
					}
				}
			}
			i++;
		});	
		var firstLiInhalt = $("#transactions li").first().html();
		if (firstLiInhalt.indexOf('<div id="today" class="date">') <= -1){
			//console.log('today existiert nicht');
			$("#transactions li").first().before('<li><div id="today" class="date">Today</div><div style="clear: both"></div></li>');
			$("#transactions li").first().css('cursor','auto');
			$("#transactions li").first().hover(function() {
				$("#transactions li").first().css('background','white');
			},function() {
				$("#transactions li").first().css('background','white');
			});
		}	
		replaceSVG();
	}
}
function displayData() {		
	//start with data
	var currentDate= new Date();
	
	//
	//Try to adapt datepicker again!
	//
	//$('#date').datepicker();	
	//clear data(below pls)
	//Maybe a reset with .html() is needed. future will see.
	$('#main').html('<div class="row clearfix"><div id="menu" class="column"><img id="menuimage" class="svg" onclick="$(&quot;#my-menu&quot;).trigger(&quot;open.mm&quot;);" src="resources/menu.svg" /></div><div id="addpaym" class="column"><img id="addimage" class="svg" onclick="modal(&#34;newtrans&#34;),inTime(new Date())" src="resources/add.svg"/></div><div id="currentAmount" class="column"><select id="deposits" name="deposits"></select></div></div><div class="row clearfix"><div class="column full"><div id="chart" class="bordercontainer"></div></div></div><div class="row clearfix"><div class="column third"><ul id="transactions" class="bordercontainer"></ul></div></div></div>');
	$.each(budget.getDeposits(), function() {			
		console.log(this.getName());
		$('#deposits').append('<option value="'+this.getName()+'">'+this.getName()+'</option>');		
	});	
	$('#currentAmount').append(currentAmount()+'€');
	//create a chart	
	refreshChart('Expenses',0);
	//add blackbar in order to conceal chartbranding -> dumme idee
	//$("#dashboard").append('<div id="blackbar"></div>');
	//insert dashboard-elements
	showTransactions();	
	//$('#monthlybudget').html('<div class="amount">'+MonthlyBudget()+"€</div>This Month's Budget");
	
			
		
	//insert all Recurring Transactions
	// var transactionArray = budget.getRecurringTransactions();
	// var length = transactionArray.length;
	// for(var i = 0; i < length; i++) {	
		// for( var j = 0; j < length; j++) {
			//console.log('i='+i+',j='+j);			
			// if(transactionArray[i].getDate() < transactionArray[j].getDate()) {
				//console.log('Laufvariablen: i='+i+',j='+j+' .tausche: '+transactionArray[i].getDate()+' gegen '+transactionArray[j].getDate());
				// var tausch = transactionArray[i];
				// transactionArray[i]=transactionArray[j];
				// transactionArray[j]=tausch;
			// } else {
				//console.log('Laufvariablen: i='+i+',j='+j+' .tausche nicht: '+transactionArray[i].getDate()+' gegen '+transactionArray[j].getDate());
			// }
		// }
	// }
	// $.each(transactionArray, function() {	
		// givenDate = new Date(this.getDate());
		// rTransactionInhalt = $("#rTransactions").html();		
		// if(this.getType() == 'revenue'){
			// $("#rTransactions").append('<div class="datemonth">'+displayDateInMonth(givenDate)+'</div><div class="transaction"><div class="revenue amount">+'+this.getAmountstring()+'€</div>'+this.getName()+'</div><div style="clear: both"></div>');
		// } else {
			// $("#rTransactions").append('<div class="datemonth">'+displayDateInMonth(givenDate)+'</div><div class="transaction"><div class="expense amount">-'+this.getAmountstring()+'€</div>'+this.getName()+'</div><div style="clear: both"></div>');
		// }		
	// });	
	//console.log('eingetragen');
	
	// Hotkeys
	$(document).bind('keydown', 'ctrl+n', function() {	  
	    inTime(new Date());
		modal('newtrans');
		return false;
	});	
	$(document).bind('keydown', 'left', function() {
		refreshChart(0,-1);
		showTransactions();
		return false;
	});
	$(document).bind('keydown', 'right', function() {
		refreshChart(0,1);
		showTransactions();
		return false;
	});
	$(document).bind('keydown', 'up', function() {
		refreshChart(1);
		if(transactionDay !== "") {
			showTransactions(transactionDay,type);		
		}
		return false;
	});
	$(document).bind('keydown', 'down', function() {
		refreshChart(1);
		if(transactionDay !== "") {
			showTransactions(transactionDay,type);		
		}
		return false;
	});
};
function messen() {
	$("#messwert").remove();
	$("body").prepend("<div id='messwert'>height: "+window.innerHeight+"px width: "+window.innerWidth+"px</div>");
}
function MonthlyExpenses(aDate) {
	var sum = 0;
	$.each(budget.getTransactions(), function() {
		givenDate = new Date(this.getDate());
		
		var isSameMonth = (givenDate.getMonth() == aDate.getMonth()
        && givenDate.getFullYear() == aDate.getFullYear());
		
		if(isSameMonth) {			
			if(this.getName() === 'Wallet' || this.getName() === 'wallet') {				
			} else {
				//console.log(this.getName());
				if(this.getType() == 'expense'){
					sum += this.getAmount();
				}
			}
		}
	});
	return sum;
}
function DailySum(type, aDate) {	
	var sum = 0;
	//console.log(aDate.getDate()+" "+aDate.getMonth()+" "+aDate.getFullYear());
	$.each(budget.getTransactions(), function() {		
		givenDate = new Date(this.getDate());
		//console.log(givenDate.getDate()+" "+givenDate.getMonth()+" "+givenDate.getFullYear());
		var isSameDay = (givenDate.getDate() == aDate.getDate() 
        && givenDate.getMonth() == aDate.getMonth()
        && givenDate.getFullYear() == aDate.getFullYear());
		
		if(isSameDay) {			
			//console.log("match");			
			if(this.getType() == type){				
				sum += this.getAmount();					
			} 	
		}
	});	
	if(sum !== 0) {
		sum = sum.toFixed(2);
		sum = parseFloat(sum);
	}	
	return sum;
}
function MonthlyRevenues(aDate) {
	var sum = 0;
	$.each(budget.getTransactions(), function() {
		givenDate = new Date(this.getDate());
		
		var isSameMonth = (givenDate.getMonth() == aDate.getMonth()
        && givenDate.getFullYear() == aDate.getFullYear());
		
		if(isSameMonth) {			
			if(this.getName() === 'Wallet' || this.getName() === 'wallet') {				
			} else {
				//console.log(this.getName());
				if(this.getType() == 'revenue'){
					sum += this.getAmount();
				}
			}
		}
	});
	return sum;
}
function DailyRevenues(aDate) {	
	var sum = 0;	
	$.each(budget.getTransactions(), function() {		
		givenDate = new Date(this.getDate());
		
		var isSameDay = (givenDate.getDate() == aDate.getDate() 
        && givenDate.getMonth() == aDate.getMonth()
        && givenDate.getFullYear() == aDate.getFullYear());
		
		if(isSameDay) {			
			//console.log(this.getName());
			if(this.getType() == 'revenue'){
				sum += this.getAmount();
			}			
		}
	});	
	return sum;
}
function MonthlyBudget() {
	var sum = 0;
	$.each(budget.getRecurringTransactions(), function() {		
		if(this.getType() == 'revenue'){
			sum += this.getAmount();
		} else {
			sum -= this.getAmount();
		}
	});
	//console.log(sum)
	//console.log(MonthlyExpenses(new Date()));
	//console.log(MonthlyRevenues(new Date()));
	sum = sum-MonthlyExpenses(new Date())+MonthlyRevenues(new Date());	
	sum = (Math.round(sum * 100)/100).toFixed(2);
	//console.log(sum);
	//console.log($.type(sum));
	return sum;
}
function currentAmount() {		
	start = parseFloat(budget.getCurrentStartAmount(deposit));	
	$.each(budget.getTransactions(), function() {	
		if(this.getDeposit() == deposit) {	
			var amount = this.getAmount();			
			if(this.getType() == "spend") {			
				start -= amount;
			} else if(this.getType() == "receive") {			
				start += amount;			
			}		
			start = start.toFixed(2);
			start = parseFloat(start);
		}
	});	
	return start;
}
function reposLabel() {
	var newLabelWidth = $('#datelabel').width();	
	$('#date').css('width',newLabelWidth+'px');
	//$('#date').css('left','-'+newLabelWidth+'px');
}
function displayDeposits() {	
	var htmlstring = $('#currentstatus').html(); 
	if (htmlstring.indexOf('<div class="amount">') >= 0) {
		$('#currentstatus').html(' ');					
		$.each(budget.getDeposits(), function() {					
			$('#currentstatus').append('<div class="deposit"><span class="name">'+this.getName()+'</span><span class="amount">'+this.getAmount()+'</span><div style="clear: both"></div></div>');
		});
		
	} else {
		$('#currentstatus').html('<div class="amount">'+budget.getCurrentStatusAmount()+'€</div>Current Status');
	}	
}
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
function firstLetterUp(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function repositionTransactions(){
	var transactionList = budget.getTransactions();	
	var newCandidate = transactionList[0];
	
	function newest(i){
		// console.log(i);
		var newestStelle = i;
		var temp = transactionList[newestStelle];
		for(++i;i<transactionList.length;i++){			
			var currentDate = temp.getDate();
			var nextDate = transactionList[i].getDate();
			if(Date.compare(currentDate,nextDate) == -1) {
				//console.log('found a position');
				newestStelle = i;
				temp = transactionList[newestStelle];
			}
		}
		return newestStelle;
	}	
	function switchPositions(A,B){
		//console.log(A+' switched with '+B);
		var temp = transactionList[A];
		transactionList[A] = transactionList[B];
		transactionList[B] = temp;
	}
	for(var i=0;i<transactionList.length;i++){		
		switchPositions(i,newest(i));
	}
	// console.log(transactionList[newest(0)].getDate());
	// console.log(transactionList[newest(1)].getDate());
	// console.log(transactionList[newest(2)].getDate());
}