<?php
$data = $_POST["data"];
//echo $data;
$time = time();

$info_file = "./game_info.txt";
file_put_contents($info_file, $data.";time=". $time. "\n", FILE_APPEND);

//header("Location: ./survey.html");
?>