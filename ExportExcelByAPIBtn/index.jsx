import { FileExcelOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { downloadFileByUrl } from "~/utils/media";

const ExportExcelByAPIBtn = ({
  xhrFunc = async () => {},
  getFileName = () => {},
  title = "",
}) => {
  const download = async () => {
    downloadFileByUrl({ xhrFunc, fileName: getFileName() });
  };

  return (
    <Button
      icon={<FileExcelOutlined style={{ color: "green" }} />}
      onClick={download}
      className="w-100"
    >
      {title}
    </Button>
  );
};

export default ExportExcelByAPIBtn;
