'use script';

/**
 * 当用户离开或进入页面时改变网页title
 * @author crt1314
 * @version 1.0.0
 */
function changeTitleWhenUserLeaveAndArrive() {
    // 保存文档原来的title
    const origin_title = document.title;
    // 保存timeout返回的id
    let timeoutID;

    // 页面失去焦点
    window.onblur = function () {
        if (timeoutID !== undefined) clearTimeout(timeoutID);
        document.title = "宝，别走(ಥ﹏ಥ)";
    };

    // 页面获取焦点
    window.onfocus = function () {
        document.title = "宝，欢迎回来o((*^▽^*))o";
        timeoutID = setTimeout(changeToOriginTitle, 1000);
    };

    // 将页面title改为原来值
    function changeToOriginTitle() {
        document.title = origin_title;
    }
}

/**
 * 创建span标签
 * @param content
 * @param cls
 * @returns {HTMLSpanElement}
 * @author crt1314
 * @version 1.0.0
 */
function createSpanElement(content, cls) {
    const span = document.createElement("span");
    span.textContent = content;
    if (cls !== undefined) span.className = cls;
    return span;
}

/**
 * 创建img标签
 * @param src
 * @param alt
 * @param cls
 * @returns {HTMLImageElement}
 * @author crt1314
 * @version 1.0.0
 */
function createImgElement(src, alt, cls) {
    const img = document.createElement("img");
    img.alt = alt;
    img.src = src;
    if (cls !== undefined) img.className = cls;
    return img;
}

/**
 * 创建div标签
 * @param cls
 * @param id
 * @returns {HTMLDivElement}
 * @author crt1314
 * @version 1.0.0
 */
function createDivElement(cls, id) {
    const div = document.createElement("div");
    if (cls !== undefined) div.className = cls;
    if (id !== undefined) div.id = id;
    return div;
}

/**
 * 创建b标签
 * @param content
 * @param cls
 * @returns {HTMLElement}
 */
function createBElement(content, cls) {
    const b = document.createElement("b");
    b.textContent = content;
    if (cls !== undefined) b.className = cls;
    return b;
}

/**
 * 创建a标签
 * @param href
 * @param title
 * @param content
 * @returns {HTMLAnchorElement}
 */
function createAElement(href, title, content = "") {
    const a = document.createElement("a");
    a.href = href;
    a.title = title;
    a.textContent = content;
    return a;
}

/**
 * 添加多个元素
 * @param parent
 * @param children
 */
function appendChildren(parent, ...children) {
    for (const ele of children) {
        parent.appendChild(ele);
    }
}

/**
 * 显示加载动画
 * @author crt1314
 * @version 1.0.0
 */
function loadingAnimate() {
    const loadingDiv = createDivElement(undefined, "loadingDiv");
    const loading = document.createElement("div");
    const content = document.createElement("h2");
    content.textContent = "Loading...";
    for (let i = 0; i < 4; i++) {
        loading.appendChild(createSpanElement(""));
    }
    loading.appendChild(content);
    loadingDiv.appendChild(loading);
    document.body.appendChild(loadingDiv);
}

/**
 * 检查header背景图片加载
 * @author crt1314
 * @version 1.0.0
 */
function backgroundImageLoad() {
    const header = document.querySelector("header[role='banner']");
    const src = getComputedStyle(header).background.match(/url\("?(.*)"\)/)[1];
    const img = new Image();
    img.src = src;
    img.onload = function () {
        document.body.style.hidden = "auto";
        document.body.removeChild(document.getElementById("loadingDiv"));
        header.style.transform = "translateY(0)";
    }
}

/**
 * 展示鼠标跟随物
 * @author crt1314
 * @version 1.0.0
 */
function showCursor() {
    const wrap = document.querySelector(".wrap");
    const cursor_outer = createDivElement("mouse-cursor cursor-outer");
    const cursor_inner = createDivElement("mouse-cursor cursor-inner");
    show_cursor_help(cursor_outer, cursor_inner);
    appendChildren(wrap, cursor_outer, cursor_inner);

    /**
     * 帮助方法
     * @param cursor_outer
     * @param cursor_inner
     */
    function show_cursor_help(cursor_outer, cursor_inner) {
        let n = 0, i = 0;
        window.onmousemove = function (mouse) {
            cursor_outer.style.transform = `translate(${mouse.clientX}px, ${mouse.clientY}px)`;
            cursor_inner.style.transform = `translate(${mouse.clientX}px, ${mouse.clientY}px)`;
            n = mouse.clientY;
            i = mouse.clientX;
        };
        const body = $("body");
        body.on("mouseenter", "a,.top_bar .trigger, .cursor-pointer, .button", function () {
            cursor_inner.classList.add("cursor-hover");
            cursor_outer.classList.add("cursor-hover");
        });
        body.on("mouseleave", "a,.top_bar .trigger, .cursor-pointer, .button", function () {
            const flag = $(this).is("a") && $(this).closest(".cursor-pointer").length;
            if (!flag) {
                cursor_inner.classList.remove("cursor-hover");
                cursor_outer.classList.remove("cursor-hover");
            }
        });
        cursor_inner.style.visibility = "visible";
        cursor_outer.style.visibility = "visible";
    }
}

