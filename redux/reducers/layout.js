import { UI } from "~/redux/actions/layout";

import { loadStore, saveStore } from "~/utils/stores/localStorage";
import { TOGGLE_LEFT_SIDEBAR, TOGGLE_LEFT_SIDEBAR_KEY } from "~/constants";

let open_left_sidebar = loadStore(TOGGLE_LEFT_SIDEBAR_KEY);
if (typeof loadStore(TOGGLE_LEFT_SIDEBAR_KEY) == "undefined") {
  open_left_sidebar = TOGGLE_LEFT_SIDEBAR;
  saveStore(TOGGLE_LEFT_SIDEBAR_KEY, TOGGLE_LEFT_SIDEBAR);
}

const initialState = {
  template: "",
  alert: {
    show: false,
    type: "success",
    message: "",
  },
  menu: null,
  id: null,
  open_left_sidebar: open_left_sidebar,
  full_screen: localStorage.getItem("full_screen") === "true",
  theme: "dark",
  navbarWidth: 120,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UI.set_template:
      return {
        ...state,
        template: action.template,
      };
    case UI.set_extra_menu:
      return {
        ...state,
        menu: action.menu,
        id: action.id,
      };
    case UI.OPEN_LEFT_SIDEBAR:
      return {
        ...state,
        open_left_sidebar: action.is_open,
      };
    case UI.TOGGLE_FULL_SCREEN:
      localStorage.setItem("full_screen", !state.full_screen);
      return {
        ...state,
        full_screen: !state.full_screen,
      };
    case UI.set_theme:
      return {
        ...state,
        theme: action.theme,
      };
    case UI.showAlert:
      return {
        ...state,
        alert: action.alert,
      };
    default:
      return state;
  }
}

export default reducer;
