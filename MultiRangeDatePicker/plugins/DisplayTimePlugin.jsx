import React from "react";
import styles from "../styles.module.scss";
import { Col, Row, Space, Switch } from "antd";

const displayFormat = "MMM DD, YYYY";

const DisplayTimePlugin = ({
  firstDateValues,
  secondDateValues,
  isCompare,
  chosenDateIndex,
  setChosenDateIndex,
}) => {
  return (
    <Row className={""}>
      <Col xs={24} className={"pt-1"} style={{ fontSize: "16px" }}>
        <Row>
          <Col xs={11} className="text-right">
            <span
              style={{ cursor: "pointer" }}
              className={`${
                chosenDateIndex === 0 ? styles["first-chosen"] : ""
              }`}
              onClick={() => {
                setChosenDateIndex(0);
              }}
            >
              {firstDateValues[0]
                ? firstDateValues[0].format(displayFormat)
                : ""}
            </span>
          </Col>
          <Col xs={2} className="text-center">
            -
          </Col>
          <Col xs={11} className="text-left">
            <span
              style={{ cursor: "pointer" }}
              className={`${
                chosenDateIndex === 1 ? styles["first-chosen"] : ""
              }`}
              onClick={() => {
                setChosenDateIndex(1);
              }}
            >
              {firstDateValues[1]
                ? firstDateValues[1].format(displayFormat)
                : ""}
            </span>
          </Col>
        </Row>
      </Col>
      {isCompare && (
        <Col xs={24} className={"pb-1"} style={{ fontSize: "16px" }}>
          <Row>
            <Col xs={11} className="text-right">
              <span
                style={{ cursor: "pointer" }}
                className={`${
                  chosenDateIndex === 2 ? styles["sec-chosen"] : ""
                }`}
                onClick={() => {
                  setChosenDateIndex(2);
                }}
              >
                {secondDateValues[0]
                  ? secondDateValues[0].format(displayFormat)
                  : ""}
              </span>
            </Col>
            <Col xs={2} className="text-center">
              -
            </Col>
            <Col xs={11} className="text-left">
              <span
                style={{ cursor: "pointer" }}
                className={`${
                  chosenDateIndex === 3 ? styles["sec-chosen"] : ""
                }`}
                onClick={() => {
                  setChosenDateIndex(3);
                }}
              >
                {secondDateValues[1]
                  ? secondDateValues[1].format(displayFormat)
                  : ""}
              </span>
            </Col>
          </Row>
        </Col>
      )}
    </Row>
  );
};

export default DisplayTimePlugin;
