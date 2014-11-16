var stations_2_json = '{ "stations" : ' +
'{"1" : {	"top" : 100,	"left" : 50,	"trophies" : 10	},' +
' "2" : {	"top" : 400,	"left" : 250,	"trophies" : 7	},' +
' "3" : {	"top" : 100,	"left" : 450,	"trophies" : 4	},' +
' "4" : {	"top" : 400,	"left" : 650,	"trophies" : 8	},' +
' "5" : {	"top" : 100,	"left" : 900,	"trophies" : 2	},' +
' "6" : {	"top" : 400,	"left" : 1080,	"trophies" : 9	}}	}';
var stations_2_data = JSON.parse(stations_2_json);

var direct_paths_2_json = '{ "paths" : ['+
' {"from":"1", "to":"3", "orientation":"horizontal" }, ' +
' {"from":"3", "to":"2", "orientation":"diagonal" }, ' +
' {"from":"2", "to":"4", "orientation":"horizontal" }, ' +
' {"from":"3", "to":"4", "orientation":"diagonal" }, ' +
' {"from":"3", "to":"5", "orientation":"horizontal" }, ' +
' {"from":"4", "to":"6", "orientation":"horizontal" } ' +
' ] }';
var direct_paths_2 = JSON.parse(direct_paths_2_json);

var station_loop_time = 1;
var station_change_time = 0;
var paths_2_json = '{ "paths" : ['+
' {"from":"1", "to":"1", "shortest_path": [1], "time":' +station_loop_time+ ' }, ' +
' {"from":"1", "to":"2", "shortest_path": [1, 3, 2], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"1", "to":"3", "shortest_path": [1, 3], "time":1 }, ' +
' {"from":"1", "to":"4", "shortest_path": [1, 3, 4], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"1", "to":"5", "shortest_path": [1, 3, 5], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"1", "to":"6", "shortest_path": [1, 3, 4, 6], "time":' + (3+2*station_change_time) + ' }, ' +
' {"from":"2", "to":"1", "shortest_path": [2, 3, 1], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"2", "to":"2", "shortest_path": [2], "time":' +station_loop_time+ ' }, ' +
' {"from":"2", "to":"3", "shortest_path": [2, 3], "time":1 }, ' +
' {"from":"2", "to":"4", "shortest_path": [2, 4], "time":1 }, ' +
' {"from":"2", "to":"5", "shortest_path": [2, 3, 5], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"2", "to":"6", "shortest_path": [2, 4, 6], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"3", "to":"1", "shortest_path": [3, 1], "time":1 }, ' +
' {"from":"3", "to":"2", "shortest_path": [3, 2], "time":1 }, ' +
' {"from":"3", "to":"3", "shortest_path": [3], "time":' +station_loop_time+ ' }, ' +
' {"from":"3", "to":"4", "shortest_path": [3, 4], "time":1 }, ' +
' {"from":"3", "to":"5", "shortest_path": [3, 5], "time":1 }, ' +
' {"from":"3", "to":"6", "shortest_path": [3, 4, 6], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"4", "to":"1", "shortest_path": [4, 3, 1], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"4", "to":"2", "shortest_path": [4, 2], "time":1 }, ' +
' {"from":"4", "to":"3", "shortest_path": [4, 3], "time":1 }, ' +
' {"from":"4", "to":"4", "shortest_path": [4], "time":' +station_loop_time+ ' }, ' +
' {"from":"4", "to":"5", "shortest_path": [4, 3, 5], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"4", "to":"6", "shortest_path": [4, 6], "time":1 }, ' +
' {"from":"5", "to":"1", "shortest_path": [5, 3, 1], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"5", "to":"2", "shortest_path": [5, 3, 2], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"5", "to":"3", "shortest_path": [5, 3], "time":1 }, ' +
' {"from":"5", "to":"4", "shortest_path": [5, 3, 4], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"5", "to":"5", "shortest_path": [5], "time":' +station_loop_time+ ' }, ' +
' {"from":"5", "to":"6", "shortest_path": [5, 3, 4, 6], "time":' + (3+2*station_change_time) + ' }, ' +
' {"from":"6", "to":"1", "shortest_path": [6, 4, 3, 1], "time":' + (3+2*station_change_time) + ' }, ' +
' {"from":"6", "to":"2", "shortest_path": [6, 4, 2], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"6", "to":"3", "shortest_path": [6, 4, 3], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"6", "to":"4", "shortest_path": [6, 4], "time":1 }, ' +
' {"from":"6", "to":"5", "shortest_path": [6, 4, 3, 5], "time":' + (3+2*station_change_time) + ' }, ' +
' {"from":"6", "to":"6", "shortest_path": [6], "time":' +station_loop_time+ ' } ' +
' ] }';
var paths_2_data = JSON.parse(paths_2_json);

