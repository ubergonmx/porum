window.addEventListener("load", function(e){
    const password = this.document.querySelector("#password");
    const confirmPassword = this.document.querySelector("#confirm-password");
    const resetPassword = this.document.querySelector("#reset-password");
    const error = this.document.querySelector(".text-error");
    let fields = [password, confirmPassword];

    resetPassword.addEventListener("click", (e)=> {
        e.preventDefault();
        if(password.value.length < 6){
            showError(error, "Password must be at least 6 characters long.",[password]);
            return;
        }
        if(password.value != confirmPassword.value){
            showError(error, "Password did not match.", fields);
            return;
        }
        
        this.fetch(`/auth/${window.location.pathname.split("/")[2]}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: password.value,
            })
        }).then(res => {
            if(res.status >= 400){
                showError(error, "Link invalid or expired.", fields);
                return;
            }
            if(res.status == 200){
                this.window.location.href = window.location.origin + "/home";
            }
        }).catch(err => console.log(err))
    });
});

window.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){if(e.target.nodeName=='INPUT'&&e.target.type=='text'){e.preventDefault();return false;}}},true);