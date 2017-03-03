import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import { ListItem } from 'material-ui/List'
import file from '../../res/img/file.svg'
import { formatDate } from '../Common'

export default class FileList extends Component {

  showFile () {
    this.props.showFile(this.props.item)
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

    return (
      <ListItem
        leftAvatar={<Avatar src={thumb} />}
        primaryText={shortName}
        secondaryText={formatDate(this.props.item.putTime / 10000000)}
        onTouchTap={this.showFile.bind(this)} />
    )
  }

}
