import axios from "~/utils/request-mkt";

const prefix = `/campaign`;

export const getCampaignApi = ({
  startDateFirst,
  endDateFirst,
  page = 1,
  pageNumber = 50,
  terms,
  filter,
  order,
  sort,
}) => {
  return axios({
    method: "GET",
    url: `${prefix}/get-campaign`,
    params: {
      startDateFirst,
      endDateFirst,
      type: "campaignId",
      isCompare: "false",
      page,
      pageNumber,
      order: JSON.stringify(order),
      terms: JSON.stringify(terms),
      filter: JSON.stringify(filter),
      sort: JSON.stringify(sort),
    },
  });
};

export const getCampaignOrderDetailApi = ({
  startDate,
  endDate,
  page = 1,
  pageNumber = 50,
  campaignId,
  campaignName,
  sort,
  transactionId,
  filter
}) => {
  return axios({
    method: "GET",
    url: `${prefix}/get-campaign-detail`,
    params: {
      startDate,
      endDate,
      page,
      pageNumber,
      campaignId: `${campaignId}`,
      sort,
      transactionId,
      campaignName,
      filter: JSON.stringify(filter)
    },
  });
};

export const getCampaignOrderDetailStatusApi = ({
  startDate,
  endDate,
  campaignId,
  campaignName,
  transactionId,
}) => {
  return axios({
    method: "GET",
    url: `${prefix}/get-campaign-detail-order-status`,
    params: {
      startDate,
      endDate,
      campaignId: `${campaignId}`,
      transactionId,
      campaignName,
    },
  });
};

export const requestExportExcelCampaignOrderApi = ({
  staffCode,
  fileName,
  filters,
  rowPerFile = 3000,
  excelPage,
}) => {
  return axios({
    method: "POST",
    url: `${prefix}/request-export-excel-campaign-detail`,
    data: {
      perPage: rowPerFile,
      userId: staffCode,
      nameUserFile: fileName,
      excelPage,
      filters,
    },
  });
};
