"use strict";
const okButton = document.getElementById("popup-ok");
const noButton = document.getElementById("popup-no");
const xButton = document.getElementById("popup-x");
const popup = document.getElementById("box");
const popdiv = document.getElementById("pop-div");

document.addEventListener("DOMContentLoaded", function() {
    if (getCookie("popup-hidden3") != "true" && false) {
        popup.style.display = "grid";
        popdiv.style.zIndex = "20";
    }
});


okButton.addEventListener("click", async () => {
    popup.style.display = "none";
    //document.getElementById("search-bar").value = "https://discord.gg/6MVCHfPEaP";
    //document.getElementById("sub").click();
    setCookie("popup-hidden3", "true", 365);
    popdiv.style.zIndex = "0";
    window.location.href = window.location.href + "blog/articles/great-domain-crisis.html";
});

noButton.addEventListener("click", async () => {
    popup.style.display = "none";
    setCookie("popup-hidden3", "true", 365);
    popdiv.style.zIndex = "0";
});
xButton.addEventListener("click", async () => {
    popup.style.display = "none";
    setCookie("popup-hidden3", "true", 365);
    popdiv.style.zIndex = "0";
});



function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}