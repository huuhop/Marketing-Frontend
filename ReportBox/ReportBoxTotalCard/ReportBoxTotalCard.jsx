import { Col, Row, Spin, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./reportBoxTotalCard.module.scss";
import formatNumber from "~/utils/money";
import { isLightColor } from "~/utils/color";

const ReportBoxTotalCard = ({
  children,
  total = 0,
  bgColor = "#FF0000",
  isLoading = false,
  title = "",
  handleClick,
  totalFontSize = 30,
  titleFontSize = 18,
  description,
  overrideDisplayInfo,
  totalNumDescription,
}) => {
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    setColor(isLightColor(bgColor) ? "#000000" : "#FFFFFF");
  }, [bgColor]);

  return (
    <Spin
      spinning={isLoading}
      style={{ cursor: isLoading ? "progress" : "pointer" }}
    >
      <Row
        className={styles["wrapper"]}
        style={{
          backgroundColor: bgColor,
          color,
        }}
        onClick={() => {
          if (typeof handleClick === "function") {
            handleClick();
          }
        }}
      >
        <Col xs={24}>
          {overrideDisplayInfo ?? (
            <div className="w-100 d-flex align-items-center">
              <span
                style={{ fontSize: `${totalFontSize}px` }}
                className={styles["total"]}
              >
                <Tooltip placement="top" title={totalNumDescription}>
                  {isNaN(total) ? total : formatNumber(+total)}
                </Tooltip>
              </span>
              <span
                style={{ fontSize: `${titleFontSize}px` }}
                className={styles["title"]}
                xs={21}
              >
                {title}
              </span>
            </div>
          )}
          <Row>{children}</Row>
        </Col>
        {/* {description && (
          <Tooltip
            trigger={["hover", "click"]}
            title={description}
            color="white"
            overlayInnerStyle={{
              color: "black",
              fontStyle: "italic",
              fontSize: "12px",
            }}
          >
            <div
              className={styles["description"]}
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
            >
              <div
                className={styles["desangle"]}
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
              >
                <TriInfoSvg color="#32b0ff" />
              </div>
              <div
                className={styles["desico"]}
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
              >
                ?
              </div>
            </div>
          </Tooltip>
        )} */}
      </Row>
    </Spin>
  );
};

export default ReportBoxTotalCard;
