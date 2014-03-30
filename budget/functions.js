function onExpense() {
	$('#revenuelabel').css('display','none');
	$('#expenselabel').css('display','block');	
	//updatePhrase(false,'revenue');
	//$('input[type=number]').css('color', '#9bc67b');
	//$('#type').css('width','20%');
	//$('input[type=number]').css('margin','0 0 0 5%');
	//$('input[type=number]').css('width','40%');
	//alert($(".checkboxlabel:visible").attr('for'));
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
	//alert($(".checkboxlabel:visible").attr('for'));
	resizePhrase()
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
	//add blackbar in order to conceal chartbranding - dumme idee
	//$("#dashboard").append('<div id="blackbar"></div>');
	//insert dashboard-elements
	$("#content").append('<div id="currentbudget"><div class="amount">'+budget.getCurrentBudget()+'€</div>Current Budget</div>');
	$("#content").append('<div id="monthlyexpenses"><div class="amount">'+MonthlyExpenses(new Date())+'€</div>Expenses this Month</div>');
	$("#content").append('<div id="monthlyrevenues"><div class="amount">'+MonthlyRevenues(new Date())+'€</div>Revenues this Month</div>');
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
						$("#transactions").append('<div class="time">'+displayTime(givenDate)+'</div><div class="transaction"><div class="revenue amount">+'+this.getAmount()+"€</div>"+this.getName()+'</div><div style="clear: both"></div>');
					} else {
						$("#transactions").append('<div class="time">'+displayTime(givenDate)+'</div><div class="transaction"><div class="expense amount">-'+this.getAmount()+"€</div>"+this.getName()+'</div><div style="clear: both"></div>');
					}
				} else {
					$("#transactions").append('<h1 class="head">Today</h1>');
					if(this.getType() == 'revenue'){
						$("#transactions").append('<div class="time">'+displayTime(givenDate)+'</div><div class="transaction"><div class="revenue amount">+'+this.getAmount()+"€</div>"+this.getName()+'</div><div style="clear: both"></div>');
					} else {
						$("#transactions").append('<div class="time">'+displayTime(givenDate)+'</div><div class="transaction"><div class="expense amount">-'+this.getAmount()+"€</div>"+this.getName()+'</div><div style="clear: both"></div>');
					}
				}
		} else if(Math.abs(givenDate.getDate()-currentDate.getDate()) == 1){
			if(transactionInhalt.indexOf('<h1 class="head">Yesterday</h1>') > -1){
				$("#transactions").append('');
				if(this.getType() == 'revenue'){
					$("#transactions").append('<div class="time">'+displayTime(givenDate)+'</div><div class="transaction"><div class="revenue amount">+'+this.getAmount()+"€</div>"+this.getName()+'</div><div style="clear: both"></div>');
				} else {
					$("#transactions").append('<div class="time">'+displayTime(givenDate)+'</div><div class="transaction"><div class="expense amount">-'+this.getAmount()+"€</div>"+this.getName()+'</div><div style="clear: both"></div>');
				}
			} else {				
				$("#transactions").append('<h1 class="head">Yesterday</h1>');
				if(this.getType() == 'revenue'){
					$("#transactions").append('<div class="time">'+displayTime(givenDate)+'</div><div class="transaction"><div class="revenue amount">+'+this.getAmount()+"€</div>"+this.getName()+'</div><div style="clear: both"></div>');
				} else {
					$("#transactions").append('<div class="time">'+displayTime(givenDate)+'</div><div class="transaction"><div class="expense amount">-'+this.getAmount()+"€</div>"+this.getName()+'</div><div style="clear: both"></div>');
				}
			}
		} else {	
			if(transactionInhalt.indexOf('<h1 class="head">'+displayDate(givenDate)+'</h1>') > -1){				
				$("#transactions").append('');
				if(this.getType() == 'revenue'){
					$("#transactions").append('<div class="time">'+displayTime(givenDate)+'</div><div class="transaction"><div class="revenue amount">+'+this.getAmount()+"€</div>"+this.getName()+'</div><div style="clear: both"></div>');
				} else {
					$("#transactions").append('<div class="time">'+displayTime(givenDate)+'</div><div class="transaction"><div class="expense amount">-'+this.getAmount()+"€</div>"+this.getName()+'</div><div style="clear: both"></div>');
				}
			} else {				
				$("#transactions").append('<h1 class="head">'+displayDate(givenDate)+'</h1>');
				if(this.getType() == 'revenue'){
					$("#transactions").append('<div class="time">'+displayTime(givenDate)+'</div><div class="transaction"><div class="revenue amount">+'+this.getAmount()+"€</div>"+this.getName()+'</div><div style="clear: both"></div>');
				} else {
					$("#transactions").append('<div class="time">'+displayTime(givenDate)+'</div><div class="transaction"><div class="expense amount">-'+this.getAmount()+"€</div>"+this.getName()+'</div><div style="clear: both"></div>');
				}
			}
		}
		
	});	
	//alert('eingetragen');	
};
function updatePhrase(store){	
	if(!store){
		store = $("input[type='radio'][name='store']:checked").val();
	}
	$("#store span").html(store);	
}
function showStores(){
	$('#stores').css('display','block');
	calcSL();
}
function hideStores(){
	$('#stores').css('display','none');
}
function resizePhrase() {
	var sum = 0;
	sum += $('#type').width();	
	
	sum += parseInt($('input[type=number]').css('margin-left'),10);	
	
	sum += $('input[type=number]').width();	
	
	sum += $('#text').width();	
	
	sum += $('#storetext').width();	
	
	sum += $('#datelabel').width();
	
	sum += parseInt($('#storetext').css('margin-left'),10);	
	
	sum += $('#datetext').width();
	sum += 1;
	$('#phrase').css('width',sum+'px');	
	//var phraseHeight = $('#adddata').height();
	//var newMargin = (window.innerHeight-phraseHeight)/2;
	//$('#adddata').css('margin-top',newMargin);
	//$('#adddata').css('margin-bottom',newMargin);
	//callback();
}
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
			if(this.getType() == 'expense'){
				sum += this.getAmount();
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
			if(this.getType() == 'expense'){
				sum += this.getAmount();
			}
		}
	});	
	return sum;
}
function MonthlyRevenues(aDate) {
	var sum = 0;
	$.each(budget.getTransactions(), function() {
		givenDate = new Date(this.getDate());
		
		var isSameMonth = (givenDate.getMonth() == aDate.getMonth()
        && givenDate.getFullYear() == aDate.getFullYear());
		
		if(isSameMonth) {			
			if(this.getType() == 'revenue'){
				sum += this.getAmount();
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
			if(this.getType() == 'revenue'){
				sum += this.getAmount();
			}
		}
	});	
	return sum;
}
/*
function animateScroll() {
	$('body').animate({
		scrollTop: $("#dashboard").offset().top-50
	}, 1000);
}
*/
function reposLabel() {
	var newLabelWidth = $('#datelabel').width();	
	$('#date').css('width',newLabelWidth+'px');
	//$('#date').css('left','-'+newLabelWidth+'px');
}