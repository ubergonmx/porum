const tags = [
    {name: "FAQ's", color: "orange"},
    {name: "Off-Topic Chatter", color: "green"},
    {name: "Feedback", color: "purple"},
    {name: "Member Spotlight", color: "red"},
    {name: "Introductions", color: "blue"},
    {name: "Announcements", color: "pink"},
    {name: "Showcase", color: "gray"},
    {name: "Jobs", color: "brown"},
];
window.addEventListener("load", function(e){
    const userId = document.querySelector("#profile-container").getAttribute("data-id");
    const title = this.document.querySelector("#title");
    const content = this.document.querySelector("#content");
    const create = this.document.querySelector("#create");
    const filter = this.document.querySelector("#filter");
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
        if(!title.value.match(titleRegex)){
            showError(error, "Please enter a valid title.",[title]);
            return;
        }
        this.fetch("/discussion/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,//pending,
                title: title.value,
                content: content.value,
                tag: tags[filter.selectedIndex]
            })
        }).then(res => {
            
        }).catch(err => console.log(err));
        this.window.location.href = "home";
    });
});
