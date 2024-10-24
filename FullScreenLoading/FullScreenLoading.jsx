import React from "react";
import { Spin } from "antd";

const FullScreenLoading = ({ width = "100vw", height = "100vh" }) => {
  return (
    <div
      className="d-flex w-100 justify-content-center align-items-center"
      style={{ height, width }}
    >
      <Spin size="large" />
    </div>
  );
};

export default FullScreenLoading;
