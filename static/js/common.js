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
 * @author crt1314
 * @version 1.0.0
 * @param content span标签中的内容
 * @param cls class类
 * @returns {HTMLSpanElement} span标签
 */
function createSpanElement(content, cls) {
    const span = document.createElement("span");
    span.textContent = content;
    if (cls !== undefined) span.classList.add(cls);
    return span;
}

/**
 * 显示加载动画
 * @author crt1314
 * @version 1.0.0
 */
function loading() {
    const loadingDiv = document.createElement("div");
    const loading = document.createElement("div");
    const content = document.createElement("h2");
    loadingDiv.id = "loadingDiv";
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
    const src = getComputedStyle(header).background.match(/url\(\"?(.*)\"\)/)[1];
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
function show_cursor() {
    const wrap = document.querySelector(".wrap");
    const cursor_outer = document.createElement("div");
    const cursor_inner = document.createElement("div");
    cursor_outer.classList.add("mouse-cursor");
    cursor_outer.classList.add("cursor-outer");
    cursor_inner.classList.add("mouse-cursor");
    cursor_inner.classList.add("cursor-inner");
    show_cursor_help(cursor_outer, cursor_inner);
    wrap.appendChild(cursor_outer);
    wrap.appendChild(cursor_inner);

    /**
     * 帮助方法
     * @param cursor_outer
     * @param cursor_inner
     */
    function show_cursor_help(cursor_outer, cursor_inner) {
        let n;
        let i = 0;
        window.onmousemove = function (mouse) {
            cursor_outer.style.transform = `translate(${mouse.clientX}px, ${mouse.clientY}px)`;
            cursor_inner.style.transform = `translate(${mouse.clientX}px, ${mouse.clientY}px)`;
            n = mouse.clientY;
            i = mouse.clientX;
        };
        const body = $("body");
        body.on("mouseenter", "a,.topBar .trigger, .cursor-pointer", function () {
            cursor_inner.classList.add("cursor-hover");
            cursor_outer.classList.add("cursor-hover");
        });
        body.on("mouseleave", "a,.topBar .trigger, .cursor-pointer", function () {
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
