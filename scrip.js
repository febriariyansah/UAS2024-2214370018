// Fungsi untuk mengenkripsi kata sandi
function encryptPassword(password) {
    return CryptoJS.AES.encrypt(password, 'secret key 123').toString();
}

// Fungsi untuk mendekripsi kata sandi
function decryptPassword(ciphertext) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
    return bytes.toString(CryptoJS.enc.Utf8);
}

// Modifikasi event listener untuk pendaftaran
registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (!validateInput(username, password)) {
        return;
    }

    if (usersData.find(user => user.username === username)) {
        alert('Username already exists');
        return;
    }

    const encryptedPassword = encryptPassword(password);
    usersData.push({ username, password: encryptedPassword });
    saveUsers();
    alert('Registration successful');
    registerForm.reset();
});

// Modifikasi event listener untuk login
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = usersData.find(user => user.username === username);
    if (user && decryptPassword(user.password) === password) {
        saveCurrentUser(user);
        alert('Login successful');
        loginForm.reset();
    } else {
        alert('Invalid username or password');
    }
});
