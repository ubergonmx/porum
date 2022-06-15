const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

var errorTimeout, tempFields = [];
var arrowDown, profileActive = 0, profileDropdown;
var hasNotif = 1, notifContainer, notifDropdown;

document.addEventListener("DOMContentLoaded", function(e){
    const searchForm = document.querySelector("#search-form");
    const searchBar1 = document.querySelector("#search-bar");
    
    notifContainer = document.querySelector("#notification-container");
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

window.addEventListener("load", function(e){
    clear(notifDropdown);
    loadNotifications(notifications);
});

document.addEventListener("click", function(e){
    if(e.target.closest("#icon-arrowdown")){
        profileActive = !profileActive;
        if(!arrowDown) arrowDown = e.target.closest("#icon-arrowdown");
        arrowDown.style.transform = (profileActive) ? "rotate(180deg)" : "rotate(0deg)";
        profileDropdown.classList.toggle("active");
    }
    else if(e.target.closest("#profile-btn") || e.target.id == "icon-user"){
        window.location.href = "profile";
    }
    else if(e.target.closest("#settings-btn")){
        window.location.href = "settings";
    }
    else if(e.target.closest("#logout-btn")){
        window.location.href = "home";
    }
    else if(e.target.closest("#icon-notification")){
        notifDropdown.classList.toggle("active");

        if(hasNotif){
            hasNotif = 0;
            notifContainer.classList.remove("has-notification");
        }
    }
    else if(e.target.closest(".notif-item")){
        let notifItem = e.target.closest(".notif-item");
        window.location.href = notifItem.getAttribute("data-link");
    }
});

function loadNotifications(notificationArr){
    for(const notif of notificationArr){
        console.log(notif.commenter.comments[0]);
        // logic for data-link is temporary for now (because of the first element)
        let notifHTML =
        `<div class="notif-item" data-link="${notif.commenter.comments[0].discussion}">
            <img src="${notif.commenter.imgSrc}" class="notif-commenter">
            <div class="notif-body">
                <p class="notif-content"><span>${notif.commenter.username}</span> commented on your <span>discussion</span></p>
                <span class="notif-date">${calcDate(notif.commenter.comments[0].date)}</span>
            </div>
        </div>`;
        notifDropdown.insertAdjacentHTML('afterbegin', notifHTML);
    }
}

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
 * @param  {boolean} [show=undefined] - if 1, show the element; else, hide the element
 * @param  {boolean} [display=undefined] - if 1, uses display property; else, uses visibility property
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

/**
 * This calculates the time difference between the actual date posted and today
 * @param  {Date} datePosted
 */
 function calcDate(datePosted){
    const dateToday = new Date();
    const year = dateToday.getFullYear() - datePosted.getFullYear()
    const month = monthDiff(datePosted, dateToday);
    const day = dayDiff(datePosted, dateToday);
    const hour = hourDiff(datePosted, dateToday);
    const minute = minuteDiff(datePosted, dateToday);
    const second = secondDiff(datePosted, dateToday);
    //console.log(`${dateToday.toISOString().slice(0, 10)} - ${datePosted.toISOString().slice(0, 10)}:\n ${year} ${month} ${day} ${hour} ${minute} ${second} `);


    if(year != 0)
        return `${year} year${year > 1 ? 's': ''} ago`;
    if(month != 0)
        return `${month} month${month > 1 ? 's': ''} ago`;
    if(day != 0)
        return `${day} day${day > 1 ? 's': ''} ago`;
    if(hour != 0)
        return `${hour} hour${hour > 1 ? 's': ''} ago`;
    if(minute != 0)
        return `${minute} minute${minute > 1 ? 's': ''} ago`;
    
    return `${month} second${year > 1 ? 's': ''} ago`;
    monthDiff(d)
}
/**
 * Returns the month difference
 * @param  {Date} date1 - the date before date 2
 * @param  {Date} date2 - the latest/recent date
 */
function monthDiff(date1, date2) {
    var months;
    months = (date2.getFullYear() - date1.getFullYear()) * 12;
    months -= date1.getMonth();
    months += date2.getMonth();
    return months <= 0 ? 0 : months;
}

/**
 * Returns the day difference between two dates
 * @param  {Date} date1 - the date before date 2
 * @param  {Date} date2 - the latest/recent date
 */
function dayDiff(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

/**
 * Returns the hour difference between two dates
 * @param  {Date} date1 - the date before date 2
 * @param  {Date} date2 - the latest/recent date
 */
function hourDiff(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return Math.floor(diffInMs / (1000 * 60 * 60));
}

/**
 * Returns the minute difference between two dates
 * @param  {Date} date1 - the date before date 2
 * @param  {Date} date2 - the latest/recent date
 */
function minuteDiff(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return Math.floor(diffInMs / (1000 * 60));
}

/**
 * Returns the seconds difference between two dates
 * @param  {Date} date1 - the date before date 2
 * @param  {Date} date2 - the latest/recent date
 */
function secondDiff(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return Math.floor(diffInMs / 1000);
}