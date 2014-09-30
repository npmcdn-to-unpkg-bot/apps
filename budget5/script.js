$('document').ready(function() {
	itemcount = 1;
	$("#itemlist").keyup(function() {
		count();
	});
	
	$("#itemlist").focusin(function() {
		$("#itemlist").append('<tr class="addrow" contenteditable="false"><td colspan="3" contenteditable="false" onclick="addrow()">add row</td></tr>');
		$(".deleterow").css('display','inline');
	});
	$("#itemlist").focusout(function() {
		$(".addrow").remove();
		$(".deleterow").css('display','none');
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
		$("#main").css('display','none');
	} else {
		$("#newtrans").css('display','none');
		$("#main").css('display','block');
	}
}
function count() {
	var sum = 0;
	var number;
	for(i=0;i<itemcount;i++){
		number = $(".price").eq(i).text();
		number = number.replace(",", ".");	
		number = parseFloat(number);
		number = number.toFixed(2);
		number = parseFloat(number);
		if(!$.isNumeric(number)){		
			continue;
		}
		sum += number;
	}	
	displaySum = sum;
	displaySum = displaySum.toFixed(2);	
	displaySum = displaySum.replace(".",",");	
	$("#right").text(displaySum);
}
function addrow() {
	itemcount++;
	$(".addrow").remove();
	$("#itemlist").append('<tr><td class="qty">0</td><td class="name">InsertItems here</td><td class="trash"><img class="deleterow" src="resources/trash.svg" onclick="deleterow('+itemcount+')" /></td><td class="price">0</td></tr><tr class="addrow" contenteditable="false"><td colspan="3" contenteditable="false" onclick="addrow()">add row</td></tr>');
}
function deleterow(number) {
	$("tr").eq(number-1).remove();
	itemcount--;
	count();
}
function spend() {
	var sum;
	var store;
	var itemlist;
	alert("Spend "+sum+"€ at "+store+" for "+itemlist);
}
function receive() {
	var sum;
	var store;
	var itemlist;
	alert("receive "+sum+"€ from "+store+" for "+itemlist);
}
