import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Layout, Menu, Popover } from 'antd';
import { Link } from 'react-router-dom'
import { withTranslation } from 'react-i18next';
import routers from '~/routes';
import classNames from 'classnames'
import logoInline from '~/assets/images/logo_full_v2.svg';
import logoMini from '~/assets/images/logo_short.svg';
import { checkManager, checkISO } from '~/services/helper';
import { roleSupperAdmin } from '~/constants/basic';
import { modifyNavbarInfo } from '~/redux/actions/shared';
import { isAllowAccessRoute } from '~/utils/guard';
import { loadStore, saveStore } from "~/utils/stores/localStorage";
import { logout } from '~/redux/actions/auth'
import { UserOutlined } from '@ant-design/icons';
import SignOutSvg from '~/components/SvgIcons/SignOutSvg';
import ToggleArrowSvg from '~/components/SvgIcons/ToggleArrowSvg';
import { TOGGLE_LEFT_SIDEBAR_KEY } from '~/constants';
import { openLeftSidebar } from "~/redux/actions/layout";

const { Sider } = Layout;
const { SubMenu } = Menu;

const toggle_left_sidebar = localStorage.getItem('toggle_left_sidebar');

let cacheOpenKeys = [];

console.log({routers})

class SiderMenu extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            openKeys: props.screens.is_mobile || props.ui.open_left_sidebar ? cacheOpenKeys : []
        }
    }
    // componentDidUpdate(prevProps, prevState) {
    //     const { location, screens: { is_mobile }, ui: { open_left_sidebar } } = this.props
    //     if (open_left_sidebar !== prevProps.ui.open_left_sidebar) {
    //         const openKeys = is_mobile || open_left_sidebar ? ['report', location.pathname.split("/").filter(i => i.trim().length > 0).slice(0, -1).join('.')] : [];
    //         console.log('tada', {openKeys, hihi: location.pathname.split("/").filter(i => i.trim().length > 0).slice(0, -1).join('.')})
    //         cacheOpenKeys = [...cacheOpenKeys, ...openKeys]
    //         this.setState({
    //             openKeys
    //         })
    //     }
    // }

    isMainMenu = key => {
        return routers.some(item => {
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
    openSubmenu = (e, menu, hasChild) => {
        if (menu) {
            if (hasChild) {
                e.preventDefault();
            } else {
                this.props.onClickLink();
            }

        } else {
            this.props.onClickLink();
        }
    }
    getSelectedMenuKeys = pathname => {
        const arr = pathname.split('/').filter(i => i);
        if (arr.length > 0) {
            return arr.reduce((acc, cur, i) => {
                if (!!parseInt(cur)) {
                    return acc
                }
                if (acc.length > 0) {
                    acc.push(
                        `${acc[acc.length - 1]}.${cur}`
                    )
                } else {
                    acc.push(cur)
                }
                return acc
            }, [])
        }
        return [arr.slice(0, arr.length - 1).join('.')];
    };
    handleClickLink = (menu) => {
        const { screens: { is_mobile }, toggleSidebar, modifyNavbarInfo, location } = this.props

        if(menu.key.localeCompare(location.pathname.replaceAll('/', '.').slice(1))){
            document.body.scrollIntoView();
            modifyNavbarInfo()
        }

        if (is_mobile) {
            toggleSidebar(true)
        }
    }

    handleToggleSidebar = () => {
        // const { ui: { open_left_sidebar } } = this.props;
        // this.props.openLeftSidebar(!open_left_sidebar)
        let open_left_sidebar = loadStore(TOGGLE_LEFT_SIDEBAR_KEY);
        saveStore(TOGGLE_LEFT_SIDEBAR_KEY, !open_left_sidebar);
        this.props.openLeftSidebar(!open_left_sidebar);
      };

    /**
     * Check have permission to render menu
     * @param {*} menu 
     * @returns 
     */
    checkPermission(menu) {
        let { permission: staffPermission, staff_info: staffInfo, profile } = this.props;

        if(profile.role_id == roleSupperAdmin) {
            return true;
        }

        return (!menu.permission || ~staffPermission.indexOf(menu.permission))
            || menu.is_public
            || (menu.requiredMajors && ~menu.requiredMajors.indexOf(staffInfo.major_id))
            || (menu.requiredDepts && ~menu.requiredDepts.indexOf(staffInfo.staff_dept_id))
            || (menu.requiredDivisions && ~menu.requiredDivisions.indexOf(staffInfo.division_id))
            || (menu.requiredManager && checkManager(staffInfo.position_id))
            || checkISO(staffInfo.major_id);
    }

    render() {
        const { openKeys } = this.state;
        cacheOpenKeys = openKeys
        // console.log({openKeys, cacheOpenKeys})
        // console.log({openKeys, ecec: this.props.location.pathname.split("/").filter(i => i.trim().length > 0).slice(0, -1).join('.')}, cacheOpenKeys)

        const { t, screens: { is_mobile }, ui: { open_left_sidebar }, location: { pathname }, permission, staff_info } = this.props;
        const selectedKeys = this.getSelectedMenuKeys(pathname);
        const renderMenu = (menu) => {
            const menuKeyLength = menu.key.split('.').length;
            const isChild = menuKeyLength >= 3;

            let isAllowAccess = isAllowAccessRoute({
                route: menu,
                profile: this.props?.profile,
            });

            if (!isAllowAccess) {
                return <></>;
            }

            if (menu.hide) {
                if (menu.children && menu.children.length > 0) {
                    return menu.children.map(child => {
                        return renderMenu(child)
                    })
                }
            } else {
                if (menu.children && menu.children.length > 0) {
                    if (this.checkPermission(menu)) {
                        return (
                            <SubMenu
                                className={classNames(isChild ? 'child-menu' : 'parent-menu')}
                                key={menu.key}
                                title={
                                    <span className={classNames("d-flex align-items-center")}>
                                        {
                                            menu.icon && (
                                                <span style={{width: '25px', display: 'flex'}} className={classNames("sidebar-menu-icon mb-0 h5", { 'mr-2': open_left_sidebar })}>{menu.icon}</span>
                                            )
                                        }
                                        <span>{menu.menu_name || menu.name}</span>
                                    </span>
                                }
                            >
                                {/* {!is_mobile && !open_left_sidebar && <Menu.Item disabled><b>{t(menu.menu_name || menu.name)}</b></Menu.Item>} */}
                                {menu.children.map(child => {
                                    return renderMenu(child)
                                })}
                            </SubMenu>
                        )
                    }
                } else {
                    if (this.checkPermission(menu)) {
                        return (
                            <Menu.Item key={menu.key} className={classNames(isChild ? 'child-menu' : 'parent-menu')}>
                                <Link className={classNames("d-flex align-items-center app-menu", !open_left_sidebar ? 'app-menu-max-content':'')} to={`${menu.path}?default=1`} onClick={()=>{this.handleClickLink(menu)}}>
                                    {menu.icon && <span style={{width: '25px', display: 'flex'}} className={classNames("sidebar-menu-icon mb-0 h5", { 'mr-2': open_left_sidebar })}>{menu.icon}</span>}
                                    <span>{t(menu.menu_name || menu.name)}</span>
                                </Link>
                            </Menu.Item>
                        )
                    }
                }
            }
        }
        const isLargeIcon = is_mobile || open_left_sidebar ;

        return (
            <Sider
                trigger={null}
                collapsedWidth={is_mobile ? 0 : 80}
                collapsible
                collapsed={!open_left_sidebar}
                width={256}
                className="left-sidebar-menu"
                id='main_menu_site'
                style={{position: 'relative'}}
            >
                <a href='/'>
                    <div className={classNames("block_logo_site text-center", isLargeIcon ? "" : "justify-content-center align-items-center")} id="logo">
                        {isLargeIcon ? <img src={logoInline} alt="logo" className='logo_hasaki' /> : <img src={logoMini} alt="logo" className='logo_hasaki' />}
                    </div>
                </a>
                <span id="toggle-menu-btn" onClick={e=>{
                        e.stopPropagation();
                        this.handleToggleSidebar()
                    }}><ToggleArrowSvg  onClick={e=>{
                        e.stopPropagation();
                        this.handleToggleSidebar()
                }} />
                </span>
                <nav id="sidebar" className="sidebar-wrapper" style={{ width: '100%', height: 'calc(100vh - 100px)', overflow: 'hidden' }}>
                    <div style={{ width: '98%', height: 'calc(100vh - 208px)', overflowX: 'hidden' }}>
                        <Menu
                            key="Menu"
                            mode="inline"
                            // defaultOpenKeys={['report','report.stock-control', 'report.checklist', 'report.expired-date-month', 'report.expired-date-percent']}
                            openKeys={openKeys}
                            onOpenChange={this.handleOpenChange}
                            selectedKeys={selectedKeys}
                            style={{ height: '100%', borderRight: 0, overflowX: 'hidden'}}
                            inlineCollapsed={toggle_left_sidebar}
                        >

                            {/*<Menu.Item>
                                <a className={classNames("d-flex align-items-center")}> 
                                        <span className={classNames("sidebar-menu-icon mb-0 h5", { 'mr-3': open_left_sidebar })}><HomeOutlined/></span>
                                    <span className="text-uppercase">{t('Drashboard')}</span>
                                </a>
                            </Menu.Item> 
                            */}
                            {routers.map(router => {
                                return renderMenu(router)
                            })}
                            {/* <Menu.Item key='signout'>
                                <a className={classNames("d-flex align-items-center")} href={OLD_INSIDE + '/auth/logout'}>
                                    <span className={classNames("sidebar-menu-icon mb-0 h5", { 'mr-3': open_left_sidebar })}><FontAwesomeIcon icon={faSignOutAlt} /></span>
                                    <span>{t('Sign Out')}</span>
                                </a>
                            </Menu.Item> */}
                        </Menu>
                    </div>
                    {
                        this.props.ui.open_left_sidebar && <div style={{height: '40px', padding: `${this.props.ui.open_left_sidebar && '15px 0px 0px 25px'}`, color: '#adb5bd', display: 'flex', alignItems: 'center', fontSize: '11.5px'}}>ACCOUNT</div>
                    }
                    <div key={`open-left-side-${this.props.ui.open_left_sidebar}`} style={{color: '#adb5bd', height: '60px', padding: `${this.props.ui.open_left_sidebar && '0px 10px 0px 25px'}`, justifyContent:"space-evenly"}} className="w-100 d-flex align-items-start justify-content-between">
                        {
                            !this.props.ui.open_left_sidebar && <Popover overlayStyle={{backgroundColor: '#161a23', borderRadius: '8px', padding: '0px'}} overlayInnerStyle={{backgroundColor: '#161a23', borderRadius: '8px', padding: '0px'}} trigger="hover" placement='right' arrowContent={null} showArrow={false} content={
                                <div style={{width: '60px', height: '20px', color: '#adb5bd', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                    <div className='side-bar-menuitem' onClick={()=>{this.props.logout()}}>Logout</div>
                                </div>
                            }>
                                <div className={`d-flex justify-content-center align-items-center ${!this.props.ui.open_left_sidebar ? 'w-100': ''}`}>
                                    {/* <FontAwesomeIcon icon={faUserCircle} style={{fontSize: '25px', transform: 'translateY(-1px)'}} /> */}
                                    <UserOutlined style={{fontSize: '20px', transform: 'translateY(3px)'}} />
                                </div>
                            </Popover>
                        }
                        {
                            this.props.ui.open_left_sidebar && <div className={`d-flex justify-content-center align-items-center ${!this.props.ui.open_left_sidebar ? 'w-100': ''}`}>
                                {/* <FontAwesomeIcon icon={faUserCircle} style={{fontSize: '25px', transform: 'translateY(-1px)'}} /> */}
                                <UserOutlined style={{fontSize: '20px', transform: 'translateY(3px)'}} />
                            </div>
                        }
                        {this.props.ui.open_left_sidebar && <>
                            <span className='mx-2' style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '122px', transform: 'translateY(2px)'}}>{this.props.profile.name}</span><div>
                                <div className='logout-btn-layout' onClick={()=>{this.props.logout()}}>
                                    {/* <FontAwesomeIcon icon={faSignOutAlt} style={{fontSize: '18px'}} /> */}
                                    <SignOutSvg />
                                </div>
                            </div></>
                        }
                        
                    </div>
                </nav>
            </Sider>
        );
    }
}
export default connect(
    state => ({
        location: state.router.location,
        permission: state.auth.info.permission,
        staff_info: state.auth.info.staff_info,
        profile: state.auth.info.profile,
		ui: state.ui,
    }),
    dispatch => ({
        // setExtraMenu: (menu, id)=>{
        //     dispatch(setExtraMenu(menu, id))
        // }
        openLeftSidebar: (open_left_sidebar) => {
            dispatch(openLeftSidebar(open_left_sidebar));
        },
		logout: () => {
            dispatch(logout())
        },
        modifyNavbarInfo: ()=>{
            dispatch(modifyNavbarInfo({
                data: undefined,
                isFetching: false
              }))
        }
    })
)(withTranslation()(SiderMenu));
