import { takeLatest, call, put, all } from 'redux-saga/effects'
import { BASE } from '~/redux/actions/base';
import { getData } from '~/apis/setting/base';

function* getBaseData() {
    try {
        const response = yield call(getData)
        if (response.status && response.data) {
            console.log('ecece',response.data)
            let { data: { locations, departments, divisions, majors, positions, pendingSkills, cities, users } } = response;

            yield put({ type: BASE.success, locations, departments, divisions, majors, positions, pendingSkills, cities, users });
        } else {
            yield put({ type: BASE.error, error: response });
        }

    } catch (error) {
        yield put({ type: BASE.error, error });
    }
}
function* watcher() {
    yield all([
        takeLatest(BASE.request, getBaseData),
    ])
}
export default function* () {
    yield all([
        watcher(),
    ])
}