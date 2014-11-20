$('document').ready(function() {
	authStatus = localStorage.getItem('Blunified');
			
	if (authStatus === 'true') {				
		budget = new Budget(0,[],[]);
		loadData(displayData);
	} else {				
		alert("permission denied.");
		return;
	}
	
	$(document).bind('keydown', 'ctrl+n', function() {
		modal('newtrans');
		return false;
	});
	$(document).bind('keydown', 'left', function() {
		refreshChart(-1);
		return false;
	});
	$(document).bind('keydown', 'right', function() {
		refreshChart(1);
		return false;
	});
	
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
	
	itemcount = 1;
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
	itemcount++;
	$(".addrow").remove();
	$("#itemlist").append('<div class="itemrow"><input class="qty" type="number" placeholder="#" autocomplete="off" required><input class="name" type="text" placeholder="Itemname" required><div class="trash"><img class="deleterow" src="resources/trash.svg" onclick="deleterow('+itemcount+')" /></div><input class="price" type="text" placeholder="0,00" required><div style="clear: both"></div></div><div class="addrow" onclick="addrow()">add row</div>');
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
	count();
}
function send(type) {
	var date = $("input.time").attr('class'); 
	date = date.replace('time ', '');
	console.log(date);
	if(date == '') {
		console.log('date undefined');
		return;
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
	budget.addTransaction(store,type,sum,itemlist,date);
	console.log('repositioning');
	repositionTransactions();
	modal('close');
	saveData(displayData);
}
function update(id){
	var date = $("input.time").attr('class'); 
	date = date.replace('time ', '');
	console.log(date);
	if(date == '') {
		console.log('date undefined');
		return;
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

	return(d_names[curr_day] + " " + curr_date + "<sup>"
	+ sup + "</sup> " + m_names[curr_month] + " " + curr_year);
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
        months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'December');
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
        result = months[month]+' '+d+' '+year+' '+h+':'+m+':'+s;
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
function refreshChart(increment) {
	var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
	var currentDate= new Date();
	//function works only in leaps of one!
	if(increment !== 0) {
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
			days = Date.getDaysInMonth(year, month);			
			var expenseArray = [];
			for(i = 1; i <= days; i++) {				
				specificDate.setDate(i);				
				expenseArray.push(DailyExpenses(specificDate));	
			}
		} else {		
			month = currentDate.getMonth();	
			year = currentDate.getFullYear();	
			var expenseArray = [];		
			for(i = 1; i <= currentDate.getDate(); i++) {
				specificDate = new Date(currentDate);		
				specificDate.setDate(i);
				expenseArray.push(DailyExpenses(specificDate));		
			}			
		}
		$('#chart').highcharts({
            chart: {
				backgroundColor: 'rgba(255, 255, 255, 0.1)'
			},
			title: {
                text: 'Expenses this '+monthback+months[month]+' '+year+monthforward,
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
					shadow: false
				}
			},
            tooltip: {
                valueDecimals: 2,
				valueSuffix: '€'
            },
            legend: {
                enabled: false
            },
			credits: {
				enabled: false
			},
            series: [{
				name: 'Amount',
				data: expenseArray,
				pointStart: Date.UTC(currentDate.getFullYear(),month, 1),
				
				pointInterval: 24 * 3600 * 1000 // one day
			}]
	});
}
function displayData() {		
	//start with data
	var currentDate= new Date();
	//insert current datetime into form
	$('#datelabel').html(displayDate(currentDate));
	reposLabel();
	$('#date').datepicker();
	//clear data(below pls)
	//Maybe a reset with .html() is needed. future will see.
	$('#main').html('<div class="row clearfix"><div id="menu" class="column"><img id="menuimage" class="svg" onclick="$(&quot;#my-menu&quot;).trigger(&quot;open.mm&quot;);" src="resources/menu.svg" /></div><div id="addpaym" class="column"><img id="addimage" class="svg" onclick="modal(&#34;newtrans&#34;),inTime(new Date())" src="resources/add.svg"/></div><div id="currentAmount" class="column"></div></div><div class="row clearfix"><div class="column full"><div id="chart" class="bordercontainer"></div></div></div><div class="row clearfix"><div class="column third"><ul id="transactions" class="bordercontainer"></ul></div></div></div>');
	//create a chart	
	monthback = '<img id="monthback" onclick="refreshChart(-1)" src="/apps/budget/resources/triangle.svg">';
	monthforward = '<img id="monthforward" onclick="refreshChart(+1)" src="/apps/budget/resources/triangle.svg">';
	refreshChart(0);
	//add blackbar in order to conceal chartbranding -> dumme idee
	//$("#dashboard").append('<div id="blackbar"></div>');
	//insert dashboard-elements
	
	$('#currentAmount').html(currentAmount()+'€');
	//$('#monthlybudget').html('<div class="amount">'+MonthlyBudget()+"€</div>This Month's Budget");
	
	//insert transaction-divs	
		//insert all transactions
		$("#transactions").html("");
		$("#transactions").append('<img class="peak" src="/apps/budget/resources/triangle.svg"/><b></b><h1>Latest Transactions</h1>');
		var i = 0;
		$.each(budget.getTransactions(), function() {		
			currentDate = new Date();
			givenDate = new Date(this.getDate());			
			transactionInhalt = $("#transactions").html();
			$("#transactions").append('<li onclick="modal(&#34;oldtrans&#34;,'+i+')"></li>');
			if(givenDate.getDate()-currentDate.getDate() == 0 ) {			
				if(transactionInhalt.indexOf('<div id="today" class="date">Today</div>') > -1){			
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
function DailyExpenses(aDate) {	
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
			if(this.getType() == 'spend'){				
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
	start = parseFloat(budget.getCurrentStartAmount());		
	$.each(budget.getTransactions(), function() {	
		var amount = this.getAmount();				
		if(this.getType() == "spend") {			
			start -= amount;
		} else if(this.getType() == "receive") {			
			start += amount;			
		}		
		start = start.toFixed(2);
		start = parseFloat(start);
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
			// console.log(i);
			var currentDate = temp.getDate();
			var nextDate = transactionList[i].getDate();
			if(Date.compare(currentDate,nextDate) == -1) {
				console.log('found a position');
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