import React from "react";
import { Badge, Col, Row, Spin } from "antd";
import "./reportBox.scss";
import ReportBoxTotalCard from "./ReportBoxTotalCard";
import StockDirection from "../StockDirection/StockDirection";

const ReportBox = ({
  children,
  title = "",
  actionBtns,
  isLoading = false,
  borderTopColor = "#326e51",
  titleFontSize = 18,
  titleStyle = {},
  isTitleMultipleLine = false,
  moreTitleNode = <></>,
  innerRef,
  ribbon = {
    text: null,
    onClick: () => {},
  },
  tags,
  icon,
}) => {
  return (
    <Spin spinning={isLoading}>
      <Badge.Ribbon
        text={
          ribbon.text ? (
            <div onClick={ribbon.onClick}>{ribbon.text}</div>
          ) : undefined
        }
        style={{
          backgroundColor: "#f560dc",
          fontStyle: "italic",
          transform: "translateY(-5px)",
          display: ribbon.text ? "block" : "none",
          cursor: "pointer",
        }}
      >
        <Row ref={innerRef} className="report-box" style={{ borderTopColor }}>
          <Col className="report-box__heading px-3" xs={24}>
            <Row
              style={{ height: isTitleMultipleLine ? "58px" : undefined }}
              gutter={3}
              className="d-flex align-items-center"
            >
              {isTitleMultipleLine ? (
                <Col
                  style={{ fontSize: `${titleFontSize}px` }}
                  className="block-with-text"
                  xs={20}
                >
                  {title}
                </Col>
              ) : (
                <Col xs={20} style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      color: "#000000",
                      fontSize: `${titleFontSize}px`,
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      overflowWrap: "break-word",
                      width: "dynamic",
                      display: "inline-block",
                      ...titleStyle,
                    }}
                  >
                    {title}
                  </span>
                  <span style={{ marginLeft: "8px", marginTop: "-5px" }}>
                    {icon}
                  </span>
                </Col>
              )}
              <Col xs={1}></Col>
              <Col xs={3} className="text-right">
                {actionBtns}
              </Col>
            </Row>
            {tags && (
              <Row>
                <Col xs={24}>
                  {tags.map((tag) => {
                    return (
                      <span
                        key={tag.title}
                        onClick={tag.onClick}
                        style={{
                          backgroundColor: tag.bgColor,
                          color: tag.color,
                        }}
                        className={`report-box-tag ${
                          typeof tag.onClick === "function"
                            ? "clickable"
                            : undefined
                        }`}
                      >
                        {tag.title}
                      </span>
                    );
                  })}
                </Col>
              </Row>
            )}
            {moreTitleNode && (
              <Row>
                <Col xs={24}>{moreTitleNode}</Col>
              </Row>
            )}
          </Col>
          <Col xs={24}>
            <Row>
              <Col xs={24} className="px-3 py-1 bg-white">
                {children}
              </Col>
            </Row>
          </Col>
        </Row>
      </Badge.Ribbon>
    </Spin>
  );
};

ReportBox.TotalCard = ReportBoxTotalCard;

export default ReportBox;
