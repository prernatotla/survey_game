var from_station = null;
var to_station = null;
var officer_present = false;

// For now consider a random array of length 15. Modify this to consider a random sampling from data later
var officer_strategy = [1,2,5,4,5,6,6,2,2,1,2,3,3,4,6];

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
		/*hstation_obj = document.getElementById("station"+from_station.toString());
		if (hstation_obj != null)	{
			hstation_obj.remove();
		}*/
		//createStationById(from_station, station_static_image);
		changeImageSource("station"+from_station.toString(), station_static_image);
	}
	if (to_station != null)	{
		//createStationById(to_station, station_highlighted_image);
		changeImageSource("station"+to_station.toString(), station_highlighted_image);
		from_station = to_station;
		to_station = null;
	}
	removeEventListeners();
	while (moveAgent())	{}
	addEventListeners();
}

function onStationClick(event)	{
	if (event.target != null) {
		to_station = event.target.id.charAt(event.target.id.length - 1);
		highlightStation();
	}
}

function moveAgent()	{
	var station_top = stations_data.stations[from_station.toString()]['top'];
	var station_left = stations_data.stations[from_station.toString()]['left'];
	agentPosition_x = station_left + (station_width - agentSize)/2;
	agentPosition_y = station_top + (station_height - agentSize)/2;
	changePosition();
	return false;
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
					updateScore(stations_data.stations[to_station.toString()]['trophies']);
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


