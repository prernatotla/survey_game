// Page layout
var station_height = 150;
var station_width = 150;
var station_horizontal = 300;
var station_vertical = 200;

var arrow_width = 20;

var game_width = 1200;
var game_height = 700;
var time_width = 450;
var time_height = 120;
var score_width = 450;
var score_height = 120;

// Images
var station_static_image = "images/station.png";
var station_highlighted_image = "images/highlighted_station.jpg";
var arrow_image = "images/arrow.jpg";
var trophy_image = "images/trophy.png";


var stations_json = '{ "stations" : ' +
'{"1" : {	"top" : 200,	"left" : 50,	"trophies" : 9	},' +
' "2" : {	"top" : 200,	"left" : 300,	"trophies" : 7	},' +
' "3" : {	"top" : 200,	"left" : 750,	"trophies" : 35	},' +
' "4" : {	"top" : 200,	"left" : 1000,	"trophies" : 29	},' +
' "5" : {	"top" : 500,	"left" : 450,	"trophies" : 6	},' +
' "6" : {	"top" : 500,	"left" : 850,	"trophies" : 13	}}	}';
var stations_data = JSON.parse(stations_json);
var num_stations = 6;//stations_data.stations.length;

var station_loop_time = 1;
var station_change_time = 0;
var direct_paths_json = '{ "paths" : ['+
' {"from":"1", "to":"2", "orientation":"horizontal" }, ' +
' {"from":"2", "to":"3", "orientation":"horizontal" }, ' +
' {"from":"3", "to":"4", "orientation":"horizontal" }, ' +
' {"from":"2", "to":"5", "orientation":"diagonal" }, ' +
' {"from":"3", "to":"6", "orientation":"diagonal" }, ' +
' {"from":"5", "to":"6", "orientation":"horizontal" }, ' +
' {"from":"4", "to":"6", "orientation":"diagonal" } ' +
' ] }';
var direct_paths = JSON.parse(direct_paths_json);

var paths_json = '{ "paths" : ['+
' {"from":"1", "to":"1", "shortest_path": [1], "time":' +station_loop_time+ ' }, ' +
' {"from":"1", "to":"2", "shortest_path": [1, 2], "time":1 }, ' +
' {"from":"1", "to":"3", "shortest_path": [1, 2, 3], "time":' + (4+station_change_time) + ' }, ' +
' {"from":"1", "to":"4", "shortest_path": [1, 2, 3, 4], "time":' + (5+2*station_change_time) + ' }, ' +
' {"from":"1", "to":"5", "shortest_path": [1, 2, 5], "time":' + (3+station_change_time) + ' }, ' +
' {"from":"1", "to":"6", "shortest_path": [1, 2, 5, 6], "time":' + (6+2*station_change_time) + ' }, ' +
' {"from":"2", "to":"1", "shortest_path": [2, 1], "time":1 }, ' +
' {"from":"2", "to":"2", "shortest_path": [2], "time":' +station_loop_time+ ' }, ' +
' {"from":"2", "to":"3", "shortest_path": [2, 3], "time":3 }, ' +
' {"from":"2", "to":"4", "shortest_path": [2, 3, 4], "time":' + (4+station_change_time) + ' }, ' +
' {"from":"2", "to":"5", "shortest_path": [2, 5], "time":2 }, ' +
' {"from":"2", "to":"6", "shortest_path": [2, 5, 6], "time":' + (5+station_change_time) + ' }, ' +
' {"from":"3", "to":"1", "shortest_path": [3, 2, 1], "time":' + (4+station_change_time) + ' }, ' +
' {"from":"3", "to":"2", "shortest_path": [3, 2], "time":3 }, ' +
' {"from":"3", "to":"3", "shortest_path": [3], "time":' +station_loop_time+ ' }, ' +
' {"from":"3", "to":"4", "shortest_path": [3, 4], "time":1 }, ' +
' {"from":"3", "to":"5", "shortest_path": [3, 2, 5], "time":' + (5+station_change_time) + ' }, ' +
' {"from":"3", "to":"6", "shortest_path": [3, 6], "time":3 }, ' +
' {"from":"4", "to":"1", "shortest_path": [4, 3, 2, 1], "time":' + (5+2*station_change_time) + ' }, ' +
' {"from":"4", "to":"2", "shortest_path": [4, 3, 2], "time":' + (4+station_change_time) + ' }, ' +
' {"from":"4", "to":"3", "shortest_path": [4, 3], "time":1 }, ' +
' {"from":"4", "to":"4", "shortest_path": [4], "time":' +station_loop_time+ ' }, ' +
' {"from":"4", "to":"5", "shortest_path": [4, 6, 5], "time":' + (4+2*station_change_time) + ' }, ' +
' {"from":"4", "to":"6", "shortest_path": [4, 6], "time":1 }, ' +
' {"from":"5", "to":"1", "shortest_path": [5, 2, 1], "time":' + (3+station_change_time) + ' }, ' +
' {"from":"5", "to":"2", "shortest_path": [5, 2], "time":2 }, ' +
' {"from":"5", "to":"3", "shortest_path": [5, 2, 3], "time":' + (5+station_change_time) + ' }, ' +
' {"from":"5", "to":"4", "shortest_path": [5, 6, 4], "time":' + (4+2*station_change_time) + ' }, ' +
' {"from":"5", "to":"5", "shortest_path": [5], "time":' +station_loop_time+ ' }, ' +
' {"from":"5", "to":"6", "shortest_path": [5, 6], "time":3 }, ' +
' {"from":"6", "to":"1", "shortest_path": [6, 5, 2, 1], "time":' + (6+2*station_change_time) + ' }, ' +
' {"from":"6", "to":"2", "shortest_path": [6, 5, 2], "time":' + (5+station_change_time) + ' }, ' +
' {"from":"6", "to":"3", "shortest_path": [6, 3], "time":3 }, ' +
' {"from":"6", "to":"4", "shortest_path": [6, 4], "time":1 }, ' +
' {"from":"6", "to":"5", "shortest_path": [6, 5], "time":3 }, ' +
' {"from":"6", "to":"6", "shortest_path": [6], "time":' +station_loop_time+ ' } ' +
' ] }';
var paths_data = JSON.parse(paths_json);


