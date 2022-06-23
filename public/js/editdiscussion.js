window.addEventListener("load", function(e){
    const userId = this.document.querySelector("#profile-container").getAttribute("data-id");
    const discussionId = this.window.location.pathname.split("/")[2];
    const title = this.document.querySelector("#edit-title");
    const content = this.document.querySelector("#edit-content");
    const filter = this.document.querySelector("#filter");
    const editBtn = this.document.querySelector("#edit-button");
    const deleteBtn = this.document.querySelector("#delete-button");
    const error = this.document.querySelector(".text-error");
    let fields = [title, content];

    editBtn.addEventListener("click", (e)=> {
        e.preventDefault();
        let emptyFields = [];
        for(const input of fields){
            if(isEmptyOrSpaces(input.value)){
                emptyFields.push(input);
            }
        }
        if(emptyFields.length > 0){
            showError(error, "Please fill out all fields.", emptyFields);
            return;
        }
        // if(!title.value.match(titleRegex)){
        //     showError(error, "Please enter a valid title.",[title]);
        //     return;
        // }
        const link = `${window.location.origin}/discussions/${discussionId}`;
        this.fetch(link,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,
                title: title.value,
                content: content.value,
                tag: tags[filter.selectedIndex]
            })
        }).then(res =>{
            if(res.status >= 400){
                showError(error, "Invalid title or content", fields);
                return;
            }
            else if(res.status==200)
                this.window.location.href = link;
        })
    });

    deleteBtn.addEventListener("click", (e)=> {
        e.preventDefault();
        this.fetch(`${window.location.origin}/discussions/${discussionId}`,
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
                return res.json();
            }
            else if(res.status==200)
                this.window.location.href = window.location.origin + "/home";
        }).then(data => {
            if(data.error){
                showError(error, data.error, fields);
            }
        }).catch(err => { console.log(err); });
    });
});
