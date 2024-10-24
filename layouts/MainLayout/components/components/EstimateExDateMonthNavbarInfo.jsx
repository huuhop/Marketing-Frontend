import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import formatNumber from "~/utils/money";

const EstimateExDateMonthNavbarInfo = () => {
  const navbarInfo = useSelector((state) => state.shared.navbarInfo);
  const isNavbarInfoDisabled = useSelector(
    (state) => state.shared.isNavbarInfoDisabled
  );

  const [cacheDates, setCacheDates] = useState({
    begin_date: null,
    end_date: null,
  });

  const dispatch = useDispatch();

  return (
    <div className="ml-2 w-100">
      <span className="font-weight-bold">
        <span>
          <span style={{ color: "#000" }}>{`Total SKU estimate outdated = `}</span>
          <span className="text-danger">
            {" "}
            {`${formatNumber(+navbarInfo.data?.total_sku)}`}
          </span>
        </span>
        ;
        <span className="ml-2">
          <span style={{ color: "#000" }}>{`Total SKU estimate qty outdated = `}</span>
          <span className="text-danger">
            {" "}
            {`${formatNumber(+navbarInfo.data?.total_count)}`}
          </span>
        </span>
        ;
        <span className="ml-2">
          <span style={{ color: "#000" }}>{`Total estimate amount outdated = `}</span>
          <span className="text-danger">
            {" "}
            {`${formatNumber(+navbarInfo.data?.total_amount)}`} VNĐ
          </span>
        </span>
      </span>
    </div>
  );
};

export default EstimateExDateMonthNavbarInfo;
