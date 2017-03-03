import React, { Component } from 'react'
import { List } from 'material-ui/List'
import FileList from './file/FileList'
import FolderList from './file/FolderList'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import { getBackPath } from './Common'
import PathNav from './PathNav'

export default class Display extends Component {

  constructor (props) {
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
      }
    }
  }

  openFolder (path) {
    this.setState({
      isLoading: true
    })
    this.props.reload(path)
  }

  showFile (item) {
    var needOpen = false
    if (item.hash !== this.state.showItem.hash || !this.state.openDetails) {
      needOpen = true
    }

    this.setState({
      openDetails: needOpen,
      showItem: item
    })
  }

  render () {
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
                  showFile={this.showFile.bind(this)} />
                <Divider />
              </div>
      )
    })

    var bg = {
      backgroundColor: '#fff'
    }

    return (
      <div>
        <Drawer width={400} openSecondary={true} open={this.state.openDetails}>
          {/* TODO 文件内容预览 */}
          {this.state.showItem.hash}
        </Drawer>
        <PathNav path={this.props.parent} open={this.openFolder.bind(this)}/>
        <List className='row' style={bg}>
          <Divider />
          {folderComponent}
          {fileComponent}
        </List>
      </div>
    )
  }
}
