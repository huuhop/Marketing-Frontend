import { FileExcelOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect } from "react";
import { utils, write } from "xlsx";
import { saveAs } from "file-saver";
import { showFlashNotify } from "~/utils/notify";
import { useDispatch } from "react-redux";
import { mofifyGlobalLoading } from "~/redux/actions/shared";

const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

const XlsxButton = ({
  onClick,
  title = "",
  customClassName = "",
  rawData = [],
  fileName,
  fitColumnIndex = 0,
  heading = [],
  defaultColumnLength = 7,
  disabled,
  formatCurrencyIndex = [],
}) => {
  useEffect(() => {
    if (heading.length > 0 && typeof onClick === "function") {
      exportXlsFile();
    }
  }, [rawData, heading]);

  const dispatch = useDispatch();

  const getAutofitColumns = () => {
    let wscols = [];
    for (var i = 0; i < rawData[fitColumnIndex].length; i++) {
      let length = defaultColumnLength;
      if (typeof rawData[fitColumnIndex][i] !== "undefined") {
        length = `${rawData[fitColumnIndex][i]}`.length + 10;
      }

      wscols.push({
        wch: length,
      });
    }

    console.log({ wscols, rawData });

    return wscols;
  };

  const exportXlsFile = () => {
    try {
      let worksheet = utils.aoa_to_sheet([[...heading], ...rawData]);

      if (formatCurrencyIndex.length > 0) {
        const currencyFormat = "#,##0";

        const range = utils.decode_range(worksheet["!ref"]);
        for (let i = range.s.r + 1; i <= range.e.r; i++) {
          formatCurrencyIndex.forEach((formatIndex) => {
            const cellRef = utils.encode_cell({ r: i, c: formatIndex });
            if (worksheet[cellRef]) {
              worksheet[cellRef].z = currencyFormat;
            }
          });
        }
      }

      if (rawData.length > 0) {
        worksheet["!cols"] = getAutofitColumns();
      }

      // if (heading.length !== 0) {
      //   utils.sheet_add_aoa(worksheet, [heading], {
      //     cellStyles: { font: { bold: true, color: { rgb: "FF0000" } } },
      //   });
      // }

      let workbook = { Sheets: { List: worksheet }, SheetNames: ["List"] };
      const excelBuffer = write(workbook, { bookType: "xlsx", type: "array" });

      // Force download
      const data = new Blob([excelBuffer], { type: fileType });

      dispatch(mofifyGlobalLoading(false));

      saveAs(data, `${fileName}${fileExtension}`.trim(), { autoBom: true });
    } catch (err) {
      console.error(err);
      showFlashNotify({
        key: "xlsxbtn",
        content: "Có lỗi khi xuất file!",
        type: "error",
      });
    }
  };

  return (
    <Button
      onClick={typeof onClick === "function" ? onClick : exportXlsFile}
      icon={<FileExcelOutlined style={{ color: "green" }} />}
      className={`${customClassName}`}
      title="Export xlsx file"
      disabled={disabled}
    >
      {title && (
        <span style={{ color: "green" }} className="ml-2">
          {title}
        </span>
      )}
    </Button>
  );
};

export default XlsxButton;
