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
var station_highlighted_stop_image = "images/highlighted_red.png";
var station_highlighted_image = "images/highlighted_green.png";
var trophy_image = "images/trophy.png";
var roulette_image = "images/roulette.png";
var dial_image = "images/dial.png";
var police_image = "images/police.png";

var stations_data;
var num_stations = 6;

var direct_paths;


var paths_data;

var transition_json = '{ "transitions" : ['+
' {"1":{"1":34, "2":66}, "2":{"1":18, "2":36, "3":46}, "3":{"2":43, "3":57}, "4":{"4":63, "6":37}, "5":{"5":64, "6":36}, "6":{"4":39, "5":39, "6":22} }, '+
' {"1":{"1":34, "2":66}, "2":{"1":18, "2":36, "3":46}, "3":{"2":43, "3":57}, "4":{"4":63, "6":37}, "5":{"5":64, "6":36}, "6":{"4":39, "5":39, "6":22} }, '+
' {"1":{"1":34, "2":66}, "2":{"1":18, "2":36, "3":46}, "3":{"2":43, "3":57}, "4":{"4":63, "6":37}, "5":{"5":64, "6":36}, "6":{"4":39, "5":39, "6":22} }, '+
' {"1":{"1":34, "2":66}, "2":{"1":18, "2":36, "3":46}, "3":{"2":43, "3":57}, "4":{"4":63, "6":37}, "5":{"5":64, "6":36}, "6":{"4":39, "5":39, "6":22} } '+
'] }';
var transition_data = JSON.parse(transition_json);
transition_data =transition_data["transitions"];


function initializeGameboard()	{
	if (trial_number == 1)	{
		stations_data = stations_0_data;
		paths_data = paths_0_data;
		direct_paths = direct_paths_0;
		strategy_data = strategy_0_data;
		strategy_pic_path = "images/strategy_0.png";
	}
	else if (trial_number == 2)	{
		stations_data = stations_1_data;
		paths_data = paths_1_data;
		direct_paths = direct_paths_1;
		strategy_data = strategy_1_data;
		strategy_pic_path = "images/strategy_1.png";
	}
	else if (trial_number == 3)	{
		stations_data = stations_2_data;
		paths_data = paths_2_data;
		direct_paths = direct_paths_2;
		strategy_data = strategy_2_data;
		strategy_pic_path = "images/strategy_2.png";
	}
	else if (trial_number == 4)	{
		stations_data = stations_3_data;
		paths_data = paths_3_data;
		direct_paths = direct_paths_3;
		strategy_data = strategy_3_data;
		strategy_pic_path = "images/strategy_3.png";
	}
	else if (trial_number == 5) {
		stations_data = stations_4_data;
		paths_data = paths_4_data;
		direct_paths = direct_paths_4;
		strategy_data = strategy_4_data;
		strategy_pic_path = "images/strategy_4.png";
	}
	var round_title_elem = document.createElement("p");
	round_title_elem.setAttribute("style" , "font-size:200%; font-weight:bold; color:#9999ee; text-align:center;");
	round_title_elem.innerHTML = "Round " + trial_number.toString();
	document.getElementById("game-div").appendChild(round_title_elem);
	createStations();
	createPaths("game-div");
	initializeTime();
	initializeScore();
	initializeRoulette();
	initStrategy();
	officer_strategy = generateSampleStrategy();
	store_data += "trial_num:"+trial_number.toString() + ";strategy:" + officer_strategy_num.toString();
}

function initStrategy()	{
	var elem = document.getElementById('strategy-div');
	if (elem != null)	{
		document.getElementById('instruction_6').removeChild(elem);
	}
	elem = document.createElement('div');
	elem.setAttribute("id", "strategy-div");
	document.getElementById('instruction_6').appendChild(elem);
	//show image
	var div_elem = document.getElementById('strategy-div');
	div_elem.innerHTML += "<u>Officer Strategy:</u><br>";
	div_elem.innerHTML += "Study the figure below to understand officer's strategy<br><br>";
	
	var strat_elem = document.createElement('img');
	strat_elem.setAttribute("id", "strategy_image");
	strat_elem.setAttribute("src", strategy_pic_path);
	strat_elem.setAttribute("height", 475);
	strat_elem.setAttribute("width", 1000);
	strat_elem.setAttribute("style", "position: relative;");
	div_elem.appendChild(strat_elem);
	//strat_elem = document.getElementById("strategy_image_main");
	//if (strat_elem == null)	{
	strat_elem = document.createElement('img');
	strat_elem.setAttribute("id", "strategy_image_main");
	strat_elem.setAttribute("src", strategy_pic_path);
	strat_elem.setAttribute("height", 600);
	strat_elem.setAttribute("width", 1300);
	strat_elem.setAttribute("style", "position: absolute; float:right; margin-bottom:10px; margin-top:10px;");
	document.getElementById("strategy_pic").appendChild(strat_elem);
	//}
}

