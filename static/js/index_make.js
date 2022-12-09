'use script';

/**
 * 展示内容
 * @author crt1314
 * @version 1.0.0
 */
function showContent() {
    const header = document.createElement("header");
    const content = createDivElement("content");
    const waves = createDivElement("waves");
    header.role = 'banner';
    header.classList.add("wrap");
    header.dataset['cursor'] = "show";
    header.dataset['enter'] = "fadeInUp";
    appendChildren(content, getHome(), getAbout());
    appendChildren(header, waves, content);
    document.body.appendChild(header);

    /**
     * 获取Home页内容
     * @returns {HTMLDivElement}
     * @author crt1314
     * @version 1.0.0
     */
    function getHome() {
        const home = createDivElement("section animated", "home");
        const inner = createDivElement("section_inner");
        const homeContent = createDivElement("home");
        appendChildren(homeContent, getName(), getCt());
        inner.appendChild(homeContent);
        home.appendChild(inner);
        return home;
    }

    /**
     * 获取About页内容
     * @returns {HTMLDivElement}
     * @author crt1314
     * @version 1.0.0
     */
    function getAbout() {
        const about = createDivElement("section", "about");
        const inner = createDivElement("section_inner");
        const aboutContent = createDivElement("about");
        const leftDiv = createDivElement("left");
        const leftImgDiv = createDivElement("image");
        const leftImg = createImgElement("static/img/avatar.jpg", "avatar");
        const rightDiv = createDivElement("right");
        const short = createDivElement("short");
        const text = createDivElement("text");
        text.appendChild(description());
        appendChildren(short, getName(), getCt());
        appendChildren(rightDiv, short, text);
        leftImgDiv.appendChild(leftImg);
        leftDiv.appendChild(leftImgDiv);
        appendChildren(aboutContent, leftDiv, rightDiv);
        inner.appendChild(aboutContent);
        about.appendChild(inner);
        return about;
    }

    /**
     * 获取带有Code Road并且class为name的div
     * @returns {HTMLHeadingElement}
     */
    function getName() {
        const name = document.createElement("h3");
        name.className = "name";
        name.textContent = "Code Road";
        return name;
    }

    /**
     * 获取带有旋转特效的内容div
     * @returns {HTMLHeadingElement}
     */
    function getCt() {
        const ct = document.createElement("h3");
        const rotateSpan = createSpanElement("", "cd-headline rotate-1");
        const wrapperSpan = createSpanElement("", "cd-words-wrapper");
        const creative = createBElement("Creative", "is-visible");
        const funny = createBElement("Funny");
        const challenging = createBElement("Challenging");
        ct.className = "ct";
        appendChildren(wrapperSpan, creative, funny, challenging);
        appendChildren(rotateSpan,
            createSpanElement("Content", "blc"),
            document.createTextNode(" "), wrapperSpan);
        ct.appendChild(rotateSpan);
        return ct;
    }

    /**
     * 返回描述信息
     * @author crt1314
     * @version 1.0.0
     * @returns {HTMLParagraphElement} p标签对象
     */
    function description() {
        const desc = document.createElement("p");
        appendChildren(desc,
            document.createTextNode("This website is made for recording learning trails " +
            "and will document content on "),
            createSpanElement("Java"),
            document.createTextNode("、"),
            createSpanElement("C"),
            document.createTextNode("、"),
            createSpanElement("Python"),
            document.createTextNode("、"),
            createSpanElement("Linux"),
            document.createTextNode(", etc. It is a long、arduous、lonely and tedious way for me. " +
                "But I learned a lot -- "),
            createSpanElement(
                "all this can not be achieved overnight and success relies on perseverance. ",
                "highlight"),
            document.createTextNode("Let we go, "),
            createAElement("study/menu.html", "go!!!!!", "( ๑‾̀◡‾́)σ»"));
        return desc;
    }
}

/**
 * 获取链接
 * @returns {HTMLUListElement} ul
 * @author crt1314
 * @version 1.0.0
 */
function getTransitionLink() {
    const menu_ul = document.createElement("ul");
    const home_li = document.createElement("li");
    const home_a = createAElement("#home", "", "Home");
    const about_li = document.createElement("li");
    const about_a = createAElement("#about", "", "About");
    menu_ul.className = "transition_link";
    home_li.className = "active";
    about_li.appendChild(about_a);
    home_li.appendChild(home_a);
    appendChildren(menu_ul, home_li, about_li);
    return menu_ul;
}

/**
 * 展示设置颜色
 * @author crt1314
 * @version 1.0.0
 */
function showSettings() {
    const wrap = document.querySelector(".wrap");
    const settings = createDivElement("settings");
    const settingIcon = createDivElement("icon");
    const iconSvg = createImgElement("static/img/setting.svg", "settingIconSvg", "svg");
    const wrapper = createDivElement("wrapper");
    const titleSpan = createSpanElement("Unlimited Colors", "title");
    const titleSpan2 = createSpanElement("Magic Cursor", "title");
    const cursorUl = document.createElement("ul");
    const showCursor = document.createElement("li");
    const showLink = createAElement("#", "show");
    const hideCursor = document.createElement("li");
    const hideLink = createAElement("#", "hide");
    const hideImg = createImgElement("static/img/arrow.svg", "hideImg", "svg");
    cursorUl.className = "cursor";
    showLink.className = "showme show";
    hideLink.className = "hide";
    hideLink.appendChild(hideImg);
    hideCursor.appendChild(hideLink);
    showCursor.appendChild(showLink);
    appendChildren(cursorUl, showCursor, hideCursor);
    appendChildren(wrapper, titleSpan, getColors(), titleSpan2, cursorUl);
    settingIcon.appendChild(iconSvg);
    appendChildren(settings, settingIcon, wrapper);
    wrap.appendChild(settings);
    openOrCloseSettings();
    cursor_switcher();
    changeMainColor();

    /**
     * 获取颜色列表
     * @returns {HTMLUListElement}
     * @author crt1314
     * @version 1.0.0
     */
    function getColors() {
        const colors = document.createElement("ul");
        const colorList = [
            '#4169e1', '#66b95c', '#ff9800', '#ff5e84',
            '#fa5b0f', '#f39977', '#9200ee', '#00D4BD',
            '#5e9e9f', '#EB4A4C', '#666d41', '#fe0000'
        ];
        colors.className = "colors";
        colorList.forEach(function (data) {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = "#";
            a.dataset['color'] = data;
            a.style.backgroundColor = data;
            li.appendChild(a);
            colors.appendChild(li);
        });
        return colors;
    }

    /**
     * 打开或关闭设置
     * @author crt1314
     * @version 1.0.0
     */
    function openOrCloseSettings() {
        settingIcon.addEventListener("click", function () {
            settings.classList.toggle("opened");
        })
    }

    /**
     * 更改鼠标跟随物样式
     * @author crt1314
     * @version 1.0.0
     */
    function cursor_switcher() {
        hideLink.addEventListener("click", function () {
            showLink.classList.remove("showme");
            this.classList.add("showme");
            wrap.dataset["cursor"] = "hide";
        });
        showLink.addEventListener("click", function () {
            this.classList.add("showme");
            hideLink.classList.remove("showme");
            wrap.dataset["cursor"] = "show";
        });
    }

    /**
     * 改变--main-color
     * @author crt1314
     * @version 1.0.0
     */
    function changeMainColor() {
        const list = document.querySelectorAll(".settings .colors li a");
        list.forEach(function (a) {
            a.addEventListener("click", function () {
                $(":root").css("--main-color", $(this).data("color"));
                return false;
            })
        });
    }
}