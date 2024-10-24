import { takeLatest, call, put, all } from 'redux-saga/effects';

import { AUTH } from '~/redux/actions/auth';
import { profile as userProfile } from '~/apis/setting/user';
import { login as loginApi } from '~/apis/setting/auth';

import { BASE } from '~/redux/actions/base';
import { getData } from '~/apis/setting/base';
import { getCommonConfigApi } from "~/apis/operation/staff";
import { COMMON_CONFIG } from "../actions/config";
import { localStorageKey } from '~/constants/web';
import { getList } from "~/apis/inventory/stock";
import { getBrands, getCommonShopStocks, getCommonStocks, getPickupLocationGroup, getVendors } from '~/apis/operation/common';
import { getInsideReportStock } from '~/apis/inside';
import { SHARED } from '../actions/shared';
import { getWMSCommonWarehouses } from '~/apis/wms';

const keyStorageChecksum = 'checksum_base_data';
/**
 * Verify token
 */
function* verifySaga() {
    try {
        
        // set token from inside on url
        const tokenFromInside = window.location.search.split('token=')[1]; 
        if(tokenFromInside) {
            localStorage.setItem('client_hasaki_inside_token', tokenFromInside)
        }

        const token = localStorage.getItem('client_hasaki_inside_token');
        // const token = Cookies.get('ws_token');
        // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEwMTMsImlzcyI6Imh0dHA6Ly93cy5oYXNha2kubG9jYWwvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE2MDE5NDc3MjYsImV4cCI6MTYyODIyNzcyNiwibmJmIjoxNjAxOTQ3NzI2LCJqdGkiOiJBTWV4anF4UktWOTJyUHNlIn0.2wailKFBXNDmWIoqpozieQomygtmsPzYGTf4xVo0DN0';
        // Cookies.set('ws_token', token);
        if (token) {
            const response = yield call(userProfile)
            if (response.status && response.data?.profile) {
                let { data: { profile, permission, staff_info } } = response
                profile.ip_allow = true
                let stores = [];
                let stores_writable = []
                let stores_read_only = []

                /**
                 * Get stocks
                 */
                let cacheStocks = [];
                try{
                    const responseStocks= yield call(getCommonStocks);
                    if(responseStocks.status){
                        cacheStocks=responseStocks.data;
                    }
                }catch(err){}

                let cacheShopStocks = [];
                try{
                    const responseShopStocks= yield call(getCommonShopStocks);
                    if(responseShopStocks.status){
                        cacheShopStocks=responseShopStocks.data;
                    }
                }catch(err){}

                /**
                 * Get pickup location
                 */
                let pickupLocationGroups = [];
                let pickupLocationGroupsMap = {}
                try{
                    const responsePickupLocationGroup= yield call(getPickupLocationGroup);
                    if(responsePickupLocationGroup.status){
                        pickupLocationGroups=responsePickupLocationGroup.data ?? [];
                        pickupLocationGroups= pickupLocationGroups.map(item=> {
                            return {...item, stocks: Array.isArray(item.stocks) ? item.stocks : Object.values(item.stocks) };
                        })
    
                        pickupLocationGroupsMap= pickupLocationGroups.reduce((init, item)=>{
                            let loc = {[item.id]: {name: item.name, stocks: item.stocks} }
                            return {...init, ...loc }
                        },{})
                    }
                }catch(err){}

                /**
                 * Get brands
                 */
                let brands = [];
                try{
                    const responseBrands= yield call(getBrands);
                    if(responseBrands.status){
                        brands=responseBrands.data;
                    }
                }catch(err){}

                /**
                 * Get total_active_sku
                 */
                // const resTotalActiveSku= yield call(getInsideReportStock, {
                //     distinct_sku: 1,
                //     is_count_active_sku: 1,
                // })
                // if(resTotalActiveSku && resTotalActiveSku.data){
                //     yield put({type: SHARED.modify_total_active_sku, totalActiveSku: resTotalActiveSku.data.all})
                // }

                /* Get Vendors */
                let vendors = undefined;
                let vendorsCache = undefined;
                try{
                    const vendorChecksum= localStorage.getItem('vendor-checksum');
                    const responseVendors = yield call(getVendors, vendorChecksum);
                    if(responseVendors.data){
                        vendors = responseVendors.data;
                        vendorsCache = yield call(storeVendor, vendors);
                    }
                }catch(err){}

                  /**
                 * Get warehouse from WMS
                 */
                let wmsWarehouse = [];
                try{
                    wmsWarehouse = JSON.parse(localStorage.getItem(localStorageKey.wmsWarehouse));
                    if(!wmsWarehouse){
                        const resWmsWarehouse = yield call(getWMSCommonWarehouses);
                        if(resWmsWarehouse.records){
                            wmsWarehouse = resWmsWarehouse.records;
                            wmsWarehouse = wmsWarehouse.reduce((init, item)=>{
                                return {...init, [item.mapping_id]:  item}
                            },{})
                            localStorage.setItem(localStorageKey.wmsWarehouse, JSON.stringify(wmsWarehouse))
                        }
                    }
                    cacheStocks = cacheStocks.map(cacheStock=>{
                        return {...cacheStock, warehouse_id: +wmsWarehouse[cacheStock.stock_id]?.warehouse_id}
                    })
                }catch(err){}

                /**
                 * Get Base data
                 */
                let baseDataAppend = {}
                baseDataAppend.stocks = cacheStocks;
                baseDataAppend.shopStocks = cacheShopStocks;
                baseDataAppend.pickup_location_groups=pickupLocationGroups;
                baseDataAppend.pickupLocationGroupsMap=pickupLocationGroupsMap;
                baseDataAppend.brands = brands ?? [];
                baseDataAppend.vendors = vendorsCache ? vendorsCache.data : [];
                baseDataAppend.wmsWarehouse = wmsWarehouse ?? {};

                const checksum = localStorage.getItem(keyStorageChecksum);
                const responseBaseData = yield call(getData, { checksum });
                
                if (responseBaseData.status && responseBaseData.data) {
                    let baseData = responseBaseData.data;
                    let baseDataCache = yield call(storeBasedata, baseData);
                    baseDataCache = {...baseDataCache, ...baseDataAppend}
                    
                    yield put({ type: BASE.success, ...baseDataCache });
                } else {
                    yield put({ type: BASE.append,  ...baseDataAppend});
                }

                /**
                 * Get Common config data
                 */
                try{
                    const responseCommonConfigData=yield call(getCommonConfigApi);
                    if(responseCommonConfigData.status && responseCommonConfigData.data){
                        yield put({type: COMMON_CONFIG.success, ...responseCommonConfigData.data })
                    }
                }catch(err){}

                yield put({ type: AUTH.verify.success, profile, permission, staff_info, stores, stores_writable, stores_read_only });

            } else {
                yield put({ type: AUTH.verify.error, error: response });
            }
        } else {
            yield put({ type: AUTH.verify.error });
        }
    } catch (error) {
        yield put({ type: AUTH.verify.error, error });
    }
}

