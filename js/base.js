// window.addEventListener('load' function(e){ });

document.addEventListener("DOMContentLoaded", function(e){
    var search_form = document.querySelector("#search-form");
    var search_bar = document.querySelector("#search-bar");
    console.log("loaded");
    
    search_bar.addEventListener("focus", function(){
        console.log("im in boys");
        search_form.classList.add("input-focus");
    });
    search_bar.addEventListener("blur", function(){
        console.log("im out boys");
        search_form.classList.remove("input-focus");
    });
});
