window.addEventListener("load", function(e){
    const userPic = this.document.querySelector("#user-pic");
    const profileImg = this.document.querySelector("#profile-img");
    const firstname = this.document.querySelector("#firstname");
    const lastname = this.document.querySelector("#lastname");
    const username = this.document.querySelector("#username");
    const email = this.document.querySelector("#email");
    const password = this.document.querySelector("#password");
    const confirmPassword = this.document.querySelector("#confirmpassword");
    const createAcc = this.document.querySelector("#create-account");
    const error = this.document.querySelector(".text-error");
    let fields = [firstname,lastname,username,email,password,confirmPassword];

    createAcc.addEventListener("click", (e)=> {
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
        if(!email.value.match(emailRegex)){
            showError(error, "Please enter a valid email.",[email]);
            return;
        }
        if(password.value.length < 5){
            showError(error, "Password must be at least 6 characters long.",[password]);
            return;
        }
        if(password.value != confirmPassword.value){
            showError(error, "Password did not match.",[password, confirmPassword]);
            return;
        }

        const formData = new FormData(this.document.querySelector("#signup-form"));

        this.fetch("/auth/signup", {
            method: "POST",
            body: formData
        }).then(res => {
            if(res.status == 200)
                this.window.location.href = window.location.origin + "/login";
            else
                return res.json()
        }).then(data => {
            if(data.error){
                let errorFields = [];
                data.fields.forEach(field => {
                    errorFields.push(document.querySelector(`#${field}`));
                });
                showError(error, data.error, errorFields);
                return;
            }
        }).catch(err => console.log(err));
    });

    profileImg.addEventListener("change", ()=>{
        userPic.src = URL.createObjectURL(profileImg.files[0]);
    });
});