import React,{Component} from "react"
import Avatar from 'material-ui/Avatar'
import {ListItem } from 'material-ui/List'
import FileFolder from 'material-ui/svg-icons/file/folder'

export default class FolderList extends Component{



    onClick(){
        this.props.open(this.props.item)
    }
    
    render(){
        return(
            <ListItem leftAvatar={<Avatar icon={<FileFolder />} />} 
                primaryText={this.props.item} 
                onTouchTap = {this.onClick.bind(this)} 
                />
        )
    }

}