import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { Menu, Dropdown, Space } from 'antd';
import { withTranslation } from 'react-i18next';
import { UserOutlined } from '@ant-design/icons';
import { logout } from '~/redux/actions/auth'

class UserDropdown extends Component {
    render() {
        const { t, profile } = this.props

        return (
            <Dropdown
                trigger={['click']}
                overlay={(
                    <Menu>
                        {/* <Menu.Item key="0">
                            <a href={OLD_INSIDE + '/common/profile/dashboard'}><FontAwesomeIcon style={{width: 20}} icon={faUser}/> {t('Profile')}</a>
                        </Menu.Item>
                        <Menu.Item key="1">
                            <a href={OLD_INSIDE + '/common/profile/reconcile'}><FontAwesomeIcon style={{width: 20}} icon={faCalculator}/> {t('Reconcile')}</a>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <a href={OLD_INSIDE + '/common/profile/receipt'}><FontAwesomeIcon style={{width: 20}} icon={faDollarSign}/> {t('Receipts')}</a>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <a href={OLD_INSIDE + '/common/support-request'}><FontAwesomeIcon style={{width: 20}} icon={faLifeRing}/> {t('Report Request')}</a>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <a href={OLD_INSIDE + '/setting/user/change-password'}><FontAwesomeIcon style={{width: 20}} icon={faLock}/> {t('Change password')}</a>
                        </Menu.Item>
                        <Menu.Divider /> */}
                        <Menu.Item key="5" onClick={this.props.logout}>
                            <FontAwesomeIcon style={{ width: 20 }} icon={faSignOutAlt} />{t('Sign Out')}
                        </Menu.Item>
                        {/* <Menu.Item key="5">
                            <a href={OLD_INSIDE + '/auth/logout'}><FontAwesomeIcon style={{width: 20}} icon={faSignOutAlt}/> {t('Sign Out')}</a>
                        </Menu.Item> */}
                    </Menu>
                )}
            >
                <Space className="cursor-pointer">
                    {/* <Avatar size={20} icon={<UserOutlined/>} /> */}
                    <UserOutlined />
                    <p className="my-0">{profile.name}</p>
                    <FontAwesomeIcon style={{ fontSize: 20 }} icon={faSortDown} />
                </Space>
            </Dropdown>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.auth.info.profile
})

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logout())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(UserDropdown))
