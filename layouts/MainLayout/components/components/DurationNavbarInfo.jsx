import { QuestionCircleOutlined } from "@ant-design/icons";
import { Col, Row, Tooltip } from "antd";
import React from "react";
import image from "../images/duration.png";

const DurationNavbarInfo = () => {
  return (
    <Tooltip
      placement="bottom"
      trigger={"click"}
      overlayInnerStyle={{ width: "700px" }}
      title={
        <Row>
          <Col xs={24}>
            <div className="w-100">
              Xác định outdated, sắp outdated, cận date, sắp cận date linh hoạt
              theo duration
            </div>
            <div>
              <img src={image} alt="" />
            </div>
          </Col>
        </Row>
      }
    >
      <QuestionCircleOutlined />
    </Tooltip>
  );
};

export default DurationNavbarInfo;
