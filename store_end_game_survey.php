<?php
$q1 = $_POST["q1"];
$q2 = $_POST["q2"];
$q3 = $_POST["q3"];
$q4 = $_POST["q4"];
$q5 = $_POST["q5"];
$q6 = $_POST["q6"];
$q7 = $_POST["q7"];
$q8 = $_POST["q8"];
$q9 = $_POST["q9"];
$q10 = $_POST["q10"];
$q11 = $_POST["q11"];
$q12 = $_POST["q12"];
$q13 = $_POST["q13"];
$q14 = $_POST["q14"];
$q15 = $_POST["q15"];
$q16 = $_POST["q16"];
$amt_id = $_POST["amt_user"];

$time = time();
$info = "amt_id:".$amt_id. ";q1:".$q1 .";q2:".$q2 .";q3:".$q3 .";q4:".$q4 .";q5:".$q5 .";q6:".$q6 .";q7:".$q7 .";q8:".$q8 .";q9:".$q9 .";q10:".$q10 .";q11:".$q11 .";q12:".$q12 .";q13:".$q13 .";q14:".$q14 .";q15:".$q15 .";q16:".$q16 .";time=". $time."\n";

$info_file = "./end_game_info.txt";
file_put_contents($info_file, $info, FILE_APPEND);

header("Location: ./thank_you.html?amt_id=".$amt_id);
?>