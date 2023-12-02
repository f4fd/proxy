let motd = document.getElementById("motd");
//let siteEpoch = 1663351995000;
//1684162800000
let siteEpoch = 1684162800000 - 86400000;

const d = new Date();
let time = d.getTime();

let days = Math.floor((time - siteEpoch) / 86400000);

fetch('motd.txt')
    .then(response => response.text())
    .then(text => motd.innerHTML = text.split("\n")[days - 1])