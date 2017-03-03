import React, { Component } from "react"


//路径指示
export default class PathNav extends Component{

    render(){
        var style = {
            height:50
        }

        var path = this.props.path
        var subpath = path.split("/")
        

        return(
            <div style={style}>
                
            </div>
        )
    }
}