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
    
    return `${second} second${year > 1 ? 's': ''} ago`;
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


/**
 * Returns formatted date 'MM/DD/YYYY'
 * @param  {Date} d - the date to be formatted
 */
function formatDate(d){
    minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
    hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
    ampm = d.getHours() >= 12 ? 'pm' : 'am',
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return days[d.getDay()]+' '+months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()+' '+hours+':'+minutes+ampm;
}