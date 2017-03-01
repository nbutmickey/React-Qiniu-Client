import React, { Component } from 'react'
import { fetchFolder } from "./Common"
import { connect } from "react-redux"

//文件操作
class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isInit: false
        }
    }

    componentDidMount() {
        var that = this
        fetchFolder(this.props.config.tokenHost,
            this.props.config.bucket, "2017/", "rh8TtBJvmP3EKtEyHV3KzduDRpgV6eI6cwh3rYvY", "B6aJ5c_O25oi3hZXtH2cTlSkGLrALgirMCvzdYiA", {
                onError() {

                },

                onSuccess(json) {
                    console.log(json)
                    that.setState({
                        data: json,
                        isInit: true
                    })
                }
            })
    }



    onClick() {
        var that = this

        fetchFolder(this.props.config.tokenHost,
            this.props.config.bucket, "2017/", "rh8TtBJvmP3EKtEyHV3KzduDRpgV6eI6cwh3rYvY", "B6aJ5c_O25oi3hZXtH2cTlSkGLrALgirMCvzdYiA", {
                onError() {

                },

                onSuccess(json) {

                    that.setState({
                        data: json
                    })
                }
            })
    }


    //渲染加载中页面
    renderLoading() {
        return (
            <div>
                Loading....
            </div>
        )
    }


    renderContent() {
        return (
            <div>
                Load Success with {this.state.data}
            </div>
        )
    }

    render() {
        if (!this.state.isInit) {
            return this.renderLoading()
        } else {
            return this.renderContent()
        }
    }
}

function mapToProps(state) {
    return {
        config: state.config
    }
}

export default connect(mapToProps)(Home)