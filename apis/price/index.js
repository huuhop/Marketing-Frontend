import axios from "~/utils/request-mkt";

const prefix = `/price`;

export const getPriceEcommerePlatformsApi = ({
  page = 1,
  pageNumber = 50,
  skus,
  skuName,
  sort,
  isBestSeller,
  isProblem,
  brand,
  productType
}) => {
  return axios({
    method: "GET",
    url: `${prefix}/get-price-info`,
    params: {
      pageNumber,
      page,
      skus: JSON.stringify(skus),
      skuName,
      sort: JSON.stringify(sort),
      isBestSeller,
      isProblem,
      brand: JSON.stringify(brand),
      productType: JSON.stringify(productType),
    },
  });
};

export const requestDownloadCheckPriceExcelApi = ({
  staffCode,
  fileName,
  filters,
  rowPerFile,
  excelPage = "check-price"
}) => {
  return axios({
    method: "POST",
    url: `${prefix}/export-check-price`,
    data: {
      userId: staffCode,
      nameUserFile: fileName,
      perPage: rowPerFile ? `${rowPerFile}` : "1000000",
      filter: filters.filter,
      excelPage
    },
  });
};

export const downloadCheckPriceDataExcelHistoryApi = ({ userId, excelPage = "check-price" }) => {
  return axios({
    method: "POST",
    url: `/download-excel-history`,
    data: {
      userId,
      excelPage
    },
  });
};

export const checkFileProgressPriceDataApi = ({ fileKey }) => {
  return axios({
    method: "POST",
    url: `/download-excel`,
    data: {
      fileKey,
    },
  });
};
