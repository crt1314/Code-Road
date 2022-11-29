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
 * @author crt1314
 * @version 1.0.0
 */
function showWelcome() {
    const header = document.createElement("header");
    const welcomeDiv = document.createElement("div");
    const h1 = document.createElement("h1");
    const h2 = document.createElement("h2");
    header.role = 'banner';
    welcomeDiv.id = "welcome";
    h1.textContent = "Code Road";
    h2.appendChild(document.createTextNode("Welcome to "));
    h2.appendChild(createSpanElement("Code Road"));
    welcomeDiv.appendChild(h1);
    welcomeDiv.appendChild(h2);
    welcomeDiv.appendChild(description());
    header.appendChild(welcomeDiv);
    document.body.appendChild(header);
}

/**
 * 返回描述信息
 * @author crt1314
 * @version 1.0.0
 * @returns {HTMLParagraphElement} p标签对象
 */
function description() {
    const desc = document.createElement("p");
    desc.appendChild(document.createTextNode(
        "This website is made for recording learning trails " +
        "and will document content on "));
    desc.appendChild(createSpanElement("Java"));
    desc.appendChild(document.createTextNode("、"));
    desc.appendChild(createSpanElement("C"));
    desc.appendChild(document.createTextNode("、"));
    desc.appendChild(createSpanElement("Python"));
    desc.appendChild(document.createTextNode("、"));
    desc.appendChild(createSpanElement("Linux"));
    desc.appendChild(document.createTextNode(
        ", etc. It is a long、arduous、lonely and tedious way for me. " +
        "But I learned a lot -- "));
    desc.appendChild(createSpanElement(
        "all this can not be achieved overnight and success relies on perseverance. ",
        "highlight"));
    desc.appendChild(document.createTextNode("Let we go, ( ๑‾̀◡‾́)σ»"));
    return desc;
}