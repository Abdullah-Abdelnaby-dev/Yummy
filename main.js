let rowData = document.getElementById("rowData")
let searchContainer = document.getElementById("searchContainer")
let submitBtn;
$(document).ready(()=>{
  searchByName("").then(()=>{

    $(".loading-screen").fadeOut(500)
    $("body").css("overflow","visible")
  })
})


function openSideNav() {
  $(".side-nav-menu").animate({left: 0},500)
  $(".close-open").addClass("fa-x")
  $(".close-open").removeClass( "fa-align-justify")
for(let i = 0 ;i <5 ; i++){
  $(".links li").eq(i).animate({top:0},(i+5)*100)
}
}

function closeSideNav() {
  let outerWidth =$('.side-nav-menu .nav-tab').outerWidth()
  $(".side-nav-menu").animate({left: -outerWidth},500)
  $(".close-open").removeClass( "fa-x")
  $(".close-open").addClass("fa-align-justify")
  $(".links li").animate({top:300} ) 
}
closeSideNav()
$(".side-nav-menu i.close-open").click(function(){
if($(".side-nav-menu").css("left") === '0px'){
  closeSideNav()
}else{
  openSideNav()
}
});


function displayMeals(arr) {
  let cartona =""
  for(let i = 0 ; i < arr.length ; i++){
    cartona +=`
   <div class="col-md-3">
  <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal overflow-hidden position-relative rounded-2 cursor-pointer ">
    <div class="img w-10">
      <img  class="img-fluid" src="${arr[i].strMealThumb}" alt="">
      
    </div>
    <div class="meal-layer  ">
      <h3>${arr[i].strMeal}</h3>
    </div>
  </div>
</div>
    `
  }
  rowData.innerHTML = cartona
}
searchByName("")

async function getCategories() {
  searchContainer.innerHTML = "";
  let data = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  data = await data.json(); 
  
  displayCategories(data.categories)
  
}

function displayCategories(arr) {
  let cartona =""
  for(let i = 0 ; i < arr.length ; i++){
    cartona +=`
       <div class="col-md-3">
  <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal  overflow-hidden position-relative rounded-2 cursor-pointer ">
    <div class="img w-10">
      <img  class="img-fluid" src="${arr[i].strCategoryThumb}" alt="">
      
    </div>
    <div class="meal-layer position-absolute d-flex text-center flex-column text-black "> 
      <h3>${arr[i].strCategory}</h3>
      <p>${arr[i].strCategoryDescription.split(" ").slice(0,10).join(" ")}</p>
    </div>
  </div>
</div>
    `
    
  }
  rowData.innerHTML = cartona
}

async  function getArea() {

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
  response = await response.json();
  
  displayArea(response.meals)
}


function displayArea(arr) {
  let cartona =""
  for(let i = 0 ; i < arr.length ; i++){
    cartona +=`
       <div class="col-md-3">
  <div onclick="getAreaMeals('${arr[i].strArea}')" class="meal  rounded-2 text-white text-center cursor-pointer "> 
      <i class="fa-solid fa-house-laptop fa-4x"></i>
      <h3>${arr[i].strArea}</h3>
  </div>
</div>
    `
    
  }
  rowData.innerHTML = cartona
  
}


async function getIngredients(){
  searchContainer.innerHTML = "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  response = await response.json();
 
  displayIngredients(response.meals.slice(0,20))
}

function displayIngredients(arr) {

  let cartona =""
  for(let i = 0 ; i < arr.length ; i++){
    cartona +=`
    <div class="col-md-3">
      <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class=" text-white text-center cursor-pointer "> 
    <i class="fas fa-drumstick-bite fa-2x"></i>

      <h3>${arr[i].strIngredient}</h3>
      <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
      </div>
    </div>
    `
    
  }
  rowData.innerHTML = cartona
}


async function getCategoryMeals(category) {
  let response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  response = await response.json();
  displayMeals(response.meals)
}


async function getAreaMeals(area) {
  let response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  response = await response.json();
  
  displayMeals(response.meals)
}



async function getIngredientsMeals(Ingredients) {
  let response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredients}`);
  response = await response.json();
  
  displayMeals(response.meals)
}

async function getMealDetails(mealId) {
  searchContainer.innerHTML = "";
  let response =await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
  response = await response.json();
  displayMealDetails(response.meals[0])
} 

function displayMealDetails(meal) {
  searchContainer.innerHTML ="";
let ingredients = ``
for(let i = 1 ; i <= 20 ; i++){
  if(meal[`strIngredient${i}`]){
    ingredients += `<li class="alert alert-info m-2 p-1 ">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
    
  }
  
}
let tags = meal.strTags?.split(",")
let tagsStr = ''
for(let i = 0 ; i < tags.length ; i++){
  tagsStr += `<li class="alert alert-danger m-2 p-1 ">${tags[i]}</li>`


}

  let details = `
      <div class="col-md-4 text-white">
      <img class="w-100 rounded" src="${meal.strMealThumb}" alt="">
      <h2>${meal.strMeal}</h2>
    </div>
    <div class="col-md-8 text-white">
      <h2>instructions</h2>
      <p>${meal.strInstructions}</p>
      <h3><span class="fw-bolder"> Area: </span>${meal.strArea}</h3>
      <h3><span class="fw-bolder"> Category: </span>${meal.strCategory}</h3>
      <h3>Recipes:</h3>
      <ul class="list-unstyled d-flex flex-wrap">
   ${ingredients}
      </ul>
      <h3>Tags:</h3>
      <ul class="list-unstyled d-flex flex-wrap">
    ${tagsStr}
      </ul>
  
      <a target="_blank" href="${meal.strSource}"  class="btn btn-primary" >Source</a>
      <a target="_blank" href="${meal.strYoutube}"  class="btn btn-danger" >Youtube</a>
  </div>
  `
  rowData.innerHTML = details
}


