let data = null;
const KEY = "Recipe";
const food_recipe = {
    title: null,
    explanation: null,
    ingredient: null,
    step: null
}
function saveRecipe(){
    if(validate()){
        inputData();
        if(data == null){
            putData(food_recipe);
        }
        resetData();
    }
    showData();
}
function inputData(){
    food_recipe.title = document.querySelector("#judul").value.trim();
    food_recipe.explanation = document.querySelector("#keterangan").value.trim();
    food_recipe.ingredient = document.querySelector("#bahan").value.trim();
    food_recipe.step = document.querySelector("#langkah").value.trim();
}
function check(){
    return typeof(Storage) !== 'undefined';
}
function putData(food_recipe){
    if(check ()) {
        let recipeList = null;
        if(localStorage.getItem(KEY) === null){
            recipeList = [];
        } else {
            recipeList = JSON.parse(localStorage.getItem(KEY));
        }
        recipeList.unshift(food_recipe);
        if(recipeList.length > 5){
            recipeList.pop();
        }
        localStorage.setItem(KEY, JSON.stringify(recipeList));
    }
}
function showRecipeList(){
    if(check()){
        return JSON.parse(localStorage.getItem(KEY)) || []
    } else {
        return [];
    }
}
function showData(){
    const recipeList = showRecipeList();
    let dataList = document.querySelector("#kumpulan_resep");
    
    dataList.innerHTML = "";
    for(let food_recipe of recipeList){
        let div = document.createElement('div');
        div.classList.add("div");
        div.innerHTML = "<h3 class='resep h3'>" + food_recipe.title + "</h3>";
        div.innerHTML += "<p class='resep p'>" + food_recipe.explanation + "</p>";
        div.innerHTML += "<h4>Bahan:</h4>"
        div.innerHTML += "<pre class='resep pre'>" + food_recipe.ingredient + "</pre>";
        div.innerHTML += "<h4>Cara membuat:</h4>"
        div.innerHTML += "<pre class='resep pree'>" + food_recipe.step + "</pre>";
        div.innerHTML += `<a onClick="editData(this)" href="#tulis" class="edit">Edit</a>
                        <a onClick="deleteData(this)" class="delete">Delete</a>`; 
        dataList.appendChild(div);
    }
}
function editData(){
    document.querySelector("#judul").value = document.querySelector(".h3").innerText;
    document.querySelector("#keterangan").value = document.querySelector(".p").innerText;
    document.querySelector("#bahan").value = document.querySelector(".pre").innerText;
    document.querySelector("#langkah").value = document.querySelector(".pree").innerText;
}
function deleteData(food_recipe){
    let div = document.querySelector(".div");
    div.remove();
}
function resetData(){
    document.querySelector("#judul").value = "";
    document.querySelector("#keterangan").value = "";
    document.querySelector("#bahan").value = "";
    document.querySelector("#langkah").value = "";
}   
function validate(){
    isValid = true;
    let title = document.querySelector("#judul").value == "";
    let ingredient = document.querySelector("#bahan").value == "";
    let step = document.querySelector("#langkah").value == "";
    if(title|| ingredient || step){
        isValid = false;
        alert("Eitss.. dilengkapi dulu ya resepnya.")
    }
    return isValid;
}
showData();