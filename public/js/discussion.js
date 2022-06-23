window.addEventListener("load", function(e){
    const userId = this.document.querySelector("#profile-container").getAttribute("data-id");
    const discussionId = this.document.querySelector("#discussion-content").getAttribute("data-id");
    const edit = this.document.querySelector("#edit");
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
                content: comment.value
            })
        }).then(res =>{
            if(res.status >= 400){
                showError(error, "Invalid title or content", fields);
                return;
            }
            else if(res.status==200)
                this.window.location.reload();
        })
    });
});
