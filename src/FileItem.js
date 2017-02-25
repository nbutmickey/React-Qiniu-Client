import React, { Component } from 'react';

import "./FileItem.css"

class FileItem extends Component {


    render() {
        return (
            <div>
                <img src={this.props.imageUrl} className="image-item"/>
            </div>
        );
    }
}

export default FileItem;