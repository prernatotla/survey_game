var from_station = null;
var to_station = null;
var officer_present = false;
var trial_number = 1;
var max_trials = 5;

var store_data = "";
var amt_id = 0;

var officer_strategy = [];
var officer_strategy_num = 0;

var exit_rate = 0.1;
var exitRate_gameOver = false;


//disable clicks (for animation in progress)
function disable_play() {
	removeEventListeners();
}

// enable clicks (after animation)
function enable_play() {
	changeImageSource("station"+to_station.toString(), station_static_image);
	var police_elem = document.getElementById('police_image');
	if (police_elem != null)	{
		document.getElementById('game-div').removeChild(police_elem);
	}
	from_station = to_station;
	to_station = null;
	document.getElementById('overlay').style.visibility = "hidden";
	addEventListeners();
}

function resetGame()	{
	document.getElementById('game-div').innerHTML = '';
	document.getElementById('score-div').innerHTML = '<div id="score-label" style="width:50%; float:left; font-size:25px; color:white;"><b>SCORE:</b></div><div id="score-value" style="width:50%; float:right; font-size:25px; color:white;">0</div>';
	document.getElementById('time-div').innerHTML = '<div id="time-label" style="width:50%; float:left; font-size:25px; color:white;"><b>TIME:</b></div><div id="time-value" style="width:50%; float:right; font-size:25px; color:white;">0</div>';
	exitRate_gameOver = false;
}

function addEventListeners()	{
	document.getElementById('rouletteLabel').style.visibility = "hidden";
	document.getElementById('roulette_image').style.visibility = "hidden";
	document.getElementById('dial_image').style.visibility = "hidden";

	if (checkGameOver())	{
		store_data += "];;";
		trial_number += 1;
		if (trial_number <= max_trials)	{
			resetGame();
			initializeGame(trial_number);
		}
		else 	{
			if (amt_id == null)	{
				amt_id = 0;
			}
			store_data += ";amt_user:" + amt_id;
			$.post(
				"store_game_info.php", 
				{ data:store_data},
				function(data, status) 
				{
					window.location.replace("./survey.html?amt_id="+amt_id);	
				}
			);
		}
		return;
	}
	for (var i=1; i<=num_stations; i++)	{
		var elem = document.getElementById("station_div"+i.toString());
		elem.addEventListener("click", onStationClick, false);
	}
	var ag = document.getElementById("agent-img");
	if (ag != null)	{
		ag.addEventListener("click", onAgentClick, false);
	}
	
	document.getElementById('instructions-div').innerHTML = "<br><b>MESSAGE BOARD:</b><br><br><br>&nbsp&nbsp&nbsp Click any station to move there...";
}

function removeEventListeners()	{
	for (var i=1; i<=num_stations; i++)	{
		var elem = document.getElementById("station_div"+i.toString());
		elem.removeEventListener("click", onStationClick, false);
	}
	var ag = document.getElementById("agent-img");
	if (ag != null)	{
		ag.removeEventListener("click", onAgentClick, false);
	}
}

function highlightStation()	{
	if (from_station != null)	{
		changeImageSource("station"+from_station.toString(), station_static_image);
	}
	if (to_station != null)	{
		if (checkForOfficer())	{
			changeImageSource("station"+to_station.toString(), station_highlighted_stop_image);
			var station_elem = document.getElementById("station_div"+to_station.toString());
			var police_elem = document.createElement("img");
			police_elem.setAttribute("id", "police_image");
			police_elem.setAttribute("src", police_image);
			police_elem.setAttribute("height", 150);
			police_elem.setAttribute("width", 150);
			police_elem.setAttribute("style", "position: absolute; z-index:10; left:"+station_elem.style.left+"; top:"+station_elem.style.top+";");
			document.getElementById("game-div").appendChild(police_elem);
			document.getElementById('instructions-div').innerHTML = "<br><b>MESSAGE BOARD:</b><br><br><br>&nbsp&nbsp&nbsp Oh no! You are stopped from getting the stars...";
		}
		else 	{
			changeImageSource("station"+to_station.toString(), station_highlighted_image);
			updateScoreBar();
		}
	}
	store_data += ",time:" + timeLeft.toString() + ",score:" + total_score.toString();
	setTimeout(animateExitRate, 1700);
}

function onAgentClick(event)	{
	if (event.target != null) {
		to_station = from_station;
		var updated = updateTimeBar();
		if (!updated)	{
			return;
		}
		store_data += "station:" + to_station.toString();
		disable_play();
		moveAgent();
	}
}

function onStationClick(event)	{
	if (event.target != null) {
		to_station = event.target.id.charAt(event.target.id.length - 1);
		var updated = updateTimeBar();
		if (!updated)	{
			return;
		}
		store_data += "station:" + to_station.toString();
		disable_play();
		moveAgent();
	}
}

function moveAgent()	{
	agentMoving = true;
	var shortest_path = null;
	for (var i=0; i<paths_data.paths.length; i++)	{
		if (paths_data.paths[i]['from'] == from_station && paths_data.paths[i]['to'] == to_station)	{
			shortest_path = paths_data.paths[i]['shortest_path'];
			break;
		}
	}
	if (shortest_path.length < 2)	{
		highlightStation();
		return;
	}
	var i=0;
	moveNext();

	function moveNext()	{
		var from = shortest_path[i];
		var to = shortest_path[i+1];
		var station_top = stations_data.stations[to.toString()]['top'];
		var station_left = stations_data.stations[to.toString()]['left'];
		var agentElem = document.getElementById('agent-img');
		var callback =  moveNext;
		i += 1;
		if (i == shortest_path.length-1)	{
			callback = highlightStation;
		}
		var orientation = 'horizontal';
		for (var j=0; j<direct_paths.paths.length; j++)	{
			if ((from == direct_paths.paths[j]['from'] && to == direct_paths.paths[j]['to']) || (from == direct_paths.paths[j]['to'] && to == direct_paths.paths[j]['from']))	{
				orientation = direct_paths.paths[j]['orientation'];
				break;
			}
		}
		if (orientation == 'horizontal')	{
			move(agentElem, (station_left + (station_width - agentSize)/2), (station_top + (station_height - agentSize)/2), callback, 2);
		}
		else 	{
			move(agentElem, (station_left + (station_width - agentSize)/2), (station_top + (station_height - agentSize)/2), callback, 9);
		}
	}
}

