<?php

$host="localhost";
$username="root";
$conn="";
$db="userinfo";
$conn = mysqli_connect($host,$username,"",$db);
if(!$conn){
    die("Connection Failed".mysqli_connect_error());
}

echo "connected successfully";


?>