function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

document.addEventListener("DOMContentLoaded", function(e){
    var search_form = document.querySelector("#search-form");
    var search_bar = document.querySelector("#search-bar");
    
    if(search_form && search_bar){
        search_bar.addEventListener("focus", function(){
            search_form.classList.add("input-focus");
        });
        search_bar.addEventListener("blur", function(){
            search_form.classList.remove("input-focus");
        });
    }
});
