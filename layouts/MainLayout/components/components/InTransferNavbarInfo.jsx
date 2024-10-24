import moment from "moment";
import React, { useEffect, useState } from "react";
import { getItFetchTime } from "~/apis/operation/stock-control/it";
import { getPackedLabelFetchTime } from "~/apis/operation/stock-control/packed-label";

const InTransferNavbarInfo = () => {
  const [itFetchTime, setItFetchTime] = useState(null);
  const [packFetchTime, setPackFetchTime] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getItFetchTime();
      if (res && res.data) {
        try {
          setItFetchTime(moment.unix(+res.data).format("DD/MM/YYYY HH:mm:ss"));
        } catch {}
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await getPackedLabelFetchTime();
      if (res && res.data) {
        try {
          setPackFetchTime(
            moment.unix(+res.data).format("DD/MM/YYYY HH:mm:ss")
          );
        } catch {}
      }
    })();
  }, []);

  return (
    <div className="ml-2 w-100">
      <div
        className="d-flex justify-content-between w-100"
        style={{ transform: "translateY(3px)" }}
      >
        <span>
          <span style={{ fontSize: "14px" }}>It Datatime: {itFetchTime}</span>
        </span>
      </div>
      <div
        className="d-flex justify-content-between w-100"
        style={{ transform: "translateY(3px)" }}
      >
        <span>
          <span style={{ fontSize: "14px" }}>Packed Label Datatime: {packFetchTime}</span>
        </span>
      </div>
    </div>
  );
};

export default InTransferNavbarInfo;
