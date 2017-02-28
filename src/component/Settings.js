import React, { Component } from 'react'
import { setCookie, getCookies, AK, SK, BUCKET, HOST, genToken } from './Common'
import { ToastContainer, ToastMessage } from "react-toastr";
import "../res/css/Settings.css"
import { connect } from "react-redux"
import { modifyConfig } from "../redux/Actions"

const ToastMessageFactory = React.createFactory(ToastMessage.animation);


function mapStateToProps(state) {
    return {
        ak: state.config.ak,
        sk: state.config.sk,
        host: state.config.host,
        bucket: state.config.bucket

    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        saveToStore: (state) => {
            dispatch(modifyConfig(state.ak, state.sk, state.bucket, state.host));
        }
    };
}

class Settings extends Component {

    constructor(props) {
        super(props)
        this.state = props;
    }


    onAk(e) {
        this.setState({
            ak: e.target.value
        })

    }

    onSk(e) {
        this.setState({
            sk: e.target.value
        })

    }

    onHost(e) {
        this.setState({
            host: e.target.value
        })

    }

    onBucket(e) {
        this.setState({
            bucket: e.target.value
        })

    }

    onSave() {
        if (this.state.ak == "" || this.state.sk == "" || this.state.host == "" || this.state.bucket == "") {
            this.refs.container.error(`Some Filed is Empty`, `Error`, {
                closeButton: true,
            });
            return;
        }

        //todo 
        this.props.saveToStore(this.state);

        this.refs.container.success(`Save Sucess`, `Settings`, {
            closeButton: true,
        });
    }

    render() {
        return (
            <div className="container">
                <ToastContainer
                    toastMessageFactory={ToastMessageFactory}
                    ref="container"
                    className="toast-top-right" />
                <div className="col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2 col-md-4 col-md-offest-4 col-lg-4 col-lg-offest-6 centerInParent" >

                    <form className="form-horizontal">
                        <div className="form-group">
                            <div >
                                <input type="text" value={this.state.ak} className="form-control" placeholder="AccessKey" onChange={this.onAk.bind(this)} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div >
                                <input type="text" value={this.state.sk} className="form-control" placeholder="SecretKey" onChange={this.onSk.bind(this)} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div >
                                <input type="text" value={this.state.bucket} className="form-control" placeholder="Bucket" onChange={this.onBucket.bind(this)} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div>
                                <input type="text" value={this.state.host} className="form-control" placeholder="Host(http(s)://xx.xx.xx/)" onChange={this.onHost.bind(this)} />
                            </div>
                        </div>

                        <div className="form-group">
                            <div>
                                <button type="submit" className="btn btn-default" onClick={this.onSave.bind(this)}>Save</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Settings)