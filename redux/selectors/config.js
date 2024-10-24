export const selectCommonConfig = (state) => state.commonConfig;

export const selectPackedLabelTypeList = (state) =>
  state.commonConfig.packed_label_type_list;
export const selectPackedLabelDashboardConfig = (state) =>
  state.commonConfig.packed_label_dashboard_config;
export const selectItDashboardConfig = (state) =>
  state.commonConfig.it_dashboard_config;
export const selectSmsVoucherConfig = (state) =>
  state.commonConfig.sms_voucher_config;
export const selectSkuProblemTypeList = (state) =>
  state.commonConfig.sku_problem_type_list;
export const selectSkuProblemTypeListBySku = (state) =>
  state.commonConfig.sku_problem_type_list_by_sku;
export const selectSkuNegativeDashboardConfig = (state) =>
  state.commonConfig.sku_negative_dashboard_config;
export const selectChecklistByStockConfig = (state) =>
  state.commonConfig.check_list_by_stock_config;
export const selectChecklistBySkuConfig = (state) =>
  state.commonConfig.check_list_by_sku_config;
export const selectSkuExpiredConfig = (state) =>
  state.commonConfig.sku_expire_dashboard_config;
