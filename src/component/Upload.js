import React, { Component } from 'react';
import Qi from './Qiniu'
import '../res/css/Upload.css';

class App extends Component {

onDrop (files) {
}

onUpload(file){
}

render() {
    var styles = { padding: 30};
    var dropZoneStyles = {
            margin: '20px auto',
            border: '2px dashed #ccc',
            borderRadius: '5px',
            width: '300px',
            height: '200px',
            color: '#aaa'
        }
    var size = 200    
    return (
      <div className="App">
        <Qi onDrop={this.onDrop}
            tokenHost={"http://host.kutear.com:8080/"}
            style={dropZoneStyles}
            onUpload={this.onUpload}>
          <div style={styles}> 拖动文件或点击上传 </div>
          </Qi>
      </div>
    );
  }
}

export default App;
