import { Col, Row, Button, Table, Form, Tag } from "antd";
import React, { useEffect, useMemo } from "react";
import BaseModal from "~/components/Base/BaseModal";
import BaseInput from "~/components/Base/BaseInput";
import { useForm } from "antd/lib/form/Form";
import {
  EXPORT_EXCEL_SERVER_STATUS,
  useExportExcelServerContext,
} from "~/contexts/ExportExcelServerContext";
import formatNumber from "~/utils/money";
import { MAX_EXPORT_EXCEL_ROW } from "~/constants/basic";
import BaseInputNumber from "~/components/Base/BaseInputNumber";

const ExportExcelServerModal = ({
  handleClose,
  taskName,
  rowPerFile,
  filters,
  defaultFileName,
}) => {
  const { getDownloadExcelHistory, requestDownloadExcel, excelHistorys } =
    useExportExcelServerContext();

  const [form] = useForm();

  useEffect(() => {
    getDownloadExcelHistory({ taskName });
  }, []);

  const dataSources = useMemo(() => {
    return excelHistorys.filter(
      (excelHistory) => excelHistory.taskName === taskName
    );
  }, [taskName, excelHistorys]);

  const handleExport = (formValue) => {
    const fileName = formValue.fileName ?? defaultFileName;

    requestDownloadExcel({
      taskName,
      fileName,
      filters,
      rowPerFile: formValue.rowPerFile ?? rowPerFile,
    });
  };

  const columns = [
    {
      title: "Link",
      dataIndex: "Link",
      key: "link",
      width: "80%",
      render: (_, metadata) => {
        const isFinish =
          metadata.status === EXPORT_EXCEL_SERVER_STATUS[2].value;
        return (
          <div>
            <a
              href={metadata.url}
              target="_blank"
              style={{
                fontSize: "18px",
                textDecoration: isFinish ? "underline" : undefined,
                color: isFinish ? "blue" : undefined,
                cursor: "pointer",
              }}
              // onClick={() => {
              //   if (isFinish) {
              //     downloadExcelFile({
              //       taskName,
              //       fileName: metadata.fileName,
              //       url: metadata.url,
              //     });
              //   }
              // }}
            >
              {metadata.fileName}
            </a>
            <div>Created At: {metadata.createAtStr}</div>
            {/* <div>
              Updated At:{" "}
              {moment.unix(metadata.updated_at).format("DD-MM-YYYY HH:mm:ss")}
            </div> */}
          </div>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "20%",
      render: (status) => {
        const statusData = EXPORT_EXCEL_SERVER_STATUS[status];
        return <Tag color={statusData.color}>{statusData.title}</Tag>;
      },
    },
  ];

  return (
    <BaseModal
      isOpen={true}
      handleClose={handleClose}
      title={<div style={{ fontSize: "17px" }}>Export History</div>}
      width="50%"
    >
      <Form
        form={form}
        onFinish={handleExport}
        initialValues={{ rowPerFile: MAX_EXPORT_EXCEL_ROW }}
      >
        <Row gutter={2}>
          <Col span={12} className={"text-right mb-1"}>
            <Row>
              <Col span={24} className={"text-right mb-1"}>
                <BaseInput
                  className={"excel-name-input"}
                  title={"Tên báo cáo"}
                  name={"fileName"}
                  placeholder={defaultFileName ?? "Tên file"}
                />
              </Col>
            </Row>
          </Col>
          <Col span={12} className={"text-right mb-1"}>
            <Row>
              <Col md={24} xs={24} lg={24} className={"text-right mb-1"}>
                <BaseInputNumber
                  title={`Số dòng trên 1 file (Tối đa ${formatNumber(
                    MAX_EXPORT_EXCEL_ROW
                  )})`}
                  name="rowPerFile"
                  min={1000}
                  max={MAX_EXPORT_EXCEL_ROW}
                  style={{ width: "100%" }}
                  placeholder={rowPerFile && `${formatNumber(rowPerFile)}`}
                  required={true}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ marginTop: "16px" }}>
          <Button type="primary" htmlType="submit">
            Xuất tệp
          </Button>
        </Row>

        <Row gutter={2} style={{ marginTop: "24px" }}>
          <Col span={24}>
            <Table
              columns={columns}
              scroll={{ y: "50vh" }}
              dataSource={dataSources}
              rowKey={"id"}
              pagination={{
                pageSize: 20,
              }}
            />
          </Col>
          {/* <Col xs={24} className="text-right mt-2">
            <Pagination
              style={{ display: "inline-block" }}
              defaultCurrent={1}
              current={1}
              total={10}
              pageSize={50}
              showSizeChanger={false}
            />
          </Col> */}
        </Row>
      </Form>
    </BaseModal>
  );
};

export default ExportExcelServerModal;
