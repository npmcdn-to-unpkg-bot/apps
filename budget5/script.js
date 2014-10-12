$('document').ready(function() {
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
	$("#itemlist").append('<div class="itemrow"><input class="qty" type="number" placeholder="#" autocomplete="off" required><input class="name" type="text" placeholder="Itemname" required><div class="trash"><img class="deleterow" src="resources/trash.svg" onclick="deleterow('+itemcount+')" /></div><input class="price" type="number" placeholder="0,00" required><div style="clear: both"></div></div><div class="addrow" contenteditable="false" onclick="addrow()">add row</div>');
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
	var itemlist = {};
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
	alert(type+" "+sum+"€ at "+store+" for "+itemlist);
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