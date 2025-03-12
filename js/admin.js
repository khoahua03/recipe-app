function checkAdmin() {
    const admin = JSON.parse(localStorage.getItem("admin"));
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) {
        alert("Vui lòng đăng nhập!");
        window.location.href = "login.html";
        return;
    }

    if (!admin || user.email !== admin.email) {
        alert("Bạn không có quyền truy cập trang này!");
        window.location.href = "index.html";
    }
}

function loadUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userList = document.getElementById("user-list");
    userList.innerHTML = "";

    users.forEach((user, index) => {
        let row = `
            <tr>
                <td>${user.email}</td>
                <td><button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Xóa</button></td>
            </tr>
        `;
        userList.innerHTML += row;
    });
}

function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    loadUsers();
}

function loadRecipes() {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = "";

    recipes.forEach((recipe, index) => {
        let row = `
            <tr>
                <td>${recipe.name}</td>
                <td>${recipe.ingredients}</td>
                <td><button class="btn btn-danger btn-sm" onclick="deleteRecipe(${index})">Xóa</button></td>
            </tr>
        `;
        recipeList.innerHTML += row;
    });
}

function deleteRecipe(index) {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes.splice(index, 1);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    loadRecipes();
}

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
    loadUsers();
    loadRecipes();
});