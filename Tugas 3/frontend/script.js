// Fungsi untuk menampilkan data user
function showUsers() {
    // Mengirimkan request HTTP GET ke API
    fetch('http://172.29.128.1/test_magang/user.php')
        .then(response => response.json())
        .then(data => {
            // Menghapus data user yang ada di dalam tabel
            const userTable = document.getElementById('user-table');
            const tbody = userTable.getElementsByTagName('tbody')[0];
            tbody.innerHTML = '';

            // Menambahkan data user baru ke dalam tabel
            data.forEach(user => {
                const row = tbody.insertRow();
                row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.password}</td>
            <td>${user.no_telp}</td>
            <td>${user.alamat}</td>
            <td>
              <button class="edit-button" data-id="${user.id}">Edit</button>
              <button class="delete-button" data-id="${user.id}">Delete</button>
            </td>
          `;
            });
        })
        .catch(error => console.error(error));
}

// Memanggil fungsi untuk menampilkan data user saat halaman dimuat
showUsers(); const addBtn = document.getElementById('add-button');
const modal = document.getElementById('user-form');
const saveBtn = document.getElementById('save-button');
const cancelBtn = document.getElementById('cancel-button');
const tableBody = document.querySelector('#user-table tbody');

// Fungsi untuk menampilkan modal
function showModal() {
    modal.classList.remove('hidden');
}

// Fungsi untuk menyembunyikan modal
function hideModal() {
    modal.classList.add('hidden');
}

// Fungsi untuk mengirim data pengguna baru ke API register.php
async function createUser(username, password, no_telp, alamat) {
    const response = await fetch('http://172.29.128.1/test_magang/register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
            no_telp: no_telp,
            alamat: alamat,
        }),
    });

    const data = await response.json();

    return data;
}

// Fungsi untuk menampilkan data pengguna ke dalam tabel
function renderUser(user) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.username}</td>
        <td>${user.password}</td>
        <td>${user.no_telp}</td>
        <td>${user.alamat}</td>
        <td>
            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button>
        </td>
    `;
    tableBody.appendChild(row);
}

// Fungsi untuk menampilkan data pengguna yang sudah ada di database ke dalam tabel
async function renderUsers() {
    const response = await fetch('http://172.29.128.1/test_magang/users.php');
    const data = await response.json();

    data.forEach((user) => renderUser(user));
}

// Event listener untuk tombol "Add User"
addBtn.addEventListener('click', showModal);

// Event listener untuk tombol "Cancel"
cancelBtn.addEventListener('click', hideModal);

// Event listener untuk tombol "Save"
saveBtn.addEventListener('click', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const no_telp = document.getElementById('no_telp').value;
    const alamat = document.getElementById('alamat').value;

    const response = await createUser(username, password, no_telp, alamat);

    if (response.message === 'User berhasil ditambahkan.') {
        alert('User berhasil ditambahkan.');
        hideModal();

        // Render data pengguna yang baru ditambahkan ke dalam tabel
        renderUser(response.data);
    } else {
        alert('Terjadi kesalahan saat menambahkan user.');
    }
});

// Panggil fungsi untuk menampilkan data pengguna yang sudah ada di database ke dalam tabel
renderUsers();

// Mendapatkan tombol delete pada tiap baris tabel
const deleteButtons = document.querySelectorAll('.delete-button');

// Menambahkan event listener untuk setiap tombol delete
deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        const userId = button.dataset.id; // Mendapatkan ID user dari data atribut pada tombol delete
        const confirmation = confirm(`Are you sure you want to delete user with ID ${userId}?`); // Meminta konfirmasi dari user
        if (confirmation) { // Jika user mengkonfirmasi, menghapus baris tabel dan mengirim permintaan hapus ke server
            const tableRow = button.closest('tr'); // Mendapatkan elemen tr yang mengandung tombol delete
            tableRow.remove(); // Menghapus baris tabel
            fetch(`http://172.29.128.1/test_magang/deleteuser.php?id=${userId}`, { method: 'DELETE' }); // Mengirim permintaan hapus ke server
        }
    });
});

