export const SHARED = {
  modify_accumulated_modal: "SHARED_MODIFY_ACCUMULATED_MODAL",
  modify_navbar_info: "SHARED_MODIFY_NAVBAR_INFO",
  modify_problem_solving_modal: "SHARED_PROBLEM_SOLVING_MODAL",
  modify_global_loading: "SHARED_GLOBAL_LOADING",
  modify_total_active_sku: "SHARED_TOTAL_ACTIVE_SKU",
  disabled_navbar_info: "SHARED_DISABLED_NAVBAR_INFO",
  modify_product_rules: "SHARED_MODIFY_PRODUCT_RULE",
  trigger_click_action_time: "SHARED_TRIGGER_CLICK_ACTION_TIME",
};

export const modifyAccumulatedModal = ({
  isOpen = false,
  reportType,
  modalType,
}) => {
  return {
    type: SHARED.modify_accumulated_modal,
    isOpen,
    reportType,
    modalType,
  };
};

export const modifyNavbarInfo = (navbarInfo) => {
  return {
    type: SHARED.modify_navbar_info,
    navbarInfo,
  };
};

export const modifyProblemSolvingModal = ({ isOpen, problemType, data }) => {
  return {
    type: SHARED.modify_problem_solving_modal,
    isOpen,
    problemType,
    data,
  };
};

export const mofifyGlobalLoading = (isLoading) => {
  return {
    type: SHARED.modify_global_loading,
    isLoading,
  };
};

export const setNavbarInfoDisabled = (isDisabled) => {
  return {
    type: SHARED.disabled_navbar_info,
    isDisabled,
  };
};

export const modifyTotalActiveSku = (totalActiveSku) => {
  return {
    type: SHARED.modify_total_active_sku,
    totalActiveSku,
  };
};

export const modifyProductRules = (productRules) => {
  return {
    type: SHARED.modify_product_rules,
    productRules,
  };
};

export const triggerClickAction = () => {
  return {
    type: SHARED.trigger_click_action_time,
    clickAction: new Date().getTime(),
  };
};
