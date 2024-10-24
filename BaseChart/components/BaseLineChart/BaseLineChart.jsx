import { Col, Row } from "antd";
import React from "react";
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  LineChart,
  Line,
  Brush,
} from "recharts";
import formatNumber from "~/utils/money";

const BaseLineChart = ({
  data,
  isShowTooltip = true,
  xAxisKey = "key",
  xAxisDisplayName,
  yAxisDisplayName,
  yAxisKeys = [
    { key: "key", color: undefined, name: undefined, dot: undefined },
  ],
  yAxisTickCount = 5,
  yAxisDomain,
  height = 400,
  isLegendVisible = true,
  toolTipContentRender,
  margin = { top: 10, right: 30, left: 0, bottom: 20 },
  tickFormatter,
  isBrushDisplay,
  strokeWidth,
  lineStyle = "monotone",
}) => {
  return (
    <Row>
      <Col xs={24}>
        <ResponsiveContainer width={"100%"} height={height}>
          <LineChart data={data} margin={margin}>
            <CartesianGrid strokeDasharray="3 3" />
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
                            <div style={{ color: payload_item.stroke }}>
                              {payload_item.name}:{" "}
                              {typeof payload_item.value === "number"
                                ? formatNumber(payload_item.value)
                                : payload_item.value}
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
            <XAxis dataKey={xAxisKey} padding={{ left: 30, right: 30 }}>
              {xAxisDisplayName && (
                <Label
                  value={xAxisDisplayName}
                  offset={0}
                  style={{
                    transform: `translateY(${isBrushDisplay ? 35 : 8}px)`,
                  }}
                  position="insideBottomRight"
                />
              )}
            </XAxis>
            <YAxis
              domain={yAxisDomain}
              tickFormatter={(tick) => {
                if (typeof tickFormatter === "function") {
                  return tickFormatter(tick);
                }
                if (typeof tick === "number") {
                  return formatNumber(tick);
                }
                return tick;
              }}
              tickCount={yAxisTickCount}
            >
              {yAxisDisplayName && (
                <Label
                  value={yAxisDisplayName}
                  style={{ textAnchor: "middle" }}
                  position="top"
                  offset={20}
                />
              )}
            </YAxis>
            {yAxisKeys.map((yAxisKey) => (
              <Line
                strokeWidth={strokeWidth}
                type={lineStyle}
                dataKey={yAxisKey.key}
                name={yAxisKey.name}
                stroke={yAxisKey.color}
                fillOpacity={0}
                fill={yAxisKey.color}
                dot={
                  yAxisKey.dot ?? {
                    stroke: yAxisKey.color,
                    strokeWidth: 1,
                    color: yAxisKey.color,
                    r: 1.5,
                    fill: yAxisKey.color,
                    fillOpacity: 1,
                  }
                }
                isAnimationActive={false}
              />
            ))}
            {isLegendVisible && (
              <Legend
                formatter={(value, entry, index) => {
                  return value;
                }}
              />
            )}
            {isBrushDisplay && <Brush height={20} dataKey={xAxisKey} />}
          </LineChart>
        </ResponsiveContainer>
      </Col>
    </Row>
  );
};

export default BaseLineChart;
