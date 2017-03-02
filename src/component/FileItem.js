import React, { Component } from 'react';

import "../res/css/FileItem.css"

import CopyToClipboard from 'react-copy-to-clipboard';
import { ToastContainer, ToastMessage } from "react-toastr";
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { getFileSize } from "./Common"


const ToastMessageFactory = React.createFactory(ToastMessage.animation);

class FileItem extends Component {
    copy = this.copy.bind(this)
    copy() {
        this.refs.container.success(`Copy Sucess`, `Tips`, {
            closeButton: true,
        });
    }

    onDelete() {
        this.props.remove(this.props.fileKey)
    }


    render() {
        var markdown = "![http://kutear.com](" + this.props.imageUrl + ")";

        return (
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 file-container">
                <ToastContainer
                    toastMessageFactory={ToastMessageFactory}
                    ref="container"
                    className="toast-top-right" />

                <Card>
                    <CardMedia
                        overlay={<CardTitle title={getFileSize(this.props.size)} />}
                    >
                        <img src={this.props.imageUrl} alt={this.props.imageUrl} className="image-item" />
                    </CardMedia>
                    <CardTitle subtitle={this.props.date} />
                    <CardActions>

                        <FlatButton label="删除" onTouchTap={this.onDelete.bind(this)} />

                        <CopyToClipboard text={this.props.imageUrl}
                            onCopy={this.copy}>
                            <FlatButton label="复制" />
                        </CopyToClipboard>

                        <a href={this.props.imageUrl} target="_blank">
                            <FlatButton label="打开" />
                        </a>

                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default FileItem;