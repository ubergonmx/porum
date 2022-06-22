window.addEventListener("load", function(e){
    e.preventDefault();
    const title = this.document.querySelector("#title");
    const content = this.document.querySelector("#content");
    const create = this.document.querySelector("#create");
    const error = this.document.querySelector(".text-error");
    let fields = [title, content];

    create.addEventListener("click", (e)=> {
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

        // const formData = new FormData(this.document.querySelector("#startdiscussionForm"));

        // this.fetch("/discussions/",
        // {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },

        //     body: JSON.stringify({
        //         title: title.value,
        //         content: content.value,
        //         tagname: tagname.value,
        //         tagcolor: tag.color.value
        //     })
        // }).then(res =>{
        //     if(res.status >= 400){
        //         showError(error, "Invalid title or content", fields);
        //         return;
        //     }
        // }

        this.window.location.href = "home";
    });
});
