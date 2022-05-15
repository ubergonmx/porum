var container;
const limit = 4;
// structure might change soon
const tags = [
    new tag("FAQ's", "orange"), 
    new tag("Off-Topic Chatter", "green"), 
    new tag("Feedback", "purple"), 
    new tag("Member Spotlight", "red"), 
    new tag("Introductions", "blue"), 
    new tag("Announcements", "pink"), 
    new tag("Showcase", "gray"), 
    new tag("Jobs", "brown"),
];

const users = [
    new user("harry31", "images/users/user1.jpg", "user1.html"),    
    new user("i_am_john", "images/users/user2.jpg", "user2.html"),    
    new user("matt5", "images/users/user3.jpg", "user3.html"),    
    new user("sukisekine", "images/users/user4.jpg", "user4.html"),    
    new user("real_sarah", "images/users/user5.jpg", "user5.html"),    
    new user("rena", "images/users/user6.jpg", "user6.html"),    
    new user("shirley.mood", "images/users/user7.jpg", "user7.html"),    
    new user("ferrari_von", "images/users/user8.jpg", "user8.html"),    
    new user("dimbutcher", "images/users/user9.jpg", "user9.html"),    
    new user("designer1", "images/users/user10.jpg", "user10.html"),
];

var discussions = [
    new discussion("discussion1.html",
        "Introduce Yourself",
        users[0],
        tags[4],
        new Date(2022, 4, 14),
        "Hey @everyone, new member alert here! Thought I'd write a bit about myself and why I'm here. First of my name is Harry and I'm 31 years old massive fan of...",
        25,
        [users[6], users[7], users[8], users[9], users[0]]
    ),
    new discussion("discussion2.html",
        "The 12 month member programme",
        users[2],
        tags[5],
        new Date(2022, 3, 1),
        "Hey @everyone, new member alert here! Thought I'd write a bit about myself and why I'm here. First of my name is Harry and I'm 31 years old massive fan of...",
        27,
        [users[3], users[5], users[7], users[9], users[0]]
    ),
    new discussion("discussion3.html",
        "What jobs are you looking for?",
        users[3],
        tags[7],
        new Date(2022, 4, 4),
        "Hey @everyone, new member alert here! Thought I'd write a bit about myself and why I'm here. First of my name is Harry and I'm 31 years old massive fan of...",
        5,
        [users[1], users[2], users[5], users[8]]
    ),
    new discussion("discussion4.html",
        "UI for a new airline app help needed!",
        users[4],
        tags[2],
        new Date(2022, 1, 14),
        "Hey @everyone, new member alert here! Thought I'd write a bit about myself and why I'm here. First of my name is Harry and I'm 31 years old massive fan of...",
        12,
        [users[2], users[6], users[7], users[9], users[0]]
    ),
    new discussion("discussion5.html",
        "Here are the top 5 FAQs",
        users[5],
        tags[0],
        new Date(2022, 3, 19),
        "Hey @everyone, new member alert here! Thought I'd write a bit about myself and why I'm here. First of my name is Harry and I'm 31 years old massive fan of...",
        14,
        [users[1], users[2], users[3], users[4], users[0]]
    ),
    
];

function user(username, imgSrc, profile){
    return {
        username: username,
        imgSrc: imgSrc,
        profile: profile
    }
}

function tag(name, color){
    return {
        name: name,
        color: color
    }
}


/**
 * @param  {string} id
 * @param  {string} title
 * @param  {user} author
 * @param  {tag} tag
 * @param  {Date} date - reminder that month is 0-indexed
 * @param  {string} content
 * @param  {int} comments_num
 * @param  {array} commenters
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

function calcDate(datePosted){
    const dateToday = new Date();
    const year = dateToday.getFullYear() - datePosted.getFullYear();
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


function loadDiscussions(discussionArr){
    for(const discussion of discussionArr){
        // console.log(discussion.author.imgSrc);
        // discussion.commenters.forEach((user) => console.log(`<img src="${user.imgSrc}" class="commenter">`));
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
                            ${discussion.content}
                        </p>
                    </div>
                </div>
                <div class="discussion-footer">
                    <div class="commenters">                     
                        ${discussion.commenters.length > limit ? '<img src="images/icon/more.png"class="commenter commenter-more"/>' : ''}            
                        ${discussion.commenters.slice(0, limit).reduce((updated,latest) => updated.concat(`<img src="${latest.imgSrc}" class="commenter">`), '')}
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
