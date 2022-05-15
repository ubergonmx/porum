window.addEventListener("load", function(e){
    const email = this.document.querySelector("#email");
    const password = this.document.querySelector("#password");
    const login = this.document.querySelector("#login");

    login.addEventListener("click", (e)=> {
        if(isEmptyOrSpaces(email.value) && isEmptyOrSpaces(password.value))
            return;
        
        this.window.location.href = "newsfeed.html";
    });
});
