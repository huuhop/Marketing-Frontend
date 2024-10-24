import { SHARED } from "../actions/shared";

const initialState = {
  isGlobalLoading: false,
  accumulateModalData: {
    isOpen: false,
    reportType: null,
    modalType: null,
  },
  navbarInfo: {
    isFetching: false,
    pathName: null,
    data: null,
  },
  isNavbarInfoDisabled: false,
  problemSolvingModal: {
    isOpen: true,
    problemType: null,
    data: null,
    strDates: null,
  },
  totalActiveSku: undefined,
  productRules: {},
  clickAction: 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SHARED.modify_accumulated_modal:
      return {
        ...state,
        accumulateModalData: {
          ...state.accumulateModalData,
          isOpen: action.isOpen,
          reportType: action.reportType ? action.reportType : null,
          modalType: action.isOpen ? action.modalType : null,
        },
      };
    case SHARED.modify_navbar_info: {
      return {
        ...state,
        navbarInfo: action.navbarInfo,
      };
    }
    case SHARED.modify_problem_solving_modal: {
      return {
        ...state,
        problemSolvingModal: {
          isOpen: action.isOpen,
          problemType: action.problemType,
          data: action.data,
        },
      };
    }
    case SHARED.modify_global_loading: {
      return {
        ...state,
        isGlobalLoading: action.isLoading,
      };
    }
    case SHARED.modify_total_active_sku: {
      return {
        ...state,
        totalActiveSku: action.totalActiveSku,
      };
    }
    case SHARED.disabled_navbar_info: {
      return {
        ...state,
        isNavbarInfoDisabled: action.isDisabled,
      };
    }
    case SHARED.modify_product_rules: {
      return {
        ...state,
        productRules: action.productRules,
      };
    }
    case SHARED.trigger_click_action_time: {
      return {
        ...state,
        clickAction: action.clickAction,
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;
