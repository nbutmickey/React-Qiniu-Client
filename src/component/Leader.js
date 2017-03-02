import React,{Component} from 'react'
import {Link} from "react-router"
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import {PATH} from "./Common"
import { hashHistory } from 'react-router'


/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class DialogExampleModal extends Component {

  handleClose(){
    hashHistory.push(PATH.Settings)
  }

  render() {
    const actions = [
      <Link to="/settings">  
      <FlatButton
        label="设置"
        primary={true}
        disabled={false}
        onTouchTap={this.handleClose.bind(this)}
      />
      </Link>
    ];

    return (
      <div>
        <Dialog
          title="提示"
          actions={actions}
          modal={true}
          open={this.props.open}
        >
          请到设置中进行相关配置
        </Dialog>
      </div>
    );
  }
}