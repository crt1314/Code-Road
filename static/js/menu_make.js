'use script';

/**
 * 获取基本骨架
 * @author crt1314
 * @version 1.0.0
 */
function wrapper() {
    const header = document.createElement("header");
    const main = document.createElement("main");
    const nav = document.createElement("nav");
    const snow = createDivElement('snow');
    header.role = "banner";
    main.role = "main";
    main.className = "wrap";
    main.dataset["enter"] = "fadeInUp";
    nav.role = "navigation";
    header.appendChild(nav);
    appendChildren(main, getJava(), getPython());
    appendChildren(document.body, header, main, snow);
    hljs.highlightAll();

    /**
     * 获取java内容
     * @returns {HTMLDivElement}
     * @author crt1314
     * @version 1.0.0
     */
    function getJava() {
        const java = createDivElement("section animated", "java");
        const inner = createDivElement("section_inner");
        const javaContent = createDivElement("java content");
        const javaMenu = createDivElement("menu");
        const box = createDivElement("box");
        javaContent.appendChild(getContent("../static/json/java_prehead.json", javaMenu));
        appendChildren(box, javaMenu, createDivElement("button"));
        appendChildren(inner, javaContent, box);
        java.appendChild(inner);
        return java;
    }

    function getPython() {
        const python = createDivElement("section", "python");
        const inner = createDivElement("section_inner");
        const pythonContent = createDivElement("python content");
        const pythonMenu = createDivElement("menu");
        const box = createDivElement("box");
        pythonContent.appendChild(getContent("../static/json/python_prehead.json", pythonMenu));
        appendChildren(box, pythonMenu, createDivElement("button"));
        appendChildren(inner, pythonContent, box);
        python.appendChild(inner);
        return python;
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
    const java_li = document.createElement("li");
    const java_a = createAElement("#java", "", "Java");
    const python_li = document.createElement("li");
    const python_a = createAElement("#python", "", "Python");
    menu_ul.className = "transition_link";
    java_li.className = "active";
    python_li.appendChild(python_a);
    java_li.appendChild(java_a);
    appendChildren(menu_ul, java_li, python_li);
    return menu_ul;
}

