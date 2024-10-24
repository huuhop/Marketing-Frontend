import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Affix, BackTop, Alert, Spin } from "antd";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { openLeftSidebar, toggleFullScreen } from "~/redux/actions/layout";
import {
  faExpandArrowsAlt,
  faCompressArrowsAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import moment from "moment";
import { REACT_APP_VERSION } from "~/constants";

import { loadStore, saveStore } from "~/utils/stores/localStorage";
import { TOGGLE_LEFT_SIDEBAR, TOGGLE_LEFT_SIDEBAR_KEY } from "~/constants";
import { triggerClickAction } from "~/redux/actions/shared";

class index extends Component {
  handleToggleSidebar = () => {
    // const { ui: { open_left_sidebar } } = this.props;
    // this.props.openLeftSidebar(!open_left_sidebar)
    let open_left_sidebar = loadStore(TOGGLE_LEFT_SIDEBAR_KEY);
    saveStore(TOGGLE_LEFT_SIDEBAR_KEY, !open_left_sidebar);
    this.props.openLeftSidebar(!open_left_sidebar);
  };
  getLayoutStyle = () => {
    const {
      screens: { is_mobile },
    } = this.props;

    if (!is_mobile) {
      return {
        // paddingLeft: open_left_sidebar ? '0' : '256px',
      };
    }
    return null;
  };
  componentDidUpdate(prevProps, prevState) {
    const {
      screens: { is_mobile },
    } = this.props;
    if (is_mobile !== prevProps.screens.is_mobile) {
      if (is_mobile) {
        this.props.openLeftSidebar(false);
      }
    }
  }
  handleToggleFullScreen = () => {
    const {
      ui: { full_screen },
    } = this.props;
    this.props.toggleFullScreen();

    const elem = document.getElementById("root");
    if (document.fullscreenElement && full_screen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen && full_screen) {
        // Firefox //
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen && full_screen) {
        // Chrome, Safari and Opera //
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen && full_screen) {
        // IE//Edge //
        document.msExitFullscreen();
      }
    } else {
      if (elem.requestFullscreen && !full_screen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen && !full_screen) {
        // Firefox //
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen && !full_screen) {
        // Chrome, Safari & Opera //
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen && !full_screen) {
        // IE/Edge /
        elem.msRequestFullscreen();
      }
    }
  };
  render() {
    const { children, ...props } = this.props;

    const pathName = window.location.pathname;

    return (
      <Spin spinning={this.props.isGlobalLoading}>
        <Layout>
          {!props.ui.full_screen && (
            <Affix offsetTop={0}>
              <Sidebar toggleSidebar={this.handleToggleSidebar} {...props} />
            </Affix>
          )}
          <Layout
            style={{
              width: "100%",
              minHeight: "100vh",
            }}
            onClick={(e) => {
              const el = e.target;
              const listSelector = [
                "#date-menu-duration-dropdown",
                "date-menu-duration-option",
                "date-menu-duration-tag",
                "ant-select-item",
                "ant-select-selection-overflow-item"
              ];
              const findIgnoreElement = listSelector.some((selector) => {
                const ignoreEl = el.querySelector(selector) || el.classList.contains(selector);
                if (ignoreEl) {
                  return true;
                }
                return false;
              });
              if (!findIgnoreElement) {
                this.props.triggerClickAction();
              }
            }}
          >
            {!props.ui.full_screen && (
              <Affix offsetTop={0}>
                <Layout.Header
                  id="wrapper_header"
                  // style={{ height: props.ui.navbarWidth }}
                  className="main-header pl-0 pr-3 box-shadow"
                >
                  <Header toggleSidebar={this.handleToggleSidebar} {...props} />
                </Layout.Header>
              </Affix>
            )}
            <Layout.Content
              key={pathName}
              style={{
                width: `calc(100vw - ${
                  !props.ui.open_left_sidebar ? 80 : 260
                }px)`,
              }}
              className={classNames("main-content")}
            >
              <Alert
                message={props.ui.alert.message}
                type={props.ui.alert.type}
                showIcon
                closable
                className={"mb-2"}
                style={{ display: props.ui.alert.show ? "block" : "none" }}
              />

              {this.props.children}
              <div
                className="ant-back-top"
                style={{ right: 10, bottom: 10, display: "none" }}
              >
                <div>
                  <div
                    className="ant-back-top-content"
                    onClick={this.handleToggleFullScreen}
                  >
                    <FontAwesomeIcon
                      style={{ width: 14, height: 16, margin: "12px auto" }}
                      icon={
                        props.ui.full_screen
                          ? faCompressArrowsAlt
                          : faExpandArrowsAlt
                      }
                    />
                  </div>
                </div>
              </div>

              <BackTop style={{ right: 60, bottom: 10 }} />
            </Layout.Content>
            <Layout.Footer className="py-3 bg-footer">
              <div className="row">
                <div className="col-sm-6">
                  <div className="text-muted">
                    <b>
                      CÔNG TY CỔ PHẦN HASAKI BEAUTY & CLINIC -{" "}
                      <a href="https://hasaki.vn">Hasaki.vn</a>
                    </b>
                  </div>
                </div>
              </div>
            </Layout.Footer>
          </Layout>
        </Layout>
      </Spin>
    );
  }
}
export default connect(
  (state) => ({
    ui: state.ui,
    isGlobalLoading: state.shared.isGlobalLoading,
  }),
  (dispatch) => ({
    openLeftSidebar: (open_left_sidebar) => {
      dispatch(openLeftSidebar(open_left_sidebar));
    },
    toggleFullScreen: () => {
      dispatch(toggleFullScreen());
    },
    triggerClickAction: () => {
      dispatch(triggerClickAction());
    },
  })
)(index);
