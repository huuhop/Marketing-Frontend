import { Col, Divider, Form, Row, Select, Tooltip } from "antd";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { domElId } from "~/constants/web";
import removeAccent from "~/utils/convertVITovi";

const filterOption = (input, option) => {
  try {
    return removeAccent(option.rawTitle).indexOf(removeAccent(input)) >= 0;
  } catch (err) {}
};

const BaseDropdown = ({
  placeholder,
  defaultOptions = [],
  value,
  onSelect,
  onDeselect,
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
  size,
  className,
  optionMaxWidth,
  lazy,
  allOptionValue,
  disabled,
  isError,
  errorText,
  isAllowShowErrorText,
  isMultipleValuesDisplay,
  isAllOptionSelectOtherOptions,
  bottomDropDownRender,
  onDropdownVisibleChange,
  isLoading,
  onBlur = () => {},
  tagRender,
  titleIsValue,
  title,
  customMaxTagCount,
  id,
  customFilterOption,
  tooltip,
}) => {
  const [isOptionsDisplayed, setIsOptionsDisplayed] = useState(!lazy);
  const [forceRerender, setForceRerender] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setForceRerender(new Date().getTime());
    }, 50);
  }, []);

  const timeRef = useRef(null);

  let maxTagCount = undefined;
  let detectValue = undefined;

  if (typeof onChange === "function") {
    detectValue = value;
  } else {
    const form = Form.useFormInstance();
    detectValue = form.getFieldValue(name);
  }

  if (Array.isArray(detectValue) && isMultiple && !isMultipleValuesDisplay) {
    maxTagCount = detectValue.length === 1 ? 1 : 0;
  }

  const optionStyle = optionMaxWidth
    ? {
        maxWidth: optionMaxWidth,
        wordBreak: "break-word",
        height: "auto",
        whiteSpace: "pre-wrap",
      }
    : undefined;

  const handleSearch = (val) => {
    if (!lazy) {
      return;
    }

    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }

    if (val.length > 0) {
      timeRef.current = setTimeout(() => {
        setIsOptionsDisplayed(true);
      }, 500);
    } else {
      setIsOptionsDisplayed(false);
    }
  };

  const options = useMemo(() => {
    const totalPropOptions = allOptionValue
      ? [
          { title: "Tất cả", value: titleIsValue ? "Tất cả" : allOptionValue },
          ...defaultOptions.filter((i) => i.title !== "STOCK_INSIDE"),
        ]
      : defaultOptions;

    return !lazy
      ? totalPropOptions
      : isOptionsDisplayed
      ? totalPropOptions
      : detectValue !== undefined
      ? totalPropOptions.reduce((init, i) => {
          let comparedVal = titleIsValue ? i.title : i.value;
          if (!isMultiple) {
            if (comparedVal === detectValue) {
              return init.concat(i);
            }
          } else {
            if (
              Array.isArray(detectValue) &&
              detectValue.find((item) => item === comparedVal)
            ) {
              return init.concat(i);
            }
          }

          return init;
        }, [])
      : [];
  }, [
    lazy,
    defaultOptions,
    isOptionsDisplayed,
    detectValue,
    allOptionValue,
    titleIsValue,
    isMultiple,
  ]);

  const matchOptionsToDropDown = useMemo(() => {
    return options.map((item) => ({
      ...item,
      key: item?.value,
      label: item?.title,
      rawTitle: item?.label ?? item?.title,
      value: titleIsValue ? item?.title : item?.value,
    }));
  }, [options, titleIsValue]);

  const dropdownRender = (menu) => {
    if (bottomDropDownRender) {
      return (
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {menu}
          <Divider />
          <Row>
            <Col xs={24}>{bottomDropDownRender}</Col>
          </Row>
        </div>
      );
    }

    const menuWithAllOption = menu;

    if (!lazy) {
      return menuWithAllOption;
    }

    if (detectValue && !isOptionsDisplayed) {
      return menuWithAllOption;
    }

    if (!isOptionsDisplayed) {
      return (
        <div className="p-2 d-flex justify-content-center align-items-center">
          Vui lòng nhập
        </div>
      );
    }

    return menuWithAllOption;
  };

  const titleNode = title && (
    <div style={{ fontSize: "13px", fontWeight: "bold" }}>{title}</div>
  );

  /* Stateful */
  if (typeof onChange === "function") {
    return (
      <>
        <div>{titleNode}</div>
        <Tooltip
          placement="top"
          title={tooltip}
          overlayInnerStyle={{ width: "max-content" }}
        >
          <Row className="w-100">
            <Col xs={24}>
              <Select
                id={id}
                tagRender={tagRender}
                loading={isLoading}
                onBlur={onBlur}
                dropdownRender={dropdownRender}
                className={className}
                size={size}
                dropdownStyle={dropdownStyle}
                onClick={onClick}
                open={isOpen}
                mode={isMultiple ? "multiple" : undefined}
                maxTagCount={
                  customMaxTagCount !== undefined
                    ? customMaxTagCount
                    : maxTagCount
                }
                showSearch={true}
                placeholder={placeholder}
                value={value}
                disabled={disabled || isLoading}
                onSelect={(val) => {
                  setIsOptionsDisplayed(false);
                  if (typeof onSelect === "function") {
                    onSelect(val);
                  }
                  if (
                    typeof onChange === "function" &&
                    allOptionValue &&
                    isMultiple
                  ) {
                    if (isAllOptionSelectOtherOptions) {
                      if (val === allOptionValue) {
                        onChange(
                          matchOptionsToDropDown
                            .filter((i) => i.title !== "Tất cả")
                            .map((i) => i.value)
                        );
                      } else {
                        onChange([...detectValue, val]);
                      }
                    } else {
                      if (
                        val === allOptionValue ||
                        matchOptionsToDropDown.length === detectValue.length + 1
                      ) {
                        onChange([allOptionValue]);
                      } else {
                        onChange([
                          ...detectValue.filter((i) => i !== allOptionValue),
                          val,
                        ]);
                      }
                    }
                  }
                }}
                onDeselect={(val) => {
                  setIsOptionsDisplayed(false);
                  if (typeof onDeselect === "function") {
                    onDeselect(val);
                  }
                  if (
                    typeof onChange === "function" &&
                    allOptionValue &&
                    isMultiple
                  ) {
                    onChange([...detectValue].filter((i) => i !== val));
                  }
                }}
                onChange={(val) => {
                  if (typeof onChange === "function" && !allOptionValue) {
                    onChange(val);
                  } else if (
                    typeof onChange === "function" &&
                    allOptionValue &&
                    !isMultiple
                  ) {
                    onChange(val);
                  }
                }}
                onClear={(value) => {
                  typeof onClear === "function" && onClear(value);
                  if (allOptionValue) {
                    onChange(undefined);
                  }
                }}
                onSearch={handleSearch}
                style={{
                  width: "100%",
                  ...style,
                }}
                status={isError || errorText ? "error" : undefined}
                allowClear={allowClear}
                filterOption={customFilterOption ?? filterOption}
                getPopupContainer={() =>
                  document.getElementById(domElId.baseDropDown)
                }
                dropdownMatchSelectWidth={false}
                options={matchOptionsToDropDown}
                onDropdownVisibleChange={onDropdownVisibleChange}
              />
            </Col>
          </Row>
        </Tooltip>
        {isAllowShowErrorText && (
          <div style={{ height: "20px" }} className="text-danger">
            {errorText}
          </div>
        )}
      </>
    );
  }

  /* Stateless */
  return (
    <>
      <div>{titleNode}</div>
      <Tooltip
        placement="top"
        title={tooltip}
        overlayInnerStyle={{ width: "max-content" }}
      >
        <Row>
          <Col xs={24}>
            <Form.Item name={name} className="w-100">
              <Select
                className="w-100"
                dropdownRender={dropdownRender}
                mode={isMultiple ? "multiple" : undefined}
                maxTagCount={
                  customMaxTagCount !== undefined
                    ? customMaxTagCount
                    : maxTagCount
                }
                showSearch={true}
                placeholder={placeholder}
                disabled={disabled}
                onSelect={(val) => {
                  setIsOptionsDisplayed(false);
                  if (typeof onSelect === "function") {
                    onSelect(val);
                  }
                  if (
                    typeof onChange === "function" &&
                    allOptionValue &&
                    isMultiple
                  ) {
                    if (
                      val === allOptionValue ||
                      matchOptionsToDropDown.length === detectValue.length + 1
                    ) {
                      onChange([allOptionValue]);
                    } else {
                      onChange([
                        ...detectValue.filter((i) => i !== allOptionValue),
                        val,
                      ]);
                    }
                  }
                }}
                onDeselect={(val) => {
                  setIsOptionsDisplayed(false);
                  if (typeof onDeselect === "function") {
                    onDeselect(val);
                  }
                  if (
                    typeof onChange === "function" &&
                    allOptionValue &&
                    isMultiple
                  ) {
                    onChange([...detectValue].filter((i) => i !== val));
                  }
                }}
                onChange={(val) => {
                  if (typeof onChange === "function" && !allOptionValue) {
                    onChange(val);
                  }
                }}
                onSearch={handleSearch}
                style={{
                  width: "100%",
                  ...style,
                }}
                status={isError || errorText ? "error" : undefined}
                allowClear={allowClear}
                filterOption={customFilterOption ?? filterOption}
                getPopupContainer={() =>
                  document.getElementById(domElId.baseDropDown)
                }
                options={matchOptionsToDropDown}
                dropdownMatchSelectWidth={false}
                onDropdownVisibleChange={onDropdownVisibleChange}
              />
            </Form.Item>
          </Col>
        </Row>
      </Tooltip>
      {isAllowShowErrorText && (
        <div style={{ height: "20px" }} className="text-danger">
          {errorText}
        </div>
      )}
    </>
  );
};

export default BaseDropdown;
