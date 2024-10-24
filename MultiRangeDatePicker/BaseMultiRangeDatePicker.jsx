import React, { useState } from "react";
import { DateObject } from "react-multi-date-picker";
import MultiRangeDatePicker, {
  COMPARE_MODE,
} from "~/components/Base/MultiRangeDatePicker/MultiRangeDatePicker";

const BaseMultiRangeDatePicker = ({
  initFirstVals = [new DateObject(), new DateObject()],
  initSecVals = [],
  onApply = (firstDates, secDates) => {},
  onOpenChange = (isOpen) => {},
  isLoading = false,
  isCompareDisabled,
  defaultCompareMode = COMPARE_MODE.CUSTOM,
}) => {
  const [closeTime, setCloseTime] = useState(0);

  return (
    <MultiRangeDatePicker
      key={`${closeTime}`}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setCloseTime(new Date().getTime());
        }
        onOpenChange(isOpen);
      }}
      isCompareDisabled={isCompareDisabled}
      defaultCompareMode={defaultCompareMode}
      isLoading={isLoading}
      onApply={onApply}
      initFirstVals={initFirstVals}
      initSecVals={initSecVals}
    />
  );
};

export default BaseMultiRangeDatePicker;
