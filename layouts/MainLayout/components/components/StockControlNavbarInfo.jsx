import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFetchTime } from "~/apis/operation/stock-control/sku";
import moment from "moment";
import formatNumber from "~/utils/money";
import { AreaChartOutlined } from "@ant-design/icons";
import TotalSoldOverInfo from "../TotalSoldOverInfo";
import { formatStrNumber } from "~/services/helper";
import { Tooltip } from "antd";
import {STOCK_CONTROL_DOCS} from "~/scenes/Report/scenes/StockControlBySku/StockControlBySku.config";

const StockControlNavbarInfo = ({ isShowActiveSku }) => {
  const navbarInfo = useSelector((state) => state.shared.navbarInfo);
  const totalActiveSku = useSelector((state) => state.shared.totalActiveSku);

  const [isChartOpen, setIsChartOpen] = useState(false);
  const [fetchTime, setFetchTime] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getFetchTime();
      if (res && res.data) {
        try {
          setFetchTime(moment.unix(+res.data).format("DD/MM/YYYY HH:mm:ss"));
        } catch {}
      }
    })();
  }, []);

  return (
    <div className="ml-2 w-100">
      <div
        className="d-flex justify-content-between w-100"
        style={{ transform: "translateY(3px)" }}
      >
        <span>
          <Tooltip title={STOCK_CONTROL_DOCS.DATA_TIME}>
            <span style={{ fontSize: "13px" }}>Datatime: {fetchTime}</span>
          </Tooltip>
        </span>
      </div>
      {isShowActiveSku && (
        <div>
          <span style={{ fontWeight: "bold" }}>
          <Tooltip title={STOCK_CONTROL_DOCS.TOTAL_SKU_ACTIVE}>
            <span style={{ color: "#000" }}>{`Total SKU Active: `}</span>
            <span className="text-danger">
              {`${formatNumber(totalActiveSku)}`}
            </span>
          </Tooltip>
          </span>
        </div>
      )}
      <div style={{ transform: "translateY(-1px)" }}>
        {navbarInfo && navbarInfo.data && (
          <AreaChartOutlined
            onClick={() => {
              setIsChartOpen(true);
            }}
            style={{ cursor: "pointer", color: "#1C8D73" }}
            className="mr-2"
          />
        )}
        {isChartOpen && (
          <TotalSoldOverInfo
            handleClose={() => {
              setIsChartOpen(false);
            }}
          />
        )}
        {navbarInfo && navbarInfo?.data && (
          <span className="font-weight-bold">
            <span>
              <span style={{ color: "#000" }}>{`Sold > 2th: `}</span>
            </span>
            <span>
              <Tooltip title={STOCK_CONTROL_DOCS.TOTAL_SKU}>
                <span style={{ color: "#000" }}>{`Total SKU * STOCK = `}</span>
                <span className="text-danger">{`${formatNumber(
                  navbarInfo.data?.total_total_sku_count
                )}`}</span>
              </Tooltip>
            </span>
            ;
            <span className="ml-2">
            <Tooltip title={STOCK_CONTROL_DOCS.TOTAL_QUANTITY_SOLD}>
              <span
                style={{ color: "#000" }}
              >{`Total Quantity - Sold = `}</span>
              <span className="text-danger">{`${formatNumber(
                navbarInfo.data?.total_total_count
              )}`}</span>
              </Tooltip>
            </span>
            ;
            <span className="ml-2">
            <Tooltip title={STOCK_CONTROL_DOCS.TOTAL_AMOUNT_SOLD}>
              <span style={{ color: "#000" }}>{`Total Amount - Sold = `}</span>
              <span className="text-danger">
                {`${formatStrNumber(navbarInfo.data?.total_total_amount)}`} VNĐ
              </span>
              </Tooltip>
            </span>
            ;
            <span className="ml-2">
              <Tooltip title={STOCK_CONTROL_DOCS.TOTAL_AMOUNT_2_SOLD}>
              <span style={{ color: "#000" }}>{`Total Amount - 2Sold = `}</span>
              <span className="text-danger">
                {`${formatStrNumber(
                  navbarInfo.data?.total_total_amount_minus_2 ?? 0
                )}`}{" "}
                VNĐ
              </span>
              </Tooltip>
            </span>
          </span>
        )}
      </div>
    </div>
  );
};

export default StockControlNavbarInfo;
