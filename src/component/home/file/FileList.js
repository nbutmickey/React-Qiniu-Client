import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import { ListItem } from 'material-ui/List'
import file from '../../../res/img/file.svg'
import { formatDate } from '../../Common'
import {grey400} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

export default class FileList extends Component {

  showFile () {
    this.props.showFile(this.props.item)
  }

  delete(){
      this.props.delete(this.props.item.key)
  }

  rename(){

  }

  render () {
    var thumb = ''
    var mimeType = this.props.item.mimeType
    if (mimeType.includes('image') && !this.props.item.key.endsWith('svg')
      && !this.props.item.key.endsWith('ico')) {
      thumb = this.props.basePath + this.props.item.key + '-40x40'
    }else {
      thumb = file
    }

    var shortName = this.props.item.key.replace(this.props.parent, '')

    const iconButtonElement = (
    <IconButton
      touch={true}
      tooltip="更多"
      tooltipPosition="bottom-left"
    >
      <MoreVertIcon color={grey400} />
    </IconButton>
  );

  const rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
      <MenuItem onTouchTap={this.delete.bind(this)}>删除</MenuItem>
      <MenuItem onTouchTap={this.rename.bind(this)}>重命名</MenuItem>
    </IconMenu>
  );

    return (
      <ListItem
        leftAvatar={<Avatar src={thumb} />}
        primaryText={shortName}
        secondaryText={formatDate(this.props.item.putTime / 10000000)}
        rightIconButton={rightIconMenu}
        onTouchTap={this.showFile.bind(this)} />
    )
  }

}
