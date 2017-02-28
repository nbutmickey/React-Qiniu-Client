import React, { Component } from 'react';

import "../res/css/FileItem.css"

import CopyToClipboard from 'react-copy-to-clipboard';
import {ToastContainer,ToastMessage} from "react-toastr";

const ToastMessageFactory = React.createFactory(ToastMessage.animation);

class FileItem extends Component {
    copy = this.copy.bind(this)
    copy(){
        this.refs.container.success(`Copy Sucess`, `Tips`, {
            closeButton: true,
            });
    }


    render() {
        var markdown = "![http://kutear.com]("+this.props.imageUrl+")";

        return (
            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 file-container">
                <ToastContainer
                    toastMessageFactory={ToastMessageFactory}
                    ref="container"
                    className="toast-top-right"/>
                <div className="center-block card card-1" >
                    <a href={this.props.imageUrl} target="_blank">
                        <img src={this.props.imageUrl} className="image-item" alt={this.props.imageUrl}/>
                    </a>
                </div>

                <div className="center-block">
                    <CopyToClipboard text={markdown}
                        onCopy={this.copy}>
                        <button className="btn btn-primary" type="button">Copy Markdown</button>
                    </CopyToClipboard>
                    <CopyToClipboard text={this.props.imageUrl}
                        onCopy={this.copy}>
                        <button className="btn btn-primary" type="button" >Copy imageUrl</button>
                    </CopyToClipboard>
                </div>
            </div>
        );
    }
}

export default FileItem;