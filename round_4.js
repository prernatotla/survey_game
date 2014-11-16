var stations_4_json = '{ "stations" : ' +
'{"1" : {	"top" : 400,	"left" : 50,	"trophies" : 10	},' +
' "2" : {	"top" : 100,	"left" : 50,	"trophies" : 6	},' +
' "3" : {	"top" : 400,	"left" : 500,	"trophies" : 7	},' +
' "4" : {	"top" : 100,	"left" : 500,	"trophies" : 9	},' +
' "5" : {	"top" : 400,	"left" : 1000,	"trophies" : 6	},' +
' "6" : {	"top" : 100,	"left" : 1000,	"trophies" : 2	}}	}';
var stations_4_data = JSON.parse(stations_4_json);

var direct_paths_4_json = '{ "paths" : ['+
' {"from":"1", "to":"2", "orientation":"diagonal" }, ' +
' {"from":"1", "to":"3", "orientation":"horizontal" }, ' +
' {"from":"2", "to":"3", "orientation":"diagonal" }, ' +
' {"from":"2", "to":"4", "orientation":"horizontal" }, ' +
' {"from":"3", "to":"4", "orientation":"diagonal" }, ' +
' {"from":"3", "to":"5", "orientation":"horizontal" }, ' +
' {"from":"4", "to":"5", "orientation":"diagonal" }, ' +
' {"from":"6", "to":"4", "orientation":"horizontal" } ' +
' ] }';
var direct_paths_4 = JSON.parse(direct_paths_4_json);

var station_loop_time = 1;
var station_change_time = 0;
var paths_4_json = '{ "paths" : ['+
' {"from":"1", "to":"1", "shortest_path": [1], "time":' +station_loop_time+ ' }, ' +
' {"from":"1", "to":"2", "shortest_path": [1, 2], "time":1 }, ' +
' {"from":"1", "to":"3", "shortest_path": [1, 3], "time":1 }, ' +
' {"from":"1", "to":"4", "shortest_path": [1, 2, 4], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"1", "to":"5", "shortest_path": [1, 3, 5], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"1", "to":"6", "shortest_path": [1, 3, 4, 6], "time":' + (3+2*station_change_time) + ' }, ' +
' {"from":"2", "to":"1", "shortest_path": [2, 1], "time":1 }, ' +
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
' {"from":"4", "to":"5", "shortest_path": [4, 5], "time":1 }, ' +
' {"from":"4", "to":"6", "shortest_path": [4, 6], "time":1 }, ' +
' {"from":"5", "to":"1", "shortest_path": [5, 3, 1], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"5", "to":"2", "shortest_path": [5, 4, 2], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"5", "to":"3", "shortest_path": [5, 3], "time":1 }, ' +
' {"from":"5", "to":"4", "shortest_path": [5, 4], "time":1 }, ' +
' {"from":"5", "to":"5", "shortest_path": [5], "time":' +station_loop_time+ ' }, ' +
' {"from":"5", "to":"6", "shortest_path": [5, 4, 6], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"6", "to":"1", "shortest_path": [6, 4, 2, 1], "time":' + (3+2*station_change_time) + ' }, ' +
' {"from":"6", "to":"2", "shortest_path": [6, 4, 2], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"6", "to":"3", "shortest_path": [6, 4, 3], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"6", "to":"4", "shortest_path": [6, 4], "time":1 }, ' +
' {"from":"6", "to":"5", "shortest_path": [6, 4, 5], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"6", "to":"6", "shortest_path": [6], "time":' +station_loop_time+ ' } ' +
' ] }';
var paths_4_data = JSON.parse(paths_4_json);

var strategy_4_json = '{ "strategies": [ { "1":[1,4], "2":[1], "3":[], "4":[6], "5":[6], "6":[2,6], "7":[2], "8":[], "9":[], "10":[6], "11":[1], "12":[1,6], "13":[1], "14":[1], "15":[1,6], "16":[1,6], "17":[1], "18":[1,6], "19":[6], "20":[], "21":[1], "22":[6], "23":[], "24":[1,6], "25":[6], "26":[], "27":[3,6], "28":[6], "29":[], "30":[6], "31":[], "32":[1], "33":[1,6], "34":[1], "35":[6], "36":[6], "37":[], "38":[6], "39":[], "40":[6], "41":[3,6], "42":[6], "43":[6], "44":[1], "45":[6], "46":[], "47":[1,6], "48":[], "49":[], "50":[], "51":[], "52":[], "53":[1], "54":[1], "55":[1,6], "56":[1,6], "57":[6], "58":[6], "59":[1], "60":[1], "61":[1,6], "62":[1,6], "63":[1,6], "64":[1], "65":[6], "66":[], "67":[6], "68":[6], "69":[3], "70":[6], "71":[], "72":[1,6], "73":[1], "74":[1,6], "75":[1,6], "76":[1,6], "77":[1], "78":[1], "79":[6], "80":[6], "81":[], "82":[], "83":[3], "84":[], "85":[6], "86":[], "87":[], "88":[6], "89":[], "90":[6], "91":[6], "92":[1,6], "93":[1,6], "94":[1], "95":[], "96":[2,6], "97":[], "98":[], "99":[6], "100":[6] } , { "1":[1,4], "2":[], "3":[6], "4":[1], "5":[1,6], "6":[1], "7":[1], "8":[1,6], "9":[1], "10":[1], "11":[6], "12":[6], "13":[1], "14":[], "15":[6], "16":[1], "17":[1,6], "18":[1], "19":[], "20":[], "21":[1], "22":[], "23":[6], "24":[6], "25":[], "26":[1,6], "27":[1,6], "28":[1,6], "29":[1,6], "30":[1,6], "31":[1,6], "32":[1,6], "33":[1], "34":[1], "35":[1], "36":[1,6], "37":[1], "38":[1], "39":[1], "40":[6], "41":[6], "42":[1,6], "43":[6], "44":[], "45":[1,6], "46":[1], "47":[1,6], "48":[6], "49":[2,6], "50":[2,6], "51":[], "52":[1,6], "53":[], "54":[], "55":[1], "56":[6], "57":[6], "58":[1,6], "59":[1,6], "60":[6], "61":[], "62":[], "63":[6], "64":[1,6], "65":[1], "66":[6], "67":[2], "68":[6], "69":[1,6], "70":[1,6], "71":[1], "72":[1,6], "73":[], "74":[], "75":[1], "76":[1,6], "77":[1,6], "78":[1,6], "79":[1,6], "80":[1], "81":[1], "82":[1,6], "83":[], "84":[], "85":[6], "86":[6], "87":[6], "88":[6], "89":[1,6], "90":[1,6], "91":[1,6], "92":[1,6], "93":[1,6], "94":[1,6], "95":[1,6], "96":[6], "97":[], "98":[1], "99":[1], "100":[1,6] } ] }';
var strategy_4_data = JSON.parse(strategy_4_json);