function showSearchIn() {
  searchContainer.innerHTML = `
     <div class="row py-4">

        <div class="col-md-6 ">
        <input onkeyup="searchByName(this.value)" type="text" class="form-control"  placeholder="Search By Name">
        </div>

        <div class="col-md-6">
        <input onkeyup="searchByFirstLetter(this.value)" length="1" type="text" class="form-control"  placeholder="Search By First Letter">
        </div>
        
    </div> 

  `
  rowData.innerHTML = " "
}


  async function searchByName(term){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    response = await response.json();
  
    
    response.meals ?  displayMeals(response.meals) : displayMeals([])
  
  }
  async function searchByFirstLetter(term){
    term == " " ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
    response = await response.json();
  
    
    response.meals ?  displayMeals(response.meals) : displayMeals([])
  
  }


  function showContact() {
    
    rowData.innerHTML =`
      <div class="contact min-vh-100 d-flex justify-content-center mt-5 z-3">
      <div class="container w-50">
        <div class="row g-3">
          <div class="col-md-6">
          <input  id="nameInput"  onkeyup="inputValidation()" type="text" class="form-control"  placeholder="Enter you name">
          <div id="nameAlert"  class="alert alert-danger w-100 p-1 d-none">
          Special characters and numbers not allowed
          </div>
          </div>
          <div class="col-md-6">
          <input id="emailInput"  onkeyup="inputValidation()" type="email" class="form-control"  placeholder="Enter you email">
                <div  id="emailAlert" class="alert alert-danger w-100 p-1 d-none">
          You Email is not allowed
          </div>
          </div>
          <div class="col-md-6">
          <input id="phoneInput"  onkeyup="inputValidation()" type="number" class="form-control"  placeholder="Enter you phone">
                <div id="phoneAlert"  class="alert alert-danger w-100 p-1 d-none">
          You phone is not allowed
          </div>
          </div>
          <div class="col-md-6">
          <input id="ageInput"  onkeyup="inputValidation()" type="number" class="form-control"  placeholder="Enter you age">
                <div id="ageAlert"  class="alert alert-danger w-100 p-1 d-none">
          Your Age is not allowed
          </div>
          </div>
          <div class="col-md-6">
          <input id="passwordInput"  onkeyup="inputValidation()" type="password" class="form-control"  placeholder="Enter you password">
                <div id="passwordAlert"  class="alert alert-danger w-100 p-1 d-none">
          Password not allowed
          </div>
          </div>
          <div class="col-md-6">
          <input id="repasswordInput" onkeyup="inputValidation()" type="password" class="form-control"  placeholder="Enter you re-password">
                      <div  id="passwordAlert" class="alert alert-danger w-100 p-1 d-none">
          Password not allowed
          </div>
          </div>
    
        </div>
        <button id="submitBtn" type="submit" class="btn btn-primary mt-3 ">Submit</button>
      </div>
    </div> 
    `
     submitBtn = document.getElementById("submitBtn")
     document.getElementById('nameInput').addEventListener('focus', () => {
      nameIn = true;
    });
    document.getElementById('emailInput').addEventListener('focus', () => {
      emailIn = true;
    });
    document.getElementById('phoneInput').addEventListener('focus', () => {
      phoneIn = true;
    });
    document.getElementById('ageInput').addEventListener('focus', () => {
      ageIn = true;
    });
    document.getElementById('passwordInput').addEventListener('focus', () => {
      passwordIn = true;
    });
    document.getElementById('repasswordInput').addEventListener('focus', () => {
      repasswordIn = true;
    });
  }

let nameIn = false;
let emailIn = false;
let phoneIn = false;
let ageIn = false;
let passwordIn = false;
let repasswordIn = false;


function inputValidation() {
if (nameIn) {
  
  if (nameValidation()) {
    document.getElementById('nameAlert').classList.replace("d-block","d-none")
  }else{
    document.getElementById('nameAlert').classList.replace("d-none","d-block")
  }
}
if (emailIn) {
  
  if (emailValidation()) {
    document.getElementById('emailAlert').classList.replace("d-block","d-none")
  }else{
    document.getElementById('emailAlert').classList.replace("d-none","d-block")
  }
}


if (phoneIn) {
  
  if
   (phoneValidation()) {
    document.getElementById('phoneAlert').classList.replace("d-block","d-none")
  }else{
    document.getElementById('phoneAlert').classList.replace("d-none","d-block")
  }
}

if (ageIn) {
  
  if (ageValidation()) {
    document.getElementById('ageAlert').classList.replace("d-block","d-none")
  }else{
    document.getElementById('ageAlert').classList.replace("d-none","d-block")
  }
}
if (passwordIn) {
  
  if (passwordValidation()) {
    document.getElementById('passwordAlert').classList.replace("d-block","d-none")
  }else{
    document.getElementById('passwordAlert').classList.replace("d-none","d-block")
  }
}

if (repasswordIn) {
  
  if (rePasswordValidation()) {
    document.getElementById('passwordAlert').classList.replace("d-block","d-none")
  }else{
    document.getElementById('passwordAlert').classList.replace("d-none","d-block")
  }
}

  
  if (  nameValidation() &&
emailValidation()&&
phoneValidation()&&
ageValidation()&&
passwordValidation()&&
rePasswordValidation()) {
  
  submitBtn.removeAttribute("disabled")
}else{
  submitBtn.setAttribute("disabled", true)
}
}

  
  
  function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
  }
  
  function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
  }
  
  function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
  }
  
  function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
  }
  
  function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
  }
  
  function rePasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
  }

