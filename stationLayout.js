// Page layout
//var top_margin = 50;
//var left_margin = 50;
//var station_top_padding = 50;
//var station_left_padding = 50;
var station_height = 100;
var station_width = 100;
var station_horizontal = 300;
var station_vertical = 200;

var arrow_width = 20;

var game_width = 1000;
var game_height = 500;
var time_width = 450;
var time_height = 120;
var score_width = 450;
var score_height = 120;

// Images
var station_static_image = "images/station.jpg";
var station_highlighted_image = "images/highlighted_station.jpg";
var arrow_image = "images/arrow.jpg";


var stations_json = '{ "stations" : ' +
'{"1" : {	"top" : 100,	"left" : 100,	"trophies" : 4	},' +
' "2" : {	"top" : 100,	"left" : 500,	"trophies" : 7	},' +
' "3" : {	"top" : 100,	"left" : 900,	"trophies" : 3	},' +
' "4" : {	"top" : 400,	"left" : 100,	"trophies" : 4	},' +
' "5" : {	"top" : 400,	"left" : 500,	"trophies" : 3	},' +
' "6" : {	"top" : 400,	"left" : 900,	"trophies" : 5	}}	}';
var stations_data = JSON.parse(stations_json);
var num_stations = 6;//stations_data.stations.length;

var station_loop_time = 1;
var station_change_time = 0;
var paths_json = '{ "paths" : ['+
' {"from":"1", "to":"1", "orientation":"none", "shortest_path": [1], "time":' +station_loop_time+ ' }, ' +
' {"from":"1", "to":"2", "orientation":"right", "shortest_path": [1, 2], "time":2 }, ' +
' {"from":"1", "to":"3", "orientation":"none", "shortest_path": [1, 2, 3], "time":' + (10+station_change_time) + ' }, ' +
' {"from":"1", "to":"4", "orientation":"none", "shortest_path": [1, 2, 5, 4], "time":' + (9+2*station_change_time) + ' }, ' +
' {"from":"1", "to":"5", "orientation":"none", "shortest_path": [1, 2, 5], "time":' + (5+station_change_time) + ' }, ' +
' {"from":"1", "to":"6", "orientation":"none", "shortest_path": [1, 2, 5, 6], "time":' + (8+2*station_change_time) + ' }, ' +
' {"from":"2", "to":"1", "orientation":"left", "shortest_path": [2, 1], "time":2 }, ' +
' {"from":"2", "to":"2", "orientation":"none", "shortest_path": [2], "time":' +station_loop_time+ ' }, ' +
' {"from":"2", "to":"3", "orientation":"right", "shortest_path": [2, 3], "time":8 }, ' +
' {"from":"2", "to":"4", "orientation":"none", "shortest_path": [2, 5, 4], "time":' + (7+station_change_time) + ' }, ' +
' {"from":"2", "to":"5", "orientation":"down", "shortest_path": [2, 5], "time":3 }, ' +
' {"from":"2", "to":"6", "orientation":"none", "shortest_path": [2, 5, 6], "time":' + (6+station_change_time) + ' }, ' +
' {"from":"3", "to":"1", "orientation":"none", "shortest_path": [3, 2, 1], "time":' + (10+station_change_time) + ' }, ' +
' {"from":"3", "to":"2", "orientation":"left", "shortest_path": [3, 2], "time":8 }, ' +
' {"from":"3", "to":"3", "orientation":"none", "shortest_path": [3], "time":' +station_loop_time+ ' }, ' +
' {"from":"3", "to":"4", "orientation":"none", "shortest_path": [3, 6, 5, 4], "time":' + (12+2*station_change_time) + ' }, ' +
' {"from":"3", "to":"5", "orientation":"none", "shortest_path": [3, 6, 5], "time":' + (8+station_change_time) + ' }, ' +
' {"from":"3", "to":"6", "orientation":"down", "shortest_path": [3, 6], "time":5 }, ' +
' {"from":"4", "to":"1", "orientation":"none", "shortest_path": [4, 5, 2, 1], "time":' + (9+2*station_change_time) + ' }, ' +
' {"from":"4", "to":"2", "orientation":"none", "shortest_path": [4, 5, 2], "time":' + (7+station_change_time) + ' }, ' +
' {"from":"4", "to":"3", "orientation":"none", "shortest_path": [4, 5, 6, 3], "time":' + (12+2*station_change_time) + ' }, ' +
' {"from":"4", "to":"4", "orientation":"none", "shortest_path": [4], "time":' +station_loop_time+ ' }, ' +
' {"from":"4", "to":"5", "orientation":"right", "shortest_path": [4, 5], "time":4 }, ' +
' {"from":"4", "to":"6", "orientation":"none", "shortest_path": [4, 5, 6], "time":' + (7+station_change_time) + ' }, ' +
' {"from":"5", "to":"1", "orientation":"none", "shortest_path": [5, 2, 1], "time":' + (5+station_change_time) + ' }, ' +
' {"from":"5", "to":"2", "orientation":"up", "shortest_path": [5, 2], "time":3 }, ' +
' {"from":"5", "to":"3", "orientation":"none", "shortest_path": [5, 6, 3], "time":' + (8+station_change_time) + ' }, ' +
' {"from":"5", "to":"4", "orientation":"left", "shortest_path": [5, 4], "time":4 }, ' +
' {"from":"5", "to":"5", "orientation":"none", "shortest_path": [5], "time":' +station_loop_time+ ' }, ' +
' {"from":"5", "to":"6", "orientation":"right", "shortest_path": [5, 6], "time":3 }, ' +
' {"from":"6", "to":"1", "orientation":"none", "shortest_path": [6, 5, 2, 1], "time":' + (8+2*station_change_time) + ' }, ' +
' {"from":"6", "to":"2", "orientation":"none", "shortest_path": [6, 5, 2], "time":' + (6+station_change_time) + ' }, ' +
' {"from":"6", "to":"3", "orientation":"up", "shortest_path": [6, 3], "time":5 }, ' +
' {"from":"6", "to":"4", "orientation":"none", "shortest_path": [6, 5, 4], "time":' + (7+station_change_time) + ' }, ' +
' {"from":"6", "to":"5", "orientation":"left", "shortest_path": [6, 5], "time":3 }, ' +
' {"from":"6", "to":"6", "orientation":"none", "shortest_path": [6], "time":' +station_loop_time+ ' } ' +
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
}

