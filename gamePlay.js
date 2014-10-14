var from_station = null;
var to_station = null;
var officer_present = false;

// For now consider a random array of length 15. Modify this to consider a random sampling from data later
var officer_strategy = [1,2,5,4,5,6,6,2,2,1,2,3,3,4,6];

var exit_rate = 0.2;

function addEventListeners()	{
	if (checkGameOver())	{
		return;
	}
	for (var i=1; i<=num_stations; i++)	{
		var elem = document.getElementById("station"+i.toString());
		elem.addEventListener("click", onStationClick, false);
	}
}

function removeEventListeners()	{
	for (var i=1; i<=num_stations; i++)	{
		var elem = document.getElementById("station"+i.toString());
		elem.removeEventListener("click", onStationClick, false);
	}
}

function highlightStation()	{
	if (!updateTimeAndScore())	{
		return;
	}
	if (from_station != null)	{
		changeImageSource("station"+from_station.toString(), station_static_image);
	}
	if (to_station != null)	{
		changeImageSource("station"+to_station.toString(), station_highlighted_image);
	}
	disable_play();
	moveAgent();
}

function onStationClick(event)	{
	if (event.target != null) {
		to_station = event.target.id.charAt(event.target.id.length - 1);
		highlightStation();
	}
}

function moveAgent()	{
	var shortest_path = null;
	for (var i=0; i<paths_data.paths.length; i++)	{
		if (paths_data.paths[i]['from'] == from_station && paths_data.paths[i]['to'] == to_station)	{
			shortest_path = paths_data.paths[i]['shortest_path'];
			break;
		}
	}

	if (shortest_path.length < 2)	{
		enable_play();
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
			callback = enable_play
		}
		move(agentElem, (station_left + (station_width - agentSize)/2), (station_top + (station_height - agentSize)/2), callback, 10);
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
	if (gameOver)	{
		alert("Game over! Score: "+ total_score.toString());
		return true;
	}
	return false;
}

function updateTimeAndScore()	{
	var timeTaken = 0;
	for (var i=0; i<paths_data.paths.length; i++)	{
		if (from_station.toString() == paths_data.paths[i]['from'] && to_station.toString() == paths_data.paths[i]['to'])	{
			timeTaken = paths_data.paths[i]['time'];
			var updated = updateTime(timeTaken);
			if (updated)	{
				if (checkForOfficer())	{
					alert("Caught by officer!!");
				}
				else 	{
					alert("Success!!");
					updateScore(to_station.toString(), stations_data.stations[to_station.toString()]['trophies']);
				}
			}
			return updated;
		}
	}
	return false;
}

function checkForOfficer()	{
	var officer_station = officer_strategy[max_time - timeLeft];
	if (officer_station == to_station)	{
		return true;
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
			left++;  // update parameters
		else
			left--;
		if (target_top > top)
			top = top + ratio;
		else
			top = top - ratio;
		elem.style.left = left + 'px'; // show frame
		elem.style.top = top + 'px'; // show frame
		if (left == target_left) { // check finish condition
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


