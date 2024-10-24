
export const OPERATION_API = process.env.REACT_APP_ENV === 'production' ? 'https://wsoperation.inshasaki.com/api'
    : (process.env.REACT_APP_ENV === 'test' ? 'https://qc-wsoperation.inshasaki.com/api' : 'http://localhost:8888/api/')
export const OPERATION_MEDIA_URL = process.env.REACT_APP_ENV === 'production' ? 'https://wsoperation.inshasaki.com/'
    : (process.env.REACT_APP_ENV === 'test' ? 'https://qc-wsoperation.inshasaki.com/production/operation' : 'http://ws.hasaki.local:8080/development/operation')
export const OPERATION_MKT_API = process.env.REACT_APP_ENV === 'production' ? 'https://mkt-wsoperation.inshasaki.com/'
    : (process.env.REACT_APP_ENV === 'test' ? 'https://qcmkt-wsoperation.inshasaki.com/' : 'http://localhost:8080/')