import { FileExcelOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";
import ExportExcelServerModal from "~/components/Base/ExportExcelServerBtn/ExportExcelServerModal";

const ExportExcelServerBtn = ({
  taskName,
  customClassName,
  title,
  disabled,
  metadata = null,
  iconVisible = true,
  defaultFileName,
  rowPerFile,
  filters,
}) => {
  const [isOpen, setOpenModal] = useState(false);
  const handleExport = () => {
    setOpenModal(true);
  };
  return (
    <>
      <Button
        icon={iconVisible && <FileExcelOutlined style={{ color: "green" }} />}
        className={`${customClassName}`}
        title="Export xlsx file"
        disabled={disabled}
        onClick={handleExport}
      >
        {title && (
          <span style={{ color: "black" }} className="ml-2">
            {title}
          </span>
        )}
      </Button>
      {isOpen && (
        <ExportExcelServerModal
          taskName={taskName}
          handleClose={() => {
            setOpenModal(false);
          }}
          defaultFileName={defaultFileName}
          rowPerFile={rowPerFile}
          filters={filters}
        />
      )}
    </>
  );
};

export default ExportExcelServerBtn;
