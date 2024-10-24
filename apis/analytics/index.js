import axios from "~/utils/request-mkt";

const prefix = `/analytics`;

export const getAnalyticAgg = ({
  startDateFirst,
  endDateFirst,
  startDateSecond,
  endDateSecond,
  type,
  isCompare,
  sources,
  search,
  page = 1,
  pageNumber = 50,
  order,
  terms,
  filter,
  isBestSeller,
  isSkuAvailable,
  isProductNew,
  exactSearch,
}) => {
  return axios({
    method: "GET",
    url: `${prefix}/run-aggregation`,
    params: {
      startDateFirst,
      endDateFirst,
      startDateSecond,
      endDateSecond,
      type,
      isCompare,
      sources,
      search,
      page,
      pageNumber,
      order,
      terms,
      filter,
      isBestSeller,
      isSkuAvailable,
      isProductNew,
      exactSearch,
    },
  });
};

export const exportAnalyticAgg = ({
  startDateFirst,
  endDateFirst,
  startDateSecond,
  endDateSecond,
  type,
  limit = 10,
  offset = "null",
  isCompare,
  sources,
  search,
  sort,
  after,
  page,
  filter,
  cancelTokenSource,
}) => {
  return axios({
    method: "GET",
    url: `${prefix}/export-data-excel`,
    params: {
      startDateFirst,
      endDateFirst,
      startDateSecond,
      endDateSecond,
      type,
      limit,
      offset,
      isCompare,
      sources: JSON.stringify(sources),
      search,
      sort,
      after,
      page,
      filter,
    },
    cancelTokenSource,
  });
};

export const getAnalyticDetailSku = ({ sku }) => {
  return axios({
    method: "GET",
    url: `${prefix}/detail-by-sku`,
    params: {
      sku,
    },
  });
};

export const getAnalyticFluctuationSkuApi = ({
  sku,
  startDate,
  endDate,
  dateType,
  terms,
}) => {
  return axios({
    method: "GET",
    url: `${prefix}/get-price-fluctuation-sku`,
    params: {
      sku,
      startDate,
      endDate,
      dateType,
      terms: JSON.stringify(terms),
    },
  });
};

export const getSkuDataByType = ({
  type,
  startDateFirst,
  endDateFirst,
  search,
  size,
  page,
  sort,
}) => {
  return axios({
    method: "GET",
    url: `${prefix}/get-sku`,
    params: {
      type,
      startDateFirst,
      endDateFirst,
      search,
      size,
      page,
      sort,
    },
  });
};

export const exportOrderDetail = ({
  startDate,
  endDate,
  filter,
  search_after = null,
  cancelTokenSource,
  excelPage = "master-data"
}) => {
  return axios({
    method: "POST",
    url: `${prefix}/export-order-detail`,
    data: {
      search_after,
      startDate,
      endDate,
      filter,
      perPage: "1000",
      excelPage
    },
    cancelTokenSource,
  });
};

export const getOrderDetail = ({
  startDate,
  endDate,
  filter,
  search_after = null,
  perPage = 50,
  order,
}) => {
  return axios({
    method: "POST",
    url: `${prefix}/get-order-detail`,
    data: {
      startDate,
      endDate,
      perPage: `${perPage}`,
      filter,
      search_after,
      order,
    },
  });
};

export const trackingSkuPerformanceApi = ({
  startDateFirst,
  endDateFirst,
  startDateSecond,
  endDateSecond,
  page,
  pageNumber,
  terms,
  filter,
  order,
}) => {
  return axios({
    method: "GET",
    url: `${prefix}/tracking-performance-sku`,
    params: {
      type: "sku",
      startDateFirst,
      endDateFirst,
      startDateSecond,
      endDateSecond,
      page,
      pageNumber,
      isCompare: "true",
      terms: JSON.stringify(terms),
      filter: JSON.stringify(filter),
      order: JSON.stringify(order),
    },
  });
};

export const trackingShoppingPerformanceApi = ({
  startDateFirst,
  endDateFirst,
  startDateSecond,
  endDateSecond,
  isCompare,
  page,
  pageNumber,
  terms,
  filter,
  order,
}) => {
  return axios({
    method: "GET",
    url: `${prefix}/tracking-cost-sku`,
    params: {
      startDateFirst,
      endDateFirst,
      startDateSecond,
      endDateSecond,
      page,
      pageNumber,
      isCompare,
      terms: JSON.stringify(terms),
      filter: JSON.stringify(filter),
      order: JSON.stringify(order),
    },
  });
};

export const trackingSkuPerformanceExportExcelApi = ({
  startDateFirst,
  endDateFirst,
  startDateSecond,
  endDateSecond,
  page,
  pageNumber,
  terms,
  filter,
  order,
}) => {
  return axios({
    method: "GET",
    url: `${prefix}/export-tracking-performance-sku-excel`,
    params: {
      type: "sku",
      startDateFirst,
      endDateFirst,
      startDateSecond,
      endDateSecond,
      page,
      pageNumber,
      isCompare: "true",
      terms: JSON.stringify(terms),
      filter: JSON.stringify(filter),
      order: JSON.stringify(order),
    },
  });
};

export const trackingSkuCampaignOrder = ({
  startDate,
  endDate,
  sku,
  campaignId
}) => {
  return axios({
    method: "GET",
    url: `${prefix}/tracking-sku-campaign-order`,
    params: {
      startDate,
      endDate,
      sku,
      campaignId,
    },
  });
};

export const downloadMasterDataExcelHistoryApi = ({ userId, excelPage = "master-data" }) => {
  return axios({
    method: "POST",
    url: `/download-excel-history`,
    data: {
      userId,
      excelPage
    },
  });
};

export const requestDownloadMasterDataExcelApi = ({
  staffCode,
  fileName,
  filters,
  rowPerFile,
}) => {
  return axios({
    method: "POST",
    url: `${prefix}/export-order-detail`,
    data: {
      userId: staffCode,
      nameUserFile: fileName,
      startDate: filters.startDate,
      endDate: filters.endDate,
      perPage: rowPerFile ? `${rowPerFile}` : "1000000",
      filter: filters.filter,
    },
  });
};

export const checkFileProgressMasterDataApi = ({ fileKey }) => {
  return axios({
    method: "POST",
    url: `/download-excel`,
    data: {
      fileKey,
    },
  });
};

export const downloadExcelMasterDataApi = ({ url, fileName }) => {
  return axios({
    method: "GET",
    url: `${prefix}/dowload-excel`,
    responseType: "blob",
    params: {
      pathFile: url,
      nameFile: fileName,
    },
  });
};
