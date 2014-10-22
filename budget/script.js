$('document').ready(function() {
	authStatus = localStorage.getItem('Blunified');
			
	if (authStatus === 'true') {				
		budget = new Budget(0,[],[],[]);
		loadData(displayData);
	} else {				
		alert("permission denied.");
		return;
	}		
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
function modal() {
	var status = $("#newtrans").css('display');
	if(status === 'none') {	
		$("#newtrans").css('display','block');
	} else {
		$("#newtrans").css('display','none');
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
	$("#itemlist").append('<div class="itemrow"><input class="qty" type="number" placeholder="#" autocomplete="off" required><input class="name" type="text" placeholder="Itemname" required><div class="trash"><img class="deleterow" src="resources/trash.svg" onclick="deleterow('+itemcount+')" /></div><input class="price" type="number" placeholder="0,00" required><div style="clear: both"></div></div><div class="addrow" onclick="addrow()">add row</div>');
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
	var date = $("input#time").attr('class'); 
	if(date == '') {
		console.log('date undefined');
		return;
	}
	var store = $("#transtitle").val();
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
	saveData(displayData);
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
	((''+day).length<2 ? '0' : '');
	var month = time.getMonth()+1;
	((''+month).length<2 ? '0' : '');
	var year = time.getFullYear()
	var timestring = day+"."+month+"."+year+" "+hour+':'+minute+':'+second;
	$("input#time").attr('class',time);
	$("input#time").val(timestring);	
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
function displayData() {	
	//start with data
	var currentDate= new Date();
	//insert current datetime into form
	$('#datelabel').html(displayDate(currentDate));
	reposLabel();
	$('#date').datepicker();
	//clear data(below pls)
	//Maybe a reset with .html() is needed. future will see.
	
	//create a chart
	var expenseArray = [];		
	for(i = 1; i <= currentDate.getDate(); i++) {
		specificDate = new Date(currentDate);		
		specificDate.setDate(i);
		expenseArray.push(DailyExpenses(specificDate));		
	}	
	$('#chart').highcharts({
            chart: {
				backgroundColor: 'rgba(255, 255, 255, 0.1)'
			},
			title: {
                text: '',
                x: 0, //center	
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
            series: [{
				name: 'Amount',
				data: expenseArray,
				pointStart: Date.UTC(currentDate.getFullYear(),currentDate.getMonth(), 1),
				
				pointInterval: 24 * 3600 * 1000 // one day
			}]
    });
	//add blackbar in order to conceal chartbranding -> dumme idee
	//$("#dashboard").append('<div id="blackbar"></div>');
	//insert dashboard-elements
	
	$('#currentstatus').html('<div class="amount">'+budget.getCurrentStatusAmount()+'€</div>Current Status');
	$('#monthlybudget').html('<div class="amount">'+MonthlyBudget()+"€</div>This Month's Budget");
	
	//insert transaction-divs	
		//insert all transactions
		$.each(budget.getTransactions(), function() {		
			currentDate = new Date();
			givenDate = new Date(this.getDate());
			transactionInhalt = $("#transactions").html();
			if(givenDate.getDate()-currentDate.getDate() == 0 ) {			
				if(transactionInhalt.indexOf('<h1 class="head">Today</h1>') > -1){			
					$("#transactions").append('');
					if(this.getType() == 'revenue'){
							$("#transactions").append('<div class="time">'+displayTime(givenDate)+'</div><div class="transaction"><div class="revenue amount">+'+this.getAmountstring()+"€</div>"+this.getName()+'</div><div style="clear: both"></div>');
					} else {
						$("#transactions").append('<div class="time">'+displayTime(givenDate)+'</div><div class="transaction"><div class="expense amount">-'+this.getAmountstring()+"€</div>"+this.getName()+'</div><div style="clear: both"></div>');
					}
				} else {
					$("#transactions").append('<h1 class="head">Today</h1>');
					if(this.getType() == 'revenue'){
						$("#transactions").append('<div class="time">'+displayTime(givenDate)+'</div><div class="transaction"><div class="revenue amount">+'+this.getAmountstring()+"€</div>"+this.getName()+'</div><div style="clear: both"></div>');
					} else {
						$("#transactions").append('<div class="time">'+displayTime(givenDate)+'</div><div class="transaction"><div class="expense amount">-'+this.getAmountstring()+"€</div>"+this.getName()+'</div><div style="clear: both"></div>');
					}
				}
			} else if(Math.abs(givenDate.getDate()-currentDate.getDate()) == 1){
				if(transactionInhalt.indexOf('<h1 class="head">Yesterday</h1>') > -1){
					$("#transactions").append('');
					if(this.getType() == 'revenue'){
						$("#transactions").append('<div class="time">'+displayTime(givenDate)+'</div><div class="transaction"><div class="revenue amount">+'+this.getAmountstring()+"€</div>"+this.getName()+'</div><div style="clear: both"></div>');
					} else {
						$("#transactions").append('<div class="time">'+displayTime(givenDate)+'</div><div class="transaction"><div class="expense amount">-'+this.getAmountstring()+"€</div>"+this.getName()+'</div><div style="clear: both"></div>');
					}
				} else {				
					$("#transactions").append('<h1 class="head">Yesterday</h1>');
					if(this.getType() == 'revenue'){
						$("#transactions").append('<div class="time">'+displayTime(givenDate)+'</div><div class="transaction"><div class="revenue amount">+'+this.getAmountstring()+"€</div>"+this.getName()+'</div><div style="clear: both"></div>');
					} else {
						$("#transactions").append('<div class="time">'+displayTime(givenDate)+'</div><div class="transaction"><div class="expense amount">-'+this.getAmountstring()+"€</div>"+this.getName()+'</div><div style="clear: both"></div>');
					}
				}
			} else {	
				if(transactionInhalt.indexOf('<h1 class="head">'+displayDate(givenDate)+'</h1>') > -1){				
					$("#transactions").append('');
					if(this.getType() == 'revenue'){
						$("#transactions").append('<div class="time">'+displayTime(givenDate)+'</div><div class="transaction"><div class="revenue amount">+'+this.getAmountstring()+"€</div>"+this.getName()+'</div><div style="clear: both"></div>');
					} else {
						$("#transactions").append('<div class="time">'+displayTime(givenDate)+'</div><div class="transaction"><div class="expense amount">-'+this.getAmountstring()+"€</div>"+this.getName()+'</div><div style="clear: both"></div>');
					}
				} else {				
					$("#transactions").append('<h1 class="head">'+displayDate(givenDate)+'</h1>');
					if(this.getType() == 'revenue'){
						$("#transactions").append('<div class="time">'+displayTime(givenDate)+'</div><div class="transaction"><div class="revenue amount">+'+this.getAmountstring()+"€</div>"+this.getName()+'</div><div style="clear: both"></div>');
					} else {
						$("#transactions").append('<div class="time">'+displayTime(givenDate)+'</div><div class="transaction"><div class="expense amount">-'+this.getAmountstring()+"€</div>"+this.getName()+'</div><div style="clear: both"></div>');
					}
				}
			}
			
		});			
	//insert all Recurring Transactions
	var transactionArray = budget.getRecurringTransactions();
	var length = transactionArray.length;
	for(var i = 0; i < length; i++) {	
		for( var j = 0; j < length; j++) {
			//console.log('i='+i+',j='+j);			
			if(transactionArray[i].getDate() < transactionArray[j].getDate()) {
				//console.log('Laufvariablen: i='+i+',j='+j+' .tausche: '+transactionArray[i].getDate()+' gegen '+transactionArray[j].getDate());
				var tausch = transactionArray[i];
				transactionArray[i]=transactionArray[j];
				transactionArray[j]=tausch;
			} else {
				//console.log('Laufvariablen: i='+i+',j='+j+' .tausche nicht: '+transactionArray[i].getDate()+' gegen '+transactionArray[j].getDate());
			}
		}
	}
	$.each(transactionArray, function() {	
		givenDate = new Date(this.getDate());
		rTransactionInhalt = $("#rTransactions").html();		
		if(this.getType() == 'revenue'){
			$("#rTransactions").append('<div class="datemonth">'+displayDateInMonth(givenDate)+'</div><div class="transaction"><div class="revenue amount">+'+this.getAmountstring()+'€</div>'+this.getName()+'</div><div style="clear: both"></div>');
		} else {
			$("#rTransactions").append('<div class="datemonth">'+displayDateInMonth(givenDate)+'</div><div class="transaction"><div class="expense amount">-'+this.getAmountstring()+'€</div>'+this.getName()+'</div><div style="clear: both"></div>');
		}		
	});	
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
	$.each(budget.getTransactions(), function() {		
		givenDate = new Date(this.getDate());
		
		var isSameDay = (givenDate.getDate() == aDate.getDate() 
        && givenDate.getMonth() == aDate.getMonth()
        && givenDate.getFullYear() == aDate.getFullYear());
		
		if(isSameDay) {			
			if(this.getName() === 'Wallet' || this.getName() === 'wallet') {				
			} else {
				//console.log(this.getName());
				if(this.getType() == 'expense'){
					sum += this.getAmount();					
				}
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