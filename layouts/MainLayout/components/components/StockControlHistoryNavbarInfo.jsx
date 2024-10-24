import React, { useState } from "react";
import formatNumber from "~/utils/money";
import { formatStrNumber } from "~/services/helper";
import { DatePicker, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { modifyNavbarInfo } from "~/redux/actions/shared";
import moment from "moment";
import BaseDropdown from "~/components/Base/BaseDropdown/BaseDropdown";

const { RangePicker } = DatePicker;

const currentDate = moment();

const StockControlHistoryNavbarInfo = () => {
  const navbarInfo = useSelector((state) => state.shared.navbarInfo);
  const isNavbarInfoDisabled = useSelector(
    (state) => state.shared.isNavbarInfoDisabled
  );

  const [cacheDates, setCacheDates] = useState({
    begin_date: null,
    end_date: null,
  });
  const [dateType, setDateType] = useState(undefined);

  const dispatch = useDispatch();

  return <></>;
};

export default StockControlHistoryNavbarInfo;
