import React,{Component} from "react"
import Avatar from 'material-ui/Avatar'
import {ListItem } from 'material-ui/List'
import file from "../../res/img/file.svg"

export default class FileList extends Component{
    
    render(){
        var thumb = ""
        var mimeType = this.props.item.mimeType
        if(mimeType.includes("image")){
            thumb = this.props.basePath + this.props.item.key+"-40x40"
        }else{
            thumb = file
        }




        return(
            <ListItem leftAvatar={<Avatar src={thumb} />} 
                primaryText={this.props.item.key} 
                secondaryText={this.props.item.putTime} 
                />
        )
    }

}