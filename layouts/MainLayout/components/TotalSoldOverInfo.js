import { Col, Row } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getTotalChart } from "~/apis/operation/stock-control/sku";
import BaseChart from "~/components/Base/BaseChart";
import BaseDropdown from "~/components/Base/BaseDropdown";
import BaseModal from "~/components/Base/BaseModal";
import formatNumber from "~/utils/money";

const defaultOptions = [
  {
    value: "total_amount",
    title: "Total Amount",
  },
  {
    value: "total_count",
    title: "Total Quantity",
  },
  {
    value: "total_sku",
    title: "Total SKU",
  },
];

const chartYAxisKeys = {
  total_amount: {
    key: "total_amount",
    color: "#2641ac",
    name: "Total Amount (VNĐ)",
  },
  total_count: {
    key: "total_count",
    color: "#2641ac",
    name: "Total Quantity",
  },
  total_sku: {
    key: "total_sku",
    color: "#2641ac",
    name: "Total SKU",
  },
};

const TotalSoldOverInfo = ({ handleClose }) => {
  const [derivedData, setDerivedData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(defaultOptions[0].value);

  useEffect(() => {
    (async () => {
      try {
        const currentDateStr = moment().format("YYYY-MM-DD");
        const aWeekAgoDateStr = moment().subtract(7, "d").format("YYYY-MM-DD");

        const res = await getTotalChart({
          begin_date: aWeekAgoDateStr,
          end_date: currentDateStr,
        });
        if (res.data) {
          setDerivedData(
            Object.entries(res.data).map(([key, val]) => {
              return {
                ...val,
                time: key,
                timeStr: moment.unix(+key).format("DD-MM-YYYY"),
                total_count: +val.total_count,
              };
            })
          );
        } else {
          throw new Error("");
        }
      } catch (err) {}
    })();
  }, []);

  const filtersNode = (
    <Row gutter={3} className={`text-right`}>
      <Col xs={24}>
        <BaseDropdown
          allowClear={false}
          value={selectedOption}
          defaultOptions={defaultOptions}
          onChange={(val) => {
            setSelectedOption(val);
          }}
        />
      </Col>
    </Row>
  );

  return (
    <BaseModal
      width="80%"
      isOpen={true}
      subTitle={filtersNode}
      title={
        <div style={{ fontSize: "18px" }} className="w-100">
          <div style={{ color: "red" }}>{`Chart Total SKU Sold > 2th`}</div>
          {/* <div
                style={{ color: "blue" }}
              >{`${data.sku} - ${data.name}`}</div> */}
        </div>
      }
      handleClose={handleClose}
      titleWidth={18}
    >
      <Row className="mt-3">
        <Col xs={24}>
          <BaseChart.Line
            height={500}
            yAxisTickCount={10}
            data={derivedData}
            xAxisKey={"timeStr"}
            xAxisDisplayName={""}
            yAxisDisplayName={chartYAxisKeys[selectedOption].name}
            yAxisKeys={[chartYAxisKeys[selectedOption]]}
            isLegendVisible={true}
            margin={{ top: 40, right: 30, left: 70, bottom: 20 }}
            toolTipContentRender={({ payload, label }) => {
              return (
                <>
                  <div className="font-weight-bold">{label}</div>
                  {payload.map((payload_item) => (
                    <>
                      <div>
                        <span style={{ color: "black" }}>
                          {"Total Amount"}:{" "}
                        </span>
                        <span style={{ color: "red" }}>
                          {formatNumber(payload_item.payload.total_amount)} VNĐ
                        </span>
                      </div>
                      <div>
                        <span style={{ color: "black" }}>
                          {"Total Quantity"}:{" "}
                        </span>
                        <span style={{ color: "red" }}>
                          {formatNumber(payload_item.payload.total_count)}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: "black" }}>{"Total SKU"}: </span>
                        <span style={{ color: "red" }}>
                          {formatNumber(payload_item.payload.total_sku)}
                        </span>
                      </div>
                    </>
                  ))}
                </>
              );
            }}
          />
        </Col>
      </Row>
    </BaseModal>
  );
};

export default TotalSoldOverInfo;
