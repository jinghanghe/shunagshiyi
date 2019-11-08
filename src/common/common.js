export const ServerIP = "http://www.jinghangapps.com/activityTest/";

export const H5IP = "https://www.jinghangapps.com/shuangshiyi/";

// export const H5IP = "http://localhost:8003/";

// export const ServerIP = "https://www.jinghangapps.com/jingxiaoai/";

// export const H5IP = "https://www.jinghangapps.com/camp/";

export function GetQueryString(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
    r = window.location.search.substr(1).match(reg);
  return r ? unescape(r[2]) : null;
}

export function isWeiXin() {
  //判断是否微信平台
  let ua = window.navigator.userAgent.toLowerCase();
  return ua.match(/MicroMessenger/i) == "micromessenger";
}
