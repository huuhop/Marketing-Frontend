import React from "react";
import { useReportSceneFilterContext } from "~/scenes/Report/contexts/ReportSceneFilterContext";
import BaseRangeDatePicker from "~/components/Base/BaseRangeDatePicker";

const OTNavbarInfo = () => {
  const { isLoading } = useReportSceneFilterContext();

  return (
    <div className="ml-2 w-100">
      <div style={{ width: "max-content" }}>
        <BaseRangeDatePicker disabled={isLoading} size="small" name={"date"} />
      </div>
    </div>
  );
};

export default OTNavbarInfo;
