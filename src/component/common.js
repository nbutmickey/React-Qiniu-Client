import hmacsha1 from 'hmacsha1'


export const AK = "ak";
export const SK = "sk";
export const BUCKET = "bucket";
export const HOST = "host";


export function setCookie(c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

export function getCookies(c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=")
        if (c_start !== -1) {
            c_start = c_start + c_name.length + 1
            var c_end = document.cookie.indexOf(";", c_start)
            if (c_end === -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

export function qiniuSign(key, data) {
    var temp = hmacsha1(key, data);
    console.log(temp)
    return urlsafe_b64encode(temp)
}

function urlsafe_b64encode(data) {
    var base64Data = btoa(data);
    return base64Data.replace(/\//g, '_').replace(/\+/g, '-');

}