/**
 * 展示目录
 * @author crt1314
 * @version 1.0.0
 */
function showMenu(selector, logoImg) {
    const container = document.querySelector(selector);
    appendChildren(container, showTopBar(), showMobileMenuOrNot(), showMobileMenuOrNot(false));

    /**
     * 返回topBar，在小设备上展示
     * @returns {HTMLDivElement} topBar
     * @author crt1314
     * @version 1.0.0
     */
    function showTopBar() {
        const topBar = createDivElement("top_bar");
        const topBarInner = createDivElement("top_bar_inner");
        const trigger = createDivElement("trigger");
        const hamburger = createDivElement("hamburger hamburger--slider");
        const hamburger_box = createDivElement("hamburger-box");
        const hamburger_inner = createDivElement("hamburger-inner");
        hamburger_box.appendChild(hamburger_inner);
        hamburger.appendChild(hamburger_box);
        trigger.appendChild(hamburger);
        appendChildren(topBarInner, getLogo(logoImg), trigger);
        topBar.appendChild(topBarInner);
        return topBar;
    }

    /**
     * 返回目录列表
     * @param flag
     * @returns {HTMLDivElement}
     * @author crt1314
     * @version 1.0.0
     */
    function showMobileMenuOrNot(flag = true) {
        const mobile_or_computer_menu = createDivElement(flag ? "mobile_menu" : "computer_menu");
        const container = createDivElement("container");
        const menu = createDivElement("menu");
        menu.appendChild(getTransitionLink());
        if (!flag) container.appendChild(getLogo(logoImg));
        container.appendChild(menu);
        mobile_or_computer_menu.appendChild(container);
        return mobile_or_computer_menu;
    }

    /**
     * 获取logo
     * @returns {HTMLDivElement} 包含logo的div
     * @author crt1314
     * @version 1.0.0
     */
    function getLogo(logoImg) {
        const logo = createDivElement("logo");
        const logoLink = createAElement("#", "Code Road");
        const logoImage = createImgElement(logoImg, "Code Road");
        const h1 = document.createElement("h1");
        h1.textContent = "Code Road";
        h1.style.opacity = "0";
        h1.style.position = "absolute";
        h1.style.zIndex = "-1";
        logoLink.appendChild(logoImage);
        appendChildren(logo, logoLink, h1);
        return logo;
    }
}

/**
 * 小设备点击某一个链接后关闭目录
 * @author crt1314
 * @version 1.0.0
 */
function trigger_menu() {
    const hamburger = document.querySelector(".top_bar .trigger .hamburger");
    const mobileMenu = document.querySelector(".mobile_menu");
    const menu = document.querySelectorAll(".mobile_menu .menu a");
    hamburger.addEventListener('click', function () {
        this.classList.toggle('is-active');
        mobileMenu.classList.toggle("opened");
        return false;
    });
    menu.forEach(function (as) {
        as.addEventListener('click', function () {
            hamburger.classList.remove('is-active');
            mobileMenu.classList.remove('opened');
            return false;
        })
    });
}

/**
 * 转换页面
 * @param num 总共有多少页
 * @author crt1314
 * @version 1.0.0
 */
function page_transition(num){
    const section = $('.section');
    const allLi = $('.transition_link li');
    const button = $('.transition_link a');
    const wrapper = $('.wrap');
    const enter = wrapper.data('enter');
    button.on('click', function(e){
        e.preventDefault();
        const index = button.index(this) % num;
        const element = $(allLi.find('a').get(index));
        const element2 = $(allLi.find('a').get(index + num));
        const href = element.attr('href');
        const sectionID = $(href);
        const parent = element.closest('li');
        const parent2 = element2.closest('li');
        if (!parent.hasClass('active') || !parent2.hasClass('active')) {
            allLi.removeClass('active');
            wrapper.find(section).removeClass(`animated ${enter}`);
            if (wrapper.hasClass('opened')) {
                wrapper.find(section).addClass(`animated`);
            }
            parent2.addClass('active');
            parent.addClass('active');
            wrapper.addClass('opened');
            wrapper.find(sectionID).removeClass(`animated`).addClass(`animated ${enter}`);
            $(section).addClass('hidden');
            sectionID.removeClass('hidden').addClass('active');
        }
        document.querySelector(href).scrollIntoView({
            behavior: "smooth"
        })
    });
}