function createPaths()	{
	for (var i=0; i<paths_data.paths.length; i++)	{
		if (paths_data.paths[i]['orientation'] != 'none')	{
			var from_station = paths_data.paths[i]['from'];
			var to_station = paths_data.paths[i]['to'];
			var arrow_elem = document.createElement("img");
			arrow_elem.setAttribute("id", "arrow"+from_station.toString()+to_station.toString());
			arrow_elem.setAttribute("src", arrow_image);
			//alert(paths_data.paths[i]['orientation']);
			if (paths_data.paths[i]['orientation'] == 'left')	{
				arrow_elem.setAttribute("height", arrow_width);
				arrow_elem.setAttribute("width", station_horizontal);
				var left = stations_data.stations[to_station.toString()]['left'] + station_width;
				var top = stations_data.stations[to_station.toString()]['top'] + (station_height - 2.5*arrow_width)/2;
				arrow_elem.setAttribute("style", "position: absolute; left:"+left+"px; top:"+top+"px; transform:rotate(180deg);");
			}
			else if (paths_data.paths[i]['orientation'] == 'right')	{
				arrow_elem.setAttribute("height", arrow_width);
				arrow_elem.setAttribute("width", station_horizontal);
				var left = stations_data.stations[from_station.toString()]['left'] + station_width;
				var top = stations_data.stations[from_station.toString()]['top'] + (station_height - 2.5*arrow_width)/2 + 1.5*arrow_width;
				arrow_elem.setAttribute("style", "position: absolute; left:"+left+"px; top:"+top+"px;");
			}
			else if (paths_data.paths[i]['orientation'] == 'up')	{
				arrow_elem.setAttribute("height", arrow_width);
				arrow_elem.setAttribute("width", station_vertical-10);
				var left = stations_data.stations[to_station.toString()]['left'] + station_width/2 - station_vertical/2 - 10;
				var top = stations_data.stations[to_station.toString()]['top'] + station_height + station_vertical/2-10;
				arrow_elem.setAttribute("style", "position: absolute; left:"+left+"px; top:"+top+"px; transform:rotate(270deg);");
			}
			else 	{ // if paths_data.paths[i]['orientation'] == down
				arrow_elem.setAttribute("height", arrow_width);
				arrow_elem.setAttribute("width", station_vertical-10);
				var left = stations_data.stations[from_station.toString()]['left'] + station_width/2 - station_vertical/2 + 10;
				var top = stations_data.stations[from_station.toString()]['top'] + station_height + station_vertical/2-10;
				arrow_elem.setAttribute("style", "position: absolute; left:"+left+"px; top:"+top+"px; transform:rotate(90deg);");
			}
			document.getElementById("game-div").appendChild(arrow_elem);
		}
	}
}



