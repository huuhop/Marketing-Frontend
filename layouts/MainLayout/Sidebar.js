import React, { Component } from 'react'
import { Drawer } from 'antd'
import Menu from './Menu'
export default class Sidebar extends Component {
    render() {
        const { screens: { is_mobile }, ui: { open_left_sidebar }, toggleSidebar } = this.props;
        return is_mobile ? (
            <Drawer
                placement="left"
                closable={false}
                onClose={toggleSidebar}
                visible={open_left_sidebar}
                bodyStyle={{
                    padding: 0,
                }}
                className="draw-transparent"
                style={{
                    padding: 0,
                    height: '100vh',
                    zIndex: 10
                }}
            >
                <Menu {...this.props}/>
            </Drawer>
        ) : (
            <Menu {...this.props}/>
        );
    }
}
