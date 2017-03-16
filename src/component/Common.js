import b64hmacsha1 from 'hmacsha1'

/* eslint-disable */

export const API = {
  UPLOAD_TOKEN: 'uploadToken',
  PROXY: 'proxy'
}

export const PATH = {
  Home: '/',
  Settings: '/settings',
  Upload: '/upload'
}

export const AK = 'ak'
export const SK = 'sk'
export const BUCKET = 'bucket'
export const HOST = 'host'
export const TOKEN_HOST = 'token_host'
export const QINIU_UPLOAD_HTTPS = 'https://up.qbox.me/'
export const QINIU_UPLOAD_HTTP = 'http://upload.qiniu.com/'
export const DEFAULT_TOKEN_HOST = 'http://host.kutear.com:8080/'
export const COOKIE_AGE = 100
//获取列表
const QINIUHOST = 'http://rsf.qbox.me'
//删除
const QINIUHOST_2 = 'http://rs.qiniu.com'

export function setCookie (c_name, value, expiredays) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = c_name + '=' + escape(value) +
  ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}

export function getCookies (c_name) {
  if (document.cookie.length > 0) {
    var c_start = document.cookie.indexOf(c_name + '=')
    if (c_start !== -1) {
      c_start = c_start + c_name.length + 1
      var c_end = document.cookie.indexOf(';', c_start)
      if (c_end === -1) c_end = document.cookie.length
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return ''
}

export function fetchUploadToken (body, host, callback) {
  var header = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  fetch(host, {
    method: 'POST',
    headers: header,
    body: body
  })
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      if (json['code'] === 200) {
        callback.onSuccess(json)
      }else {
        callback.onError()
      }
    })
    .catch(() => callback.onError())
}

export function genToken (path, body, sk) {
  var data = path
  if (body === undefined) {
    data = data + '\n'
  }else {
    data = data + '\n' + body
  }
  return qiniuSign(sk, data)
}

export function fetchFolder (proxyHost, bucket, prefix, ak, sk, callback) {
  var host = QINIUHOST
  var query = '/list?bucket=' + bucket + '&marker=&limit=1000&delimiter=/&prefix=' + prefix
  var header = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'QBox ' + ak + ':' + genToken(query, '', sk),
    'requestUrl': host + query
  }
  fetch(proxyHost + API.PROXY, {
    headers: header,
    method: 'POST'
  })
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      callback.onSuccess(json)
    })
    .catch((err) => {
      callback.onError()
    })
}

export function deleteFile (proxyHost, key, bucket, ak, sk, callback) {
  var host = QINIUHOST_2
  var query = '/delete/' + urlsafe_b64encode(bucket + ':' + key)
  var header = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'QBox ' + ak + ':' + genToken(query, '', sk),
    'requestUrl': host + query
  }
  fetch(proxyHost + API.PROXY, {
    headers: header,
    method: 'POST'
  })
    .then((res) => {
      if(res.ok){
        res.text().then((text)=>{
            if(text.length === 0){
              callback.onSuccess()
            }else{
              callback.onError()
            }
        })
      }else{
        callback.onError()
      }
    })
    .catch((err) => {
      callback.onError()
    })
}

export function getFileSize (bits) {
  if (bits > 1000) {
    var kb = bits / 1000.0
    if (kb > 1000) {
      var mb = kb / 1000.0
      if (mb > 1000) {
        var gb = mb / 1000.0
        if (gb > 1000) {
          var tb = gb / 1000.0
          return tb + 'TB'
        }else {
          return gb + 'GB'
        }
      }else {
        return mb + 'MB'
      }
    }else {
      return kb + 'KB'
    }
  }else {
    return bits + 'B'
  }
}

export function formatDate (timestamp) {
  var time = new Date(timestamp * 1000)
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  var h = time.getHours()
  var mm = time.getMinutes()
  var s = time.getSeconds()
  return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s)
}

// 获取上级目录
export function getBackPath (path, sp) {
  var arrayOfStrings = path.split(sp)
  if (arrayOfStrings.length > 2) {
    var res = ''
    for (var i = 0;i < arrayOfStrings.length - 2;i++) {
      res += arrayOfStrings[i] + '/'
    }
    return res
  }else {
    return ''
  }
}

// 上传时的文件前缀
export function filePrefix () {
  var time = new Date()
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  return y + '/' + add0(m) + '/' + add0(d) + '/'
}

function add0 (m) {
  return m < 10 ? '0' + m : m
}

function qiniuSign (key, data) {
  var temp = b64hmacsha1(key, data)
  return urlsafe(temp)
}

function urlsafe (data) {
  return data.replace(/\//g, '_').replace(/\+/g, '-')
}

function base64 (str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1)
  }))
}

function urlsafe_b64encode (data) {
  return urlsafe(base64(data))
}
