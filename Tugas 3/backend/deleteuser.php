<?php
include 'koneksi.php';


$id = $_POST['id'];


$query = "DELETE FROM `user` WHERE `user`.`id` = $id";


if (mysqli_query($conn, $query)) {
    $response['status'] = 'success';
    $response['message'] = 'User berhasil dihapus';
} else {
    $response['status'] = 'error';
    $response['message'] = 'Gagal menghapus user: ' . mysqli_error($koneksi);
}


echo json_encode($response);
?>