function animateExitRate()	{
	document.getElementById('rouletteLabel').style.visibility = "visible";
	document.getElementById('roulette_image').style.visibility = "visible";
	document.getElementById('dial_image').style.visibility = "visible";
	document.getElementById('overlay').style.visibility = "visible";

	document.getElementById('instructions-div').innerHTML = "<br><b>MESSAGE BOARD:</b><br><br><br>&nbsp&nbsp&nbsp Please wait to see if you can continue playing...";
	// Exit rate check
	var rand = Math.random();
	var rotate_till = (2+rand)*360;
	var rotated = 0;
	function rotate() {
		document.getElementById('dial_image').style.transform = "rotate(" + rotated.toString() + "deg)";
		rotated += 5;
		if (rotated >= rotate_till) { // check finish condition
			clearInterval(id);
			setTimeout(enable_play, 1500);
			//enable_play();
		}
	}
	var id = setInterval(rotate, 5); // rotate every x ms
	store_data += ",random:" + rand.toString() + ";";
	exitRate_gameOver = false;
	if (rand <= exit_rate)	{
		exitRate_gameOver = true;
	}
}

function exitRateGameOver()	{
	if (exitRate_gameOver == true)	{
		document.getElementById('instructions-div').innerHTML = "<br><b>MESSAGE BOARD:</b><br><br><br>&nbsp&nbsp&nbsp Oh no! You need to escape! Run... Score: " + total_score.toString();
		alert("Game over! (Exit rate).. Score: " + total_score.toString());
	}
}

function checkGameOver()	{
	if (from_station == null)	{
		return false;
	}
	var gameOver = true;
	for (var i=0; i<paths_data.paths.length; i++)	{
		if (from_station.toString() == paths_data.paths[i]['from'] && from_station.toString() != paths_data.paths[i]['to'])	{
			if (timeLeft >= paths_data.paths[i]['time'])	{
				gameOver = false;
			}
		}
	}
	if (exitRate_gameOver == true)	{
		exitRateGameOver();
		return true;
	}
	
	if (gameOver)	{
		document.getElementById('instructions-div').innerHTML = "<br><b>MESSAGE BOARD:</b><br><br><br>&nbsp&nbsp&nbsp Game over! Score: "+ total_score.toString();
		alert("Game over! Score: "+ total_score.toString());
		return true;
	}
	return false;
}

function updateTimeBar()	{
	var timeTaken = 0;
	for (var i=0; i<paths_data.paths.length; i++)	{
		if (from_station.toString() == paths_data.paths[i]['from'] && to_station.toString() == paths_data.paths[i]['to'])	{
			timeTaken = paths_data.paths[i]['time'];
			var updated = updateTime(timeTaken);
			return updated;
		}
	}
	return false;
}

function updateScoreBar()	{
	document.getElementById('instructions-div').innerHTML = "<br><b>MESSAGE BOARD:</b><br><br><br>&nbsp&nbsp&nbsp Amazing! You get more stars...";
	var trophies = stations_data.stations[to_station.toString()]['trophies'];
	updateScore(to_station.toString(), trophies);
}

function checkForOfficer()	{
	var strategy = officer_strategy[(max_time - timeLeft).toString()];
	if (strategy.length > 0)	{
		for (var i=0; i<strategy.length; i++)	{
			if (strategy[i] == to_station)	{
				return true;
			}
		}
	}
	return false;
}

// callback is the function to run after animation 
// speed is in ms, lower value faster animation
function move(elem, target_left, target_top, callback, speed) {
	var offset = $( elem ).offset();
	var left = offset.left;
	var top = offset.top;
	var ratio = Math.abs(target_top - offset.top)/Math.abs(target_left - offset.left);
	function frame() {
		if (target_left > left)
			left += 2;  // update parameters
		else
			left -= 2;
		if (target_top > top)
			top = top + ratio*2;
		else if (target_top < top)
			top = top - ratio*2;
		elem.style.left = left + 'px'; // show frame
		elem.style.top = top + 'px'; // show frame
		if (Math.floor(left) == Math.floor(target_left)) { // check finish condition
		  clearInterval(id);
		  callback();
		}
	}
	var id = setInterval(frame, speed); // draw every 10ms
	return true;
}

// callback is the function to run after animation 
// speed is in ms, lower value faster animation
function move_all(elems, target_left, target_top, callback, speed) {
	if(elems.length == 0) {
		return false;
	}
	var offset = new Array(elems.length);
	for(var i=0; i<elems.length;i++) {
		offset[i] = $( elems[i] ).offset();
	}
	var ratio = (target_top - offset[0].top)/(target_left - offset[0].left);
	function frame() {
		for(var i=0; i<elems.length;i++) {
			offset[i].left = offset[i].left + 1;
			offset[i].top = offset[i].top + ratio;
			elems[i].style.left = offset[i].left + 'px'; // show frame
			elems[i].style.top = offset[i].top + 'px'; // show frame
		}
		if (offset[0].left == target_left) { // check finish condition
		  clearInterval(id);
		  callback();
		}
	}
	var id = setInterval(frame, speed); // draw every 10ms
	return true;
}


