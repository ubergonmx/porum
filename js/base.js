const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

var errorTimeout, tempFields = [];
var arrowDown, profileActive = 0,profileDropdown;
var hasNotif = 1, notification, notifDropdown;

document.addEventListener("DOMContentLoaded", function(e){
    const searchForm = document.querySelector("#search-form");
    const searchBar1 = document.querySelector("#search-bar");
    
    notifDropdown = document.querySelector("#notification-dropdown");
    profileDropdown = document.querySelector("#profile-dropdown");

    if(searchForm && searchBar1){
        searchBar1.addEventListener("focus", function(){
            searchForm.classList.add("input-focus");
        });
        searchBar1.addEventListener("blur", function(){
            searchForm.classList.remove("input-focus");
        });
    }
    
});

document.addEventListener("click", function(e){
    if(e.target.closest("#icon-arrowdown")){
        profileActive = !profileActive;
        if(!arrowDown) arrowDown = e.target.closest("#icon-arrowdown");
        arrowDown.style.transform = (profileActive) ? "rotate(180deg)" : "rotate(0deg)";
        profileDropdown.classList.toggle("active");
    }
    else if(e.target.closest("#profile-btn") || e.target.id == "icon-user"){
        window.location.href = "profile.html";
    }
    else if(e.target.closest("#settings-btn")){
        window.location.href = "settings.html";
    }
    else if(e.target.closest("#logout-btn")){
        window.location.href = "index.html";
    }
    else if(e.target.closest("#icon-notification")){
        if(!notification) notification = e.target.closest("#notification-container");
        
        notifDropdown.classList.toggle("active");

        if(hasNotif){
            hasNotif = 0;
            notification.classList.remove("has-notification");
        }
    }
    else if(e.target.closest(".notif-item")){
        console.log(e.target.classList);
    }
});

/**
 * Returns true if str is empty or has spaces
 * @param  {string} str
 */
function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

/**
 * Returns the string with length n with ellipsis on
 * the end  * By default, it returns the string without
 * cutting the word.
 * @param  {string} str
 * @param  {int} n
 * @param  {boolean} useWordBoundary=1
 */
function truncate( str, n, useWordBoundary = 1 ){
    if (str.length <= n) { return str; }
    const subString = str.substr(0, n-1); // the original check
    return (useWordBoundary 
      ? subString.substr(0, subString.lastIndexOf(" ")) 
      : subString) + "&hellip;";
};

/**
 * Shows the error message and highlights all the
 * inputs in elements array for 5 seconds.
 * @param  {element} error
 * @param  {string} message
 * @param  {element[]} elements
 */
function showError(error, message, elements){
    clearTimeout(errorTimeout);
    for(const oldInput of tempFields){
        oldInput.classList.remove("error");
    }
    tempFields = elements.slice();

    error.innerHTML = message;
    error.classList.add("active");
    for(const input of elements){
        input.classList.add("error");
    }
    errorTimeout = setTimeout(() => { 
        error.classList.remove("active");
        for(const input of elements){
            input.classList.remove("error");
        }
    }, 5000);
}

/**
 * Clears content/innerHTML of the given element
 * @param  {element} element
 */
function clear(element){
    element.innerHTML = "";
}

/**
 * Toggles element's visibility if display is not defined,
 * otherwise toggles the display style.
 * 
 * Note that if the element has a transition property,
 * Visibility property allows transition
 * Display property doesnt allow transition
 * @param  {element} element
 * @param  {boolean} show=undefined
 * @param  {boolean} display=undefined
 */
function toggle(element, show=undefined, display=undefined){
    if(display === undefined){
        element.style.transition = "all 0.3s ease";
        if(show === undefined){
            element.style.visibility = (element.style.visibility == "visible" || !element.style.visibility) ? "hidden" : "visible";
            element.style.opacity = (element.style.opacity == "1" || !element.style.opacity) ? "0" : "1";
        }
        else {
            element.style.visibility = (!show) ? "hidden" : "visible";
            element.style.opacity = (!show) ? "0" : "1";
        }
    }
    else{
        if(show === undefined)
            element.style.display = (element.style.display != "none" || !element.style.display) ? "none" : "block";
        else element.style.display = (!show) ? "none" : "block";
    }
}