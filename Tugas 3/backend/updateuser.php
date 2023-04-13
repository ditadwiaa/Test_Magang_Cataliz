<?php

require('koneksi.php');

$id = $_POST['id'];
$username = $_POST['username'];
$password = $_POST['password'];
$notelp = $_POST['notelp'];
$alamat = $_POST['alamat'];


$sql = "UPDATE user SET username='$username', password='$password', no_telp='$notelp', alamat='$alamat' WHERE id=$id";

if (mysqli_query($conn, $sql)) {
    
    $response = array('success' => true, 'message' => 'User data updated successfully');
    echo json_encode($response);
} else {
    
    $response = array('success' => false, 'message' => 'Failed to update user data');
    echo json_encode($response);
}

mysqli_close($conn);
?>