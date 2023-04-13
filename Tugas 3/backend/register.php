<?php
// File: register.php

// Memasukkan file koneksi.php untuk melakukan koneksi ke database
require_once('koneksi.php');

// Menangani request HTTP POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Ambil data yang dikirim melalui request
    $username = $_POST['username'];
    $password = $_POST['password'];
    $no_telp = $_POST['no_telp'];
    $alamat = $_POST['alamat'];

    // Membuat prepared statement untuk menjalankan query insert
    $stmt = $conn->prepare("INSERT INTO user (username, password, no_telp, alamat) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $username, $password, $no_telp, $alamat);
    $stmt->execute();

    // Jika query berhasil dijalankan, kirimkan response dengan kode 201 (Created)
    if ($stmt->affected_rows > 0) {
        http_response_code(201);
        echo json_encode(array('message' => 'User berhasil ditambahkan.'));
    } else {
        // Jika query gagal dijalankan, kirimkan response dengan kode 500 (Internal Server Error)
        http_response_code(500);
        echo json_encode(array('message' => 'Terjadi kesalahan saat menambahkan user.'));
    }
} else {
    // Jika request HTTP bukan POST, kirimkan response dengan kode 405 (Method Not Allowed)
    http_response_code(405);
    echo json_encode(array('message' => 'Metode request tidak diizinkan.'));
}

// Menutup koneksi ke database
mysqli_close($conn);
?>