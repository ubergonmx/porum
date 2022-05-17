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
    console.log(e.target);
    if(e.target.closest("#icon-arrowdown")){
        profileActive = !profileActive;
        if(!arrowDown) arrowDown = e.target;
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
// helpers 
function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}