import { Form, Select } from "antd";
import React from "react";
import { domElId } from "~/constants/web";
import removeAccent from "~/utils/convertVITovi";

const { Option, OptGroup } = Select;

const filterOption = (input, option) => {
  return (
    removeAccent(option.children.props.children).indexOf(removeAccent(input)) >=
    0
  );
};

const BaseGroupDropdown = ({
  placeholder,
  defaultOptions = [],
  value,
  onSelect,
  onChange,
  onClear,
  style,
  allowClear = true,
  name,
  isMultiple,
  isOpen,
  onClick = () => {},
  onOptionClick = () => {},
  dropdownStyle,
}) => {
  let maxTagCount = undefined;
  let detectValue = undefined;

  if (typeof onChange === "function") {
    detectValue = value;
  } else {
    const form = Form.useFormInstance();
    detectValue = form.getFieldValue(name);
  }

  if (Array.isArray(detectValue) && isMultiple) {
    maxTagCount = detectValue.length === 1 ? 1 : 0;
  }

  if (typeof onChange === "function") {
    return (
      <Select
        dropdownStyle={dropdownStyle}
        onClick={onClick}
        open={isOpen}
        mode={isMultiple ? "multiple" : undefined}
        maxTagCount={maxTagCount}
        showSearch={true}
        placeholder={placeholder}
        value={value}
        onSelect={(value) => {
          typeof onSelect === "function" && onSelect(value);
        }}
        onChange={(value) => {
          typeof onChange === "function" && onChange(value);
        }}
        onClear={(value) => {
          typeof onClear === "function" && onClear(value);
        }}
        style={{ width: "100%", ...style }}
        allowClear={allowClear}
        filterOption={filterOption}
        getPopupContainer={() => document.getElementById(domElId.baseDropDown)}
        dropdownMatchSelectWidth={false}
      >
        {defaultOptions.map((item) => (
          <OptGroup key={item.label} label={item.label}>
            {item.options.map((subItem) => (
              <Option key={subItem.value} value={subItem.value}>
                <div className="w-100">{subItem.label}</div>
              </Option>
            ))}
          </OptGroup>
        ))}
      </Select>
    );
  }

  return (
    <Form.Item name={name}>
      <Select
        mode={isMultiple ? "multiple" : undefined}
        maxTagCount={maxTagCount}
        showSearch={true}
        placeholder={placeholder}
        onSelect={(value) => {
          typeof onSelect === "function" && onSelect(value);
        }}
        onChange={(value) => {
          typeof onChange === "function" && onChange(value);
        }}
        onClear={(value) => {
          typeof onClear === "function" && onClear(value);
        }}
        style={{ width: "100%", ...style }}
        allowClear={allowClear}
        filterOption={filterOption}
        getPopupContainer={() => document.getElementById(domElId.baseDropDown)}
        dropdownMatchSelectWidth={false}
        options={defaultOptions}
      >
        {defaultOptions.map((item) => (
          <OptGroup key={item.label} label={item.label}>
            {item.options.map((subItem) => (
              <Option key={subItem.value} value={subItem.value}>
                <div className="w-100">{subItem.label}</div>
              </Option>
            ))}
          </OptGroup>
        ))}
      </Select>
    </Form.Item>
  );
};

export default BaseGroupDropdown;
