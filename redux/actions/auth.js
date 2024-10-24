export const AUTH = {
    verify: {
        request: 'AUTH_VERIFY_REQUEST',
        success: 'AUTH_VERIFY_SUCCESS',
        error: 'AUTH_VERIFY_ERROR',
    },
    login: {
        request: 'LOGIN_REQUEST',
        success: 'LOGIN_SUCCESS',
        error: 'LOGIN_ERROR'
    },
    logout: {
        request: 'AUTH_LOGOUT_REQUEST'
    }
};
export function verify() {
    return {
        type: AUTH.verify.request
    }
}

export function login(data) {
    return {
        type: AUTH.login.request,
        data
    }
}

export function logout() {
    return {
        type: AUTH.logout.request
    }
}