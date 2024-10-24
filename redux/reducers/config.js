import { COMMON_CONFIG } from "../actions/config";

const initialState = {
  packed_label_type_list: [],
  packed_label_dashboard_config: [],
  it_dashboard_config: [],
  sms_voucher_config: [],
  sku_problem_type_list: [],
  sku_negative_dashboard_config: [],
  filter_duration_config: [],
};

function commonConfigReducer(state = initialState, action) {
  switch (action.type) {
    case COMMON_CONFIG.success:
      return {
        ...state,
        ...action,
        estimate_expire_by_sku_dashboard_config:
          action.estimate_expire_by_sku_dashboard_config.map((val) => ({
            ...val,
            problem_type: `${val.problem_type}`,
          })),
        estimate_expire_by_stock_dashboard_config:
          action.estimate_expire_by_stock_dashboard_config.map((val) => ({
            ...val,
            problem_type: `${val.problem_type}`,
          })),
        estimate_expire_percent_by_sku_dashboard_config:
          action.estimate_expire_percent_by_sku_dashboard_config.map((val) => ({
            ...val,
            problem_type: `${val.problem_type}`,
          })),
        estimate_expire_percent_by_stock_dashboard_config:
          action.estimate_expire_percent_by_stock_dashboard_config.map(
            (val) => ({
              ...val,
              problem_type: `${val.problem_type}`,
            })
          ),

        sep_by_sku_dashboard_config: action.sep_by_sku_dashboard_config.map(
          (val) => ({
            ...val,
            problem_type: `${val.problem_type}`,
          })
        ),
        sep_by_stock_dashboard_config: action.sep_by_stock_dashboard_config.map(
          (val) => ({
            ...val,
            problem_type: `${val.problem_type}`,
          })
        ),
        sku_expire_by_sku_dashboard_config:
          action.sku_expire_by_sku_dashboard_config.map((val) => ({
            ...val,
            problem_type: `${val.problem_type}`,
          })),
        sku_expire_dashboard_config: action.sku_expire_dashboard_config.map(
          (val) => ({
            ...val,
            problem_type: `${val.problem_type}`,
          })
        ),
        sku_problem_type_list: action.sku_problem_type_list.map((val) => ({
          ...val,
          problem_type: `${val.problem_type}`,
        })),
        check_list_by_sku_config: action.check_list_by_sku_config.map(
          (val) => ({
            ...val,
            problem_type: `${val.problem_type}`,
          })
        ),
        check_list_by_stock_config: action.check_list_by_stock_config.map(
          (val) => ({
            ...val,
            problem_type: `${val.problem_type}`,
          })
        ),
        diff_no_date_by_sku_dashboard_config:
          action.diff_no_date_by_sku_dashboard_config.map((val) => ({
            ...val,
            problem_type: `${val.problem_type}`,
          })),
        diff_no_date_by_stock_dashboard_config:
          action.diff_no_date_by_stock_dashboard_config.map((val) => ({
            ...val,
            problem_type: `${val.problem_type}`,
          })),
      };
    case COMMON_CONFIG.error:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}

export default commonConfigReducer;
