window.addEventListener("load", function(e){
    const userId = this.document.querySelector("#profile-container").getAttribute("data-id");
    const title = this.document.querySelector("#input-title");
    const content = this.document.querySelector("#input-content");
    const create = this.document.querySelector("#create-button");
    const filter = this.document.querySelector("#filter");
    const error = this.document.querySelector(".text-error");
    let fields = [title, content];

    create.addEventListener("click", (e)=> {
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

        this.fetch("/discussions/",
        {
            method: "POST",
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
                this.window.location.href = window.location.origin + "/home";
        })
    });
});
