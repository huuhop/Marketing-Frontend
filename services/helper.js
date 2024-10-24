import moment from 'moment';
import { notification, message, Modal } from 'antd';
import store from '~/redux/store';
import history from '~/redux/history';
import queryString from 'query-string';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Workbook } from 'exceljs';

/**
 * Helper redirect to route
 * @param {string} url 
 */
export function redirect(url = '/') {
    history.push(url);
    return;
}

/**
 * Replace history
 * @param {Object} params 
 */
export function historyReplace(params = {}) {
    history.replace(window.location.pathname + '?' + queryString.stringify(params));
    return;
}

/**
 * Get history params
 * @param {Object} 
 */
export function historyParams() {
    return queryString.parse(window.location.search);
}

/**
 * @param {String} content 
 * @param {String} type 
 * 
 * @return void
 */
export function showMessage(content, type = 'success', cb = null) {
    const configs = {
        content,
        top: 200,
        duration: 2,
        maxCount: 3,
        rtl: true,
        onClose: () => typeof cb == 'function' ? cb() : null
    };

    if (typeof message[type] == 'function') {
        return message[type](configs);
    } else {
        return message.open(configs);
    }
}

/**
 * Show alert
 * @param {String} message 
 * @param {String} type 
 */
// export function showAlert(message, type = 'success') {
//     store.dispatch({
//         type: 'SHOW_ALERT',
//         alert: {
//             message, type,
//             show: true
//         }
//     })
// }

/**
 * Show notify
 * @param {String} message 
 * @param {String} description 
 * @param {String} type 
 * @param {Integer} duration 
 */
export function showNotify(message, description, type = 'success', duration = 5, cb = null) {
    const configs = {
        message,
        description,
        duration,
        className: `ant-alert-${type}`,
        onClose: () => typeof cb == 'function' ? cb() : null
    };
    if (typeof notification[type] == 'function') {
        return notification[type](configs);;
    } else {
        return notification.open(configs);
    }
}

/**
 * Format bitwise value to array
 * @param {Object} listData 
 * @param {Integer} bitwise 
 * 
 * @return array
 */
export function parseBitwiseValues(listData = {}, bitwise = 0) {
    let values = [];

    if (!bitwise) {
        return values;
    }
    Object.keys(listData).map((key) => {
        if (bitwise & key) {
            values.push((bitwise & key).toString());
        }
    });

    return values;
}

/**
 * Convert baseData to single Obj
 * @param {*} datas 
 */
export function convertToSingleObject(datas) {
    let singleObj = {};
    if (Array.isArray(datas) && datas.length) {
        datas.map((data, index) => {
            singleObj[data.id] = data.name;
        });
    } else {
        if (typeof datas == 'object' && datas != null) {
            Object.keys(datas).map((id) => {
                if (typeof datas[id] == 'object') {
                    singleObj[datas[id].id] = datas[id].name;
                }
                else {
                    singleObj[id] = datas[id];
                }
            });
        }
    }
    return singleObj;
}

/**
 * Convert object to formdata
 * @param {Object} datas 
 */
export function convertToFormData(object) {
    return Object.keys(object).reduce((formData, key) => {
        formData.append(key, object[key]);
        return formData;
    }, new FormData());
};

/**
 * 
 * @param {*} phoneNumber 
 */
export function validateEmail(email) {
    if (!email) {
        return;
    }
    let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
}

/**
 * 
 * @param {*} phoneNumber 
 */
export function validateVNPhone(phoneNumber) {
    if (!phoneNumber) {
        return;
    }
    let phoneReg = /^0(1\d{9}|9\d{8})$/;
    return phoneReg.test(phoneNumber);
}
/**
 * 
 * @param {*} number 
 */
