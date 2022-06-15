window.addEventListener("load", function(e){
    const userPic = this.document.querySelector("#user-pic");
    const changePic = this.document.querySelector("#change-pic");
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
            showError(error, "Password must be atleast 6 characters long.",[password]);
            return;
        }
        if(password.value != confirmPassword.value){
            showError(error, "Password did not match.",[password, confirmPassword]);
            return;
        }        

        this.window.location.href = "profile";
    });

    changePic.addEventListener("change", ()=>{
        userPic.src = URL.createObjectURL(changePic.files[0]);
    });
});
