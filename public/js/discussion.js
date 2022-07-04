var discussionId;
window.addEventListener("load", function(e){
    discussionId = this.window.location.pathname.split("/")[2];
    const edit = this.document.querySelector("#edit");
    const follow = this.document.querySelector("#follow");
    const unfollow = this.document.querySelector("#unfollow");
    const comment = this.document.querySelector("#comment-input");
    const create = this.document.querySelector("#create-button");
    const error = this.document.querySelector(".text-error");
    let fields = [comment];

    create.addEventListener("click", (e)=> {
        e.preventDefault();
        let emptyFields = [];
        for(const input of fields){
            if(isEmptyOrSpaces(input.value)){
                emptyFields.push(input);
            }
        }
        if(emptyFields.length > 0){
            showError(error, "Please fill up the field", emptyFields);
            return;
        }
        //add minimum and maximum to comment

        this.fetch(`/discussions/${discussionId}/comment`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,
                discussionId: discussionId,
                content: comment.value.removeNewlinesAndTags()
            })
        }).then(res =>{
            if(res.status >= 400){
                showError(error, "Invalid content", fields);
                return;
            }
            else if(res.status==200)
                this.window.location.reload();
        })
    });

    if(follow && unfollow){
        follow.addEventListener("click", (e)=> {
            e.preventDefault();
            this.fetch(`/discussions/${discussionId}/follow`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: userId
                })
            }).then(res =>{
                if(res.status >= 400){
                    console.log("Failed to follow.")
                    return res.json();
                }
                else if(res.status==200){
                    follow.classList.add("hide");
                    unfollow.classList.remove("hide");
                }
            }).then(data =>{
                if (data) console.log(data);
            });
        });

        unfollow.addEventListener("click", (e)=> {
            e.preventDefault();
            this.fetch(`/discussions/${discussionId}/unfollow`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: userId
                })
            }).then(res =>{
                if(res.status >= 400){
                    console.log("Failed to unfollow.")
                    return res.json();
                }
                else if(res.status==200){
                    unfollow.classList.add("hide");
                    follow.classList.remove("hide");
                }
            }).then(data => {
                if(data) console.log(data);
            });
        });
    }

    if(edit){
        edit.addEventListener("click", (e)=> {
            this.window.location.href = this.window.location.origin + "/editdiscussion/" + discussionId;
        });
    }
});

document.addEventListener("click", (e)=>{
    if(!e.target)
        return;
    
    let commentEdit = e.target.closest(".comment-edit");
    if(commentEdit){
        let commentContent = commentEdit.parentElement;
        let commentId = commentContent.parentElement.parentElement.id;
        let commentDate = commentContent.querySelector(".commenter-date");
        let commentEditForm = commentContent.nextElementSibling;
        let success = commentEdit.nextElementSibling;
        let input =  commentEditForm.querySelector(".comment-edit-textarea");
        let cancelBtn = commentEditForm.querySelector(".comment-edit-cancel");
        let saveBtn =  commentEditForm.querySelector(".comment-edit-save");
        let deleteBtn = commentEditForm.querySelector(".comment-edit-delete");
        let content = input.value.removeNewlinesAndTags();

        if(content === input.value.removeNewlinesAndTags()){
            saveBtn.disabled = true;
        }
        commentContent.classList.add("hide");
        commentEdit.classList.add("hide");
        commentEditForm.classList.remove("hide");

        cancelBtn.addEventListener("click", (e)=> {
            e.preventDefault();
            commentEditForm.classList.add("hide");
            commentContent.classList.remove("hide");
            commentEdit.classList.remove("hide");
        });

        input.addEventListener("keyup", (e)=> {
            if(content === input.value.removeNewlinesAndTags()){
                saveBtn.disabled = true;
            }
            else{
                saveBtn.disabled = false;
            }

            if(isEmptyOrSpaces(input.value)){
                saveBtn.disabled = true;
            }
            else{
                saveBtn.disabled = false;
            }

            content = input.value.removeNewlinesAndTags();
        });

        saveBtn.addEventListener("click", (e)=> {
            e.preventDefault();

            this.fetch(`/discussions/${discussionId}/comment/${commentId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: userId,
                    content: input.value.removeNewlinesAndTags()
                })
            }).then(res =>{
                if(res.status >= 400){
                    showError(error, "Invalid content", fields);
                    return;
                }
                else if(res.status==200){
                    let date = commentDate.innerHTML;
                    if(date.includes("•")) date = date.split("•")[0];
                    
                    showSuccess(success, "Successfully edited");
                    input.value = content;
                    commentEditForm.classList.add("hide");
                    commentContent.classList.remove("hide");
                    commentEdit.classList.remove("hide");
                    commentDate.innerHTML = date + "&bull; Edited on " + formatDate(new Date());
                    commentContent.querySelector("p").innerHTML = input.value;
                }
            })
        });

        deleteBtn.addEventListener("click", (e)=> {
            e.preventDefault();
            this.fetch(`/discussions/${discussionId}/comment/${commentId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: userId
                })
            }).then(res =>{
                if(res.status >= 400){
                    console.log("Failed to delete.")
                    return res.json();
                }
                else if(res.status==200){
                    commentContent.parentElement.parentElement.remove();
                }
            }).then(data =>{
                if (data) console.log(data);
            });
        });
    }
});