$('document').ready(function() {
	itemcount = 1;
	$("#itemlist").keyup(function() {
		count();
	});
});

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
function spend() {
	var sum = $("#right").text();
	sum = sum.replace(",", ".");
	sum = parseFloat(sum);		
	if(!$.isNumeric(sum)){		
		console.log("variable sum is not a number");
	}
	var store = $("#transtitle").text();
	var itemlist;
	alert("Spend "+sum+"€ at "+store+" for "+itemlist);
}
function receive() {
	var sum;
	var store;
	var itemlist;
	alert("receive "+sum+"€ from "+store+" for "+itemlist);
}
