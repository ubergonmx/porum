window.addEventListener("load", function(e){
    const username = this.document.querySelector("#username");
    const email = this.document.querySelector("#email");
    const sendResetLink = this.document.querySelector("#send-link");
    const error = this.document.querySelector(".text-error");
    let fields = [email, username];

    sendResetLink.addEventListener("click", (e)=> {
        e.preventDefault();
        if(isEmptyOrSpaces(email.value) || isEmptyOrSpaces(username.value)){
            showError(error, "Please fill out all fields.", fields);
            return;
        }
        if(!email.value.match(emailRegex)){
            showError(error, "Please enter a valid email.",[email]);
            return;
        }

        this.fetch("/auth/reset", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username.value,
                email: email.value
            })
        }).then(res => {
            if(res.status >= 400){
                showError(error, "Invalid username or email.", fields);
                return;
            }
            if(res.status == 200){
                this.window.location.href = window.location.origin + "/home";
            }
        }).catch(err => console.log(err))
    });
});
