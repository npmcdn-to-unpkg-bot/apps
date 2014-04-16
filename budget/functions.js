function onExpense() {
	$('#revenuelabel').css('display','none');
	$('#expenselabel').css('display','block');	
	//updatePhrase(false,'revenue');
	//$('input[type=number]').css('color', '#9bc67b');
	//$('#type').css('width','20%');
	//$('input[type=number]').css('margin','0 0 0 5%');
	//$('input[type=number]').css('width','40%');
	//console.log($(".checkboxlabel:visible").attr('for'));
	resizePhrase()
}
function onRevenue() {
	$('#expenselabel').css('display','none');
	$('#revenuelabel').css('display','block');
	//updatePhrase(false,'expense');
	//$('input[type=number]').css('color', '#fd645f');	
	//$('#type').css('width','25%');
	//$('input[type=number]').css('margin','0 0 0 5%');
	//$('input[type=number]').css('width','35%');	
	//console.log($(".checkboxlabel:visible").attr('for'));
	resizePhrase()
}
function changeRepeat() {	
	var repeat = $("input#repeat").val();
	if(repeat === 'off') {
		$("input#repeat").val('on');
		$("#repeatlabel").css('opacity',1);
	} else {
		$("input#repeat").val('off');
		$("#repeatlabel").css('opacity',0.1);
	}	
}
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
	//clear div
	$("#content").html("");
	//create a chart
	$("#content").append('<div id="chart"></div>');		
	var expenseArray = [];		
	for(i = 1; i <= currentDate.getDate(); i++) {
		specificDate = new Date(currentDate);		
		specificDate.setDate(i);
		expenseArray.push(DailyExpenses(specificDate));		
	}	
	$('#chart').highcharts({
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
				lineColor: '#FFF',
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
                gridLineColor: '#FFF',
                tickColor: '#FFF',
				lineColor: '#FFF',
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
	$("#content").append('<div id="currentstatus" onclick="displayDeposits()"><div class="amount">'+budget.getCurrentStatusAmount()+'€</div>Current Status</div>');
	$("#content").append('<div id="monthlyexpenses"><div class="amount">'+MonthlyExpenses(new Date())+'€</div>Expenses this Month</div>');
	$("#content").append('<div id="monthlyrevenues"><div class="amount">'+MonthlyRevenues(new Date())+'€</div>Revenues this Month</div>');
	$("#content").append('<div id="monthlybudget"><div class="amount">'+MonthlyBudget()+"€</div>This Month's Budget</div>");
	//clear div
	$("#content").append('<div style="clear: both"></div>');	
	//insert transaction-div
	$("#content").append('<div id="transactions"></div>');	
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
	$("#content").append('<div id="rTransactions"></div>');
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
	//clear div
	$("#content").append('<div style="clear: both"></div>');
};
function messen() {
	$("#messwert").remove();
	$("#content").before("<div id='messwert'>height: "+window.innerHeight+"px width: "+window.innerWidth+"px</div>");
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