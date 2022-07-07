window.addEventListener("load", function(e){
    const iconUser = document.querySelector("#icon-user");
    const profilePic = this.document.querySelector("#profile-pic");
    const profileImg = this.document.querySelector("#profile-img");
    const coverPic = this.document.querySelector("#cover-photo");
    const coverImg = this.document.querySelector("#cover-img");
    const firstname = this.document.querySelector("#firstname");
    const lastname = this.document.querySelector("#lastname");
    const username = this.document.querySelector("#username"); 
    const bio = this.document.querySelector("#bio");
    const birthday = this.document.querySelector("#birthday");
    const telNo = this.document.querySelector("#telephone-no");
    const password = this.document.querySelector("#password");
    const confirmPassword = this.document.querySelector("#confirm-password");
    const enableBirthday = this.document.querySelector("#enable-birthday");
    const enableNumber = this.document.querySelector("#enable-number");
    const save = this.document.querySelector("#save-button");
    const error = this.document.querySelector(".text-error");
    const success = this.document.querySelector(".text-success");

    var userData = {};
    fetch("/users/get/"+userId).then(res => res.json()).then(data => userData = data);

    save.addEventListener("click", (e)=> {
        e.preventDefault();
        if(password.value.length > 0 && password.value.length < 5){
            showError(error, "Password must be at least 6 characters long.",[password]);
            return;
        }
        if(password.value != confirmPassword.value){
            showError(error, "Password did not match.",[password, confirmPassword]);
            return;
        }

        var formData = new FormData();
        formData.append("userId", userId);
        if(userData.firstname != firstname.value)
            formData.append("firstname", firstname.value);
        if(userData.lastname != lastname.value)
            formData.append("lastname", lastname.value);
        if(userData.username != username.value)
            formData.append("username", username.value);
        if(userData.bio != bio.value)
            formData.append("bio", bio.value);
        if(birthdayInput(userData.birthday) != birthdayInput(birthday.value))
            formData.append("birthday", new Date(birthday.value));
        if(userData.phoneNumber != telNo.value)
            formData.append("phoneNumber", telNo.value);
        if(password.value.length > 0)
            formData.append("password", password.value);
        if(coverImg.files.length)
            formData.append("coverImg", coverImg.files[0]);
        if(profileImg.files.length)
            formData.append("profileImg", profileImg.files[0]);
        if(userData.showBirthday != enableBirthday.checked)
            formData.append("showBirthday", enableBirthday.checked);
        if(userData.showNumber != enableNumber.checked)
            formData.append("showPhoneNumber", enableNumber.checked);


        this.fetch("/users/"+userId, {
            method: "PUT",
            body: formData
        }).then(res =>{
            if(res.status==200){
                this.window.location.href = window.location.origin + "/settings#settings-box";
                success.scrollIntoView();
                if(profileImg.files[0])
                    iconUser.src = URL.createObjectURL(profileImg.files[0]);
                showSuccess(success, "Settings updated successfully.");
            }
            else return res.json();
        }).then(data => {
            if(data.message){
                showError(error, data.message,  [coverPic, profilePic]);
                return;
            }
        }).catch(err => console.log(err));
    });

    profileImg.addEventListener("change", ()=>{
        try{
            if(profileImg.files[0].type.match(/image.*/))
                profilePic.src = URL.createObjectURL(profileImg.files[0]);
            else
                showError(error, "Please select an image file.", [profileImg.parentElement]);
        }catch(err){
            // console.log(err);
        }
    });
    coverImg.addEventListener("change", ()=>{
        try{
            if(coverImg.files[0].type.match(/image.*/))
                coverPic.src = URL.createObjectURL(coverImg.files[0]);
            else
                showError(error, "Please select an image file.", [coverImg.parentElement]);
        }catch(err){
            // console.log(err);
        }
    });
});

