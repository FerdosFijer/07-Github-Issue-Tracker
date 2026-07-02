document.getElementById("SignIn-btn").addEventListener("click", function(){

    const userNameInput = document.getElementById("input-name");
    const userName = userNameInput.value;

    const inputPin = document.getElementById("input-pin");
    const pin = inputPin.value;

    if(userName == "admin" && pin =="admin123"){
        window.location.assign("/home.html")
    }else{
        return;
    }
})