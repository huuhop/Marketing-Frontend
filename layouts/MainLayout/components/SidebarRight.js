import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu, Drawer } from 'antd';

import { Link } from 'react-router-dom'
import { AppstoreOutlined } from '@ant-design/icons'
import { withTranslation } from 'react-i18next';
import UserDropdown from './UserDropdown'
import routes from '~/routes'
class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            openKeys: [this.props.pathname.split("/")[1]]
        }
    }
    toggleSidebarMenu =(show)=>{
        this.setState({
            visible: show
        })
    }
    isMainMenu = key => {
        return routes.some(item => {
          if (key) {
            return item.key === key || item.path === key;
          }
          return false;
        });
      };
    handleOpenChange = openKeys => {
        const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
        this.setState({
            openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys],
        });
      };
    getSelectedMenuKeys = () => {
        return [this.props.pathname.split('/').filter(i=>i).join('.')];
    };
    render() {
        const { t } = this.props
        const { visible, openKeys } = this.state
        const selectedKeys = this.getSelectedMenuKeys();
        return (
            <div>
                <button className="btn btn-toggle-menu" onClick={()=>this.toggleSidebarMenu(true)}><AppstoreOutlined style={{fontSize: 20}}/></button>
                <Drawer
                    maskStyle={{background: 'rgba(48,75,88,.5)'}}
                    placement="right"
                    closable={false}
                    onClose={()=>this.toggleSidebarMenu(false)}
                    visible={visible}
                    width="270"
                    bodyStyle={{padding: 0}}
                >
                    <Menu
                        className="sidebar-menu"
                        mode="inline"
                        openKeys={openKeys}
                        onOpenChange={this.handleOpenChange}
                        selectedKeys={selectedKeys}
                    >
                        {/* <Menu.Item key="dashboard">
                            <Link to="/dashboard" onClick={()=>this.toggleSidebarMenu(false)}> 
                                <i className="mr-2 fas fa-tachometer-alt"></i>
                                <span>{t('SPA')}</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="clinic">
                            <Link to="/clinic" onClick={()=>this.toggleSidebarMenu(false)}> 
                                <i className="mr-2 fas fa-tachometer-alt"></i>
                                <span>{t('Clinic')}</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="promotions">
                            <Link to="/promotions" onClick={()=>this.toggleSidebarMenu(false)}> 
                                <i className="mr-2 fas fa-tachometer-alt"></i>
                                <span>{t('Promotion')}</span>
                            </Link>
                        </Menu.Item> */}
                        <Menu.Item key="user_dropdown">
                            <UserDropdown/>
                        </Menu.Item>
                    </Menu>
                </Drawer>
            </div>
        )
    }
}
export default connect(    
    state=>({
        pathname: state.router.location.pathname,
        permission: state.auth.info.permission
    }), 
    dispatch=>({
        // setExtraMenu: (menu, id)=>{
        //     dispatch(setExtraMenu(menu, id))
        // }
    })
)(withTranslation()(Sidebar));