function changeImageSource(elemName, newsrc)	{
	document.getElementById(elemName).src = newsrc;
}

function createStations()	{
	for (var i=1; i<=num_stations; i++)	{
		createStationById(i, station_static_image, "game-div");
	}
}

// Assuming fixed exit rate for now
function initializeRoulette()	{
	var roulette_label_elem = document.createElement("div");
	roulette_label_elem.setAttribute("id", "rouletteLabel");
	roulette_label_elem.setAttribute("style", "position: absolute; left:470px; top:175px; font-size:180%; color:#9999ee; visibility:hidden; z-index:15;");
	roulette_label_elem.innerHTML = "Termination<br>Randomizer:";
	document.getElementById("game-div").appendChild(roulette_label_elem);

	var roulette_img_elem = document.createElement("img");
	roulette_img_elem.setAttribute("id", "roulette_image");
	roulette_img_elem.setAttribute("src", roulette_image);
	roulette_img_elem.setAttribute("height", 180);
	roulette_img_elem.setAttribute("width", 180);
	roulette_img_elem.setAttribute("style", "position: absolute; left:520px; top:260px; visibility:hidden; z-index:15;");
	document.getElementById("game-div").appendChild(roulette_img_elem);

	var roulette_dial_elem = document.createElement("img");
	roulette_dial_elem.setAttribute("id", "dial_image");
	roulette_dial_elem.setAttribute("src", dial_image);
	roulette_dial_elem.setAttribute("height", 180);
	roulette_dial_elem.setAttribute("width", 180);
	roulette_dial_elem.setAttribute("style", "position: absolute; left:520; top:260px; visibility:hidden; transform:rotate(0deg); z-index:15;");
	document.getElementById("game-div").appendChild(roulette_dial_elem);
}

function initializeStationTrophies(station_id, left, top)	{
	var trophies_num = stations_data.stations[station_id.toString()]['trophies'];
	var score_elem = document.createElement("img");
	score_elem.setAttribute("id", "trophy"+station_id.toString());
	score_elem.setAttribute("src", trophy_image);
	score_elem.setAttribute("height", 30);
	score_elem.setAttribute("width", 30);
	score_elem.setAttribute("style", "position: absolute; left:"+(station_width*0.3+42)+"px; top:"+(station_height*0.65)+"px;");
	document.getElementById("station_div"+station_id.toString()).appendChild(score_elem);
	
	var score_label_elem = document.createElement("div");
	score_label_elem.setAttribute("id", "trophyLabel"+station_id.toString());
	score_label_elem.setAttribute("style", "position: absolute; left:"+(station_width*0.3)+"px; top:"+(station_height*0.65)+"px; font-size:180%");
	document.getElementById("station_div"+station_id.toString()).appendChild(score_label_elem);
	document.getElementById("trophyLabel"+station_id.toString()).innerHTML = trophies_num.toString() + "x";
	
	var station_label_elem = document.createElement("div");
	station_label_elem.setAttribute("id", "stationName"+station_id.toString());
	station_label_elem.setAttribute("style", "position: absolute; left:"+(station_width*0.3)+"px; top:"+(station_height*0.65 - 80)+"px; font-size:120%");
	document.getElementById("station_div"+station_id.toString()).appendChild(station_label_elem);
	document.getElementById("stationName"+station_id.toString()).innerHTML = "Station" + station_id.toString();
}

function createStationById(station_id, station_image, parent_div) 	{
	var top = stations_data.stations[station_id.toString()]['top'];
	var left = stations_data.stations[station_id.toString()]['left'];
	var station_elem = document.createElement("div");
	station_elem.setAttribute("id", "station_div"+station_id.toString());
	station_elem.setAttribute("style", "position: absolute; left:"+left+"px; top:"+top+"px;");
	document.getElementById(parent_div).appendChild(station_elem);

	var station_image_elem = document.createElement("img");
	station_image_elem.setAttribute("id", "station"+station_id.toString());
	station_image_elem.setAttribute("src", station_image);
	station_image_elem.setAttribute("height", station_height);
	station_image_elem.setAttribute("width", station_width);
	//station_image_elem.setAttribute("style", "position: absolute; left:"+left+"px; top:"+top+"px;");
	station_image_elem.setAttribute("style", "position: absolute;");
	document.getElementById("station_div"+station_id.toString()).appendChild(station_image_elem);
	
	initializeStationTrophies(station_id, left, top);
}

