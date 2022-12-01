'use script';

window.onload = function () {
    changeTitleWhenUserLeaveAndArrive();
    showWelcome();
    blessings_show_and_hidden();
    show_cursor();
    show_waves();
};

/**
 * 展示欢迎页面
 * @author crt1314
 * @version 1.0.0
 */
function showWelcome() {
    const header = document.createElement("header");
    const welcomeDiv = document.createElement("div");
    const waves = document.createElement("div");
    const h1 = document.createElement("h1");
    const h2 = document.createElement("h2");
    header.role = 'banner';
    header.classList.add("wrap");
    header.dataset['magic_cursor'] = "show";
    header.dataset['enter'] = "fadeInUp";
    header.dataset['exit'] = "";
    welcomeDiv.id = "welcome";
    waves.classList.add("waves");
    h1.textContent = "Code Road";
    welcomeDiv.appendChild(h1);
    welcomeDiv.appendChild(h2);
    welcomeDiv.appendChild(description());
    header.appendChild(waves);
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
    const h2 = document.querySelector("#welcome h2");
    let i = 0, blessingsWordLength = 0;
    let intervalID, blessings;
    $.ajax({
        url: "static/json/blessings.json",
        dataType: "json",
        success: function (data) {
            blessings = data;
            begin();
        }
    });

    /**
     * 收到json文件传来数据则开始显示内容
     * @author crt1314
     * @version 1.0.0
     */
    function begin() {
        intervalID = setInterval(show_blessings, 200);
    }

    /**
     * 逐渐展示祝福语
     * @author crt1314
     * @version 1.0.0
     */
    function show_blessings() {
        h2.textContent = blessings[i].substr(0, blessingsWordLength++);
        if (blessingsWordLength > blessings[i].length) {
            clearInterval(intervalID);
            setTimeout(pause, 500);
        }
    }

    /**
     * 逐渐删除祝福语
     * @author crt1314
     * @version 1.0.0
     */
    function hidden_blessings() {
        h2.textContent = blessings[i].substr(0, --blessingsWordLength);
        if (!blessingsWordLength) {
            clearInterval(intervalID);
            intervalID = setInterval(show_blessings, 200);
            i = (i + 1) % blessings.length;
        }
    }

    /**
     * 输出完短暂暂停
     * @author crt1314
     * @version 1.0.0
     */
    function pause() {
         intervalID = setInterval(hidden_blessings, 100);
    }
}

/**
 * 展示波浪
 * @author crt1314
 * @version 1.0.0
 */
function show_waves() {
    const pointSize = 2.5;
    new ShaderProgram(document.querySelector('.waves'), {
        texture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAb1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8v0wLRAAAAJHRSTlMAC/goGvDhmwcExrVjWzrm29TRqqSKenRXVklANSIUE8mRkGpv+HOfAAABCElEQVQ4y4VT13LDMAwLrUHteO+R9f/fWMfO6dLaPeKVEECRxOULWsEGpS9nULDwia2Y+ALqUNbAWeg775zv+sA4/FFRMxt8U2FZFCVWjR/YrH4/H9sarclSKdPMWKzb8VsEeHB3m0shkhVCyNzeXeAQ9Xl4opEieX2QCGnwGbj6GMyjw9t1K0fK9YZunPXeAGsfJtYjwzxaBnozGGorYz0ypK2HzQSYx1y8DgSRo2ewOiyh2QWOEk1Y9OrQV0a8TiBM1a8eMHWYnRMy7CZ4t1CmyRkhSUvP3gRXyHOCLBxNoC3IJv//ZrJ/kxxUHPUB+6jJZZHrpg6GOjnqaOmzp4NDR48OLxn/H27SRQ08S0ZJAAAAAElFTkSuQmCC',
        uniforms: {
            size: {
                type: 'float',
                value: pointSize
            },
            field: {
                type: 'vec3',
                value: [ 0, 0, 0 ]
            },
            speed: {
                type: 'float',
                value: 5
            },
        },
        vertex: `
    #define M_PI 3.1415926535897932384626433832795

    precision highp float;
    attribute vec4 a_position;
    attribute vec4 a_color;
    uniform float u_time;
    uniform float u_size;
    uniform float u_speed;
    uniform vec3 u_field;
    uniform mat4 u_projection;
    varying vec4 v_color;

    void main() {
      vec3 pos = a_position.xyz;
      pos.y += (
        cos(pos.x / u_field.x * M_PI * 8.0 + u_time * u_speed) +
        sin(pos.z / u_field.z * M_PI * 8.0 + u_time * u_speed)
      ) * u_field.y;
      gl_Position = u_projection * vec4( pos.xyz, a_position.w );
      gl_PointSize = ( u_size / gl_Position.w ) * 100.0;
      v_color = a_color;
    }`,
        fragment: `
    precision highp float;
    uniform sampler2D u_texture;
    varying vec4 v_color;

    void main() {
      gl_FragColor = v_color * texture2D(u_texture, gl_PointCoord);
    }`,
        onResize(w, h, dpi) {
            const position = [], color = [];
            const width = 400 * (w / h);
            const depth = 400;
            const height = 3;
            const distance = 5;
            for (let x = 0; x < width; x += distance) {
                for (let z = 0; z < depth; z+= distance) {
                    position.push(-width / 2 + x, -30, -depth / 2 + z);
                    color.push(0, 1 - (x / width), 0.5 + x / width * 0.5, z / depth);
                }
            }
            this.uniforms.field = [width, height, depth];
            this.buffers.position = position;
            this.buffers.color = color;
            this.uniforms.size = (h / 400) * pointSize * dpi;
        }
    });
}