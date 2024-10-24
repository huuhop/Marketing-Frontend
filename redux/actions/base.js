export const BASE = {
    request: 'GET_BASEDATA_REQUEST',
    success: 'GET_BASEDATA_SUCCESS',
    error: 'GET_BASEDATA_ERROR',
    append: 'GET_BASEDATA_APPEND'
};
export function getData() {
    return {
        type: BASE.request
    }
}