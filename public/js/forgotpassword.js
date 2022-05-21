window.addEventListener("load", function(e){
    const username = this.document.querySelector("#username");
    const email = this.document.querySelector("#email");
    const sendResetLink = this.document.querySelector("#send-link");
    const error = this.document.querySelector(".text-error");
    let fields = [email, username];

    sendResetLink.addEventListener("click", (e)=> {
        if(isEmptyOrSpaces(email.value) || isEmptyOrSpaces(username.value)){
            showError(error, "Please fill out all fields.", fields);
            return;
        }
        if(!email.value.match(emailRegex)){
            showError(error, "Please enter a valid email.",[email]);
            return;
        }
        this.window.location.href = "index.html";
    });
});
