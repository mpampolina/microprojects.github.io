var sideMenu = document.getElementById("sideMenu");

sideMenu.addEventListener("mouseenter", menuPopout);
sideMenu.addEventListener("mouseleave", menuPopback);

function menuPopout(event) {
    let navigation = document.querySelector("#navigation");
    let title = document.querySelector("#titleText");
    navigation.style.display = "block";
    title.style.display = "none";
    console.log("popout")
}

function menuPopback(event) {
    let navigation = document.querySelector("#navigation");
    let title = document.querySelector("#titleText");
    navigation.style.display = "none";
    title.style.display = "block";
    console.log("pop-in")
}