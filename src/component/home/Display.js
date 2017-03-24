import React, { Component } from 'react'
import { List } from 'material-ui/List'
import FileList from './file/FileList'
import FolderList from './file/FolderList'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import { getBackPath } from '../Common'
import PathNav from './PathNav'
import FilePreViewer from "./FilePreViewer"
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

export default class Display extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      openDetails: false,
      showItem: {
        key: '',
        hash: '',
        fsize: 0,
        mimeType: '',
        putTime: 0
      },
      open: false,
      currentItem: undefined
    }
  }

  openFolder(path) {
    this.setState({
      isLoading: true
    })
    this.props.reload(path)
  }

  openDialog(item) {
    console.log(item)
    this.setState({
      currentItem: item,
      open: true
    })
  }

  showFile(item) {
    var needOpen = false
    if (item.hash !== this.state.showItem.hash || !this.state.openDetails) {
      needOpen = true
    }

    this.setState({
      openDetails: needOpen,
      showItem: item
    })
  }

    handleClose() {
      this.setState({ open: false });
      var value = this.refs.modify_file_name_ref.getValue()
      console.log(value)
      var shortName = this.state.currentItem.key.replace(this.props.parent, '')
      var olderName = this.state.currentItem.key;
      if (!(value === shortName || value === "")) {
        //真正的重命名
        var newName = this.props.parent + value
        this.props.rename(olderName, newName)
      }
  }

  render() {
    var folder = this.props.fileList.commonPrefixes
    var folderComponent = []

    // 返回上级目录
    if (this.props.parent !== '') {
      folderComponent.push((<div key='..' className='col-md-12 col-xs-12 col-lg-12 col-sm-12'>
        <FolderList
          item='..'
          open={this.openFolder.bind(this)}
          nextPath={getBackPath(this.props.parent, '/')}
          parent={this.props.parent} />
        <Divider />
      </div>))
    }

    // 当前目录存在文件夹
    if (folder !== undefined) {
      folderComponent.push(folder.map((item) => {
        return (<div key={item} className='col-md-12 col-xs-12 col-lg-12 col-sm-12'>
          <FolderList
            item={item}
            open={this.openFolder.bind(this)}
            nextPath={item}
            parent={this.props.parent} />
          <Divider />
        </div>
        )
      }))
    }

    var file = this.props.fileList.items
    var fileComponent = file.map((item) => {
      return (<div key={item.hash + item.key} className='col-md-12 col-xs-12 col-lg-12 col-sm-12'>
        <FileList
          item={item}
          basePath={this.props.basePath}
          parent={this.props.parent}
          delete={this.props.delete}
          rename={this.props.rename}
          openDialog={this.openDialog.bind(this)}
          showFile={this.showFile.bind(this)} />
        <Divider />
      </div>
      )
    })

    const actions = [
      <FlatButton
        label='Ok'
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose.bind(this)} />
    ]

    var shortName = ""
    if (this.state.currentItem !== undefined) {
      shortName = this.state.currentItem.key.replace(this.props.parent, '')
    }

    return (
      <div>
        <Drawer width={400} openSecondary={true} open={this.state.openDetails}>
          {/* TODO 文件内容预览 */}
          <FilePreViewer file={this.state.showItem} basePath={this.props.basePath} />
        </Drawer>
        <Dialog
          title='修改文件名字'
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}>
          <TextField
            ref='modify_file_name_ref'
            id='modify_file_name'
            floatingLabelText='输入文件名'
            fullWidth={true}
            defaultValue={shortName} />
        </Dialog>
        <PathNav path={this.props.parent} open={this.openFolder.bind(this)} />
        <List className='row'>
          {folderComponent}
          {fileComponent}
        </List>
      </div>
    )
  }
}