function getTime(from, to)	{
	for (var i=0; i<paths_data.paths.length; i++)	{
		if (paths_data.paths[i]['from'] == from && paths_data.paths[i]['to'] == to)	{
			return paths_data.paths[i]['time'];
		}
	}
}

function createPaths(parent_div)	{
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
			start_point_left = start_point_left + station_width +5;
			for (j=start_point_left; j<end_point_left-size;)	{
				var arrow_elem = document.createElement("img");
				var elem_num = Math.floor(j / (2*size));
				arrow_elem.setAttribute("src", station_static_image);
				arrow_elem.setAttribute("height", size);
				arrow_elem.setAttribute("width", size);
				arrow_elem.setAttribute("style", "position: absolute; left:"+j+"px; top:"+top+"px;");
				document.getElementById(parent_div).appendChild(arrow_elem);
				j += 2*size;
			}
			/*var time = getTime(from_station, to_station);
			var time_elem = document.createElement("div");
			time_elem.setAttribute("style", "position: absolute; left:"+(end_point_left-90)+"px; top:"+(top-30)+"px; font-size:24px; font-weight:bold; color:#60bf86");
			time_elem.innerHTML = "Time: " + time;
			document.getElementById(parent_div).appendChild(time_elem);*/
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
			}
			start_point_top += station_height/2;
			start_point_left += station_width/2;
			end_point_left += station_width/2;
			end_point_top += station_height/2;
			for (j=start_point_top; j<end_point_top;)	{
				var arrow_elem = document.createElement("img");
				var elem_num = Math.floor( (j-start_point_top) / (2*size));
				var left = start_point_left;
				if (start_point_left < end_point_left)	{
					left += (end_point_left - start_point_left) * (j-start_point_top) / (end_point_top-start_point_top);
				}
				else 	{
					left -= Math.abs((end_point_left - start_point_left) * (j-start_point_top) / (end_point_top-start_point_top));
				}
				arrow_elem.setAttribute("src", station_static_image);
				arrow_elem.setAttribute("height", size);
				arrow_elem.setAttribute("width", size);
				arrow_elem.setAttribute("style", "position: absolute; left:"+left+"px; top:"+j+"px;z-index:1;");
				document.getElementById(parent_div).appendChild(arrow_elem);
				j += 2*size;
			}
			/*var time = getTime(from_station, to_station);
			var time_elem = document.createElement("div");
			time_elem.setAttribute("style", "position: absolute; left:"+(start_point_left+Math.abs(end_point_left-start_point_left)/2+40)+"px; top:"+(start_point_top + Math.abs(end_point_top-start_point_top)/2+35)+"px; font-size:24px; font-weight:bold; color:#60bf86");
			time_elem.innerHTML = "Time: " + time;
			document.getElementById(parent_div).appendChild(time_elem);*/
		}
	}
}



// Time or Life bar
var max_time = 100;
var timeLeft;
var time_unit_width = 22;
var time_unit_height = 22;
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
	if (from_station != to_station)	{
		timeTaken = timeTaken + 1;
	}
	if ((timeLeft - timeTaken) < 0)	{
		alert("Illegal move");
		return false;
	}
	timeLeft -= timeTaken;
	//for(id=timeLeft-1; id >= (timeLeft - timeTaken); id--) {
	for(id=0; id < (max_time - timeLeft); id++) {
		document.getElementById("time"+id.toString()).src = unfilled_heart_image;
	}
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
var max_score_width = 400;
var total_score = 0;

function updateScore(station_id, score)	{
	total_score += score;
	if (total_score < 0)	{
		total_score = 0;
	}
	disable_play();
	document.getElementById('score-value').innerHTML = total_score;
	for (var i=total_score-score; i< total_score; i++)	{
		var trophy_elem = document.createElement("img");
		trophy_elem.setAttribute("id", "trophy_bar"+i.toString());
		trophy_elem.setAttribute("src", trophy_image);
		trophy_elem.setAttribute("height", 12);
		trophy_elem.setAttribute("width", 12);
		trophy_elem.setAttribute("style", "position: relative; left:"+2+"px; top:"+2+"px;");
		document.getElementById("score-div").appendChild(trophy_elem);
	}
}

var score_left = 0;
var score_top = 0;
function initializeScore()	{
	total_score = 0;
	// get location of score div (using jQuery)
	var offset = $(document.getElementById("score-div")).offset();
	score_left = offset.left
	score_top = offset.top;
}
