import React, { Component } from 'react';
import Qi from './upload'
import './App.css';

class App extends Component {

onDrop (files) {
  console.log("drop")
  console.log(files)
}

onUpload(file){
  console.log("upload")
  console.log(file)
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
