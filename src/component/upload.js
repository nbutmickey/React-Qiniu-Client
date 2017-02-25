/*global URL */


import FileItem from "./FileItem"
import "./upload.css"
var React = require('react');
var ReactDOM = require('react-dom')
var request = require('superagent-bluebird-promise');


var isFunction = function (fn) {
    var getType = {};
    return fn && getType.toString.call(fn) === '[object Function]';
};

var ReactQiniu = React.createClass({
    // based on https://github.com/paramaggarwal/react-dropzone
    propTypes: {
        onDrop: React.PropTypes.func.isRequired,
        tokenHost: React.PropTypes.string.isRequired,
        onUpload: React.PropTypes.func,
        size: React.PropTypes.number,
        style: React.PropTypes.object,
        supportClick: React.PropTypes.bool,
        accept: React.PropTypes.string,
        multiple: React.PropTypes.bool,
        // Qiniu
        uploadUrl: React.PropTypes.string,
        uploadList: React.PropTypes.array
    },

    getDefaultProps: function () {
        var uploadUrl = 'http://upload.qiniu.com'
        if (window.location.protocol === 'https:') {
            uploadUrl = 'https://up.qbox.me/'
        }

        return {
            supportClick: true,
            multiple: true,
            uploadUrl: uploadUrl,
            uploadList: []

        };
    },

    getInitialState: function () {
        return {
            isDragActive: false
        };
    },

    onDragLeave: function (e) {
        e.preventDefault()

        console.log("onDragLeave");

        this.setState({
            isDragActive: false
        });
    },

    onDragEnter: function (e) {
        console.log("onDragEnter")
        e.preventDefault();
    },

    onDragOver: function (e) {

        console.log("onDragOver");
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';

        this.setState({
            isDragActive: true
        });
    },

    onDrop: function (e) {
        e.preventDefault();

        this.setState({
            isDragActive: false
        });

        var files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }

        var maxFiles = (this.props.multiple) ? files.length : 1;

        if (this.props.onUpload) {
            files = Array.prototype.slice.call(files, 0, maxFiles);
            this.props.onUpload(files, e);
        }

        for (var i = 0; i < maxFiles; i++) {
            files[i].preview = URL.createObjectURL(files[i]);
            this.upload(files[i]);
        }

        if (this.props.onDrop) {
            files = Array.prototype.slice.call(files, 0, maxFiles);
            this.props.onDrop(files, e);
        }
    },

    onClick: function () {
        if (this.props.supportClick) {
            this.open();
        }
    },

    open: function () {
        var fileInput = ReactDOM.findDOMNode(this.refs.fileInput);
        fileInput.value = null;
        fileInput.click();
    },

    getCookies: function (c_name) {
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
    },

    upload: function (file) {
        if (!file || file.size === 0) return null;
        var key = file.preview.split('/').pop() + '.' + file.name.split('.').pop();
        var date = new Date();
        var pre = date.getFullYear() + "/" + (1 + date.getMonth()) + "/" + date.getDate() + "/";
        key = pre + key;
        var header = {
            "Content-Type": "application/x-www-form-urlencoded"
        }

        var AK = this.getCookies("ak");
        var SK = this.getCookies("sk");
        var BUCKET = this.getCookies("bucket");
        var KEY = key;

        var body = "ak=" + AK + "&&sk=" + SK + "&&bucket=" + BUCKET + "&&key=" + KEY;

        //获取token
        fetch(this.props.tokenHost, {
            method: "POST",
            headers: header,
            body: body,
        })
            .then((response) => response.json())
            .then((json) => {
                if (json["code"] !== 200) {
                    console.log("Token 生成失败");
                    return;
                }

                var token = json["token"]


                var r = request
                    .post(this.props.uploadUrl)
                    .field('key', key)
                    .field('token', token)
                    .field('x:filename', file.name)
                    .field('x:size', file.size)
                    .attach('file', file, file.name)
                    .set('Accept', 'application/json')
                    .then((res) => {
                        console.log(res);
                        this.dealResult(res.body);
                    })

                if (isFunction(file.onprogress)) { r.on('progress', file.onprogress); }
                return r;
            })
            .catch((error) => {

            })
    },


    dealResult(json) {
        var lists = this.props.uploadList
        lists.push(json);
        this.setState({
            uploadList: lists
        })
    },

    render: function () {
        console.log("render");
        var className = this.props.className || 'dropzone';
        if (this.state.isDragActive) {
            className += ' active';
        }

        var style = this.props.style || {
            width: this.props.size || 100,
            height: this.props.size || 100,
            borderStyle: this.state.isDragActive ? 'solid' : 'dashed'
        };

        var inputStyle = {
            display: 'none'
        }

        var baseUrl = this.getCookies("host");
        
        var temp = this.props.uploadList.reverse();

        var lists = temp.map(item => {
            return (
                <FileItem key={item.key}
                    imageUrl={baseUrl + item.key}
                    fileName={item["x:filename"]}
                    size={item["x:size"]}/>
            )
        })





        return (
            <div className="container">
                <div className={className}
                    style={style}
                    onDrop={this.onDrop}
                    onDragOver={this.onDragOver}
                    onDragLeave={this.onDragLeave}
                    onChange={this.onDrag}
                    onDragEnter={this.onDragEnter}
                    onClick={this.onClick}>
                    <input style={inputStyle}
                        type="file"
                        ref="fileInput"
                        multiple={this.props.multiple}
                        onChange={this.onDrop}
                        accept={this.props.accept} />
                    {this.props.children}
                </div>

                <div className="container">
                    <div className="row">
                        {lists}
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = ReactQiniu;
