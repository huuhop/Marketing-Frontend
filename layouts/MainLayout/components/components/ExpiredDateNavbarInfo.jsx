import { DownOutlined, LoadingOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getEstimateExDateMonthTotal,
  getEstimateExDateMonthTotalBySku,
  getEstimateExDateMonthTotalPercent,
  getEstimateExDateMonthTotalPercentBySku,
} from "~/apis/operation/estimate-expire-date";
import {
  getExpiredDateTotalAmountByStock,
  getExpiredDateTotalAmountPercentApi,
} from "~/apis/operation/expire-date";
import DurationNavbarInfo from "~/layouts/MainLayout/components/components/DurationNavbarInfo";
import { useReportSceneFilterContext } from "~/scenes/Report/contexts/ReportSceneFilterContext";
import formatNumber from "~/utils/money";

const ExpiredDateNavbarInfoRow = ({
  total_sku,
  total_count,
  total_amount,
  problem_type,
}) => {
  const pathName = window.location.pathname;

  let suffix = "";

  if (pathName.indexOf("/report/estimate-expired-date-month") !== -1) {
    switch (problem_type) {
      case "0": {
        suffix = `outdated`;
        break;
      }
      case "1": {
        suffix = `sắp outdated`;
        break;
      }
      case "2": {
        suffix = `cận date`;
        break;
      }
      case "3": {
        suffix = `sắp cận date`;
        break;
      }
      default: {
        break;
      }
    }
  } else {
    switch (problem_type) {
      case "0": {
        suffix = `${pathName.includes("estimate") ? "estimate" : ""} outdated`;
        break;
      }
      default: {
        suffix = `${
          pathName.includes("estimate") ? "estimate" : ""
        } <= ${problem_type}${pathName.includes("month") ? "th" : "%"}`;
        break;
      }
    }
  }

  return (
    <span className="font-weight-bold">
      <span>
        <span style={{ color: "#000" }}>{`Total SKU ${suffix} = `}</span>
        <span className="text-danger"> {`${formatNumber(+total_sku)}`}</span>
      </span>
      ;
      <span className="ml-2">
        <span style={{ color: "#000" }}>{`Total qty ${suffix} = `}</span>
        <span className="text-danger"> {`${formatNumber(+total_count)}`}</span>
      </span>
      ;
      <span className="ml-2">
        <span style={{ color: "#000" }}>{`Total amount ${suffix} = `}</span>
        <span className="text-danger">
          {" "}
          {`${formatNumber(+total_amount)}`} VNĐ
        </span>
      </span>
    </span>
  );
};

const ExpiredDateNavbarInfo = () => {
  const pathName = window.location.pathname;

  const navbarInfo = useSelector((state) => state.shared.navbarInfo);

  const fetchTime = useSelector(
    (state) => state.shared.navbarInfo.data?.fetchTime
  );
  const remain_problem_types = useSelector(
    (state) => state.shared.navbarInfo.data?.remain_problem_types
  );

  const { handleRefresh, filters } = useReportSceneFilterContext();

  const [moreProblemData, setMoreProblemData] = useState([]);

  useEffect(() => {
    setMoreProblemData([]);
  }, [fetchTime]);

  if (navbarInfo.data?.main_problem_type === undefined) {
    return <></>;
  }

  let dropdownPopup = <></>;

  if (moreProblemData.length === 0) {
    dropdownPopup = <LoadingOutlined />;
  } else {
    dropdownPopup = (
      <div>
        {moreProblemData.map((item) => (
          <div key={item.problem_type}>
            <ExpiredDateNavbarInfoRow
              problem_type={item.problem_type}
              total_amount={item.total_amount}
              total_count={item.total_count}
              total_sku={item.total_sku}
            />
          </div>
        ))}
      </div>
    );
  }

  const fetchRemainProblemType = async () => {
    let xhrFunc = getExpiredDateTotalAmountByStock;
    if (pathName.includes("percent")) {
      xhrFunc = getExpiredDateTotalAmountPercentApi;
    }
    if (pathName.includes("estimate")) {
      if (pathName.includes("percent")) {
        if (pathName.includes("by-stock")) {
          xhrFunc = getEstimateExDateMonthTotalPercent;
        } else {
          xhrFunc = getEstimateExDateMonthTotalPercentBySku;
        }
      } else {
        if (pathName.includes("by-stock")) {
          xhrFunc = getEstimateExDateMonthTotal;
        } else {
          xhrFunc = getEstimateExDateMonthTotalBySku;
        }
      }
    }

    if (moreProblemData.length > 0) {
      return;
    }
    try {
      const res = await Promise.all(
        remain_problem_types.map((remain_problem_type) =>
          xhrFunc({
            filters: {
              ...filters,
              problem_type: remain_problem_type,
              problem_type_filter: filters.problem_type,
            },
          })
        )
      );
      setMoreProblemData(
        res.map((item, index) => {
          return { ...item.data, problem_type: remain_problem_types[index] };
        })
      );
    } catch (err) {}
  };

  return (
    <div className="ml-2 w-100">
      <Dropdown
        trigger={["click"]}
        menu={{
          items: [{ label: dropdownPopup, key: "item-1" }],
        }}
      >
        <DownOutlined
          className="mr-2 d-inline"
          onClick={() => {
            fetchRemainProblemType();
          }}
        />
      </Dropdown>
      <ExpiredDateNavbarInfoRow
        total_count={navbarInfo.data?.total_count}
        total_amount={navbarInfo.data?.total_amount}
        total_sku={navbarInfo.data?.total_sku}
        problem_type={navbarInfo.data?.main_problem_type}
      />
      {pathName.indexOf("/report/estimate-expired-date-month") !== -1 && (
        <span className="ml-1">
          <DurationNavbarInfo />
        </span>
      )}
    </div>
  );
};

export default ExpiredDateNavbarInfo;
