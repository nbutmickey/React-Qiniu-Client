import React, { Component } from 'react';
import { Link } from "react-router";
import { connect } from 'react-redux'

class Nav extends Component {
    render() {
        return (
            <div>

                {/* 导航条部分 */}
                <div>
                    <ul>
                        <li><Link to="/" onClick={this.props.onClick}>Home</Link></li>
                        <li><Link to="/upload">Upload</Link></li>
                        <li><Link to="/settings">Settings</Link></li>
                    </ul>
                </div>

                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default connect()(Nav);