export function formatNumber(number) {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export function formatStrNumber(str_number) {
    return str_number?str_number.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'):str_number;
}

/**
 * 
 * @param {*} dateTime 
 * @param {*} format 
 */
export function timeFormatStandard(dateTime, format = 'YYYY-MM-DD HH:mm:ss', isUnix = false) {
    if (isUnix && dateTime == null) {
        return 'N/A'
    }
    let instance = isUnix ? moment.unix(dateTime) : moment(dateTime)
    return instance.format(format);
}

/**
 * Format time start of day
 * 
 * @param {string|null} dateTime 
 * @param {boolean} isUnix 
 */
export function timeStartOfDay(dateTime = null, isUnix = false) {
    let instance = dateTime ? moment(dateTime).startOf('day') : moment().startOf('day');
    return isUnix ? instance.format('X') : instance.format('YYYY-MM-DD HH:mm:ss');
}

/**
 * Format time end of day
 * 
 * @param {string|null} dateTime 
 * @param {boolean} isUnix 
 */
export function timeEndOfDay(dateTime = null, isUnix = false) {
    let instance = dateTime ? moment(dateTime).endOf('day') : moment().endOf('day');
    return isUnix ? instance.format('X') : instance.format('YYYY-MM-DD HH:mm:ss');
}

/**
 * 
 * @param {*} dateTime 
 */
export function timeFormatWeekDay(dateTime) {
    let weekDay = moment(dateTime).format("dddd");
    let convert = {
        Monday: 'Thứ 2',
        Tuesday: 'Thứ 3',
        Wednesday: 'Thứ 4',
        Thursday: 'Thứ 5',
        Friday: 'Thứ 6',
        Saturday: 'Thứ 7',
        Sunday: 'Chủ nhật',
    };
    return weekDay ? convert[weekDay] : '';
}

/**
 * @format FlatList render 
 */
export function formatFlatListData(data, numColumns) {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
        data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
        numberOfElementsLastRow++;
    }

    return data;
};

/**
 * Parse unix to string format
 * @param {Integer} unixTime 
 * @param {String} format 
 */
export function parseIntegertoTime(unixTime, format = 'YYYY-MM-DD HH:mm:ss') {
    if (unixTime.toString().length != 13)
        return moment(unixTime * 1000).format(format);
    return moment(unixTime).format(format);
}

/**
 * Clean object - filter null, empty, undefined
 * @param {*} obj 
 */
export function cleanObject(obj) {
    if (!obj) {
        return obj
    }
    let data = { ...obj }
    for (var propName in data) {
        if (data[propName] === null || data[propName] === undefined) {
            delete data[propName];
        }
    }
    return JSON.stringify(data) === '{}' ? null : data
}

/**
 * check value == 0 -> return null for dropdown
 * @param {*} value 
 */
export function checkValueToDropdown(value) {
    return value == 0 ? null : value
}

export function trimString(string, length) {
    return string.length > length ? string.substring(0, length) + '...' : string;
}

export function autofitColumnXLS(header, value = 5) {
    let wscols = [];

    for (var i = 0; i < header.length; i++) {  // columns length added
        wscols.push({ wch: header[i].length + value })
    }

    return wscols;
}

export function exportToXLS(fileName, datas, autofit = null, merges = null) {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    let xlsData = datas;
    let worksheet = XLSX.utils.aoa_to_sheet(xlsData, { skipHeader: true });
    worksheet["!cols"] = typeof autofit ? autofit : null;
    worksheet["!merges"] = typeof merges ? merges : null;

    let workbook = { Sheets: { 'List': worksheet }, SheetNames: ['List'] };

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Force download
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, fileName + fileExtension);

    return true;
}

export function exportToXLSMultipleSheet(fileName, datas) {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    if (typeof datas == 'object') {
        let sheets = [];
        let sheetNames = [];
        Object.keys(datas).map(nameSheet => {
            let xlsData = typeof datas[nameSheet]['datas'] != 'undefined' ? datas[nameSheet]['datas'] : []
            let worksheet = XLSX.utils.aoa_to_sheet(xlsData, { skipHeader: true });
            if (typeof datas[nameSheet]['autofit'] != 'undefined') {
                worksheet["!cols"] = datas[nameSheet]['autofit'];
            }
            if (typeof datas[nameSheet]['merges'] != 'undefined') {
                worksheet["!merges"] = datas[nameSheet]['merges'];
            }

            sheets[nameSheet] = worksheet;
            sheetNames.push(nameSheet);
        })

        let workbook = { Sheets: sheets, SheetNames: sheetNames };
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        // Force download
        const data = new Blob([excelBuffer], { type: fileType });
        saveAs(data, fileName + fileExtension);
    }

    return true;
}


/**
 * Export data with style 
 * datas = [['ab','bc','de'],['ab','bc','de']]
 * merges = [[1,1,2,2],[1,2,2,3]]
 * images = [{path: i, tl: { col: countImage, row: indexStep + 1 }, br: { col: countImage + 1, row: indexStep + 2 }, rowHeight: 50}]
 * styles = {{row: {row_index: { width: 70, height: 30, font: {bold: true}, fill: {type: 'pattern'}}}, {col: {col_index: { width: 70, height: 30, font: {bold: true}, fill: {type: 'pattern'}}}}
 */
