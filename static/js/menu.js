'use script';

window.onload = function () {
    changeTitleWhenUserLeaveAndArrive();
    loading();
    show_header();
    show_nav();
    setTimeout(backgroundImageLoad, 2000);
};

function show_header() {
    const header = document.createElement("header");
    const beginDiv = document.createElement("div");
    const beginWord = document.createElement("p");
    const span = document.createElement("span");
    header.role = "banner";
    beginWord.id = "beginWord";
    beginWord.textContent = "It's time to code now!";
    span.textContent = "Goal: Conquer difficulties";
    beginDiv.appendChild(beginWord);
    beginDiv.appendChild(span);
    header.appendChild(beginDiv);
    document.body.appendChild(header);
}

function show_nav() {
    const nav = document.createElement("nav");
    nav.role = "navigation";

    document.body.appendChild(nav);
}