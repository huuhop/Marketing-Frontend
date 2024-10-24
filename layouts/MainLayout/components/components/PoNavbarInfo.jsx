import React from "react";
import BaseRangeDatePicker from "~/components/Base/BaseRangeDatePicker";
import { useReportSceneFilterContext } from "~/scenes/Report/contexts/ReportSceneFilterContext";

const PoNavbarInfo = () => {
  const { isLoading } = useReportSceneFilterContext();

  return (
    <div className="ml-2 w-100">
      <div style={{ width: "max-content" }}>
        <BaseRangeDatePicker disabled={isLoading} size="small" name={"date"} />
      </div>
    </div>
  );
};

export default PoNavbarInfo;
