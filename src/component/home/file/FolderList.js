import React, { Component } from "react"
import Avatar from 'material-ui/Avatar'
import { ListItem } from 'material-ui/List'
import FileFolder from 'material-ui/svg-icons/file/folder'

export default class FolderList extends Component {



    onClick() {
        this.props.open(this.props.nextPath)
    }

    

    render() {

        var shortName = this.props.item.replace(this.props.parent,"")

        return (
            <ListItem leftAvatar={<Avatar icon={<FileFolder />} />}
                primaryText={shortName}
                onTouchTap={this.onClick.bind(this)}
            />
        )
    }

}