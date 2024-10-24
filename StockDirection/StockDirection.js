import React, { useState, useMemo } from "react";
import { Popover } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const StockDirection = React.memo(
  ({ stock_id, onClick = () => {}, style = {} }) => {
    const [hover, setHover] = useState(false);

    const stocks = useSelector((state) => state.baseData.stocks);

    const stock = useMemo(() => {
      return stocks
        ? stocks.find(
            ({ stock_id: stock_id_data }) => stock_id === stock_id_data
          )
        : null;
    }, [stocks, stock_id]);

    if (!stock_id) {
      return <></>;
    }

    const address = stock?.address;
    const longitude = stock?.longitude;
    const latitude = stock?.latitude;

    const mapUrl =
      latitude && longitude
        ? `https://maps.google.com/?q=${latitude},${longitude}`
        : "";

    const popoverContent = stock ? (
      <div>
        {address}
        <br />
      </div>
    ) : (
      "No data"
    );

    return (
      <Popover content={popoverContent} trigger="hover">
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
          style={{ display: "inline-block" }}
        >
          <EnvironmentOutlined
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              fontSize: 14,
              color: hover ? "#165BAA" : "green",
              ...style,
            }}
          />
        </a>
      </Popover>
    );
  }
);

export default StockDirection;