var strategy_2_json = '{ "strategies": [ { "1":[], "2":[6], "3":[3], "4":[3], "5":[3,6], "6":[3], "7":[], "8":[], "9":[3,6], "10":[3], "11":[3], "12":[3], "13":[3,6], "14":[6], "15":[], "16":[1], "17":[1], "18":[1], "19":[1,6], "20":[1], "21":[1], "22":[], "23":[6], "24":[3,6], "25":[3,6], "26":[3], "27":[3], "28":[3], "29":[3], "30":[], "31":[6], "32":[3], "33":[], "34":[6], "35":[1], "36":[1], "37":[1], "38":[], "39":[], "40":[1], "41":[1], "42":[1], "43":[1,6], "44":[1], "45":[], "46":[], "47":[6], "48":[], "49":[3,6], "50":[3], "51":[3,6], "52":[3], "53":[3], "54":[3], "55":[3], "56":[3], "57":[3,6], "58":[3,6], "59":[6], "60":[6], "61":[6], "62":[6], "63":[6], "64":[], "65":[3,6], "66":[], "67":[], "68":[6], "69":[6], "70":[6], "71":[6], "72":[3], "73":[], "74":[2], "75":[6], "76":[3,6], "77":[], "78":[], "79":[1,6], "80":[6], "81":[], "82":[1], "83":[1,6], "84":[6], "85":[], "86":[], "87":[], "88":[3], "89":[3], "90":[3], "91":[3], "92":[6], "93":[], "94":[3,6], "95":[3,6], "96":[3], "97":[3,6], "98":[3], "99":[], "100":[] } , { "1":[1,6], "2":[1], "3":[1,6], "4":[1], "5":[1], "6":[1], "7":[1], "8":[], "9":[], "10":[1,6], "11":[1,6], "12":[1], "13":[1,6], "14":[1,6], "15":[1,6], "16":[1], "17":[1], "18":[6], "19":[6], "20":[1], "21":[1,6], "22":[1,6], "23":[], "24":[6], "25":[3,6], "26":[3], "27":[], "28":[6], "29":[1], "30":[1], "31":[1], "32":[1], "33":[1,6], "34":[1], "35":[1,6], "36":[1], "37":[1,6], "38":[1,6], "39":[6], "40":[6], "41":[], "42":[], "43":[3,6], "44":[3,6], "45":[3], "46":[3], "47":[3], "48":[3,6], "49":[3], "50":[3,6], "51":[3], "52":[3], "53":[3,6], "54":[3,6], "55":[3,6], "56":[], "57":[6], "58":[3,6], "59":[3,6], "60":[3], "61":[3,6], "62":[3], "63":[3,6], "64":[3], "65":[], "66":[], "67":[3], "68":[3], "69":[3], "70":[3,6], "71":[3,6], "72":[3,6], "73":[3], "74":[3,6], "75":[3], "76":[3,6], "77":[], "78":[], "79":[3], "80":[3,6], "81":[6], "82":[], "83":[1,6], "84":[1,6], "85":[1], "86":[1], "87":[1], "88":[1], "89":[1], "90":[], "91":[6], "92":[3,6], "93":[], "94":[6], "95":[3], "96":[3], "97":[3,6], "98":[3,6], "99":[3], "100":[3] } ] }';
var strategy_2_data = JSON.parse(strategy_2_json);
