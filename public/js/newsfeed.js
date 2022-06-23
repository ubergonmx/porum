var container, scaffold, loadMore, tempSideFilter;

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

window.addEventListener("load", function(e){
    scaffold = document.querySelector("#scaffold");
    tempSideFilter = document.querySelector("#all-discussion");
    loadMore = document.querySelector("#load-more-discussion");
    container = document.querySelector("#discussion-container");

    // toggle(loadMore);
    // loadDiscussions(discussions);

    const filter = document.querySelector("#filter");
    filter.addEventListener("change", (e)=>{
        clear(container);
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
        
        // toggle(loadMore, 1);
    });

    const newDiscussion = document.querySelector("#new-discussion");
    newDiscussion.addEventListener("click", () => {
        console.log("CLICKED NEW DISCUSSION");
        window.location.href = window.location.origin + "/startdiscussion";
    });
});

document.addEventListener("click", (e)=>{
    if(!e.target)
        return;
    
    let discussionBox = e.target.closest(".discussion-box");
    if(discussionBox && discussionBox.hasAttribute("data-link"))
        window.location.href = discussionBox.getAttribute("data-link");

    let tag = e.target.closest(".tag");
    if(tag && tag.hasAttribute("data-tag-type") && !tag.classList.contains("text-active")){
        setSideFilter(tag);
        
        clear(container);
        let selected = discussions.filter((a) => a.tag.name == tag.innerHTML);
        if(selected === undefined || selected.length == 0){
            container.innerHTML = 
            `<div id="scaffold">
                <img src="../images/design/404.png">
                <h1 id="text-title">No discussions yet</h1>
            </div>`;
            // toggle(loadMore, 0);
        }
        else {
            // toggle(loadMore, 1);
            loadDiscussions(selected);
        }
    }

    let allDiscussion = e.target.closest("#all-discussion");
    if(allDiscussion && !allDiscussion.classList.contains("text-active")){
        setSideFilter(allDiscussion);
        clear(container);
        loadDiscussions(discussions);
        // toggle(loadMore, 1);
    }

    let following = e.target.closest("#following");
    if(following && !following.classList.contains("text-active")){
        setSideFilter(following);
        clear(container);
        loadDiscussions(discussions);
        // toggle(loadMore, 1);
    }
});

/**
 * Set the element inside aside tag to be active
 * @param  {element} element
 */
function setSideFilter(element){
    if(tempSideFilter)
        tempSideFilter.classList.toggle("text-active");
    tempSideFilter = element;
    tempSideFilter.classList.toggle("text-active");
}

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
                        ${discussion.commenters.length > limit ? '<img src="../images/icon/more.png"class="commenter commenter-more"/>' : ''}            
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