/**
 * Login action
 */
function* login(action) {
    try {
        const { data } = action;
        const response = yield call(loginApi, data);
        if (response.status) {
            const { data: { user_id, token } } = response;
            localStorage.setItem('client_hasaki_inside_token', token);
            yield all([
                put({ type: AUTH.login.success, user_id, token }),
            ])
        } else {
            yield put({ type: AUTH.login.error, error: response })
        }
    } catch (error) {
        yield all([
            put({ type: AUTH.login.error, error })
        ])
    }
}

function* watcher() {
    yield all([
        takeLatest(AUTH.verify.request, verifySaga),
        takeLatest(AUTH.login.success, verifySaga),
        takeLatest(AUTH.login.request, login)
    ])
}

/**
 * Store base data to AsyncStorage with unique checksum
 * 
 * @param {object} data
 *
 * @return object
 */
function storeBasedata(data = {}) {
	let baseData = {};
	let baseDataCache = localStorage.getItem('base-data');
	try {
		if (data && data.checksum && data.checksum == true && baseDataCache) {
			baseData = JSON.parse(baseDataCache);
		} else {
			baseData = data;
            localStorage.setItem(keyStorageChecksum, String(baseData.checksum));
			localStorage.setItem('base-data', JSON.stringify(baseData));
		}
	} catch (error) {
		console.log('AsyncStorage error during data store:', error);
	}

	return baseData;
}

function storeVendor(data = {}) {
	let vendor = {};
	let vendorCache = localStorage.getItem('vendors');
	try {
		if (data && data.checksum && data.checksum === true && vendorCache) {
			vendor = JSON.parse(vendorCache);
		} else {
			vendor = data;
            localStorage.setItem('vendor-checksum', String(vendor.checksum));
			localStorage.setItem('vendors', JSON.stringify(vendor));
		}
	} catch (error) {
		console.log('AsyncStorage error during data store:', error);
	}

	return vendor;
}

export default function* () {
    yield all([
        watcher()
    ])
}