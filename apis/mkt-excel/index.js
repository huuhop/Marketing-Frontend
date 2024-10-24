import axios from "~/utils/request-mkt";

const prefix = `/excel`;

export const getExcelHistorysApi = ({
  userId,
  excelPage,
}) => {
  return axios({
    method: "POST",
    url: `${prefix}/get-excel-historys`,
    data: {
      excelPage,
      userId,
    },
  });
};

export const requestExportExcelApi = ({
  staffCode,
  fileName,
  filters,
  rowPerFile = 3000,
  excelPage,
}) => {
  return axios({
    method: "POST",
    url: `${prefix}/request-export-excel`,
    data: {
      perPage: rowPerFile,
      userId: staffCode,
      nameUserFile: fileName,
      excelPage,
      filters,
    },
  });
};

export const checkExportExcelProgressApi = ({ fileKey }) => {
  return axios({
    method: "POST",
    url: `${prefix}/check-export-excel-progress`,
    data: {
      fileKey,
    },
  });
};
