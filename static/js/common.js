'use script';

/**
 * 当用户离开或进入页面时改变网页title
 * @author crt1314
 * @version 1.0.0
 */
function changeTitleWhenUserLeaveAndArrive() {
    // 保存文档原来的title
    const origin_title = document.title;

    // 页面失去焦点
    window.onblur = function () {
        document.title = "宝，别走(ಥ﹏ಥ)";
    };

    // 页面获取焦点
    window.onfocus = function () {
        document.title = "宝，欢迎回来o((*^▽^*))o";
        setTimeout(changeToOriginTitle, 1000);
    };

    // 将页面title改为原来值
    function changeToOriginTitle() {
        document.title = origin_title;
    }
}