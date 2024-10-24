import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import formatNumber from "~/utils/money";
import { AreaChartOutlined } from "@ant-design/icons";
import TotalSoldOverInfo from "../TotalSoldOverInfo";
import { formatStrNumber } from "~/services/helper";

const StockControlFirstImportNavbarInfo = () => {
  const navbarInfo = useSelector((state) => state.shared.navbarInfo);

  return (
    <div className="ml-2 w-100">
      <div
        className="d-flex justify-content-between w-100"
        style={{ transform: "translateY(3px)" }}
      >
        <span>
          <span style={{ fontSize: "13px" }}>Data time:  {navbarInfo.data?.date_time}</span>
        </span>
      </div>

      <div
        className="d-flex justify-content-between w-100"
        style={{ transform: "translateY(3px)" }}
      >
        <span>
          <span style={{ fontSize: "13px" }}>Data sold:  {navbarInfo.data?.date_sold}</span>
        </span>
      </div>
 
       
      <div style={{ transform: "translateY(-1px)" }}>
        {navbarInfo && navbarInfo?.data && (
          <span className="font-weight-bold">
            <span>
              <span style={{ color: "#000" }}>{`New Import < 30 Days: `}</span>
            </span>
            <span>
              <span style={{ color: "#000" }}>{`Total SKU New Import = `}</span>
              <span className="text-danger">{`${formatNumber(
                navbarInfo.data?.total_sku
              )}`}</span>
            </span>
            ;
  
            <span className="ml-2">
              <span
                style={{ color: "#000" }}
              >{`Total Amount New Import = `}</span>
               <span className="text-danger">
                {`${formatNumber(navbarInfo.data?.total_amount ?? 0)}`} VNĐ
              </span>
            </span>
            ;
          </span>
        )}
      </div>
    </div>
  );
};

export default StockControlFirstImportNavbarInfo;