function initializeGameboard()	{
	createStations();
	createPaths();
	addEventListeners();
	initializeTime();
	initializeScore();
}

function changeImageSource(elemName, newsrc)	{
	document.getElementById(elemName).src = newsrc;
}

function createStations()	{
	for (var i=1; i<=num_stations; i++)	{
		createStationById(i, station_static_image);
	}
}

function initializeStationTrophies(station_id, left, top)	{
	var trophies_num = stations_data.stations[station_id.toString()]['trophies'];
	var score_elem = document.createElement("img");
	score_elem.setAttribute("id", "trophy"+station_id.toString());
	score_elem.setAttribute("src", trophy_image);
	score_elem.setAttribute("height", 30);
	score_elem.setAttribute("width", 30);
	score_elem.setAttribute("style", "position: absolute; left:"+(left+station_width*0.3)+"px; top:"+(top + station_height*0.65)+"px;");
	document.getElementById("game-div").appendChild(score_elem);
	var score_label_elem = document.createElement("div");
	score_label_elem.setAttribute("id", "trophyLabel"+station_id.toString());
	score_label_elem.setAttribute("style", "position: absolute; left:"+(left+station_width*0.3+35)+"px; top:"+(top + station_height*0.65)+"px; font-size:180%");
	document.getElementById("game-div").appendChild(score_label_elem);
	document.getElementById("trophyLabel"+station_id.toString()).innerHTML = "x" + trophies_num.toString();
	var station_label_elem = document.createElement("div");
	station_label_elem.setAttribute("id", "stationName"+station_id.toString());
	station_label_elem.setAttribute("style", "position: absolute; left:"+(left+station_width*0.3)+"px; top:"+(top + station_height*0.65 - 80)+"px;");
	document.getElementById("game-div").appendChild(station_label_elem);
	document.getElementById("stationName"+station_id.toString()).innerHTML = "Station " + station_id.toString();
}

function createStationById(station_id, station_image) 	{
	var top = stations_data.stations[station_id.toString()]['top'];
	var left = stations_data.stations[station_id.toString()]['left'];
	var trophies = stations_data.stations[station_id.toString()]['trophies'];
	var station_elem = document.createElement("img");
	//alert("Here " + station_id.toString());
	station_elem.setAttribute("id", "station"+station_id.toString());
	station_elem.setAttribute("src", station_image);
	station_elem.setAttribute("height", station_height);
	station_elem.setAttribute("width", station_width);
	station_elem.setAttribute("style", "position: absolute; left:"+left+"px; top:"+top+"px;");
	document.getElementById("game-div").appendChild(station_elem);
	
	initializeStationTrophies(station_id, left, top);
}

