export const COMMON_CONFIG = {
  request: "GET_COMMON_CONFIG_REQUEST",
  success: "GET_COMMON_CONFIG_SUCCESS",
  error: "GET_COMMON_CONFIG_ERROR",
};

export function getCommonConfigAction() {
  return {
    type: COMMON_CONFIG.request,
  };
}
