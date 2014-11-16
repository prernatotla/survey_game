var stations_0_json = '{ "stations" : ' +
'{"1" : {	"top" : 300,	"left" : 50,	"trophies" : 10	},' +
' "2" : {	"top" : 300,	"left" : 250,	"trophies" : 10	},' +
' "3" : {	"top" : 300,	"left" : 450,	"trophies" : 10	},' +
' "4" : {	"top" : 300,	"left" : 650,	"trophies" : 10	},' +
' "5" : {	"top" : 300,	"left" : 850,	"trophies" : 10	},' +
' "6" : {	"top" : 300,	"left" : 1050,	"trophies" : 10	}}	}';
var stations_0_data = JSON.parse(stations_0_json);

var direct_paths_0_json = '{ "paths" : ['+
' {"from":"1", "to":"2", "orientation":"horizontal" }, ' +
' {"from":"5", "to":"4", "orientation":"horizontal" }, ' +
' {"from":"5", "to":"6", "orientation":"horizontal" }, ' +
' {"from":"4", "to":"3", "orientation":"horizontal" }, ' +
' {"from":"2", "to":"3", "orientation":"horizontal" } ' +
' ] }';
var direct_paths_0 = JSON.parse(direct_paths_0_json);

var station_loop_time = 1;
var station_change_time = 0;
var paths_0_json = '{ "paths" : ['+
' {"from":"1", "to":"1", "shortest_path": [1], "time":' +station_loop_time+ ' }, ' +
' {"from":"1", "to":"2", "shortest_path": [1, 2], "time":1 }, ' +
' {"from":"1", "to":"3", "shortest_path": [1, 2, 3], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"1", "to":"4", "shortest_path": [1, 2, 3, 4], "time":' + (3+2*station_change_time) + ' }, ' +
' {"from":"1", "to":"5", "shortest_path": [1, 2, 3, 4, 5], "time":' + (4+3*station_change_time) + ' }, ' +
' {"from":"1", "to":"6", "shortest_path": [1, 2, 3, 4, 5, 6], "time":' + (5+4*station_change_time) + ' }, ' +
' {"from":"2", "to":"1", "shortest_path": [2, 1], "time":1 }, ' +
' {"from":"2", "to":"5", "shortest_path": [2, 3, 4, 5], "time":' + (3+2*station_change_time) + ' }, ' +
' {"from":"2", "to":"4", "shortest_path": [2, 3, 4], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"2", "to":"2", "shortest_path": [2], "time":' +station_loop_time+ ' }, ' +
' {"from":"2", "to":"3", "shortest_path": [2, 3], "time":1 }, ' +
' {"from":"2", "to":"6", "shortest_path": [2, 3, 4, 5, 6], "time":' + (4+3*station_change_time) + ' }, ' +
' {"from":"3", "to":"1", "shortest_path": [3, 2, 1], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"3", "to":"5", "shortest_path": [3, 4, 5], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"3", "to":"4", "shortest_path": [3, 4], "time":1 }, ' +
' {"from":"3", "to":"2", "shortest_path": [3, 2], "time":1 }, ' +
' {"from":"3", "to":"3", "shortest_path": [3], "time":' +station_loop_time+ ' }, ' +
' {"from":"3", "to":"6", "shortest_path": [3, 4, 5, 6], "time":' + (3+2*station_change_time) + ' }, ' +
' {"from":"4", "to":"1", "shortest_path": [4, 3, 2, 1], "time":' + (3+2*station_change_time) + ' }, ' +
' {"from":"4", "to":"5", "shortest_path": [4, 5], "time":1 }, ' +
' {"from":"4", "to":"4", "shortest_path": [4], "time":' +station_loop_time+ ' }, ' +
' {"from":"4", "to":"2", "shortest_path": [4, 3, 2], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"4", "to":"3", "shortest_path": [4, 3], "time":1 }, ' +
' {"from":"4", "to":"6", "shortest_path": [4, 5, 6], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"5", "to":"1", "shortest_path": [5, 4, 3, 2, 1], "time":' + (4+3*station_change_time) + ' }, ' +
' {"from":"5", "to":"5", "shortest_path": [5], "time":' +station_loop_time+ ' }, ' +
' {"from":"5", "to":"4", "shortest_path": [5, 4], "time":1 }, ' +
' {"from":"5", "to":"2", "shortest_path": [5, 4, 3, 2], "time":' + (3+2*station_change_time) + ' }, ' +
' {"from":"5", "to":"3", "shortest_path": [5, 4, 2], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"5", "to":"6", "shortest_path": [5, 6], "time":1 }, ' +
' {"from":"6", "to":"1", "shortest_path": [6, 5, 4, 3, 2, 1], "time":' + (5+4*station_change_time) + ' }, ' +
' {"from":"6", "to":"5", "shortest_path": [6, 5], "time":1 }, ' +
' {"from":"6", "to":"4", "shortest_path": [6, 5, 4], "time":' + (2+station_change_time) + ' }, ' +
' {"from":"6", "to":"2", "shortest_path": [6, 5, 4, 3, 2], "time":' + (4+3*station_change_time) + ' }, ' +
' {"from":"6", "to":"3", "shortest_path": [6, 5, 4, 2], "time":' + (3+2*station_change_time) + ' }, ' +
' {"from":"6", "to":"6", "shortest_path": [6], "time":' +station_loop_time+ ' } ' +
' ] }';
var paths_0_data = JSON.parse(paths_0_json);

