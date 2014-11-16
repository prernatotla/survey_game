<?php
$sex = $_POST["sex"];
$race = $_POST["race"];
$income = $_POST["income"];
$age = $_POST["age"];
$email = $_POST["email"];

$info_file = "./user_info.txt";
$all_users = "";

$user_id = rand(10000000,100000000);

$time = time();

if (is_null($email) || $email == '')	{
	$user_info = 'amt_id:' . $user_id. ';sex:'.$sex .';race:'. $race. ';income:'. $income. ';age:'. $age . ";time=". $time. "\n";
}
else 	{
	$user_info = 'amt_id:' . $user_id. 'sex:'. $sex. ';race:'. $race. ';income:'. $income. ';age:'. $age. ';email:'. $email .";time=". $time. "\n";
}
//echo $user_info;
file_put_contents($info_file, $user_info, FILE_APPEND);
header("Location: ./game.html?amt_id=".$user_id);
?>