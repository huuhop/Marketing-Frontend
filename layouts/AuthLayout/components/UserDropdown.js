import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown} from '@fortawesome/free-solid-svg-icons'
import { Avatar, Menu, Dropdown, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

class UserDropdown extends Component {
    render() {
        const { user } = this.props

        console.log('user', user)
        return (
            <Dropdown 
                trigger={['click']}
                overlay={(
                    <Menu>
                        <Menu.Item key="0">
                            <a href="http://www.alipay.com/">User profile</a>
                        </Menu.Item>
                        <Menu.Item key="1">
                            <a href="http://www.taobao.com/">Change password</a>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item key="3">LogoutLogout</Menu.Item>
                    </Menu>
                )} 
            >
                <Space className="cursor-pointer">
                    <Avatar size={20} icon={<UserOutlined/>} />
                    <p className="my-0">{user.username}</p>
                    <FontAwesomeIcon style={{fontSize: 20, marginTop: -10}} icon={faSortDown}/>
                </Space>
            </Dropdown>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user.share.info
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDropdown)
