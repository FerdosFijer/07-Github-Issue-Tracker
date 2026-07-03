document.getElementById("SignIn-btn").addEventListener("click", function () {

    const userNameInput = document.getElementById("input-name");
    const userName = userNameInput.value;

    const inputPin = document.getElementById("input-pin");
    const pin = inputPin.value;

    if (userName == "admin" && pin == "admin123") {
        window.location.assign("/home.html")
    } else {
        return;
    }
})


//  <button id="" onclick="" class="lesson-btn2 btn btn-outline btn-primary">All </button>
// <button id="" onclick="" class="lesson-btn2 btn btn-outline btn-primary">Open </button>
// <button id="" onclick="" class="lesson-btn2 btn btn-outline btn-primary">Close</button>