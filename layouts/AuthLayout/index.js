import React, { Component } from 'react';
import logo from '~/assets/images/logo_1.png';
export default class index extends Component {
  render() {
    return (
      <div className="w-100 d-flex flex-column justify-content-center align-items-center" style={{height: '100vh', backgroundColor: '#d2d6de'}}>
        <img alt="" src={logo} width="100" style={{marginTop: -150}}/>
        {this.props.children}
      </div>
    )
  }
}
