function TimeData(eventlist) {
	//this.startAmount = startAmount;
	this.eventlist = eventlist;

	this.getEventlist = function() {
		return this.eventlist;
	};
	this.addEvent = function(event) {
		this.eventlist.unshift(event);
	};
 }