function createPaths()	{
	var size = 10;
	for (var i=0; i<direct_paths.paths.length; i++)	{
		var from_station = direct_paths.paths[i]['from'];
		var to_station = direct_paths.paths[i]['to'];
		if (direct_paths.paths[i]['orientation'] == 'horizontal')	{
			var top = stations_data.stations[from_station.toString()]['top'] + station_height/2 - 5;
			var start_point_left = stations_data.stations[from_station.toString()]['left'];
			var end_point_left = stations_data.stations[to_station.toString()]['left'];
			if (start_point_left > end_point_left)	{
				var temp = start_point_left;
				start_point_left = end_point_left;
				end_point_left = temp;
			}
			start_point_left = start_point_left + station_width;
			for (j=start_point_left; j<end_point_left;)	{
				var arrow_elem = document.createElement("img");
				var elem_num = Math.floor(j / (2*size));
				arrow_elem.setAttribute("src", station_static_image);
				arrow_elem.setAttribute("height", size);
				arrow_elem.setAttribute("width", size);
				arrow_elem.setAttribute("style", "position: absolute; left:"+j+"px; top:"+top+"px; transform:rotate(180deg);");
				document.getElementById("game-div").appendChild(arrow_elem);
				j += 2*size;
			}
		}
		else if (direct_paths.paths[i]['orientation'] == 'diagonal')	{
			var start_point_top = stations_data.stations[from_station.toString()]['top'];;
			var end_point_top = stations_data.stations[to_station.toString()]['top'];;
			var start_point_left = stations_data.stations[from_station.toString()]['left'];
			var end_point_left = stations_data.stations[to_station.toString()]['left'];
			if (start_point_top > end_point_top)	{
				var temp = start_point_top;
				start_point_top = end_point_top;
				end_point_top = temp;
				temp = start_point_left;
				start_point_left = end_point_left;
				end_point_left = temp;
			}
			start_point_top += station_height;
			start_point_left += station_width/2;
			for (j=start_point_top; j<end_point_top;)	{
				var arrow_elem = document.createElement("img");
				var elem_num = Math.floor(j / (2*size));
				var left = start_point_left;
				if (start_point_left < end_point_left)	{
					left += elem_num*size/2;
				}
				else 	{
					left -= elem_num*size/2;
				}
				arrow_elem.setAttribute("src", station_static_image);
				arrow_elem.setAttribute("height", size);
				arrow_elem.setAttribute("width", size);
				arrow_elem.setAttribute("style", "position: absolute; left:"+left+"px; top:"+j+"px; transform:rotate(180deg);");
				document.getElementById("game-div").appendChild(arrow_elem);
				j += 2*size;
			}
		}
	}
}



// Time or Life bar
var max_time = 100;
var timeLeft;
var time_unit_width = 27;
var time_unit_height = 27;
var time_hori_spacer = 2;
var time_vert_spacer = 4;

var empty_transparent_image = "images/handtinytrans.gif";
var filled_heart_image = "images/hourglass-md.png";
var unfilled_heart_image = "images/hourglass-crossed.png";


function createTimeUnit(left,top,id)	{
	var time_elem = document.createElement("img");
	time_elem.setAttribute("id", "time"+id.toString());
	time_elem.setAttribute("src", filled_heart_image);
	time_elem.setAttribute("height", time_unit_height);
	time_elem.setAttribute("width", time_unit_width);
	time_elem.setAttribute("style", "position: relative; left:"+left+"px;top:"+top+"px;");
	document.getElementById("time-div").appendChild(time_elem);
}

function updateTime(timeTaken)	{
	if ((timeLeft - timeTaken) < 0)	{
		alert("Illegal move");
		return false;
	}
	for(id=timeLeft-1; id >= (timeLeft - timeTaken); id--) {
		document.getElementById("time"+id.toString()).src = unfilled_heart_image;
		//alert('change');
	}
	timeLeft -= timeTaken;
	if (timeLeft > max_time)	{
		timeLeft = max_time;
	}
	if (timeLeft < 0)	{
		timeLeft = 0;
	}
	document.getElementById('time-value').innerHTML = timeLeft;
	return true;
}

function initializeTime()	{
	timeLeft = max_time;
	for (i=0; i<max_time; i++)	{
		createTimeUnit(time_hori_spacer, time_vert_spacer, i);
	}
	document.getElementById('time-value').innerHTML = timeLeft;
}


// Score bar
var max_score = 50;
var max_score_width = 400;
var total_score = 0;

// get position of score board for animation


//var unfilled_score_image = "images/hourglass-md.png";
//var filled_score_image = "images/score_filled.jpg";


function updateScore(station_id, score)	{
	total_score += score;
	if (total_score < 0)	{
		total_score = 0;
	}
	if (total_score > max_score)	{
		total_score = max_score;
	}
	var trophy_elems = new Array(score);
	for (var i=1; i<=score; i++) {
		trophy_elems[i-1] = document.getElementById("trophy"+station_id.toString()+""+i)
	}
	disable_play();
	document.getElementById('score-value').innerHTML = total_score;
}

var score_left = 0;
var score_top = 0;
function initializeScore()	{
	// get location of score div (using jQuery)
	var offset = $(document.getElementById("score-div")).offset();
	score_left = offset.left
	score_top = offset.top;
}

//disable clicks (for animation in progress)
function disable_play() {
	removeEventListeners();
}

// enable clicks (after animation)
function enable_play() {
	changeImageSource("station"+to_station.toString(), station_static_image);
	from_station = to_station;
	to_station = null;
	addEventListeners();
}