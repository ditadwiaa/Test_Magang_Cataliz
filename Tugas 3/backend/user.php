<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

require('koneksi.php');


$sql = "SELECT * FROM user";
$result = $conn->query($sql);


if (!$result) {
    die("Query failed: " . $conn->error);
}


$data = array();


while ($row = $result->fetch_assoc()) {

    $data[] = $row;
}


$conn->close();


echo json_encode($data);
?>