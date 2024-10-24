import React from "react";
import { useExportExcelQueueContext } from "~/contexts/ExportExcelQueueContext";
import { Button, Progress } from "antd";
import { ArrowDownOutlined, FileExcelOutlined } from "@ant-design/icons";
import { showFlashNotify } from "~/utils/notify";
import { Loading3QuartersOutlined } from "@ant-design/icons";

const QueueMultiExportExcelBtn = ({
  taskName,
  customClassName,
  title,
  disabled,
  loadingInsteadProgress,
  metadata = null,
  exportExcelFunc = async () => ({
    heading: [],
    rawData: [],
    defaultColumnLength: 7,
    fitColumnIndex: 0,
    formatCurrencyIndex: [],
    fileName: "",
  }),
}) => {
  const {
    progress,
    addExportExcelJob,
    listTaskName,
    currentTaskName,
    currentFileName,
  } = useExportExcelQueueContext();

  if (progress !== null && listTaskName.includes(taskName) && !disabled) {
    return (
      <Button
        onClick={() => {
          let content = "File đang được export, vui lòng chờ!";

          if (taskName !== currentTaskName) {
            content = `File "${currentFileName}" đang được export, vui lòng chờ!`;
          }

          showFlashNotify({
            key: "QueueMultiExportExcelBtn-CurrentTask",
            content,
            type: "warn",
            duration: 3,
          });
        }}
        icon={
          <div className="w-100 h-100 d-flex justify-content-center align-items-center position-relative">
            {loadingInsteadProgress ? (
              <Loading3QuartersOutlined
                spin={true}
                style={{ fontSize: "20px" }}
              />
            ) : (
              <Progress
                width={20}
                type="circle"
                percent={taskName === currentTaskName ? progress : 0}
                showInfo={false}
              />
            )}
            <div
              style={{
                position: "absolute",
              }}
            >
              <ArrowDownOutlined style={{ fontSize: "13px" }} />
            </div>
          </div>
        }
        className={`${customClassName}`}
      />
    );
  }

  const handleExport = () => {
    addExportExcelJob({
      name: taskName,
      task: exportExcelFunc,
      metadata: {
        ...metadata,
        loadingInsteadProgress,
      },
    });
  };

  return (
    <Button
      icon={<FileExcelOutlined style={{ color: "green" }} />}
      className={`${customClassName}`}
      title="Export xlsx file"
      disabled={disabled}
      onClick={handleExport}
    >
      {title && (
        <span style={{ color: "green" }} className="ml-2">
          {title}
        </span>
      )}
    </Button>
  );
};

export default QueueMultiExportExcelBtn;
