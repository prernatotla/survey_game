var stations_3_json = '{ "stations" : ' +
'{"1" : {	"top" : 400,	"left" : 50,	"trophies" : 2	},' +
' "2" : {	"top" : 100,	"left" : 50,	"trophies" : 9	},' +
' "3" : {	"top" : 400,	"left" : 350,	"trophies" : 7	},' +
' "4" : {	"top" : 100,	"left" : 350,	"trophies" : 4	},' +
' "5" : {	"top" : 250,	"left" : 700,	"trophies" : 10	},' +
' "6" : {	"top" : 250,	"left" : 1100,	"trophies" : 8	}}	}';
var stations_3_data = JSON.parse(stations_3_json);

var direct_paths_3_json = '{ "paths" : ['+
' {"from":"1", "to":"2", "orientation":"diagonal" }, ' +
' {"from":"1", "to":"3", "orientation":"horizontal" }, ' +
' {"from":"2", "to":"4", "orientation":"horizontal" }, ' +
' {"from":"3", "to":"4", "orientation":"diagonal" }, ' +
' {"from":"5", "to":"3", "orientation":"diagonal" }, ' +
' {"from":"4", "to":"5", "orientation":"diagonal" }, ' +
' {"from":"5", "to":"6", "orientation":"horizontal" } ' +
' ] }';
var direct_paths_3 = JSON.parse(direct_paths_3_json);

var station_loop_time = 1;
var station_change_time = 0;
var paths_3_json = '{ "paths" : ['+
' {"from":"1", "to":"1", "shortest_path": [1], "time":' +station_loop_time+ ' }, ' +
' {"from":"1", "to":"2", "shortest_path": [1, 2], "time":1 }, ' +
' {"from":"1", "to":"3", "shortest_path": [1, 3], "time":1 }, ' +
' {"from":"1", "to":"4", "shortest_path": [1, 2, 4], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"1", "to":"5", "shortest_path": [1, 3, 5], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"1", "to":"6", "shortest_path": [1, 3, 5, 6], "time":' + (3+2*station_change_time) + ' }, ' +
' {"from":"2", "to":"1", "shortest_path": [2, 1], "time":1 }, ' +
' {"from":"2", "to":"2", "shortest_path": [2], "time":' +station_loop_time+ ' }, ' +
' {"from":"2", "to":"3", "shortest_path": [2, 1, 3], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"2", "to":"4", "shortest_path": [2, 4], "time":1 }, ' +
' {"from":"2", "to":"5", "shortest_path": [2, 4, 5], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"2", "to":"6", "shortest_path": [2, 4, 5, 6], "time":' + (3+2*station_change_time) + ' }, ' +
' {"from":"3", "to":"1", "shortest_path": [3, 1], "time":1 }, ' +
' {"from":"3", "to":"2", "shortest_path": [3, 4, 2], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"3", "to":"3", "shortest_path": [3], "time":' +station_loop_time+ ' }, ' +
' {"from":"3", "to":"4", "shortest_path": [3, 4], "time":1 }, ' +
' {"from":"3", "to":"5", "shortest_path": [3, 5], "time":1 }, ' +
' {"from":"3", "to":"6", "shortest_path": [3, 5, 6], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"4", "to":"1", "shortest_path": [4, 3, 1], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"4", "to":"2", "shortest_path": [4, 2], "time":1 }, ' +
' {"from":"4", "to":"3", "shortest_path": [4, 3], "time":1 }, ' +
' {"from":"4", "to":"4", "shortest_path": [4], "time":' +station_loop_time+ ' }, ' +
' {"from":"4", "to":"5", "shortest_path": [4, 5], "time":1 }, ' +
' {"from":"4", "to":"6", "shortest_path": [4, 5, 6], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"5", "to":"1", "shortest_path": [5, 3, 1], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"5", "to":"2", "shortest_path": [5, 4, 2], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"5", "to":"3", "shortest_path": [5, 3], "time":1 }, ' +
' {"from":"5", "to":"4", "shortest_path": [5, 4], "time":1 }, ' +
' {"from":"5", "to":"5", "shortest_path": [5], "time":' +station_loop_time+ ' }, ' +
' {"from":"5", "to":"6", "shortest_path": [5, 6], "time":1 }, ' +
' {"from":"6", "to":"1", "shortest_path": [6, 5, 3, 1], "time":' + (3+2*station_change_time) + ' }, ' +
' {"from":"6", "to":"2", "shortest_path": [6, 5, 4, 2], "time":' + (3+2*station_change_time) + ' }, ' +
' {"from":"6", "to":"3", "shortest_path": [6, 5, 3], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"6", "to":"4", "shortest_path": [6, 5, 4], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"6", "to":"5", "shortest_path": [6, 5], "time":1 }, ' +
' {"from":"6", "to":"6", "shortest_path": [6], "time":' +station_loop_time+ ' } ' +
' ] }';
var paths_3_data = JSON.parse(paths_3_json);

