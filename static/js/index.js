'use script';

window.onload = function () {
    changeTitleWhenUserLeaveAndArrive();
    showWelcome();
    blessings_show_and_hidden();
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
    const link = document.createElement("a");
    link.title = "go!!!!!";
    link.href = "study/menu.html";
    link.textContent = "( ๑‾̀◡‾́)σ»";
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
    desc.appendChild(document.createTextNode("Let we go, "));
    desc.appendChild(link);
    return desc;
}

/**
 * 展示与隐藏祝福语
 * @author crt1314
 * @version 1.0.0
 */
function blessings_show_and_hidden() {
    const blessings = [
        "There is no royal road to learning",
        "I'm not proud of everything I did, but I'm pretty sure I'd do it all again",
        "It's so easy to be careless, it takes courage and courage to care",
        "You're not a nobody, you are somebody",
        "Doubt is the key to knowledge",
        "I used to think that my life was a tragedy. But now I realize, it's a comedy",
        "Life was like a box of chocolate ,you never know what you're gonna get",
        "Hope is a good thing and maybe the best of things. And no good thing ever dies",
        "The greatest test of courage on earth is to bear defeat without losing heart",
        "A man's best friends are his ten fingers",
        "The shortest way to do many things is to only one thing at a time",
        "Sow nothing, reap nothing",
        "Life is a horse, and either you ride it or it rides you"
    ];
    const h2 = document.querySelector("#welcome h2");
    let i = 0, blessingsWordLength = 0;
    let intervalID = setInterval(show_blessings, 200);

    function show_blessings() {
        h2.textContent = blessings[i].substr(0, blessingsWordLength++);
        if (blessingsWordLength > blessings[i].length) {
            clearInterval(intervalID);
            setTimeout(pause, 500);
        }
    }

    function hidden_blessings() {
        h2.textContent = blessings[i].substr(0, --blessingsWordLength);
        if (!blessingsWordLength) {
            clearInterval(intervalID);
            intervalID = setInterval(show_blessings, 200);
            i = (i + 1) % blessings.length;
        }
    }

    function pause() {
         intervalID = setInterval(hidden_blessings, 100);
    }
}