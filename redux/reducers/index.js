import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import ui from "~/redux/reducers/layout";
import auth from "~/redux/reducers/auth";
import base from "~/redux/reducers/base";
import commonConfig from "~/redux/reducers/config";
import shared from "~/redux/reducers/shared";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    ui,
    auth,
    baseData: base,
    commonConfig,
    shared,
  });
