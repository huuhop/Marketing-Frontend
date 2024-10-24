import { combineReducers } from 'redux'
import { localStorageKey } from '~/constants/web';
import { AUTH } from '~/redux/actions/auth';
const initialState = {
    isLoading: false,
    profile: {},
    staff_info: {},
    permission: [],
    stores: [],
    stores_allow: [],
    stores_writable: [],
    stores_read_only: [],
    logged: false,
    verified: false,
    token: '',
    login_fail_notify: false,
    login_fail_data: {}
}

function info(state = initialState, action) {
    switch (action.type) {
        case AUTH.verify.success:
            return {
                ...state,
                verified: true,
                logged: true,
                profile: action.profile,
                staff_info: action.staff_info || {},
                permission: action.permission,
                locations: action.locations,
                stores: action.stores,
                stores_allow: action.stores_allow,
                stores_writable: action.stores_writable,
                stores_read_only: action.stores_read_only,
            };
        case AUTH.verify.error:
            localStorage.removeItem('client_hasaki_inside_token');
            localStorage.removeItem(localStorageKey.wmsWarehouse);
            return {
                ...initialState,
                verified: true,
                token: '',
                isLoading: false,
            };
        case AUTH.login.success:
            localStorage.setItem('client_hasaki_inside_token', action.token);
            return {
                ...state,
                verified: true,
                logged: true,
                user_id: action.user_id,
                token: action.token,
            }
        case AUTH.login.error:            
            return {
                ...state,
                login_fail_notify: true,
                login_fail_data: action.error,
                isLoading: false,
            }
        case AUTH.login.request:
            return {
                ...state,
                isLoading: true,
                user_id: action.user_id,
                token: action.token,
            }
        case AUTH.logout.request:
            localStorage.removeItem('client_hasaki_inside_token');
            localStorage.removeItem(localStorageKey.stocks);
            localStorage.removeItem(localStorageKey.wmsWarehouse);
            return {
                ...initialState,
                verified: true,
                token: '',
                isLoading: false,
            }
        default:
            return state
    }
}


const reducer = combineReducers({ info })

export default reducer