// Time or Life bar
var max_time = 15;
var timeLeft;
var time_unit_width = (time_width - (2*25)) / max_time;
var time_unit_height = Math.min(time_unit_width, (time_height - 2*20));

var unfilled_heart_image = "images/heart.png";
var filled_heart_image = "images/heart_filled.png";


function createTimeUnit(left,top,filled,id)	{
	var time_elem = document.createElement("img");
	time_elem.setAttribute("id", "time"+id.toString());
	if (filled)	{
		time_elem.setAttribute("src", filled_heart_image);
	}
	else 	{
		time_elem.setAttribute("src", unfilled_heart_image);
	}
	time_elem.setAttribute("height", time_unit_height);
	time_elem.setAttribute("width", time_unit_width);
	time_elem.setAttribute("style", "position: absolute; left:"+left+"px; top:"+top+"px;");
	document.getElementById("time-div").appendChild(time_elem);
}

function updateTime(timeTaken)	{
	if ((timeLeft - timeTaken) < 0)	{
		alert("Illegal move");
		return false;
	}
	timeLeft -= timeTaken;
	if (timeLeft > max_time)	{
		timeLeft = max_time;
	}
	if (timeLeft < 0)	{
		timeLeft = 0;
	}
	var i,top,left;
	for (i=0; i<timeLeft; i++)	{
		top = game_height + 2*50 + 20; // 50 is margin for game-div. 20 is buffer considered for heart images
		left = 50 + 25 + i*time_unit_width; // 50 is left margin. 25 is buffer considered for heart images
		createTimeUnit(left, top, true, i);
	}
	for (; i<max_time; i++)	{
		top = game_height + 2*50 + 20; // 50 is margin for game-div. 20 is buffer considered for heart images
		left = 50 + 25 + i*time_unit_width; // 50 is left margin. 25 is buffer considered for heart images
		createTimeUnit(left, top, false, i);
	}
	return true;
}

function initializeTime()	{
	timeLeft = max_time;
	updateTime(0);
}


// Score bar
var max_score = 50;
var max_score_width = 400;
var total_score = 0;

var unfilled_score_image = "images/score_unfilled.jpg";
var filled_score_image = "images/score_filled.jpg";
var trophy_image = "images/trophy.jpg";

function updateScore(score)	{
	total_score += score;
	if (total_score < 0)	{
		total_score = 0;
	}
	if (total_score > max_score)	{
		total_score = max_score;
	}
	var filled_score_elem = document.createElement("img");
	filled_score_elem.setAttribute("id", "filled_score_bar");
	filled_score_elem.setAttribute("src", filled_score_image);
	filled_score_elem.setAttribute("height", 40);
	filled_score_elem.setAttribute("width", (total_score/max_score)*max_score_width);
	filled_score_elem.setAttribute("style", "position: absolute; left:"+625+"px; top:"+620+"px;");
	document.getElementById("score-div").appendChild(filled_score_elem);

	var unfilled_score_elem = document.createElement("img");
	unfilled_score_elem.setAttribute("id", "unfilled_score_bar");
	unfilled_score_elem.setAttribute("src", unfilled_score_image);
	unfilled_score_elem.setAttribute("height", 40);
	unfilled_score_elem.setAttribute("width", (1-total_score/max_score)*max_score_width);
	var unfilled_width = 625 + (total_score/max_score)*max_score_width;
	unfilled_score_elem.setAttribute("style", "position: absolute; left:"+unfilled_width+"px; top:"+620+"px;");
	document.getElementById("score-div").appendChild(unfilled_score_elem);
}

function initializeScore()	{
	updateScore(0);
	var trophy_elem = document.createElement("img");
	trophy_elem.setAttribute("id", "trophy_bar");
	trophy_elem.setAttribute("src", trophy_image);
	trophy_elem.setAttribute("height", 30);
	trophy_elem.setAttribute("width", 30);
	trophy_elem.setAttribute("style", "position: absolute; left:"+625+"px; top:"+680+"px;");
	document.getElementById("score-div").appendChild(trophy_elem);
}
