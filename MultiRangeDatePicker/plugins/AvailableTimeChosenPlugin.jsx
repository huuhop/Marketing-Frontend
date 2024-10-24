import React, { useMemo } from "react";
import styles from "../styles.module.scss";
import { Col, Row, Switch } from "antd";
import { DateObject } from "react-multi-date-picker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { COMPARE_MODE, SINGLE_MODE } from "../MultiRangeDatePicker";

const format = "DD-MM-YYYY";

const AvailableTimeChosenPlugin = ({
  onConpareChange = () => {},
  firstDateValues = [new DateObject(), new DateObject()],
  setFirstDateValue = () => {},
  isCompare,
  singleMode,
  compareMode,
  setCompareMode,
  setSingleMode,
  isCompareDisabled,
}) => {
  const {
    isTodayChecked,
    isYesterdayChecked,
    isLast7DayChecked,
    is30DaysAgoChecked,
    isFirstTimeCustom,
  } = useMemo(() => {
    const today = new DateObject();
    const yesterday = new DateObject().subtract(1, "d");
    const last7Day = new DateObject().subtract(7, "d");
    const last30day = new DateObject().subtract(30, "d");

    let checked = {
      isFirstTimeCustom: false,
      isTodayChecked: false,
      isYesterdayChecked: false,
      isLast7DayChecked: false,
      is30DaysAgoChecked: false,
    };

    switch (true) {
      case firstDateValues[0]
        .format(format)
        .localeCompare(today.format(format)) === 0 &&
        firstDateValues[1]
          .format(format)
          .localeCompare(today.format(format)) === 0: {
        checked.isTodayChecked = true;
        setSingleMode(SINGLE_MODE.TODAY);
        break;
      }
      case firstDateValues[0]
        .format(format)
        .localeCompare(yesterday.format(format)) === 0 &&
        firstDateValues[1]
          .format(format)
          .localeCompare(yesterday.format(format)) === 0: {
        checked.isYesterdayChecked = true;
        setSingleMode(SINGLE_MODE.YESTERDAY);
        break;
      }
      case firstDateValues[0]
        .format(format)
        .localeCompare(last7Day.format(format)) === 0 &&
        firstDateValues[1]
          .format(format)
          .localeCompare(yesterday.format(format)) === 0: {
        checked.isLast7DayChecked = true;
        setSingleMode(SINGLE_MODE.LAST7DAYS);
        break;
      }
      case firstDateValues[0]
        .format(format)
        .localeCompare(last30day.format(format)) === 0 &&
        firstDateValues[1]
          .format(format)
          .localeCompare(yesterday.format(format)) === 0: {
        checked.is30DaysAgoChecked = true;
        setSingleMode(SINGLE_MODE.LAST30DAYS);
        break;
      }
      default: {
        checked.isFirstTimeCustom = true;
        break;
      }
    }

    return checked;
  }, [firstDateValues]);

  return (
    <Row className={styles["available-time"]}>
      <Col
        xs={24}
        className={`${styles["available-time__row"]} ${
          isTodayChecked && singleMode !== SINGLE_MODE.CUSTOM
            ? styles["checked"]
            : ""
        }`}
        onClick={() => {
          const today = new DateObject();
          setSingleMode(SINGLE_MODE.TODAY);
          setFirstDateValue([today, today]);
        }}
      >
        <span>{SINGLE_MODE.TODAY}</span>
        {isTodayChecked && singleMode !== SINGLE_MODE.CUSTOM && (
          <span>
            <FontAwesomeIcon icon={faCheck} />
          </span>
        )}
      </Col>
      <Col
        xs={24}
        className={`${styles["available-time__row"]} ${
          isYesterdayChecked && singleMode !== SINGLE_MODE.CUSTOM
            ? styles["checked"]
            : ""
        }`}
        onClick={() => {
          const yesterday = new DateObject().subtract(1, "d");
          setSingleMode(SINGLE_MODE.YESTERDAY);
          setFirstDateValue([yesterday, yesterday]);
        }}
      >
        <span>{SINGLE_MODE.YESTERDAY}</span>
        {isYesterdayChecked && singleMode !== SINGLE_MODE.CUSTOM && (
          <span>
            <FontAwesomeIcon icon={faCheck} />
          </span>
        )}
      </Col>
      <Col
        xs={24}
        className={`${styles["available-time__row"]} ${
          isLast7DayChecked && singleMode !== SINGLE_MODE.CUSTOM
            ? styles["checked"]
            : ""
        }`}
        onClick={() => {
          const yesterday = new DateObject().subtract(1, "d");
          const last7day = new DateObject().subtract(7, "d");
          setSingleMode(SINGLE_MODE.LAST7DAYS);
          setFirstDateValue([last7day, yesterday]);
        }}
      >
        <span>{SINGLE_MODE.LAST7DAYS}</span>
        {isLast7DayChecked && singleMode !== SINGLE_MODE.CUSTOM && (
          <span>
            <FontAwesomeIcon icon={faCheck} />
          </span>
        )}
      </Col>
      <Col
        xs={24}
        className={`${styles["available-time__row"]} ${
          is30DaysAgoChecked && singleMode !== SINGLE_MODE.CUSTOM
            ? styles["checked"]
            : ""
        }`}
        onClick={() => {
          const yesterday = new DateObject().subtract(1, "d");
          const last30day = new DateObject().subtract(30, "d");
          setSingleMode(SINGLE_MODE.LAST30DAYS);
          setFirstDateValue([last30day, yesterday]);
        }}
      >
        <span>{SINGLE_MODE.LAST30DAYS}</span>
        {is30DaysAgoChecked && singleMode !== SINGLE_MODE.CUSTOM && (
          <span>
            <FontAwesomeIcon icon={faCheck} />
          </span>
        )}
      </Col>
      <Col
        xs={24}
        className={`${styles["available-time__row"]} ${
          isFirstTimeCustom || singleMode === SINGLE_MODE.CUSTOM
            ? styles["checked"]
            : ""
        }`}
        onClick={() => {
          setSingleMode(SINGLE_MODE.CUSTOM);
        }}
      >
        <span>{SINGLE_MODE.CUSTOM}</span>
        {(isFirstTimeCustom || singleMode === SINGLE_MODE.CUSTOM) && (
          <span>
            <FontAwesomeIcon icon={faCheck} />
          </span>
        )}
      </Col>
      {!isCompareDisabled && (
        <Col xs={24} className={styles["available-time__row"]}>
          <span>Compare</span>
          <span>
            <Switch
              style={{ color: "#d56e0c" }}
              checked={isCompare}
              onChange={onConpareChange}
            />
          </span>
        </Col>
      )}
      {isCompare && (
        <>
          <Col
            xs={24}
            className={`${styles["available-time__row"]} ${
              compareMode === COMPARE_MODE.PRECEDING_PERIOD
                ? styles["checked-compare"]
                : ""
            }`}
            onClick={() => {
              setCompareMode(COMPARE_MODE.PRECEDING_PERIOD);
            }}
          >
            <span>{COMPARE_MODE.PRECEDING_PERIOD}</span>
            {compareMode === COMPARE_MODE.PRECEDING_PERIOD && (
              <span>
                <FontAwesomeIcon icon={faCheck} />
              </span>
            )}
          </Col>
          <Col
            xs={24}
            className={`${styles["available-time__row"]} ${
              compareMode === COMPARE_MODE.CUSTOM
                ? styles["checked-compare"]
                : ""
            }`}
            onClick={() => {
              setCompareMode(COMPARE_MODE.CUSTOM);
            }}
          >
            <span>{COMPARE_MODE.CUSTOM}</span>
            {compareMode === COMPARE_MODE.CUSTOM && (
              <span>
                <FontAwesomeIcon icon={faCheck} />
              </span>
            )}
          </Col>
        </>
      )}
    </Row>
  );
};

export default AvailableTimeChosenPlugin;
