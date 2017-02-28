import React, { Component } from 'react'
import {fetchFolder} from "./Common"
 
//文件操作
export default class Home extends Component {



    onClick(){
            // fetchFolder("bucket","2017",)
    }

    render() {
        return (
            <div onClick={this.onClick}>
                Main
            </div>
        )
    }
}