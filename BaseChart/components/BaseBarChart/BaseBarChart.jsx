import { Col, Row } from "antd";
import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import formatNumber from "~/utils/money";

const BaseBarChart = ({
  children,
  data = [],
  height,
  margin = { top: 25, right: 30, left: 0, bottom: 20 },
  xAxisKey = "key",
  isLegendVisible,
  yAxisKeys = [{ key: "key", color: undefined, name: undefined }],
  isShowTooltip,
  toolTipContentRender,
  xAxisDisplayName,
  tickFormatter = (number) => {},
  customLabel,
}) => {
  return (
    <Row>
      <Col xs={24}>
        <ResponsiveContainer width={"100%"} height={height}>
          <BarChart margin={margin} data={data}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey={xAxisKey} />
            <YAxis tickFormatter={tickFormatter} />
            {isShowTooltip && (
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    let renderContent = <></>;

                    if (typeof toolTipContentRender === "function") {
                      renderContent = (
                        <>{toolTipContentRender({ payload, label })}</>
                      );
                    } else {
                      renderContent = (
                        <>
                          <div>
                            {xAxisDisplayName} {label}
                          </div>
                          {payload.map((payload_item) => (
                            <div style={{ color: payload_item.stroke }} key={payload_item.dataKey}>
                              {payload_item.name}:{" "}
                              {formatNumber(payload_item.value)}
                            </div>
                          ))}
                        </>
                      );
                    }

                    return (
                      <div
                        style={{
                          backgroundColor: "white",
                          boxShadow: "1px 1px 5px 0 rgb(0 0 0 / 32%)",
                          padding: "10px",
                        }}
                      >
                        {renderContent}
                      </div>
                    );
                  }

                  return <></>;
                }}
              />
            )}
            {/* <Legend /> */}
            {isLegendVisible && (
              <Legend
                formatter={(value, entry, index) => {
                  return value;
                }}
              />
            )}
            {yAxisKeys.map((yAxisKey) => (
              <Bar
                key={yAxisKey.key}
                dataKey={yAxisKey.key}
                name={yAxisKey.name}
                fill={yAxisKey.color}
                label={{
                  formatter: (value, entry, index) => {
                    return formatNumber(+value);
                  },
                  position: "top",
                  fill: yAxisKey.color,
                }}
              >
                {/* <LabelList position={"top"} style={{ fill: yAxisKey.color }} /> */}
              </Bar>
            ))}
            {children}
          </BarChart>
        </ResponsiveContainer>
      </Col>
    </Row>
  );
};

export default BaseBarChart;
