import { Row } from "antd";
import React from "react";

const BaseDropdownSubDropdown = ({ coords }) => {
  return (
    <Row style={{ ...coords, position: "fixed" }}>
      <div style={{ width: "100px", height: "500px", backgroundColor: "red"}}>
        qwewqe
      </div>
    </Row>
  );
};

export default BaseDropdownSubDropdown;
