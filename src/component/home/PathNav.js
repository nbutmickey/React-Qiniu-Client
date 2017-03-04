import React, { Component } from 'react'


// 路径指示
export default class PathNav extends Component {

  constructor(props){
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick (path) {
    this.props.open(path)
  }

  render () {
    var path = this.props.path
    var subpath = path.split('/')
    var temp = subpath.map((item) => {
      return {
        showName: item,
        value: item
      }
    })

    temp.pop()

    temp = [
      {
        showName: 'Home',
        value: ''
      },
      ...temp
    ]

    var pathObjs = []
    for (var i = 0;i < temp.length;i++) {
      pathObjs[i] = temp[i]
      if (i !== 0) {
        pathObjs[i]['value'] = pathObjs[i - 1]['value'] + pathObjs[i]['value'] + '/'
      }
    }

    var pathCompents = []
    for(i=0;i<pathObjs.length;i++){
       (function(click,i) {
          var item = pathObjs[i]
          if(i!==pathObjs.length-1){
            pathCompents.push(<li key={i+item.value}><a href="#" onClick={() => {click(item.value)}} >{item.showName}</a></li>)
          }else{
            pathCompents.push(<li key={i+item.value} className="active"><a href="#" >{item.showName}</a></li>)
          }
       })(this.onClick,i)
      
    }

    return (
     <ol className="breadcrumb">
       {pathCompents}
      </ol>
    )
  }
}
