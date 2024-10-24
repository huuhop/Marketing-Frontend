import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Dropdown } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown} from '@fortawesome/free-solid-svg-icons'
import Notification from './NotificationDropdown'
import UserDropdown from './UserDropdown'
export default class Navbar extends Component {
    render() {
        return (
            <div className="d-flex align-items-center">
                <div className="d-flex justify-content-right align-items-center">
                    <Notification/>
                    <UserDropdown/>
                </div>
              </div>
        )
    }
}