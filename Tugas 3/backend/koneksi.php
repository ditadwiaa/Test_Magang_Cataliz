<?php
// File: koneksi.php

// Konfigurasi koneksi ke database
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'test_magang';

// Membuat koneksi ke database menggunakan fungsi mysqli_connect
$conn = mysqli_connect($host, $username, $password, $database);

// Mengecek koneksi ke database
if (!$conn) {
    die("Koneksi gagal: " . mysqli_connect_error());
} else {
    echo "Koneksi berhasil.";
}