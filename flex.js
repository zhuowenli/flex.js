'use strict';

/**
 * @export
 * @param {number} [baseFontSize=100] 基础fontSize, 默认100px;
 * @param {number} [fontscale=1] 有的业务希望能放大一定比例的字体;
 * @param {number} [baseDpr=2] 设计稿默认dpr;
 */
export default function flex(baseFontSize = 100, fontscale = 1, baseDpr = 2) {
    const doc = window.document;
    const ua = navigator.userAgent;
    const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
    const UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
    const isUCHD = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
    const isiOS = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
    let dpr = window.devicePixelRatio || 1;

    if (!isiOS && !(matches && matches[1] > 534) && !isUCHD) {
        // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
        dpr = 1;
    }

    const scale = 1 / dpr;

    let metaEl = doc.querySelector('meta[name="viewport"]');

    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        doc.head.appendChild(metaEl);
    }

    metaEl.setAttribute('content', `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`);

    doc.documentElement.style.fontSize = `${(baseFontSize / baseDpr) * dpr * fontscale}px`;
}

window.flex = flex;
