function howManyStep(discs) {
    if (discs === 1) {
        return 1;
    }
    return 2 * howManyStep(discs - 1) + 1;
}

// Meminta input jumlah disk dari user
const jumlahDisk = parseInt(prompt("Masukkan jumlah disk:"));

// Menghitung jumlah minimal langkah
const jumlahLangkah = howManyStep(jumlahDisk);

// Menampilkan hasil ke layar
console.log(`Jumlah minimal langkah yang diperlukan untuk ${jumlahDisk} disk adalah ${jumlahLangkah}.`);
