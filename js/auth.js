// Tạo tài khoản Admin mặc định
if (!localStorage.getItem("admin")) {
    localStorage.setItem("admin", JSON.stringify({ email: "admin@example.com", password: "admin123" }));
}

// Đăng nhập
function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (email === "" || password === "") {
        alert("Vui lòng nhập email và mật khẩu!");
        return;
    }

    // Kiểm tra nếu là Admin
    const adminData = JSON.parse(localStorage.getItem("admin"));
    if (email === adminData.email && password === adminData.password) {
        alert("Đăng nhập thành công với quyền Admin!");
        localStorage.setItem("loggedInUser", email);
        window.location.href = "admin.html";
        return;
    }

    // Kiểm tra người dùng bình thường
    const savedPassword = localStorage.getItem(email);
    if (savedPassword && savedPassword === password) {
        alert("Đăng nhập thành công!");
        localStorage.setItem("loggedInUser", email);
        window.location.href = "index.html";
    } else {
        alert("Sai email hoặc mật khẩu!");
    }
}

// Đăng ký tài khoản
function register() {
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    if (email === "" || password === "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    if (localStorage.getItem(email)) {
        alert("Email đã tồn tại! Vui lòng đăng nhập.");
    } else {
        localStorage.setItem(email, password);
        alert("Đăng ký thành công! Hãy đăng nhập.");
        window.location.href = "login.html";
    }
}

// Đăng xuất
function logout() {
    localStorage.removeItem("loggedInUser");
    alert("Bạn đã đăng xuất!");
    window.location.href = "login.html";
}