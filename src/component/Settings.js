import React, { Component } from 'react'
import { setCookie, getCookies, AK, SK, BUCKET, HOST,qiniuSign } from './common'
import { ToastContainer,ToastMessage} from "react-toastr";
import "./Settings.css"

const ToastMessageFactory = React.createFactory(ToastMessage.animation);

export default class Settings extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ak: getCookies(AK),
            sk: getCookies(SK),
            bucket: getCookies(BUCKET),
            host: getCookies(HOST)
        }
        var  body = "/list?bucket=kutear&marker=&limit=1000&delimiter=/&prefix=\n";
        console.log(this.state.ak+":"+qiniuSign(this.state.sk,body))
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


        setCookie(SK, this.state.sk, 100)
        setCookie(BUCKET, this.state.bucket, 100)
        setCookie(HOST, this.state.host, 100)
        setCookie(AK, this.state.ak, 100)

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