var strategy_3_json = '{ "strategies": [ { "1":[2], "2":[2], "3":[], "4":[1], "5":[1], "6":[6], "7":[], "8":[6], "9":[], "10":[], "11":[], "12":[], "13":[2], "14":[2,6], "15":[2], "16":[2], "17":[2], "18":[2], "19":[6], "20":[], "21":[6], "22":[1], "23":[6], "24":[2], "25":[2], "26":[2], "27":[6], "28":[6], "29":[6], "30":[1], "31":[1,6], "32":[1], "33":[1], "34":[], "35":[2,6], "36":[2], "37":[2], "38":[2], "39":[2], "40":[], "41":[1,6], "42":[], "43":[2], "44":[6], "45":[6], "46":[2,6], "47":[], "48":[], "49":[2,6], "50":[], "51":[3,6], "52":[6], "53":[6], "54":[1,6], "55":[1], "56":[1], "57":[1,6], "58":[], "59":[2], "60":[6], "61":[6], "62":[2,6], "63":[2], "64":[2,6], "65":[6], "66":[1,6], "67":[1], "68":[], "69":[2,6], "70":[2], "71":[], "72":[6], "73":[2,6], "74":[2], "75":[2], "76":[2], "77":[], "78":[], "79":[2], "80":[2], "81":[2], "82":[2], "83":[2], "84":[6], "85":[1], "86":[1], "87":[1], "88":[], "89":[2], "90":[2], "91":[2], "92":[2], "93":[6], "94":[], "95":[], "96":[1], "97":[6], "98":[2], "99":[], "100":[] } , { "1":[5], "2":[], "3":[1], "4":[], "5":[2,6], "6":[], "7":[], "8":[2], "9":[2], "10":[], "11":[1,6], "12":[6], "13":[], "14":[3], "15":[6], "16":[2], "17":[2], "18":[2,6], "19":[2], "20":[2], "21":[2], "22":[2], "23":[2], "24":[2], "25":[2], "26":[2], "27":[6], "28":[6], "29":[2,6], "30":[6], "31":[], "32":[2], "33":[2,6], "34":[2,6], "35":[], "36":[6], "37":[2,6], "38":[2,6], "39":[], "40":[], "41":[], "42":[], "43":[2,6], "44":[], "45":[1,6], "46":[], "47":[6], "48":[], "49":[2,6], "50":[], "51":[], "52":[2,6], "53":[2], "54":[], "55":[6], "56":[2], "57":[6], "58":[1], "59":[], "60":[6], "61":[1,6], "62":[1,6], "63":[1,6], "64":[], "65":[], "66":[], "67":[2,6], "68":[2], "69":[6], "70":[1], "71":[1], "72":[], "73":[], "74":[6], "75":[2,6], "76":[2,6], "77":[2], "78":[2], "79":[], "80":[], "81":[2,6], "82":[], "83":[], "84":[6], "85":[], "86":[6], "87":[6], "88":[], "89":[1], "90":[1,6], "91":[], "92":[2,6], "93":[], "94":[], "95":[2,6], "96":[], "97":[], "98":[2,6], "99":[2,6], "100":[6] } ] }';
var strategy_3_data = JSON.parse(strategy_3_json);
