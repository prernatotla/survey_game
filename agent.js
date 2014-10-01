var agentSize = 20;
var agentImage = "images/agent.jpg";
var agentPosition_x;
var agentPosition_y;

function initializeAgent()	{
	// Select station at random for agent to start at
	var initial_station = Math.floor(Math.random() * num_stations + 1);
	from_station = initial_station;
	//alert(initial_station);
	var station_top = stations_data.stations[initial_station.toString()]['top'];
	var station_left = stations_data.stations[initial_station.toString()]['left'];
	agentPosition_x = station_left + (station_width - agentSize)/2;
	agentPosition_y = station_top + (station_height - agentSize)/2;
	createAgent();
	//window.addEventListener("keydown", keydownAction, false);
}

function createAgent()	{
	var agent = document.createElement("img");
	agent.setAttribute("id", "agent-img");
	agent.setAttribute("src", agentImage);
	agent.setAttribute("height", agentSize);
	agent.setAttribute("width", agentSize);
	agent.setAttribute("style", "position: absolute; left:" +agentPosition_x+ "px; top:" +agentPosition_y+ "px; z-index:5;");
	document.getElementById("game-div").appendChild(agent);
}

function changePosition()	{
	if (document.getElementById("agent-img") != null)	{
		document.getElementById("agent-img").style.top = agentPosition_y + "px";
		document.getElementById("agent-img").style.left = agentPosition_x + "px";
	}
}

function moveAgent(fromStation, toStation)	{
	// Choose shortest path and move agent
}

/*
function keydownAction(event) {
	var keyCode = event.keyCode;
	if ([37, 38, 39, 40].indexOf(keyCode) > -1) {
		event.preventDefault();
	}

	if (keyCode == 38) {
		// up
		agentPosition_y -= agentSize;
		if (agentPosition_y < agentMinTop)	{
			agentPosition_y = agentMinTop;
		}
	} else if (keyCode == 40) {
		// down
		agentPosition_y += agentSize;
		if (agentPosition_y > agentMaxTop)	{
			agentPosition_y = agentMaxTop;
		}
	} else if (keyCode == 37) {
		// left
		agentPosition_x -= agentSize;
		if (agentPosition_x < agentMinLeft)	{
			agentPosition_x = agentMinLeft;
		}

	} else if (keyCode == 39) {
		// right
		agentPosition_x += agentSize;
		if (agentPosition_x > agentMaxLeft)	{
			agentPosition_x = agentMaxLeft;
		}
	}
	//refreshAgent();
	changePosition();
}
*/

