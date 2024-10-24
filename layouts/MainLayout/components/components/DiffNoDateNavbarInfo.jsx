import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import formatNumber from "~/utils/money";

const DiffNoDateNavbarInfo = () => {
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
          <span style={{ color: "#000" }}>{`Total SKU = `}</span>
          <span className="text-danger">
            {`${formatNumber(+navbarInfo.data?.total_sku)}`}
          </span>
        </span>
        ;
        <span className="ml-2">
          <span style={{ color: "#000" }}>{`Total SKU Diff = `}</span>
          <span className="text-danger">
            {`${formatNumber(+navbarInfo.data?.total_sku_diff)}`}
          </span>
        </span>
        ;
        <span className="ml-2">
          <span style={{ color: "#000" }}>{`Total SKU No Date = `}</span>
          <span className="text-danger">
            {`${formatNumber(+navbarInfo.data?.total_sku_no_date)}`}
          </span>
        </span>
      </span>
    </div>
  );
};

export default DiffNoDateNavbarInfo;
