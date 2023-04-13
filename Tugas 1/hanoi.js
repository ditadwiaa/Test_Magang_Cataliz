function towerOfHanoi(jumlahDisk, dariTiang, keTiang, tiangBantu) {
    if (jumlahDisk === 1) {
        console.log(`Pindahkan disk 1 dari tiang ${dariTiang} ke tiang ${keTiang}`);
        return;
    }
    towerOfHanoi(jumlahDisk - 1, dariTiang, tiangBantu, keTiang);
    console.log(`Pindahkan disk ${jumlahDisk} dari tiang ${dariTiang} ke tiang ${keTiang}`);
    towerOfHanoi(jumlahDisk - 1, tiangBantu, keTiang, dariTiang);
}

// Contoh penggunaan
towerOfHanoi(3, 'A', 'C', 'B');
