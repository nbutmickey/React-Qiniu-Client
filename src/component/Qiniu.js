import FileItem from "./FileItem"
import "./Qiniu.css"
import React,{Component} from "react"
import ReactDOM from "react-dom"
import request from "superagent-bluebird-promise"
import {getCookies,fetchUploadToken} from "./common"

export default class ReactQiniu extends Component{
    static propTypes = {
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
    }

    static defaultProps = {
        supportClick: true,
        multiple: true,
        uploadList: []
    }
    
    constructor(props){
        super(props)
        this.state =  {
            isDragActive: false
        }
        this.onDrop = this.onDrop.bind(this)
    }

    onClick () {
        if (this.props.supportClick) {
            this.open();
        }
    }

    open() {
        var fileInput = ReactDOM.findDOMNode(this.refs.fileInput);
        fileInput.value = null;
        fileInput.click();
    }

    onDragLeave (e) {
        e.preventDefault()
        this.setState({
            isDragActive: false
        });
    }

    onDragOver (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';

        this.setState({
            isDragActive: true
        });
    }

    onDrop(e) {
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
    }

    //文件上传
    upload(file) {
        if (!file || file.size === 0) return null;
        var key = file.preview.split('/').pop() + '.' + file.name.split('.').pop();
        var date = new Date();
        var pre = date.getFullYear() + "/" + (1 + date.getMonth()) + "/" + date.getDate() + "/";
        key = pre + key;
        var AK = getCookies("ak");
        var SK = getCookies("sk");
        var BUCKET = getCookies("bucket");
        var KEY = key;
        var body = "ak=" + AK + "&&sk=" + SK + "&&bucket=" + BUCKET + "&&key=" + KEY;
        fetchUploadToken(body,this.props.tokenHost,(json)=>{
                this.dealToken(json,key,file)
        })
    }

    //获取到Token之后进行上传
    dealToken(json,key,file){
        if (json["code"] !== 200) {
                        console.log("Token 生成失败");
                        return;
        }
        var token = json["token"];

        var uploadUrl = 'http://upload.qiniu.com'
        if (window.location.protocol === 'https:') {
            uploadUrl = 'https://up.qbox.me/'
        }
        request.post(uploadUrl)
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

                
    }

    //上传完成回调
    dealResult(json) {
        var lists = this.props.uploadList
        lists.push(json);
        this.setState({
            uploadList: lists
        })
    }

    render() {
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
        var baseUrl = getCookies("host");
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
                    onDragOver={this.onDragOver.bind(this)}
                    onDragLeave={this.onDragLeave.bind(this)}
                    onChange={this.onDrag}
                    onClick={this.onClick.bind(this)}>
                    <input style={inputStyle}
                        type="file"
                        ref="fileInput"
                        multiple={this.props.multiple}  
                        onChange={this.onDrop.bind(this)}
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
}