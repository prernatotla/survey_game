// Page layout
//var top_margin = 50;
//var left_margin = 50;
//var station_top_padding = 50;
//var station_left_padding = 50;
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
var station_static_image = "images/color_label_oval_grey_T.png";
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

function initializeStationTrophies(station_id, left, top)	{
	var trophies_num = stations_data.stations[station_id.toString()]['trophies'];
	var max_width = 140;
	var height_buffer = 0;
	var left_buffer = 0;
	for (i=1; i<=trophies_num; i++) {
		height_buffer = 20 * Math.floor(i / (max_width/20));
		left_buffer = 20 * (i % (max_width/20));
		var station_elem = document.createElement("img");
		//alert("Here " + station_id.toString());
		station_elem.setAttribute("id", "trophy"+station_id.toString()+""+i);
		station_elem.setAttribute("src", trophy_image);
		station_elem.setAttribute("height", 20);
		station_elem.setAttribute("width", 20);
		station_elem.setAttribute("style", "position: absolute; left:"+(left+left_buffer)+"px; top:"+(top-height_buffer)+"px;");
		document.getElementById("game-div").appendChild(station_elem);
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

	/*for (var i=0; i<paths_data.paths.length; i++)	{
		if (paths_data.paths[i]['orientation'] != 'none')	{
			var from_station = paths_data.paths[i]['from'];
			var to_station = paths_data.paths[i]['to'];
			if (paths_data.paths[i]['orientation'] == 'left')	{
				var size = 10;
			}
			else if (paths_data.paths[i]['orientation'] == 'left')	{
				//
			}

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
	}*/
}



// Time or Life bar
var max_time = 90;
var timeLeft;
var time_unit_width = 27;
var time_unit_height = 27;
var time_hori_spacer = 2;
var time_vert_spacer = 4;

var empty_transparent_image = "images/handtinytrans.gif";
var filled_heart_image = "images/hourglass-md.png";


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
		document.getElementById("time"+id.toString()).src = empty_transparent_image;
		//alert('change');
	}
	timeLeft -= timeTaken;
	if (timeLeft > max_time)	{
		timeLeft = max_time;
	}
	if (timeLeft < 0)	{
		timeLeft = 0;
	}
	return true;
}

function initializeTime()	{
	timeLeft = max_time;
	for (i=0; i<max_time; i++)	{
		createTimeUnit(time_hori_spacer, time_vert_spacer, i);
	}
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
	move_all(trophy_elems, score_left, score_top, post_animation_score, 5);
	
	function post_animation_score() {
		for (var i=1; i<=score; i++) {
			trophy_elems[i-1].src = empty_transparent_image;
		}
		for (var i=total_score-score; i< total_score; i++)	{
			var trophy_elem = document.createElement("img");
			trophy_elem.setAttribute("id", "trophy_bar"+i);
			trophy_elem.setAttribute("src", trophy_image);
			trophy_elem.setAttribute("height", 30);
			trophy_elem.setAttribute("width", 30);
			trophy_elem.setAttribute("style", "position: relative; left:"+2+"px; top:"+2+"px;");
			document.getElementById("score-div").appendChild(trophy_elem);
		}
		enable_play();
	}
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

}

// enable clicks (after animation)
function enable_play() {
	for (var station_id=1; station_id<=num_stations; station_id++)	{
		var top = stations_data.stations[station_id.toString()]['top'];
		var left = stations_data.stations[station_id.toString()]['left'];
		initializeStationTrophies(station_id, left, top);
	}
}