/**
 * 高亮代码
 * @param content
 * @author crt1314
 * @version 1.0.0
 */
function hlContent(content) {
    content.querySelectorAll("pre code").forEach(ele => hljs.highlightElement(ele));
}

/**
 * 添加点击事件
 * @author crt1314
 * @version 1.0.0
 */
function menuClick() {
    const as = $(".section .menu a");
    as.on("click", function (e) {
        e.preventDefault();
        document.querySelector($(this).attr("href")).scrollIntoView({
            behavior: "smooth"
        })
    })
}

/**
 * 从url中获取内容
 * @param url
 * @param menu
 * @returns {HTMLDivElement}
 * @author crt1314
 * @version 1.0.0
 */
function getContent(url, menu) {
    const content = document.createElement("div");
    $.ajax({
        url: url,
        dataType: "json",
        success: function (data) {
            getContentHelp(content, data);
            setTimeout(hlContent, 200, content);
            setTimeout(getContentMenu, 200, content, menu);
            setTimeout(menuClick, 1000);
            document.querySelectorAll(".section .box .button")
                .forEach(ele => setTimeout(drag_and_scale, 200, ele, true, true));
        }
    });
    return content;
}

/**
 * 获取目录内容
 * @param content
 * @param menu
 * @author crt1314
 * @version 1.0.0
 */
function getContentMenu(content, menu) {
    const ul = document.createElement("ul");
    const menu_li = document.createElement("li");
    menu_li.className = "menu_li";
    menu_li.textContent = "目录";
    ul.appendChild(menu_li);
    content.querySelectorAll("h3,h4,h5,h6").forEach(ele => {
        const tag = ele.tagName;
        const li = document.createElement("li");
        const a = createAElement(`#${ele.id}`, ele.textContent, ele.textContent);
        switch (tag) {
            case "H4":
                li.className = "tab1";
                break;
            case "H5":
                li.className = "tab2";
                break;
            case "H6":
                li.className = "tab3";
                break;
        }
        li.appendChild(a);
        ul.appendChild(li);
    });
    menu.appendChild(ul);
}

/**
 * 获取内容帮助方法
 * @param ele
 * @param innerEle
 * @author crt1314
 * @version 1.0.0
 */
function getContentHelp(ele, innerEle) {
    if (Array.isArray(innerEle)) {
        innerEle.forEach(function (data) {
            getContentHelp(ele, data);
        });
    } else {
        let element;
        if ("isText" in innerEle) {
            element = document.createTextNode(innerEle.textContent);
        } else {
            element = document.createElement(innerEle.type);
            if ("ie" in innerEle) {
                getContentHelp(element, innerEle["ie"]);
            }
            Object.keys(innerEle)
                .filter(ele => ele !== "ie" && ele !== "type")
                .forEach(ele => element[ele] = innerEle[ele]);
        }
        ele.appendChild(element);
    }
}

/**
 * 拖拽与点击放大缩小方法
 * @param obj
 * @param isDrag
 * @param isScale
 * @author crt1314
 * @version 1.0.0
 */
function drag_and_scale(obj, isDrag = false, isScale = false) {

    let isMove = false;
    if (isDrag) drag(obj);
    if (isScale) scale(obj);

    function drag(obj) {
        const parent = obj.parentElement;
        obj.onmousedown = function (e) {
            const al = e.clientX - parent.offsetLeft;
            const at = e.clientY - parent.offsetTop;
            document.onmousemove = function (event) {
                event = event || window.event;
                isMove = true;
                const left = event.clientX;
                const top = event.clientY;
                parent.style.left = `${left - al > 0 ? left - al : 0}px`;
                parent.style.top = `${top - at > 0 ? top - at : 0}px`;
            };
            document.onmouseup = function () {
                this.onmousemove = null;
                this.onmouseup = null;
            }
        }
    }

    function scale(obj) {
        obj.onclick = function () {
            if (isMove) {
                isMove = false;
                return;
            }
            const parent = obj.parentElement;
            const menu = parent.querySelector(".menu");
            menu.style.transform = parent.classList.contains("open") ? "scale(0)" : "scale(1)";
            parent.classList.toggle("open");
        }
    }
}
