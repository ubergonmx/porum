window.addEventListener("load", function(e){
    const email = this.document.querySelector("#email");
    const password = this.document.querySelector("#password");
    const login = this.document.querySelector("#login");
    const error = this.document.querySelector(".text-error");
    let fields = [email, password];

    login.addEventListener("click", (e)=> {
        if(isEmptyOrSpaces(email.value) || isEmptyOrSpaces(password.value)){
            showError(error, "Please fill out all fields.", fields);
            return;
        }        
        this.window.location.href = "newsfeed.html";
    });
});
