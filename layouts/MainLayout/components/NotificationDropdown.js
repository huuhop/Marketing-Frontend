import React, { Component } from 'react'
import classnames from 'classnames'
import { Badge, Menu, Dropdown } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell} from '@fortawesome/free-solid-svg-icons'
export default class NotificationDropdown extends Component {
    render() {
        const { classBtn } = this.props
        return (
            <Dropdown
                trigger={['click']}
                overlay={(
                    <Menu className="rounded-0">
                        {/* <Menu.Item key="0" className="border-bottom notification-item">
                            <div className="d-flex align-items-center">
                                <Avatar size={40} icon="user" />
                                <div className="ml-2">
                                    <p className="notification-title my-0">Sync Shopbase products was successful</p>
                                    <p className="text-muted my-0">1 week ago</p>
                                </div>
                            </div>
                        </Menu.Item>
                        <Menu.Item key="1" className="border-bottom">
                            <div className="d-flex align-items-center">
                                <Avatar size={40} icon="user" />
                                <div className="ml-2">
                                    <p className="notification-title my-0">Sync Shopbase products was successful</p>
                                    <p className="text-muted my-0">1 week ago</p>
                                </div>
                            </div>
                        </Menu.Item>
                        <Menu.Item key="3">3rd menu item</Menu.Item> */}
                    </Menu>
                )}
            >
                <button className={classnames("btn btn-bell text-white mr-3", classBtn)}>
                    <Badge count={0} showZero>
                        <FontAwesomeIcon style={{fontSize: 20}} icon={faBell}/>
                    </Badge>
                </button>
            </Dropdown>
        )
    }
}
