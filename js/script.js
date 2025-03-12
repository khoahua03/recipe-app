document.addEventListener("DOMContentLoaded", function () {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    let favoriteIndexes = JSON.parse(localStorage.getItem("favoriteIndexes")) || [];

    // Hiển thị danh sách công thức với hiệu ứng
    function displayRecipes(filteredRecipes = null) {
        const recipeList = document.getElementById("recipe-list");
        if (!recipeList) return;
        recipeList.innerHTML = "";
        
        let displayData = filteredRecipes || recipes;
        
        if (displayData.length === 0) {
            recipeList.innerHTML = "<p class='text-center'>Không có công thức nào.</p>";
            return;
        }

        displayData.forEach((recipe, index) => {
            let originalIndex = recipes.findIndex(r => r.name === recipe.name);
            let isFavorite = favoriteIndexes.includes(originalIndex);
            let recipeCard = `
                <div class="col-md-4 position-relative recipe-card-wrapper" style="opacity: 0; transform: translateY(20px); transition: all 0.5s ease-in-out;">
                    <div class="recipe-card">
                        <button class="btn ${isFavorite ? 'btn-danger' : 'btn-outline-danger'} btn-sm favorite-btn" onclick="toggleFavorite(${originalIndex})">
                            ${isFavorite ? 'Bỏ Yêu Thích' : 'Yêu Thích'}
                        </button>
                        ${recipe.image ? `<img src="${recipe.image}" class="img-fluid" alt="Recipe Image" style="transition: transform 0.3s ease-in-out;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">` : ''}
                        <h5>${recipe.name}</h5>
                        <p><strong>Description:</strong> ${recipe.description ? recipe.description : 'No description available.'}</p>
                        <button class="btn btn-primary btn-sm" onclick="viewRecipe(${originalIndex})">Xem chi tiết</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteRecipe(${originalIndex})">Xóa</button>
                    </div>
                </div>
            `;
            recipeList.innerHTML += recipeCard;
        });
        
        // Thêm hiệu ứng xuất hiện mượt mà
        setTimeout(() => {
            document.querySelectorAll('.recipe-card-wrapper').forEach((el, i) => {
                setTimeout(() => {
                    el.style.opacity = "1";
                    el.style.transform = "translateY(0)";
                }, i * 100);
            });
        }, 100);
    }

    // Xem chi tiết công thức
    window.viewRecipe = function (index) {
        window.location.href = `recipe.html?id=${index}`;
    };

    // Xóa công thức nấu ăn
    window.deleteRecipe = function (index) {
        if (confirm("Bạn có chắc chắn muốn xóa công thức này?")) {
            recipes.splice(index, 1);
            localStorage.setItem("recipes", JSON.stringify(recipes));
            displayRecipes();
        }
    };

    // Thêm hoặc bỏ món ăn khỏi danh sách yêu thích
    window.toggleFavorite = function (index) {
        let favoriteIndex = favoriteIndexes.indexOf(index);

        if (favoriteIndex === -1) {
            favoriteIndexes.push(index);
        } else {
            favoriteIndexes.splice(favoriteIndex, 1);
        }

        localStorage.setItem("favoriteIndexes", JSON.stringify(favoriteIndexes));
        displayRecipes();
    };

    // Hiển thị công thức khi tải trang với hiệu ứng
    displayRecipes();
});
