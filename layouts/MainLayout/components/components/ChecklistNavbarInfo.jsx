import React from "react";
import { EyeFilled } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useSelector } from "react-redux";
import { useReportSceneFilterContext } from "~/scenes/Report/contexts/ReportSceneFilterContext";
import formatNumber from "~/utils/money";
import BaseRangeDatePicker from "~/components/Base/BaseRangeDatePicker";

const ChecklistNavbarInfo = () => {
  const { isLoading } = useReportSceneFilterContext();

  const navbarInfo = useSelector((state) => state.shared.navbarInfo);

  return (
    <div className="ml-2 w-100">
      <div style={{width: 'max-content'}}>
        <BaseRangeDatePicker disabled={isLoading} size="small" name={"date"} allowClear={false} />
      </div>
      <div>
        {navbarInfo && navbarInfo.data && (
          <span className="font-weight-bold">
            <span>
              <span style={{ color: "#000" }}>{`Total SKU Diff = `}</span>
              <span className="text-danger">{`${formatNumber(
                navbarInfo?.data?.total_sku_diff
              )}`}</span>
            </span>
            ;
            <span className="ml-2">
              <span style={{ color: "#000" }}>{`Total Qty Diff = `}</span>
              <span className="text-danger">{`${formatNumber(
                navbarInfo?.data?.total_qty_diff
              )}`}</span>
            </span>
            ;
            <span className="ml-2">
              <span style={{ color: "#000" }}>{`Total Amount Loss = `}</span>
              <span className="text-danger">
                {`${formatNumber(
                  Math.round(+navbarInfo?.data?.total_amount_negative ?? 0)
                )}`}{" "}
                VNĐ
              </span>
            </span>
            <Tooltip
              trigger={["click"]}
              title={
                <>
                  <div>Diff dương: {navbarInfo?.data?.positive_diff}</div>
                  <div>Diff âm: -{navbarInfo?.data?.negative_diff}</div>
                </>
              }
            >
              <EyeFilled
                style={{
                  color: "green",
                  fontSize: "14px",
                  cursor: "pointer",
                  marginLeft: "5px",
                }}
              />
            </Tooltip>
          </span>
        )}
      </div>
    </div>
  );
};

export default ChecklistNavbarInfo;