export function exportXlsWithStyle(fileName, datas = [], merges = [], images = [], styles = []) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Main sheet');

    // Add rows
    worksheet.addRows(datas);

    // Add merges
    if (merges) {
        merges.map(m => worksheet.mergeCells(m))
    }

    // Add images
    if (images) {
        images.map(image => {
            if (image.length) {
                image.map(i => {
                    worksheet.addImage(workbook.addImage({
                        base64: i.path,
                        extension: 'png',
                    }), {
                        tl: i.tl,
                        br: i.br
                    });

                    worksheet.getRow(i.rowHeight).height = 90;
                })
            }
        })
    }

    if (styles) {
        if (typeof styles.row != 'undefined') {
            Object.keys(styles.row).map(rowIndex => {
                Object.keys(styles.row[rowIndex]).map(key => {
                    worksheet.getRow(rowIndex)[key] = styles.row[rowIndex][key];
                })
            })
        }

        if (typeof styles.col != 'undefined') {
            Object.keys(styles.col).map(colIndex => {
                Object.keys(styles.col[colIndex]).map(key => {
                    worksheet.getColumn(Number(colIndex))[key] = styles.col[colIndex][key];
                })
            })
        }

        if (typeof styles.cell != 'undefined') {
            Object.keys(styles.cell).map(cellIndex => {
                Object.keys(styles.cell[cellIndex]).map(key => {
                    worksheet.getCell(cellIndex)[key] = styles.cell[cellIndex][key];
                })
            })
        }
    }

    workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), fileName + `-${moment().format('YYYY-MM-DD')}.xlsx`);
    });
}
export function checkManager(positionId = 0) {
    // Director: 1 
    // Manager: 8
    // Assitant Manager: 10
    // Supervisor: 11
    // Assistant Supervisor: 12
    // Leader: 5
    return [1, 8, 10, 11, 12, 5].indexOf(positionId) > -1 ? true : false
}

export function checkSupervisorHigher(positionId = 0) {
    // Director: 1 
    // Manager: 8
    // Assitant Manager: 10
    // Supervisor: 11
    return [1, 8, 10, 11].indexOf(positionId) > -1 ? true : false
}

export function checkAssistantManagerHigher(positionId = 0) {
    // Director: 1 
    // Manager: 8
    // Assitant Manager: 10
    return [1, 8, 10].indexOf(positionId) > -1 ? true : false
}

export function checkPermissionCommentTraningExam(positionId = 0) {
    // Leader: 5
    // Manager: 8
    // Sub Leader: 7
    // Director: 1 
    // Supervisor: 11
    // Assitant Manager: 10
    // Specialist: 13
    // Assistant Supervisor: 12
    return [5, 8, 7, 1, 11, 10, 13, 12].indexOf(positionId) > -1 ? true : false
}

export function checkISO(majorId = 0) {
    return majorId == 64
}

/**
* get first character of word first and last
*/
export function getFirstCharacter(str) {
    let result = '';
    if (str) {
        const arrWord = str.split(' ');
        if (arrWord.length == 1) {
            result = arrWord[0].substr(0, 1);
        } else {
            result = arrWord[0].substr(0, 1) + arrWord[arrWord.length - 1].substr(0, 1);
        }
    }

    return result ? result.toUpperCase() : '';
}

export function formatVND(money = 0, currency = 'VND') {
    return money.toLocaleString('vi-VN') + ' ' + currency;
}

export function isURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
}
/**
 * Detect media type from string
 * @param {string} uri
 * @returns
 */
 export function returnMediaType(uri = "") {
    let types = {
      1: /.(jpg|jpeg|png|gif)$/i,
      2: /.(xls|xlsx|csv|zip|txt|pdf|doc|docx|ppt|pptx)$/i,
      3: /.(mp4|wma|wmv|mov|mp3)$/i,
    };
    let type = "";
    for (let [key, reg] of Object.entries(types)) {
      let result = reg.test(uri);
      if (result) {
        type = key;
        break;
      }
    }
    return type;
  }
export default {
    // showAlert,
    showNotify,
    convertToSingleObject,
    convertToFormData,
    parseBitwiseValues,
    showMessage,
    validateEmail,
    validateVNPhone,
    formatNumber,
    timeFormatStandard,
    timeStartOfDay,
    timeEndOfDay,
    timeFormatWeekDay,
    formatFlatListData,
    parseIntegertoTime,
    cleanObject,
    checkValueToDropdown,
    exportToXLS
}