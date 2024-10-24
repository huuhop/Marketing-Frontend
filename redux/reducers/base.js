import { BASE } from '~/redux/actions/base';

const initialState = {
    locations: [],
    departments: [],
    divisions: [],
    majors: [],
    positions: [],
    cities: [],
    pendingSkills: [],
    users: [],
    stocks: [],
    shopStocks: [],
    pickup_location_groups: [],
    pickupLocationGroupsMap: {},
    brands: [],
    vendors: [],
    wmsWarehouse: {},
}

function baseData(state = initialState, action) {
    switch (action.type) {
        case BASE.success:
            return {
                ...state,
                locations: action.locations,
                departments: action.departments,
                divisions: action.divisions,
                majors: action.majors,
                positions: action.positions,
                pendingSkills: action.pendingSkills,
                cities: action.cities,
                users: action.users,
                stocks: [...action.stocks, {stock_id:2000, stock_name: 'STOCK_INSIDE'}],
                shopStocks: action.shopStocks,
                pickup_location_groups: action.pickup_location_groups,
                pickupLocationGroupsMap: action.pickupLocationGroupsMap,
                brands: action.brands,
                vendors: action.vendors,
                wmsWarehouse: action.wmsWarehouse,
            };
        case BASE.error:
            return {
                ...state,
                ...initialState
            };
        case BASE.append:
            return {
                ...state,
                ...action,
            }
        default:
            return state
    }
}

export default baseData;