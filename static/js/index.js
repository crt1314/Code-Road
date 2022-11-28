'use script';

/**
 * 页面加载
 */
window.onload = function () {
    changeTitleWhenUserLeaveAndArrive();
    showWelcome();
};

/**
 * 展示欢迎页面
 */
function showWelcome() {
    const header = document.createElement("header");
    const welcomeDiv = document.createElement("div");
    const h1 = document.createElement("h1");
    const h2 = document.createElement("h2");
    header.role = 'banner';
    welcomeDiv.id = "welcome";
    h1.textContent = "Code Road";
    h2.textContent = "Welcome to Code Road";
    welcomeDiv.appendChild(h1);
    welcomeDiv.appendChild(h2);
    header.appendChild(welcomeDiv);
    document.body.appendChild(header);
}