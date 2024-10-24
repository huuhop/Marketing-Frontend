import { Button, Col, Row, Spin, Tag } from "antd";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./styles.module.scss";
import MultiRangePicker, { DateObject } from "react-multi-date-picker";
import AvailableTimeChosenPlugin from "./plugins/AvailableTimeChosenPlugin";
import DisplayTimePlugin from "./plugins/DisplayTimePlugin";
import { CalendarTwoTone } from "@ant-design/icons";
import moment from "moment";

/*
  Example initVals
  [
    [new DateObject().set({ day: 1 }), new DateObject().set({ day: 3 })],
    [new DateObject().set({ day: 6 }), new DateObject().set({ day: 12 })],
  ]
*/

export const COMPARE_MODE = {
  PRECEDING_PERIOD: "Preceding Period",
  CUSTOM: "Custom",
};

export const SINGLE_MODE = {
  TODAY: "Today",
  YESTERDAY: "Yesterday",
  LAST7DAYS: "7 days ago",
  LAST30DAYS: "30 days ago",
  CUSTOM: "Custom",
};

// const replaceColor = (el, color) => {
//   if (color === "red") {
//     el.classList.remove("blue");
//     el.classList.remove("green");
//     el.classList.add("red");
//   } else if (color === "blue") {
//     el.classList.remove("red");
//     el.classList.remove("green");
//     el.classList.add("blue");
//   } else {
//     el.classList.remove("red");
//     el.classList.remove("blue");
//     el.classList.add("green");
//   }
// };

