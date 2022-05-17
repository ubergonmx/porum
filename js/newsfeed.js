var container;
const limit = 4, contentLimit = 170;

/**
 * @param  {string} id
 * @param  {string} title
 * @param  {user} author
 * @param  {tag} tag
 * @param  {Date} date - reminder that month is 0-indexed
 * @param  {string} content
 * @param  {int} comments_num
 * @param  {user[]} commenters
 */
function discussion(id, title, author, tag, date, content, comments_num, commenters){
    return {
        id: id,
        title: title,
        author: author,
        tag: tag,
        date: date,
        content: content,
        comments_num: comments_num,
        commenters: commenters
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
}

function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

function dayDiff(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}
  
function hourDiff(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return Math.floor(diffInMs / (1000 * 60 * 60));
}
  
function minuteDiff(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return Math.floor(diffInMs / (1000 * 60));
}
  
function secondDiff(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return Math.floor(diffInMs / 1000);
}

window.addEventListener("load", function(e){
    container = document.querySelector("#discussion-container");
    container.innerHTML = "";
    loadDiscussions(discussions);

    const filter = document.querySelector("#filter");
    filter.addEventListener("change", (e)=>{
        container.innerHTML = "";
        switch(filter.value){
            case "Latest first":
                let latest = discussions.sort((a,b) => b.date - a.date);
                loadDiscussions(latest);
                break;
            case "Oldest first":
                let oldest = discussions.sort((a,b) => a.date - b.date)
                loadDiscussions(oldest);
                break;
        }
    });
});

document.addEventListener("click", (e)=>{
    if(!e.target)
        return;
    
    let discussionBox = e.target.closest(".discussion-box");
    if(discussionBox && discussionBox.hasAttribute("data-link"))
        window.location.href = discussionBox.getAttribute("data-link");
});

/**
 * This shows all the discussions in HTML
 * @param  {discussion[]} discussionArr
 */
function loadDiscussions(discussionArr){
    for(const discussion of discussionArr){
        let discussionHtml = 
        `<div class="discussion-box" data-link="${discussion.id}"> 
            <div class="tag-container">
                <p class="tag" data-tag-clr="${discussion.tag.color}" data-tag-type="sub">${discussion.tag.name}</p>
            </div>
            <div class="discussion">
                <div>
                    <a href="${discussion.author.profile}" class="discussion-author"> 
                        <img src="${discussion.author.imgSrc}" class="img-author">
                    </a>

                    <div class="discussion-body">
                        <h1 class="title">${discussion.title}</h1>
                        <p class="author-and-date">
                            Posted by <span>${discussion.author.username}</span> &#8226; ${calcDate(discussion.date)}
                        </p>
                        <p class="content">
                            ${truncate(discussion.content, contentLimit)}
                        </p>
                    </div>
                </div>
                <div class="discussion-footer">
                    <div class="commenters">                  
                        ${discussion.commenters.length > limit ? '<img src="images/icon/more.png"class="commenter commenter-more"/>' : ''}            
                        ${discussion.commenters.slice(0, limit).reduce((updated,latest) => updated.concat(`<img src="${latest.imgSrc}" title="${latest.username}" class="commenter">`), '')}
                    </div>

                    <div class="comment">
                        <i class="fa-regular fa-comment icon-comment"></i>
                        <span>${discussion.comments_num} Comment${discussion.comments_num > 1 ? 's' : '' }</span>
                    </div>   
                </div>
            </div>
        </div>`;
        container.insertAdjacentHTML('beforeend', discussionHtml);
    }
}
