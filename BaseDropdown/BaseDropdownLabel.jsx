import React, { useEffect, useRef, useState } from "react";
import { Portal } from "react-portal";
import BaseDropdownSubDropdown from "~/components/Base/BaseDropdown/BaseDropdownSubDropdown";

const BaseDropdownLabel = ({ title }) => {
  const divRef = useRef(null);
  const [coordinates, setCoordinates] = useState({ left: 0, top: 0 });
  const [visible, setVisible] = useState(false);

  const updateTooltipCoordsOption = (button) => {
    const rect = button.getBoundingClientRect();

    setCoordinates({
      left: rect.x + divRef.current.offsetWidth + 20,
      top: rect.y,
    });
  };

  return (
    <div
      ref={divRef}
      style={{ position: "relative" }}
      onClick={(e) => {
        setVisible(!visible);
        updateTooltipCoordsOption(e.target);
      }}
    >
      {title}
      {visible && (
        <Portal>
          <BaseDropdownSubDropdown coords={coordinates} />
        </Portal>
      )}
    </div>
  );
};

export default BaseDropdownLabel;