const MultiRangeDatePicker = ({
  initFirstVals = [new DateObject(), new DateObject()],
  initSecVals = [],
  onApply = (firstDates, secDates) => {},
  onOpenChange = (isOpen) => {},
  isLoading = false,
  isCompareDisabled,
  defaultCompareMode = COMPARE_MODE.CUSTOM,
}) => {
  const [firstDateValues, setFirstDateValue] = useState(initFirstVals);
  const [secondDateValues, setSecondDateValues] = useState(initSecVals);
  const [triggerCalculateColor, setTriggerCaculateColor] = useState(null);
  const [openTime, setOpenTime] = useState(null);
  const [compareMode, setCompareMode] = useState(
    initSecVals.length === 0 ? null : defaultCompareMode
  );
  const [singleMode, setSingleMode] = useState(SINGLE_MODE.TODAY);
  const [chosenDateIndex, setChosenDateIndex] = useState(0);

  const timeRef = useRef(null);
  const calendarRef = useRef(null);

  const isCompare = compareMode !== null;

  const maxChoosenDateIndex = isCompare ? 3 : 1;

  /* Caculate hover color */
  useEffect(() => {
    const els = document.querySelectorAll(".rmdp-day");
    if (!isCompare || chosenDateIndex < 2) {
      els.forEach((el) => {
        el.classList.remove("red-temp");
        el.classList.add("blue-temp");
      });
    } else {
      els.forEach((el) => {
        el.classList.remove("blue-temp");
        el.classList.add("red-temp");
      });
    }
  }, [chosenDateIndex, isCompare, openTime]);

  useEffect(() => {
    console.info(
      "Log dateValues",
      firstDateValues[0].format(),
      firstDateValues[1].format(),
      secondDateValues[0]?.format(),
      secondDateValues[1]?.format()
    );
  }, [firstDateValues, secondDateValues]);

  useEffect(() => {
    const firstDateObj = new DateObject();
    const secDateObj = new DateObject();

    firstDateObj.setDay(firstDateValues[0].day);
    firstDateObj.setMonth(firstDateValues[0].month);
    firstDateObj.setYear(firstDateValues[0].year);

    secDateObj.setDay(firstDateValues[1].day);
    secDateObj.setMonth(firstDateValues[1].month);
    secDateObj.setYear(firstDateValues[1].year);

    switch (compareMode) {
      case COMPARE_MODE.PRECEDING_PERIOD: {
        if (
          singleMode === SINGLE_MODE.TODAY ||
          singleMode === SINGLE_MODE.YESTERDAY
        ) {
          setSecondDateValues([
            firstDateObj.subtract(1, "d"),
            secDateObj.subtract(1, "d"),
          ]);
        } else if (singleMode === SINGLE_MODE.LAST7DAYS) {
          setSecondDateValues([
            firstDateObj.subtract(7, "d"),
            secDateObj.subtract(7, "d"),
          ]);
        } else if (singleMode === SINGLE_MODE.LAST30DAYS) {
          setSecondDateValues([
            firstDateObj.subtract(30, "d"),
            secDateObj.subtract(30, "d"),
          ]);
        } else if (singleMode === SINGLE_MODE.CUSTOM) {
          const numberOfDays =
            moment
              .unix(secDateObj.toUnix())
              .diff(moment.unix(firstDateObj.toUnix()), "d") + 1;

          setSecondDateValues([
            firstDateObj.subtract(numberOfDays, "d"),
            secDateObj.subtract(numberOfDays, "d"),
          ]);
        }
        break;
      }
      default: {
        break;
      }
    }
  }, [compareMode, singleMode, firstDateValues]);

  // const runTimer = () => {
  //   timeRef.current = setInterval(() => {
  //     setTriggerCaculateColor(new Date().getTime());
  //   }, 100);
  // };

  // const clearTimer = () => {
  //   if (timeRef.current) {
  //     clearInterval(timeRef.current);
  //   }
  // };

  // const renderColor = () => {
  //   const els = document.querySelectorAll(".rmdp-range");
  //   if (!isCompare && els.length > 0) {
  //     els.forEach((el) => {
  //       el.classList.add("red");
  //       el.classList.add("blue");
  //     });
  //   } else {
  //     let color = "red";
  //     let repeatStartClassname = 1;
  //     els.forEach((el) => {
  //       if (el.classList.contains("end")) {
  //         replaceColor(el, color);
  //         color = "blue";
  //         repeatStartClassname = repeatStartClassname - 1;
  //       } else if (el.classList.contains("start")) {
  //         if (repeatStartClassname === 2) {
  //           color = "green";
  //         }
  //         repeatStartClassname = repeatStartClassname + 1;
  //         replaceColor(el, color);
  //       } else {
  //         replaceColor(el, color);
  //       }
  //     });
  //   }
  // };

  const handleApply = () => {
    onApply(firstDateValues, secondDateValues);
    calendarRef.current.closeCalendar();
  };

  const handleCancel = () => {
    calendarRef.current.closeCalendar();
  };

  const onConpareChange = (val) => {
    if (val) {
      setCompareMode(COMPARE_MODE.PRECEDING_PERIOD);
    } else {
      setCompareMode(null);
      setSecondDateValues([]);
    }
  };

  const prepareOpen = () => {
    setFirstDateValue(initFirstVals);
    setSecondDateValues(initSecVals);
    setCompareMode(initSecVals.length === 0 ? null : defaultCompareMode);
    setOpenTime(new Date().getTime());
    // runTimer();
  };

  const prepareClose = () => {
    setOpenTime(null);
    // clearTimer();
  };

  const currentDate = useMemo(() => {
    const firstDateObj = new DateObject();

    firstDateObj.setDay(firstDateValues[1].day);
    firstDateObj.setMonth(firstDateValues[1].month);
    firstDateObj.setYear(firstDateValues[1].year);

    return isCompare ? firstDateValues[0] : firstDateObj.subtract(1, "month");
  }, [firstDateValues, secondDateValues, isCompare, singleMode, compareMode]);

  return (
    <MultiRangePicker
      form
      ref={calendarRef}
      onClose={() => {
        prepareClose();
        return true;
      }}
      mapDays={({ date, today, selectedDate, currentMonth, isSameDate }) => {
        let className = "";
        let isOnFirstRange = false;
        let isOnSecRange = false;
        if (
          (date.valueOf() >= firstDateValues[0].valueOf() &&
            date.valueOf() <= firstDateValues[1].valueOf()) ||
          date
            .format("DD-MM-YYYY")
            .localeCompare(firstDateValues[0].format("DD-MM-YYYY")) === 0 ||
          date
            .format("DD-MM-YYYY")
            .localeCompare(firstDateValues[1].format("DD-MM-YYYY")) === 0
        ) {
          isOnFirstRange = true;
          className = "blue";
        }
        if (secondDateValues[0] && secondDateValues[1]) {
          if (
            (date.valueOf() >= secondDateValues[0].valueOf() &&
              date.valueOf() <= secondDateValues[1].valueOf()) ||
            date
              .format("DD-MM-YYYY")
              .localeCompare(secondDateValues[0].format("DD-MM-YYYY")) === 0 ||
            date
              .format("DD-MM-YYYY")
              .localeCompare(secondDateValues[1].format("DD-MM-YYYY")) === 0
          ) {
            isOnSecRange = true;
            className = "red";
          }
        }

        return {
          className: isOnFirstRange && isOnSecRange ? "green" : className,
        };
      }}
      containerClassName={styles["container"]}
      plugins={[
        <DisplayTimePlugin
          position="top"
          isCompare={isCompare}
          firstDateValues={firstDateValues}
          secondDateValues={secondDateValues}
          chosenDateIndex={chosenDateIndex}
          setChosenDateIndex={setChosenDateIndex}
          compareMode={compareMode}
          singleMode={singleMode}
        />,
        <AvailableTimeChosenPlugin
          position="left"
          singleMode={singleMode}
          compareMode={compareMode}
          setCompareMode={setCompareMode}
          setSingleMode={setSingleMode}
          onConpareChange={onConpareChange}
          firstDateValues={firstDateValues}
          setFirstDateValue={(val) => {
            setFirstDateValue(val);
            setChosenDateIndex(0);
          }}
          isCompare={isCompare}
          isCompareDisabled={isCompareDisabled}
        />,
      ]}
      numberOfMonths={2}
      value={[secondDateValues, firstDateValues]}
      onChange={() => {}}
      onFocusedDateChange={(dateFocused, dateClicked) => {
        const firstDateCloneValues = [...firstDateValues];
        const secDateCloneValues = [...secondDateValues];
        if (chosenDateIndex <= 1) {
          firstDateCloneValues[chosenDateIndex] = dateClicked;
          if (
            firstDateCloneValues[0].valueOf() >
            firstDateCloneValues[1].valueOf()
          ) {
            let temp = firstDateCloneValues[0];
            firstDateCloneValues[0] = firstDateCloneValues[1];
            firstDateCloneValues[1] = temp;
          }
          setSingleMode(SINGLE_MODE.CUSTOM);
          setFirstDateValue(firstDateCloneValues);
        } else {
          setCompareMode(COMPARE_MODE.CUSTOM);
          secDateCloneValues[chosenDateIndex - 2] = dateClicked;
          if (
            secDateCloneValues[0].valueOf() > secDateCloneValues[1].valueOf()
          ) {
            let temp = secDateCloneValues[0];
            secDateCloneValues[0] = secDateCloneValues[1];
            secDateCloneValues[1] = temp;
          }
          setSecondDateValues(secDateCloneValues);
        }

        if (chosenDateIndex === maxChoosenDateIndex) {
          setChosenDateIndex(0);
        } else {
          setChosenDateIndex(chosenDateIndex + 1);
        }
      }}
      multiple={true}
      range
      rangeHover
      render={(value, openCalendar) => {
        return (
          <Spin spinning={isLoading}>
            <Tag
              className={styles["tag"]}
              onClick={() => {
                openCalendar();
                if (!openTime) {
                  onOpenChange(true);
                  prepareOpen();
                } else {
                  onOpenChange(false);
                  prepareClose();
                }
              }}
            >
              <div
                style={{ height: "max-content" }}
                className="d-flex align-items-center"
              >
                <span className="mr-2">
                  <CalendarTwoTone />
                </span>
                <span>
                  <div className={styles["tag__first"]}>{`${
                    initFirstVals && initFirstVals[0]
                      ? initFirstVals[0].format("MMM DD")
                      : ""
                  } - ${
                    initFirstVals && initFirstVals[1]
                      ? initFirstVals[1].format("MMM DD, YYYY")
                      : ""
                  }`}</div>
                  {initSecVals.length > 0 && (
                    <div className={styles["tag__sec"]}>
                      <span>Compare: </span>
                      <span>{`${
                        initSecVals && initSecVals[0]
                          ? initSecVals[0].format("MMM DD")
                          : ""
                      } - ${
                        initSecVals && initSecVals[1]
                          ? initSecVals[1].format("MMM DD, YYYY")
                          : ""
                      }`}</span>
                    </div>
                  )}
                </span>
              </div>
            </Tag>
          </Spin>
        );
      }}
      maxDate={new Date()}
      currentDate={currentDate}
    >
      <Row style={{ borderTop: "1px solid #cfd8e2" }}>
        <Col xs={24} className="mb-1 d-flex justify-content-end px-2">
          <Button type="text" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type="text"
            onClick={handleApply}
            style={{ color: "#4285F4" }}
          >
            Apply
          </Button>
        </Col>
      </Row>
    </MultiRangePicker>
  );
};

export default MultiRangeDatePicker;
