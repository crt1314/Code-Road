'use script';

window.onload = function () {
    changeTitleWhenUserLeaveAndArrive();
    loading();
    show_header();
    setTimeout(backgroundImageLoad, 2000);
};

function show_header() {
    const header = document.createElement("header");
    const bgDiv = document.createElement("div");
    const beginDiv = document.createElement("div");
    const beginWord = document.createElement("p");
    const span = document.createElement("span");
    header.role = "banner";
    bgDiv.className = "bgDiv";
    beginWord.id = "beginWord";
    beginWord.textContent = "It's time to code now!";
    span.textContent = "Goal: Conquer difficulties";
    beginDiv.appendChild(beginWord);
    beginDiv.appendChild(span);
    bgDiv.appendChild(beginDiv);
    header.appendChild(bgDiv);
    document.body.appendChild(header);
}