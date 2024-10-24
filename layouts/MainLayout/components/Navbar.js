import React, { useEffect } from "react";
import ChecklistNavbarInfo from "./components/ChecklistNavbarInfo";
import StockControlNavbarInfo from "./components/StockControlNavbarInfo";
import UserDropdown from "./UserDropdown";
import { useDispatch } from "react-redux";
import { modifyNavbarInfo } from "~/redux/actions/shared";
import ExpiredDateNavbarInfo from "./components/ExpiredDateNavbarInfo";
import InTransferNavbarInfo from "./components/InTransferNavbarInfo";
import StockControlHistoryNavbarInfo from "./components/StockControlHistoryNavbarInfo";
import EstimateExDateMonthNavbarInfo from "./components/EstimateExDateMonthNavbarInfo";
import PoNavbarInfo from "./components/PoNavbarInfo";
import StockControlFirstImportNavbarInfo from "./components/StockControlFirstImportNavbarInfo";
import DiffNoDateNavbarInfo from "./components/DiffNoDateNavbarInfo";
import OTNavbarInfo from "./components/OTNavbarInfo";

const intransferPaths = ["/report/intransfer"];

const stockControlPaths = [
  "/report/stock-control/by-stock",
  "/report/stock-control/by-sku",
  // "/report/stock-control/active-diff",
];

const activeDiffPaths = ["/report/active-diff"];

const stockControlHistoryPaths = ["/report/stock-control/history"];

const stockControlFirstImportPaths = [
  "/report/first-import/by-stock",
  "/report/first-import/by-sku",
];

const checkListPaths = [
  "/report/checklist/by-stock",
  "/report/checklist/by-sku",
];

const expiredListPaths = [
  "/report/expired-date-month/by-stock",
  "/report/expired-date-month/by-sku",
  "/report/expired-date-percent/by-stock",
  "/report/expired-date-percent/by-sku",
];

const estimateExDateMonthPath = [
  "/report/estimate-expired-date-month/by-stock",
  "/report/estimate-expired-date-month/by-sku",
  "/report/estimate-expired-date-percent/by-sku",
  "/report/estimate-expired-date-percent/by-stock",
];

const diffNoDatePath = [
  "/report/diff-no-date/by-sku",
  "/report/diff-no-date/by-stock",
];

const poPath = ["/report/po"];

const OtPath = ["/report/order-tracking"];

const Navbar = () => {
  const pathName = window.location.pathname;

  const isIntransferNavbar = intransferPaths.includes(pathName);

  const isStockControlNavbar = stockControlPaths.includes(pathName);
  const isStockControlHistoryNavbar =
    stockControlHistoryPaths.includes(pathName);
  const isActiveDiffNavbar = activeDiffPaths.includes(pathName);

  const isStockControlFirstImportPaths =
    stockControlFirstImportPaths.includes(pathName);

  const isChecklistNavbar = checkListPaths.includes(pathName);

  const isExpiredNavbar = expiredListPaths.includes(pathName);

  const isEstimateExDateMonthPath = estimateExDateMonthPath.includes(pathName);

  const isDiffNoDateNavbar = diffNoDatePath.includes(pathName);

  const isPoPath = poPath.includes(pathName);

  const isOtPath = OtPath.includes(pathName);

  return (
    <div
      className="d-flex justify-content-between align-items-center w-100 py-2"
      style={{ lineHeight: "30px", backgroundColor: "#FFF", minHeight: "45px" }}
      id="main-navbar"
    >
      <div
        className="d-flex justify-content-end align-items-center"
        style={{ flex: 1 }}
      >
        {isStockControlNavbar && <StockControlNavbarInfo />}
        {isActiveDiffNavbar && (
          <StockControlNavbarInfo isShowActiveSku={true} />
        )}
        {isStockControlHistoryNavbar && <StockControlHistoryNavbarInfo />}
        {isStockControlFirstImportPaths && (
          <StockControlFirstImportNavbarInfo />
        )}
        {isChecklistNavbar && <ChecklistNavbarInfo />}
        {isExpiredNavbar && <ExpiredDateNavbarInfo />}
        {isDiffNoDateNavbar && <DiffNoDateNavbarInfo />}
        {isIntransferNavbar && <InTransferNavbarInfo />}
        {isEstimateExDateMonthPath && <ExpiredDateNavbarInfo />}
        {isPoPath && <PoNavbarInfo />}
        {isOtPath && <OTNavbarInfo />}
      </div>
      <div>
        {/* <Notification/> */}
        {/* <Select value={i18n.language} onChange={this.handleChange} className="mr-2" bordered={false} showArrow={false}>
            <Select.Option className="text-center" value="vi"><img src="/images/vi.svg" width="20"/></Select.Option>
            <Select.Option className="text-center" value="en"><img src="/images/en.svg" width="20"/></Select.Option>
        </Select> */}

        {/* <UserDropdown /> */}
      </div>
    </div>
  );
};

export default Navbar;
