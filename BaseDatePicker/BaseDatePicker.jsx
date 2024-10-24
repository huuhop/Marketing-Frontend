import { DatePicker, Form } from "antd";
import React from "react";
import { domElId } from "~/constants/web";

const BaseDatePicker = ({
  onChange = () => {},
  value,
  name = "date",
  format = "YYYY-MM-DD",
  placeholder,
  defaultValue,
  errorText,
  isAllowShowErrorText,
  isError,
}) => {
  return (
    <>
      <Form.Item name={name}>
        <DatePicker
          status={isError || errorText ? "error" : undefined}
          defaultValue={defaultValue}
          placeholder={placeholder}
          format={format}
          className="w-100"
          onChange={(dateUnix, dateStr) => {
            onChange(dateUnix, dateStr);
          }}
          getPopupContainer={() =>
            document.getElementById(domElId.baseDropDown)
          }
          value={value}
        />
      </Form.Item>
      {isAllowShowErrorText && (
        <div style={{ height: "20px" }} className="text-danger">
          {errorText}
        </div>
      )}
    </>
  );
};

export default BaseDatePicker;