var strategy_0_json = '{ "strategies": [ { "1":[2], "2":[], "3":[], "4":[], "5":[3,6], "6":[], "7":[], "8":[1], "9":[], "10":[2], "11":[6], "12":[], "13":[6], "14":[], "15":[2], "16":[], "17":[1], "18":[1], "19":[], "20":[], "21":[], "22":[], "23":[1], "24":[], "25":[2], "26":[], "27":[], "28":[], "29":[], "30":[], "31":[], "32":[2], "33":[], "34":[1], "35":[], "36":[], "37":[3], "38":[], "39":[2], "40":[], "41":[], "42":[2], "43":[], "44":[], "45":[6], "46":[1], "47":[], "48":[], "49":[1], "50":[6], "51":[], "52":[], "53":[2,6], "54":[6], "55":[1], "56":[1], "57":[1], "58":[1], "59":[], "60":[], "61":[], "62":[2,6], "63":[6], "64":[6], "65":[], "66":[1,6], "67":[1], "68":[1], "69":[6], "70":[], "71":[1], "72":[1], "73":[1], "74":[1,6], "75":[1,6], "76":[], "77":[2], "78":[], "79":[1], "80":[1], "81":[6], "82":[], "83":[1], "84":[1], "85":[1], "86":[1], "87":[1], "88":[], "89":[2], "90":[], "91":[1], "92":[], "93":[], "94":[1], "95":[1], "96":[1], "97":[1], "98":[1,6], "99":[1], "100":[] } , { "1":[], "2":[1], "3":[1,6], "4":[], "5":[], "6":[1], "7":[1], "8":[], "9":[], "10":[], "11":[], "12":[], "13":[6], "14":[1], "15":[1], "16":[], "17":[2], "18":[6], "19":[1], "20":[1], "21":[1], "22":[6], "23":[6], "24":[6], "25":[], "26":[], "27":[], "28":[], "29":[2], "30":[], "31":[3], "32":[6], "33":[2,6], "34":[2], "35":[2], "36":[], "37":[], "38":[2], "39":[2], "40":[2], "41":[2,6], "42":[2], "43":[], "44":[1,6], "45":[1], "46":[], "47":[2], "48":[], "49":[], "50":[2], "51":[2], "52":[2], "53":[], "54":[], "55":[], "56":[6], "57":[], "58":[3], "59":[], "60":[2], "61":[2], "62":[2], "63":[], "64":[1], "65":[1], "66":[1], "67":[1,6], "68":[], "69":[], "70":[], "71":[], "72":[], "73":[], "74":[], "75":[], "76":[], "77":[], "78":[], "79":[], "80":[], "81":[6], "82":[1], "83":[1,6], "84":[1], "85":[1], "86":[6], "87":[], "88":[], "89":[6], "90":[3], "91":[], "92":[2], "93":[], "94":[1], "95":[1], "96":[1], "97":[], "98":[], "99":[1], "100":[] } ] }';
var strategy_0_data = JSON.parse(strategy_0_json);
