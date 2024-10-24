export const UI = {
    set_extra_menu: 'UI_SET_EXTRA_MENU',
    set_template: 'UI_SET_TEMPLATE',
    OPEN_LEFT_SIDEBAR: 'UI.OPEN_LEFT_SIDEBAR',
    TOGGLE_FULL_SCREEN: 'UI.TOGGLE_FULL_SCREEN',
    set_theme: 'UI_SET_THEME',
    showAlert: 'SHOW_ALERT',
    showLoading: 'SHOW_LOADING'
};
export function setExtraMenu(menu, id){
    return {
        type: UI.set_extra_menu,
        menu,
        id
    }
}
export function setTemplate(template){
    return {
        type: UI.set_template,
        template
    }
}
export function openLeftSidebar(is_open){
    return {
        type: UI.OPEN_LEFT_SIDEBAR,
        is_open
    }
}
export function setTheme(theme){
    return {
        type: UI.set_theme,
        theme
    }
}
export function toggleFullScreen(){
    return {
        type: UI.TOGGLE_FULL_SCREEN,
    }
}

export function showArlert(alert){
    return {
        type: UI.showAlert,
        alert
    }
}