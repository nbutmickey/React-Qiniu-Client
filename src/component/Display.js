import React, { Component } from 'react'
import { List } from 'material-ui/List'
import FileList from "./file/FileList"
import FolderList from "./file/FolderList"


export default class Display extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }

  openFolder(path) {
    console.log(path)
    this.setState({
      isLoading: true
    })
    this.props.reload(path)
  }

  render() {
    var folder = this.props.fileList.commonPrefixes
    var folderComponent

    //返回上级目录
    if (this.props.basePath !== "") {
      folderComponent = (<div key=".." className='col-md-12 col-xs-12 col-lg-12 col-sm-12'>
        <FolderList item=".." open={this.openFolder.bind(this)} nextPath={this.props.parent} parent={this.props.parent}/>
      </div>)
    }

    //当前目录存在文件夹
    if (folder !== undefined) {
      folderComponent = folder.map((item) => {
        return (<div key={item} className='col-md-12 col-xs-12 col-lg-12 col-sm-12'>
          <FolderList item={item} open={this.openFolder.bind(this)} nextPath={item} parent={this.props.parent}/>
        </div>
        )
      })
    }



    var file = this.props.fileList.items
    console.log(this.props)
    var fileComponent = file.map((item) => {
      return (<div key={item.hash} className='col-md-12 col-xs-12 col-lg-12 col-sm-12'>
        <FileList item={item} basePath={this.props.basePath} parent={this.props.parent} />
      </div>
      )
    })

    return (
      <div>
        <List className='row'>
          {folderComponent}
          {fileComponent}
        </List>
      </div>
    )
  }
}
