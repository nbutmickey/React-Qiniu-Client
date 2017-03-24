import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import { ListItem } from 'material-ui/List'
import file from '../../../res/img/file.svg'
import { formatDate } from '../../Common'
import { grey400 } from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { ToastContainer, ToastMessage } from "react-toastr";
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'

// import CopyToClipboard from 'react-copy-to-clipboard';

const ToastMessageFactory = React.createFactory(ToastMessage.animation);

export default class FileList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  showFile() {
    this.props.showFile(this.props.item)
  }

  delete() {
    this.props.delete(this.props.item.key)
  }

  rename() {
    this.props.openDialog(this.props.item)
  }

  copy() {
    this.refs.container.success(`Copy Sucess`, `Tips`, {
      closeButton: true,
    });
  }

  render() {
    var thumb = ''
    var mimeType = this.props.item.mimeType
    if (mimeType.includes('image') && !this.props.item.key.endsWith('svg')
      && !this.props.item.key.endsWith('ico')) {
      thumb = this.props.basePath + this.props.item.key + '-40x40'
    } else {
      thumb = file
    }

    var shortName = this.props.item.key.replace(this.props.parent, '')

    const iconButtonElement = (
      <IconButton touch={true} tooltip='更多' tooltipPosition='bottom-left'>
        <MoreVertIcon color={grey400} />
      </IconButton>
    )

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onTouchTap={this.delete.bind(this)}> 删除
      </MenuItem>
        <MenuItem onTouchTap={this.rename.bind(this)}> 重命名
      </MenuItem>
        {/*<CopyToClipboard text="aaa"
          onCopy={this.copy}>
          复制链接
          </CopyToClipboard>*/}
      </IconMenu>
    )

    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="container"
          className="toast-top-right" />
        <ListItem
          leftAvatar={<Avatar src={thumb} />}
          primaryText={shortName}
          secondaryText={formatDate(this.props.item.putTime / 10000000)}
          rightIconButton={rightIconMenu}
          onTouchTap={this.showFile.bind(this)} />
      </div>
    )
  }

}
